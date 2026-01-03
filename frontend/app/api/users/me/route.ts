import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [itemsListed, itemsSold, reviews, mentorProfile] = await Promise.all([
    prisma.item.count({ where: { sellerId: user.id } }),
    prisma.item.count({ where: { sellerId: user.id, status: "SOLD" } }),
    prisma.review.findMany({ where: { revieweeId: user.id } }),
    prisma.mentorProfile.findUnique({ where: { userId: user.id } }),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    university: user.university,
    course: user.course,
    yearOfStudy: user.yearOfStudy,
    bio: user.bio,
    isVerified: user.isVerified,
    isMentor: !!mentorProfile,
    rating: avgRating,
    itemsListed,
    itemsSold,
    createdAt: user.createdAt,
  });
}
