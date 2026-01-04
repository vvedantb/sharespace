"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function createReport(data: {
  itemId?: string;
  reportedUserId?: string;
  reason: string;
  description?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (!data.itemId && !data.reportedUserId) {
    throw new Error("Must specify either an item or user to report");
  }

  return prisma.report.create({
    data: {
      reporterId: user.id,
      itemId: data.itemId,
      reportedUserId: data.reportedUserId,
      reason: data.reason,
      description: data.description,
    },
  });
}

export async function getPendingReports() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) throw new Error("Unauthorized: Admin access required");

  return prisma.report.findMany({
    where: { status: "PENDING" },
    include: {
      reporter: { select: { id: true, firstName: true, lastName: true } },
      item: { select: { id: true, title: true, images: true } },
      reportedUser: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function resolveReport(reportId: string) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) throw new Error("Unauthorized: Admin access required");

  return prisma.report.update({
    where: { id: reportId },
    data: { status: "RESOLVED", reviewedAt: new Date() },
  });
}

export async function dismissReport(reportId: string) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) throw new Error("Unauthorized: Admin access required");

  return prisma.report.update({
    where: { id: reportId },
    data: { status: "DISMISSED", reviewedAt: new Date() },
  });
}
