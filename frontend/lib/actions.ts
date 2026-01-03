"use server";

import { prisma } from "@/lib/prisma";

export async function createUser(data: {
  cognitoId: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  return prisma.user.upsert({
    where: { email: data.email },
    update: { cognitoId: data.cognitoId },
    create: data,
  });
}
