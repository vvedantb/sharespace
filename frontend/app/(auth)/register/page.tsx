"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMail, IconLock, IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { signUp, signIn } from "@/lib/cognito";
import { useAuth } from "@/components/contexts/AuthContext";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .refine(
        (email) => email.endsWith(".ac.uk") || email.endsWith(".edu"),
        "Must be a university email (.ac.uk or .edu)"
      ),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName);
      const session = await signIn(data.email, data.password);
      const cognitoId = session.getIdToken().payload.sub;

      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cognitoId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      });

      await refreshAuth();
      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">Create an account</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Join your campus community on ShareSpace
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                First Name
              </label>
              <div className="relative">
                <IconUser className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" stroke={1.5} />
                <input
                  {...register("firstName")}
                  placeholder="John"
                  className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20"
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Last Name
              </label>
              <input
                {...register("lastName")}
                placeholder="Smith"
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 px-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              University Email
            </label>
            <div className="relative">
              <IconMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" stroke={1.5} />
              <input
                {...register("email")}
                type="email"
                placeholder="you@university.ac.uk"
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <IconLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" stroke={1.5} />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-12 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <IconEyeOff className="h-5 w-5" stroke={1.5} /> : <IconEye className="h-5 w-5" stroke={1.5} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <IconLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" stroke={1.5} />
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`w-full rounded-xl border bg-white dark:bg-black py-3 pl-10 pr-4 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-neutral-700 focus:border-red-800 focus:ring-red-800/20"
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
