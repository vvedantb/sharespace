import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    notifications.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      description: n.description,
      link: n.link,
      isRead: n.isRead,
      createdAt: n.createdAt,
    }))
  );
}
