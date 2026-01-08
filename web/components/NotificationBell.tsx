"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Notification } from "@/lib/types";
import { markNotificationRead, markAllNotificationsRead } from "@/lib/actions/notifications";

dayjs.extend(relativeTime);

interface NotificationBellProps {
  notifications: Notification[];
  unreadCount: number;
}

export function NotificationBell({ notifications, unreadCount: initialUnreadCount }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleMarkAllRead() {
    await markAllNotificationsRead();
    setUnreadCount(0);
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  async function handleNotificationClick(notification: Notification) {
    if (!notification.isRead) {
      await markNotificationRead(notification.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setLocalNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
      );
    }
    setIsOpen(false);
  }

  const recentNotifications = localNotifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 transition-colors text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
        aria-label="Notifications"
      >
        <IconBell className="h-6 w-6" stroke={2} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-default-50">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-danger hover:text-danger-600"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-default-500">No notifications</p>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`cursor-pointer px-4 py-3 transition-colors hover:bg-default-100 ${
                    !notification.isRead ? "bg-danger-50 dark:bg-danger-900/20" : ""
                  }`}
                >
                  {notification.link ? (
                    <Link href={notification.link} className="block">
                      <div className="flex items-start gap-3">
                        {!notification.isRead && (
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-danger" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{notification.title}</p>
                          {notification.description && (
                            <p className="text-sm text-default-500 line-clamp-2">
                              {notification.description}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-default-400">
                            {dayjs(notification.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-3">
                      {!notification.isRead && (
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-danger" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{notification.title}</p>
                        {notification.description && (
                          <p className="text-sm text-default-500 line-clamp-2">
                            {notification.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-default-400">
                          {dayjs(notification.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="block bg-default-50 px-4 py-3 text-center text-sm font-medium text-danger hover:text-danger-600"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
