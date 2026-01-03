import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: { seller: true },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { revieweeId: item.sellerId },
  });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
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
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing || existing.sellerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const item = await prisma.item.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      condition: body.condition,
      images: body.images,
      courseCode: body.courseCode,
    },
    include: { seller: true },
  });

  const reviews = await prisma.review.findMany({
    where: { revieweeId: item.sellerId },
  });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
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
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing || existing.sellerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.item.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
