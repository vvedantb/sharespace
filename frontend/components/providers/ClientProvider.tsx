"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Only if using TypeScript
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
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider>
          <AuthProvider>
            <HeroUIProvider
              disableAnimation={true}
              skipFramerMotionAnimations={false}
              navigate={router.push}
            >
              <ToastProvider placement="top-center" />
              {children}
            </HeroUIProvider>
          </AuthProvider>
        </ThemeProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
