"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { signIn } from "@/lib/cognito";
import { useAuth } from "@/components/contexts/AuthContext";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
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
      const session = await signIn(data.email, data.password);
      const idToken = session.getIdToken();
      const cognitoId = idToken.payload.sub;
      const accessToken = session.getAccessToken().getJwtToken();

      const userResponse = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userResponse.ok) {
        const firstName = (idToken.payload.given_name || data.email.split("@")[0]) as string;
        const lastName = (idToken.payload.family_name || "") as string;

        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cognitoId, email: data.email, firstName, lastName }),
        });
      }

      await refreshAuth();
      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">Welcome back</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to your ShareSpace account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder="Enter your password"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
