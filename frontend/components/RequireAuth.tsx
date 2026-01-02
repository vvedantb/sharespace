"use client";

import { useLocalUser } from "@/lib/useLocalUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useLocalUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
};

export default RequireAuth;
