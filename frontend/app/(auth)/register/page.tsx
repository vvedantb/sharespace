"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconLock, IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = email.endsWith(".ac.uk") || email.endsWith(".edu");
  const passwordsMatch = password === confirmPassword;
  const isFormValid = firstName && lastName && email && password && confirmPassword && isValidEmail && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-email");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Create an account
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Join your campus community on ShareSpace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                First Name
              </label>
              <div className="relative">
                <IconUser
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  stroke={1.5}
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black py-3 px-4 text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600"
              />
            </div>
          </div>

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
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  email && !isValidEmail
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20 dark:focus:border-red-600"
                }`}
              />
            </div>
            {email && !isValidEmail && (
              <p className="mt-1 text-xs text-red-500">
                Please use a valid university email (.ac.uk or .edu)
              </p>
            )}
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
                placeholder="Create a password"
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

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <IconLock
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                stroke={1.5}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  confirmPassword && !passwordsMatch
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20 dark:focus:border-red-600"
                }`}
              />
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
