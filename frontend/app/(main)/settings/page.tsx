"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconBell,
  IconLock,
  IconPalette,
  IconTrash,
  IconLogout,
} from "@tabler/icons-react";
import { useThemeContext } from "@/components/contexts/ThemeContext";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
            <IconPalette className="h-5 w-5 text-gray-500 dark:text-gray-400" stroke={1.5} />
            <h2 className="font-semibold text-black dark:text-white">Appearance</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    theme === "dark" ? "bg-red-800" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                      theme === "dark" ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
            <IconBell className="h-5 w-5 text-gray-500 dark:text-gray-400" stroke={1.5} />
            <h2 className="font-semibold text-black dark:text-white">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates via email
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  emailNotifications ? "bg-red-800" : "bg-gray-300 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    emailNotifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified in your browser
                </p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  pushNotifications ? "bg-red-800" : "bg-gray-300 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    pushNotifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black dark:text-white">Message Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified for new messages
                </p>
              </div>
              <button
                onClick={() => setMessageNotifications(!messageNotifications)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  messageNotifications ? "bg-red-800" : "bg-gray-300 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    messageNotifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
            <IconLock className="h-5 w-5 text-gray-500 dark:text-gray-400" stroke={1.5} />
            <h2 className="font-semibold text-black dark:text-white">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-between rounded-xl border border-gray-200 dark:border-neutral-700 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
              <span className="font-medium text-black dark:text-white">Change Password</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between rounded-xl border border-gray-200 dark:border-neutral-700 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
              <span className="font-medium text-black dark:text-white">Two-Factor Authentication</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center gap-3 rounded-xl border border-gray-200 dark:border-neutral-700 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
              <IconLogout className="h-5 w-5 text-gray-500" stroke={1.5} />
              <span className="font-medium text-black dark:text-white">Sign Out</span>
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl border border-red-200 dark:border-red-900 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <IconTrash className="h-5 w-5 text-red-600" stroke={1.5} />
              <span className="font-medium text-red-600">Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
