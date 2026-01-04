import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isAdmin) {
    redirect("/marketplace");
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/marketplace" className="text-lg font-bold text-danger">
              ShareSpace
            </Link>
            <span className="rounded bg-danger-100 px-2 py-1 text-xs font-medium text-danger-700">
              Admin
            </span>
          </div>
          <nav className="flex gap-4">
            <Link
              href="/admin/mentor-applications"
              className="text-sm text-default-600 hover:text-foreground"
            >
              Mentor Applications
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
