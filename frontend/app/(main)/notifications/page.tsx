import { serverApi } from "@/lib/api-server";
import { NotificationsList } from "./NotificationsList";

export default async function NotificationsPage() {
  const notifications = await serverApi.notifications.list();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Notifications
      </h1>
      <NotificationsList initialNotifications={notifications} />
    </div>
  );
}
