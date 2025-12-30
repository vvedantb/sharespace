"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/marketplace");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to your ShareSpace account
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

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <IconLock
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                stroke={1.5}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black py-3 pl-10 pr-12 text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <IconEyeOff className="h-5 w-5" stroke={1.5} />
                ) : (
                  <IconEye className="h-5 w-5" stroke={1.5} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-red-800 focus:ring-red-800"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!email || !password || isLoading}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
