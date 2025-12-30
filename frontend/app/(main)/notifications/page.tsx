"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconMessage,
  IconShoppingBag,
  IconStar,
  IconQuestionMark,
  IconMessageCircle,
  IconThumbUp,
  IconCheck,
  IconBell,
} from "@tabler/icons-react";
import { notifications } from "@/lib/mock-data";
import { Notification } from "@/lib/types";

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <IconMessage className="h-5 w-5" stroke={1.5} />;
      case "sale":
        return <IconShoppingBag className="h-5 w-5" stroke={1.5} />;
      case "review":
        return <IconStar className="h-5 w-5" stroke={1.5} />;
      case "question":
        return <IconQuestionMark className="h-5 w-5" stroke={1.5} />;
      case "answer":
        return <IconMessageCircle className="h-5 w-5" stroke={1.5} />;
      case "endorsement":
        return <IconThumbUp className="h-5 w-5" stroke={1.5} />;
      default:
        return <IconBell className="h-5 w-5" stroke={1.5} />;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "sale":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "review":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
      case "question":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "answer":
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
      case "endorsement":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
            Notifications
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Stay updated on your activity
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20 transition-colors"
          >
            <IconCheck className="h-4 w-4" stroke={2} />
            Mark all read
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black">
        {notificationList.length === 0 ? (
          <div className="py-12 text-center">
            <IconBell className="mx-auto h-12 w-12 text-gray-300 dark:text-neutral-700" stroke={1.5} />
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {notificationList.map((notification) => (
              <Link
                key={notification.id}
                href={notification.link || "#"}
                className={`flex items-start gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900 ${
                  !notification.isRead ? "bg-red-50/50 dark:bg-red-900/10" : ""
                }`}
              >
                <div className={`rounded-full p-2.5 ${getIconColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-black dark:text-white">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-red-800 dark:bg-red-500" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                    {notification.description}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {notification.createdAt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
