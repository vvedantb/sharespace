import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const reviews = await prisma.review.findMany({
    where: { revieweeId: id },
    include: { reviewer: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    reviews.map((review) => ({
      id: review.id,
      reviewerId: review.reviewerId,
      reviewerName: `${review.reviewer.firstName} ${review.reviewer.lastName}`,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    }))
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const review = await prisma.review.create({
    data: {
      reviewerId: currentUser.id,
      revieweeId: id,
      rating: body.rating,
      comment: body.comment,
      itemId: body.itemId,
    },
    include: { reviewer: true },
  });

  return NextResponse.json(
    {
      id: review.id,
      reviewerId: review.reviewerId,
      reviewerName: `${review.reviewer.firstName} ${review.reviewer.lastName}`,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    },
    { status: 201 }
  );
}
