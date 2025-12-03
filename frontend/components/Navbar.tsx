"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Switch } from "@heroui/react";
import { useThemeContext } from "./contexts/ThemeContext";
import { IconSun, IconMoon, IconX, IconMenu2 } from "@tabler/icons-react";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/upload", label: "Upload Item" },
  { href: "/messages", label: "Messages" },
  { href: "/students-nearby", label: "Students Nearby" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <nav className="sticky top-0 z-50 bg-neutral-200 dark:bg-black">
      <div className="md:mx-10 px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-red-800 dark:text-red-500"
          >
            ShareSpace
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-red-800 text-white dark:bg-red-700"
                    : "text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <div className="hidden md:flex md:items-center md:gap-2">
                <IconSun
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  stroke={2}
                />
                <Switch
                  isSelected={isDark}
                  onValueChange={toggleTheme}
                  size="sm"
                  color="danger"
                  aria-label="Toggle dark mode"
                />
                <IconMoon
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  stroke={2}
                />
              </div>
            )}

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
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 right-0 top-16 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-black md:hidden shadow-lg">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-red-800 text-white dark:bg-red-700"
                      : "text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {mounted && (
              <div className="border-t border-neutral-300 dark:border-neutral-800 px-4 py-3">
                <div className="flex items-center justify-between rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                    {isDark ? (
                      <>
                        <IconMoon className="h-5 w-5" stroke={2} />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <IconSun className="h-5 w-5" stroke={2} />
                        Light Mode
                      </>
                    )}
                  </div>
                  <Switch
                    isSelected={isDark}
                    onValueChange={toggleTheme}
                    size="sm"
                    color="danger"
                    aria-label="Toggle dark mode"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
