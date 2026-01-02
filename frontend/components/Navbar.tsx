"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Switch } from "@heroui/react";
import { useThemeContext } from "./contexts/ThemeContext";
import {
  IconSun,
  IconMoon,
  IconX,
  IconMenu2,
} from "@tabler/icons-react";
import { useLocalUser } from "@/lib/useLocalUser";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/questions", label: "Q&A" },
  { href: "/mentors", label: "Mentors" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ LOCAL AUTH (mocked for localhost)
  const { user, isLoggedIn, logout } = useLocalUser();

  const isDark = theme === "dark";

  return (
    <nav className="sticky top-0 z-50 bg-neutral-200 dark:bg-black">
      <div className="md:mx-10 px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-red-800 dark:text-red-500"
          >
            ShareSpace
          </Link>

          {/* Desktop Links */}
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

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle (desktop) */}
            {mounted && (
              <div className="hidden md:flex md:items-center md:gap-2">
                <IconSun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Switch
                  isSelected={isDark}
                  onValueChange={toggleTheme}
                  size="sm"
                  color="danger"
                />
                <IconMoon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            )}

            {/* Login / Logout (desktop) */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden md:block rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden md:block rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-800 md:hidden text-black dark:text-white"
            >
              {mobileMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute left-0 right-0 top-16 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-black shadow-lg md:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-red-800 text-white dark:bg-red-700"
                      : "text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Login / Logout (mobile) */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-700 hover:bg-neutral-300 dark:hover:bg-neutral-800"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Theme toggle (mobile) */}
            {mounted && (
              <div className="border-t border-neutral-300 dark:border-neutral-800 px-4 py-3">
                <div className="flex items-center justify-between rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                    {isDark ? (
                      <>
                        <IconMoon className="h-5 w-5" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <IconSun className="h-5 w-5" />
                        Light Mode
                      </>
                    )}
                  </div>
                  <Switch
                    isSelected={isDark}
                    onValueChange={toggleTheme}
                    size="sm"
                    color="danger"
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
