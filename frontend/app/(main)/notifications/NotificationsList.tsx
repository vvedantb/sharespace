"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMessage, IconShoppingBag, IconStar, IconBell } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Notification } from "@/lib/types";

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "MESSAGE":
      return <IconMessage className="h-5 w-5" stroke={1.5} />;
    case "SALE":
      return <IconShoppingBag className="h-5 w-5" stroke={1.5} />;
    case "REVIEW":
      return <IconStar className="h-5 w-5" stroke={1.5} />;
    default:
      return <IconBell className="h-5 w-5" stroke={1.5} />;
  }
}

interface NotificationsListProps {
  initialNotifications: Notification[];
}

export function NotificationsList({ initialNotifications }: NotificationsListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/notifications/${id}/read`, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to mark notification as read");
    },
    onSuccess: (_, id) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    },
  });

  const handleMarkRead = (id: string) => markReadMutation.mutate(id);

  if (notifications.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-400">
        No notifications
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-2">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={notification.link || "#"}
          onClick={() => !notification.isRead && handleMarkRead(notification.id)}
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
  );
}
