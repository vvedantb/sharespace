import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const mentors = await prisma.mentorProfile.findMany({
    where: search
      ? {
          OR: [
            { bio: { contains: search, mode: "insensitive" } },
            { user: { firstName: { contains: search, mode: "insensitive" } } },
            { user: { lastName: { contains: search, mode: "insensitive" } } },
          ],
        }
      : undefined,
    include: { user: true },
    orderBy: { endorsements: "desc" },
  });

  const userIds = mentors.map((m) => m.userId);
  const reviews = await prisma.review.findMany({
    where: { revieweeId: { in: userIds } },
  });

  const ratingMap = new Map<string, number>();
  for (const userId of userIds) {
    const userReviews = reviews.filter((r) => r.revieweeId === userId);
    ratingMap.set(
      userId,
      userReviews.length > 0
        ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
        : 0
    );
  }

  return NextResponse.json(
    mentors.map((m) => ({
      id: m.id,
      userId: m.userId,
      name: `${m.user.firstName} ${m.user.lastName}`,
      university: m.user.university,
      course: m.user.course,
      bio: m.bio,
      expertise: m.expertise,
      rating: ratingMap.get(m.userId) || 0,
      endorsements: m.endorsements,
      totalAnswers: m.totalAnswers,
      helpfulAnswers: m.helpfulAnswers,
      isVerified: m.isVerified,
    }))
  );
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.mentorProfile.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Mentor profile already exists" },
      { status: 409 }
    );
  }

  const body = await request.json();

  const mentor = await prisma.mentorProfile.create({
    data: {
      userId: user.id,
      bio: body.bio,
      expertise: body.expertise || [],
    },
    include: { user: true },
  });

  return NextResponse.json(
    {
      id: mentor.id,
      userId: mentor.userId,
      name: `${mentor.user.firstName} ${mentor.user.lastName}`,
      university: mentor.user.university,
      course: mentor.user.course,
      bio: mentor.bio,
      expertise: mentor.expertise,
      rating: 0,
      endorsements: mentor.endorsements,
      totalAnswers: mentor.totalAnswers,
      helpfulAnswers: mentor.helpfulAnswers,
      isVerified: mentor.isVerified,
    },
    { status: 201 }
  );
}
