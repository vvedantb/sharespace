"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#marketplace", label: "Marketplace" },
  { href: "#mentors", label: "Mentors" },
  { href: "#questions", label: "Q&A" },
  { href: "#campus", label: "Campus" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/85 backdrop-blur-xl"
          : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <div className="rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <Logo priority />
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-red-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur-md md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <IconX className="h-5 w-5" stroke={1.75} />
          ) : (
            <IconMenu2 className="h-5 w-5" stroke={1.75} />
          )}
        </button>
      </div>

      {open && (
        <div className="mx-5 mt-2 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-center text-sm text-white/80 hover:bg-white/5"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-red-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
