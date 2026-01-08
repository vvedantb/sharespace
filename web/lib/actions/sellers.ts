"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function becomeSeller(data: { bio: string }) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.user.update({
    where: { id: user.id },
    data: {
      isSeller: true,
      sellerBio: data.bio,
    },
  });
}

export async function isSeller(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isSeller: true },
  });

  return dbUser?.isSeller ?? false;
}
