"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { IconMail, IconLock, IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { signUp, signIn } from "@/lib/cognito";
import { createUser } from "@/lib/actions";

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
      await signUp(data.email, data.password, data.firstName, data.lastName);
      const session = await signIn(data.email, data.password);
      const cognitoId = session.getIdToken().payload.sub;

      await createUser({
        cognitoId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border border-default-200 shadow-lg">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="mt-2 text-default-500">
              Join your campus community on ShareSpace
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-danger-50 text-danger text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("firstName")}
                label="First Name"
                placeholder="John"
                startContent={<IconUser className="h-5 w-5 text-default-400" stroke={1.5} />}
                variant="bordered"
                radius="lg"
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
              <Input
                {...register("lastName")}
                label="Last Name"
                placeholder="Smith"
                variant="bordered"
                radius="lg"
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            </div>

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
              placeholder="Create a password"
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

            <Input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm your password"
              startContent={<IconLock className="h-5 w-5 text-default-400" stroke={1.5} />}
              variant="bordered"
              radius="lg"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              color="danger"
              radius="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-default-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-danger hover:text-danger-600">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
