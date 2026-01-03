import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NotificationsList } from "./NotificationsList";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const formattedNotifications = notifications.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    description: n.description,
    link: n.link,
    isRead: n.isRead,
    createdAt: n.createdAt.toISOString(),
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Notifications
      </h1>
      <NotificationsList initialNotifications={formattedNotifications} />
    </div>
  );
}
