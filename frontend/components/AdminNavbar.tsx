"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconUsers, IconHome } from "@tabler/icons-react";

const adminLinks = [
  { href: "/admin/mentor-applications", label: "Mentor Applications", icon: IconUsers },
];

export function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/marketplace" className="text-xl font-bold text-danger">
              ShareSpace
            </Link>
            <span className="rounded bg-danger-100 px-2 py-1 text-xs font-medium text-danger-700 dark:bg-danger-900/30 dark:text-danger-400">
              Admin
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-danger text-white"
                    : "text-default-600 hover:bg-default-100 hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" stroke={2} />
                {link.label}
              </Link>
            ))}
            <div className="mx-2 h-6 w-px bg-default-200" />
            <Link
              href="/marketplace"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-default-600 hover:bg-default-100 hover:text-foreground transition-colors"
            >
              <IconHome className="h-4 w-4" stroke={2} />
              Back to App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
