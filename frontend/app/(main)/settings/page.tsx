"use client";

import {
  IconChevronRight,
  IconMoon,
  IconBell,
  IconShield
} from "@tabler/icons-react";
import { Switch } from "@heroui/react";
import { useLocalUser } from "@/lib/useLocalUser";

export default function SettingsPage() {
  const { logout, deleteAccount } = useLocalUser();

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Settings
      </h1>

      {/* Appearance */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase">
          Appearance
        </h2>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <IconMoon size={18} />
            <span>Dark Mode</span>
          </div>
          <Switch />
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase">
          Notifications
        </h2>
        <div className="rounded-xl border divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <IconBell size={18} />
              <span>Email Notifications</span>
            </div>
            <Switch />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase">
          Security
        </h2>

        <div className="rounded-xl border divide-y">
          <button className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
            <span>Change Password</span>
            <IconChevronRight size={18} />
          </button>

          <button className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
            <span>Two-Factor Authentication</span>
            <IconChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Account Actions */}
      <section>
        <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase">
          Account
        </h2>

        <div className="rounded-xl border divide-y">
          <button
            onClick={logout}
            className="w-full text-left p-4 hover:bg-gray-50"
          >
            Sign Out
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete your account?")) {
                deleteAccount();
              }
            }}
            className="w-full text-left p-4 text-red-600 hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
