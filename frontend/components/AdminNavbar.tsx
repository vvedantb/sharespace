"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconUsers, IconHome, IconMenu2, IconX } from "@tabler/icons-react";

const adminLinks = [
  { href: "/admin/mentor-applications", label: "Mentor Applications", icon: IconUsers },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketplace" className="text-lg font-bold text-danger">
              ShareSpace
            </Link>
            <span className="rounded bg-danger-100 px-2 py-1 text-xs font-medium text-danger-700 dark:bg-danger-900/30 dark:text-danger-400">
              Admin
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-default-100 md:hidden text-default-600"
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
            className="fixed inset-0 top-14 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 right-0 top-14 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 md:hidden shadow-lg">
            <div className="space-y-1 px-4 py-3">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-danger text-white"
                      : "text-default-600 hover:bg-default-100 hover:text-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" stroke={2} />
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-default-200" />
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-default-600 hover:bg-default-100 hover:text-foreground transition-colors"
              >
                <IconHome className="h-5 w-5" stroke={2} />
                Back to App
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
