"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMail, IconCheck } from "@tabler/icons-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <IconCheck className="h-8 w-8 text-green-600 dark:text-green-400" stroke={2} />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Check your email
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            We&apos;ve sent password reset instructions to {email}
          </p>
          <Link
            href="/login"
            className="mt-6 block w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <IconMail className="h-8 w-8 text-red-800 dark:text-red-500" stroke={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Forgot password?
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              University Email
            </label>
            <div className="relative">
              <IconMail
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                stroke={1.5}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.ac.uk"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!email || isLoading}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-800">
          <Link
            href="/login"
            className="block text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
