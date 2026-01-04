import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminNavbar } from "@/components/AdminNavbar";

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
      <AdminNavbar />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
