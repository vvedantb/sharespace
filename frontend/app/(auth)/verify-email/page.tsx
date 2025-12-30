"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconCheck } from "@tabler/icons-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
  };

  if (isVerified) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <IconCheck className="h-8 w-8 text-green-600 dark:text-green-400" stroke={2} />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Email Verified!
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Your account has been successfully verified. You can now access all features.
          </p>
          <button
            onClick={() => router.push("/marketplace")}
            className="mt-6 w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Go to Marketplace
          </button>
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
            Verify your email
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            We&apos;ve sent a 6-digit code to your university email
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-center text-black dark:text-white">
              Enter verification code
            </label>
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-12 w-12 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black text-center text-xl font-semibold text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={code.some((d) => !d) || isLoading}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              className="font-medium text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
            >
              Resend
            </button>
          </p>
        </div>

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
