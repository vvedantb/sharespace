"use client";

import { useEffect } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCurrentSession } from "@/lib/cognito";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const queryClient = new QueryClient();

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    getCurrentSession();
    const interval = setInterval(() => {
      getCurrentSession();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider>
          <HeroUIProvider
            // disableAnimation={true}
            // skipFramerMotionAnimations={false}
            navigate={router.push}
          >
            <ToastProvider placement="top-center" />
            {children}
          </HeroUIProvider>
        </ThemeProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
