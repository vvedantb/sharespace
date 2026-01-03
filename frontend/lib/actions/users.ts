"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function searchUsers(query: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.user.findMany({
    where: {
      id: { not: user.id },
      OR: [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      university: true,
    },
    take: 10,
  });
}

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    username?: string;
    avatarUrl?: string;
    bio?: string;
    course?: string;
    yearOfStudy?: number;
  }
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
