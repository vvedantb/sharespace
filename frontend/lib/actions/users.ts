"use server";

import { prisma } from "@/lib/prisma";

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    username?: string;
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
