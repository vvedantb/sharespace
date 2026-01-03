import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const items = await prisma.item.findMany({
    where: { sellerId: id },
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  const [reviews] = await Promise.all([
    prisma.review.findMany({ where: { revieweeId: id } }),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json(
    items.map((item) => ({
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
    }))
  );
}
