import Link from "next/link";
import { IconRecycle, IconUsers, IconShieldCheck } from "@tabler/icons-react";

const features = [
  { icon: IconRecycle, text: "Buy & sell sustainably with fellow students" },
  { icon: IconUsers, text: "Connect with mentors who've been there" },
  { icon: IconShieldCheck, text: "Verified university community only" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-900 via-red-900/40 to-red-950 p-12 flex-col justify-between">
        <Link
          href="/"
          className="font-instrumentSerif text-3xl italic tracking-tight text-white"
        >
          ShareSpace
        </Link>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your campus marketplace
              <br />
              <span className="text-red-300">reimagined.</span>
            </h2>
            <p className="mt-4 text-lg text-red-200">
              Join thousands of students buying, selling, and connecting on
              campus.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="rounded-full bg-white/10 p-3">
                  <feature.icon className="h-6 w-6 text-white" stroke={1.5} />
                </div>
                <p className="text-white/90">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-red-300">Sustainable student commerce</p>
      </div>

      <div className="flex-1 bg-white dark:bg-neutral-900 flex flex-col">
        <div className="md:hidden p-6 border-b border-neutral-200 dark:border-neutral-800">
          <Link
            href="/"
            className="font-instrumentSerif text-2xl italic tracking-tight text-red-800 dark:text-red-500"
          >
            ShareSpace
          </Link>
        </div>

        <main className="flex-1 flex items-center justify-center p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
