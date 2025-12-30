import Link from "next/link";
import {
  IconMessage,
  IconShoppingBag,
  IconStar,
  IconBell,
} from "@tabler/icons-react";
import { notifications } from "@/lib/mock-data";
import { Notification } from "@/lib/types";

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "message":
      return <IconMessage className="h-5 w-5" stroke={1.5} />;
    case "sale":
      return <IconShoppingBag className="h-5 w-5" stroke={1.5} />;
    case "review":
      return <IconStar className="h-5 w-5" stroke={1.5} />;
    default:
      return <IconBell className="h-5 w-5" stroke={1.5} />;
  }
}

export default function NotificationsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No notifications
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.link || "#"}
              className={`flex items-start gap-3 rounded-xl p-4 transition-colors ${
                !notification.isRead
                  ? "bg-red-50 dark:bg-red-900/10"
                  : "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
              }`}
            >
              <div className="text-gray-400 dark:text-gray-500">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-black dark:text-white">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {notification.createdAt}
                </p>
              </div>
              {!notification.isRead && (
                <span className="h-2 w-2 rounded-full bg-red-800 dark:bg-red-500" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
