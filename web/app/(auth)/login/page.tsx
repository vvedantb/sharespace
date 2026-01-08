"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@heroui/react";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { signIn } from "@/lib/cognito";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-2 text-default-500">
          Sign in to continue to ShareSpace
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          {...register("email")}
          type="email"
          label="University Email"
          placeholder="you@university.ac.uk"
          startContent={<IconMail className="h-5 w-5 text-default-400" stroke={1.5} />}
          variant="bordered"
          radius="lg"
          size="lg"
          classNames={{
            inputWrapper: "bg-default-50 dark:bg-neutral-800",
          }}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          startContent={<IconLock className="h-5 w-5 text-default-400" stroke={1.5} />}
          endContent={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-default-400 hover:text-default-600"
            >
              {showPassword ? <IconEyeOff className="h-5 w-5" stroke={1.5} /> : <IconEye className="h-5 w-5" stroke={1.5} />}
            </button>
          }
          variant="bordered"
          radius="lg"
          size="lg"
          classNames={{
            inputWrapper: "bg-default-50 dark:bg-neutral-800",
          }}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <Button
          type="submit"
          color="danger"
          radius="lg"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="font-semibold"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-8 text-center text-default-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-danger hover:text-danger-600">
          Create one
        </Link>
      </p>
    </div>
  );
}
