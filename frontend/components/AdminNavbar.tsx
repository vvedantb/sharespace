"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconUsers, IconHome, IconMenu2, IconX, IconFlag } from "@tabler/icons-react";

const adminLinks = [
  { href: "/admin/mentor-applications", label: "Mentor Applications", icon: IconUsers },
  { href: "/admin/reports", label: "Reports", icon: IconFlag },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-neutral-200 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketplace" className="text-2xl font-bold text-red-800 dark:text-red-500">
              ShareSpace
            </Link>
            <span className="rounded bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-400">
              Admin
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-red-800 text-white dark:bg-red-700"
                    : "text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <link.icon className="h-5 w-5" stroke={2} />
                {link.label}
              </Link>
            ))}
            <div className="mx-2 h-6 w-px bg-neutral-400 dark:bg-neutral-600" />
            <Link
              href="/marketplace"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconHome className="h-5 w-5" stroke={2} />
              Back to App
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-800 md:hidden text-black dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" stroke={2} />
            ) : (
              <IconMenu2 className="h-6 w-6" stroke={2} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 right-0 top-16 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-black md:hidden shadow-lg">
            <div className="px-4 py-3">
              <p className="px-4 py-1 text-xs font-medium text-neutral-500 uppercase">Admin</p>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-red-800 text-white dark:bg-red-700"
                      : "text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                >
                  <link.icon className="h-5 w-5" stroke={2} />
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-neutral-300 dark:bg-neutral-700" />
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors"
              >
                <IconHome className="h-5 w-5" stroke={2} />
                Back to App
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
