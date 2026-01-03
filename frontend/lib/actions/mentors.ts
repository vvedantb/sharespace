"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Mentor } from "@/lib/types";

export async function getMentors(search?: string): Promise<Mentor[]> {
  const mentors = await prisma.mentorProfile.findMany({
    where: search
      ? {
          OR: [
            { user: { firstName: { contains: search, mode: "insensitive" } } },
            { user: { lastName: { contains: search, mode: "insensitive" } } },
            { expertise: { hasSome: [search] } },
          ],
        }
      : undefined,
    include: { user: true },
    orderBy: { endorsements: "desc" },
  });

  return mentors.map((m) => ({
    id: m.id,
    userId: m.userId,
    name: `${m.user.firstName} ${m.user.lastName}`,
    university: m.user.university,
    course: m.user.course,
    bio: m.bio,
    expertise: m.expertise,
    rating: 0,
    endorsements: m.endorsements,
    totalAnswers: m.totalAnswers,
    helpfulAnswers: m.helpfulAnswers,
    isVerified: m.user.isVerified,
  }));
}

export async function createMentor(data: { bio: string; expertise: string[] }) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.mentorProfile.create({
    data: {
      userId: user.id,
      bio: data.bio,
      expertise: data.expertise,
    },
  });
}
