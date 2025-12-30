import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <nav className="border-b border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-black">
        <div className="px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-red-800 dark:text-red-500"
          >
            ShareSpace
          </Link>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
