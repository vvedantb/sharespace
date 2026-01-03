import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { mentorProfile: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [itemsListed, itemsSold, reviews] = await Promise.all([
    prisma.item.count({ where: { sellerId: user.id } }),
    prisma.item.count({ where: { sellerId: user.id, status: "SOLD" } }),
    prisma.review.findMany({ where: { revieweeId: user.id } }),
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
    isMentor: !!user.mentorProfile,
    rating: avgRating,
    itemsListed,
    itemsSold,
    createdAt: user.createdAt,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.id !== id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      university: body.university,
      course: body.course,
      yearOfStudy: body.yearOfStudy,
      bio: body.bio,
    },
    include: { mentorProfile: true },
  });

  const [itemsListed, itemsSold, reviews] = await Promise.all([
    prisma.item.count({ where: { sellerId: user.id } }),
    prisma.item.count({ where: { sellerId: user.id, status: "SOLD" } }),
    prisma.review.findMany({ where: { revieweeId: user.id } }),
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
    isMentor: !!user.mentorProfile,
    rating: avgRating,
    itemsListed,
    itemsSold,
    createdAt: user.createdAt,
  });
}
