import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/components/providers/ClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "ShareSpace - Student Exchange & Networking",
  description:
    "A student-only platform for exchanging items and connecting with peers",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} font-instrumentSans antialiased`}
      >
        <ClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ClientProvider>
      </body>
    </html>
  );
}
