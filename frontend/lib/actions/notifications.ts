"use server";

import { prisma } from "@/lib/prisma";

export async function markNotificationRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}
