"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
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
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useLocalUser();

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 h-16">
        <Link href="/" className="font-bold text-xl">
          ShareSpace
        </Link>

        <div className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "font-bold" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <IconX /> : <IconMenu2 />}
        </button>
      </div>
    </nav>
  );
}
