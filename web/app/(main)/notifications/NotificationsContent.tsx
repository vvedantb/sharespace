"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { IconBell, IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Notification } from "@/lib/types";
import { markNotificationRead, markAllNotificationsRead } from "@/lib/actions/notifications";

dayjs.extend(relativeTime);

interface NotificationsContentProps {
  notifications: Notification[];
}

export function NotificationsContent({ notifications: initialNotifications }: NotificationsContentProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkAllRead() {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  async function handleMarkRead(id: string) {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-neutral-900 p-16 flex flex-col items-center justify-center">
        <IconBell className="h-12 w-12 text-default-400 mb-4" stroke={1.5} />
        <p className="text-default-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="flat"
            color="danger"
            startContent={<IconCheck className="h-4 w-4" />}
            onPress={handleMarkAllRead}
          >
            Mark all as read
          </Button>
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`px-4 py-4 transition-colors hover:bg-default-100 ${
              !notification.isRead ? "bg-danger-50 dark:bg-danger-900/20" : ""
            } ${index !== notifications.length - 1 ? "border-b border-default-100" : ""}`}
          >
            <div className="flex items-start gap-3">
              {!notification.isRead && (
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-danger" />
              )}
              <div className="flex-1 min-w-0">
                {notification.link ? (
                  <Link href={notification.link} onClick={() => handleMarkRead(notification.id)}>
                    <h3 className="font-medium text-foreground hover:text-danger">
                      {notification.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-medium text-foreground">
                    {notification.title}
                  </h3>
                )}
                {notification.description && (
                  <p className="text-sm text-default-500 mt-1">
                    {notification.description}
                  </p>
                )}
                <p className="text-xs text-default-400 mt-2">
                  {dayjs(notification.createdAt).fromNow()}
                </p>
              </div>
              {!notification.isRead && (
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  onPress={() => handleMarkRead(notification.id)}
                  aria-label="Mark as read"
                >
                  <IconCheck className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
