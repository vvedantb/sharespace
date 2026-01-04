"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Card, CardBody } from "@heroui/react";
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
    <div className="w-full max-w-md">
      <Card className="border border-default-200 shadow-lg" shadow="none">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-2 text-default-500">
              Sign in to your ShareSpace account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-danger-50 text-danger text-sm">
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
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            <Button
              type="submit"
              color="danger"
              radius="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-default-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-danger hover:text-danger-600">
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
