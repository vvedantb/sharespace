"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Mentor } from "@/lib/types";

export async function getMentors(search?: string): Promise<Mentor[]> {
  const mentors = await prisma.mentorProfile.findMany({
    where: {
      status: "APPROVED",
      ...(search
        ? {
            OR: [
              { user: { firstName: { contains: search, mode: "insensitive" } } },
              { user: { lastName: { contains: search, mode: "insensitive" } } },
              { expertise: { hasSome: [search] } },
            ],
          }
        : {}),
    },
    include: { user: true },
    orderBy: { endorsements: "desc" },
  });

  return mentors.map((m) => {
    const rating =
      m.totalAnswers > 0 ? (m.helpfulAnswers / m.totalAnswers) * 5 : 0;
    return {
      id: m.id,
      userId: m.userId,
      name: `${m.user.firstName} ${m.user.lastName}`,
      university: m.user.university,
      course: m.user.course,
      bio: m.bio,
      expertise: m.expertise,
      rating,
      endorsements: m.endorsements,
      totalAnswers: m.totalAnswers,
      helpfulAnswers: m.helpfulAnswers,
      isVerified: m.user.isVerified,
      status: m.status,
      mentorType: m.mentorType,
    };
  });
}

export async function createMentor(data: {
  bio: string;
  expertise: string[];
  mentorType: "STUDENT" | "ALUMNI";
  yearOfStudy?: number;
  graduationYear?: number;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (data.mentorType === "STUDENT" && (!data.yearOfStudy || data.yearOfStudy < 3)) {
    throw new Error("Students must be in year 3 or above to become mentors");
  }
  if (data.mentorType === "ALUMNI" && !data.graduationYear) {
    throw new Error("Alumni must provide graduation year");
  }

  const existingProfile = await prisma.mentorProfile.findUnique({
    where: { userId: user.id },
  });
  if (existingProfile) {
    throw new Error("You already have a mentor application");
  }

  if (data.yearOfStudy || data.graduationYear) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        yearOfStudy: data.yearOfStudy,
        graduationYear: data.graduationYear,
      },
    });
  }

  return prisma.mentorProfile.create({
    data: {
      userId: user.id,
      bio: data.bio,
      expertise: data.expertise,
      mentorType: data.mentorType,
      status: "PENDING",
    },
  });
}

export async function endorseMentor(mentorId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction([
    prisma.mentorEndorsement.create({
      data: { mentorId, userId: user.id },
    }),
    prisma.mentorProfile.update({
      where: { id: mentorId },
      data: { endorsements: { increment: 1 } },
    }),
  ]);
}

export async function hasEndorsed(mentorId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const endorsement = await prisma.mentorEndorsement.findUnique({
    where: { mentorId_userId: { mentorId, userId: user.id } },
  });

  return !!endorsement;
}

export async function getMentorApplicationStatus() {
  const user = await getCurrentUser();
  if (!user) return null;

  const profile = await prisma.mentorProfile.findUnique({
    where: { userId: user.id },
    select: { status: true, appliedAt: true, reviewedAt: true, mentorType: true },
  });

  return profile;
}

export async function approveMentor(mentorId: string) {
  return prisma.mentorProfile.update({
    where: { id: mentorId },
    data: { status: "APPROVED", reviewedAt: new Date() },
  });
}

export async function rejectMentor(mentorId: string) {
  return prisma.mentorProfile.update({
    where: { id: mentorId },
    data: { status: "REJECTED", reviewedAt: new Date() },
  });
}

export async function getPendingMentorApplications() {
  return prisma.mentorProfile.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { appliedAt: "desc" },
  });
}
