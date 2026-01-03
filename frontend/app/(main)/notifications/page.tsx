import { prisma } from "@/lib/prisma";
import { NotificationsList } from "./NotificationsList";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    where: { userId: CURRENT_USER_ID },
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
