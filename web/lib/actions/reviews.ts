"use server";

import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Review } from "@/lib/types";

export async function createReview(data: {
  revieweeId: string;
  itemId?: string;
  rating: number;
  comment?: string;
}): Promise<Review> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const review = await prisma.review.create({
    data: {
      reviewerId: user.id,
      revieweeId: data.revieweeId,
      itemId: data.itemId,
      rating: data.rating,
      comment: data.comment,
    },
    include: { reviewer: true },
  });

  await prisma.notification.create({
    data: {
      userId: data.revieweeId,
      type: "REVIEW",
      title: "New Review",
      description: `${user.firstName} ${user.lastName} left you a ${data.rating}-star review`,
      link: "/profile",
    },
  });

  return {
    id: review.id,
    reviewerId: review.reviewerId,
    reviewerName: `${review.reviewer.firstName} ${review.reviewer.lastName}`,
    rating: review.rating,
    comment: review.comment ?? "",
    createdAt: dayjs(review.createdAt).toISOString(),
  };
}

export async function getReviewsForUser(userId: string): Promise<Review[]> {
  const reviews = await prisma.review.findMany({
    where: { revieweeId: userId },
    include: { reviewer: true },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({
    id: r.id,
    reviewerId: r.reviewerId,
    reviewerName: `${r.reviewer.firstName} ${r.reviewer.lastName}`,
    rating: r.rating,
    comment: r.comment ?? "",
    createdAt: dayjs(r.createdAt).toISOString(),
  }));
}
