"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody } from "@heroui/react";
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
      <Card>
        <CardBody className="flex flex-col items-center justify-center py-16">
          <IconBell className="h-12 w-12 text-neutral-400 mb-4" stroke={1.5} />
          <p className="text-neutral-500">No notifications yet</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<IconCheck className="h-4 w-4" />}
            onPress={handleMarkAllRead}
          >
            Mark all as read
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.isRead ? "" : "border-l-4 border-l-red-600"}
          >
            <CardBody className="flex flex-row items-start gap-4">
              <div className="flex-1">
                {notification.link ? (
                  <Link href={notification.link} onClick={() => handleMarkRead(notification.id)}>
                    <h3 className="font-semibold text-black dark:text-white hover:text-red-600">
                      {notification.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-semibold text-black dark:text-white">
                    {notification.title}
                  </h3>
                )}
                {notification.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {notification.description}
                  </p>
                )}
                <p className="text-xs text-neutral-500 mt-2">
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
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
