import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getNotifications } from "@/lib/actions/notifications";
import { NotificationsContent } from "./NotificationsContent";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const notifications = await getNotifications();

  return (
    <div className="flex h-full flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Notifications
      </h1>
      <NotificationsContent notifications={notifications} />
    </div>
  );
}
