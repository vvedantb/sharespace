import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Category } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const items = await prisma.item.findMany({
    where: {
      status: "ACTIVE",
      ...(category && { category: category as Category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  const sellerIds = [...new Set(items.map((i) => i.sellerId))];
  const reviews = await prisma.review.findMany({
    where: { revieweeId: { in: sellerIds } },
  });

  const ratingMap = new Map<string, number>();
  for (const sellerId of sellerIds) {
    const sellerReviews = reviews.filter((r) => r.revieweeId === sellerId);
    ratingMap.set(
      sellerId,
      sellerReviews.length > 0
        ? sellerReviews.reduce((sum, r) => sum + r.rating, 0) /
            sellerReviews.length
        : 0
    );
  }

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      sellerId: item.sellerId,
      sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      sellerRating: ratingMap.get(item.sellerId) || 0,
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
      courseCode: item.courseCode,
      university: item.university,
      views: item.views,
      saves: item.saves,
      isMentorRecommended: item.isMentorRecommended,
      createdAt: item.createdAt,
    }))
  );
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const item = await prisma.item.create({
    data: {
      sellerId: user.id,
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      condition: body.condition,
      images: body.images || [],
      courseCode: body.courseCode,
      university: body.university || user.university,
    },
    include: { seller: true },
  });

  const reviews = await prisma.review.findMany({
    where: { revieweeId: user.id },
  });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json(
    {
      id: item.id,
      sellerId: item.sellerId,
      sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      sellerRating: avgRating,
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
      courseCode: item.courseCode,
      university: item.university,
      views: item.views,
      saves: item.saves,
      isMentorRecommended: item.isMentorRecommended,
      createdAt: item.createdAt,
    },
    { status: 201 }
  );
}
