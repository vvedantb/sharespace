import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const mentor = await prisma.mentorProfile.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!mentor) {
    return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { revieweeId: mentor.userId },
  });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
    id: mentor.id,
    userId: mentor.userId,
    name: `${mentor.user.firstName} ${mentor.user.lastName}`,
    university: mentor.user.university,
    course: mentor.user.course,
    bio: mentor.bio,
    expertise: mentor.expertise,
    rating: avgRating,
    endorsements: mentor.endorsements,
    totalAnswers: mentor.totalAnswers,
    helpfulAnswers: mentor.helpfulAnswers,
    isVerified: mentor.isVerified,
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

  const existing = await prisma.mentorProfile.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const mentor = await prisma.mentorProfile.update({
    where: { id },
    data: {
      bio: body.bio,
      expertise: body.expertise,
    },
    include: { user: true },
  });

  const reviews = await prisma.review.findMany({
    where: { revieweeId: mentor.userId },
  });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
    id: mentor.id,
    userId: mentor.userId,
    name: `${mentor.user.firstName} ${mentor.user.lastName}`,
    university: mentor.user.university,
    course: mentor.user.course,
    bio: mentor.bio,
    expertise: mentor.expertise,
    rating: avgRating,
    endorsements: mentor.endorsements,
    totalAnswers: mentor.totalAnswers,
    helpfulAnswers: mentor.helpfulAnswers,
    isVerified: mentor.isVerified,
  });
}
