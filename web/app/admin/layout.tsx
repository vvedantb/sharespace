import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminNavbar } from "@/components/AdminNavbar";

export const dynamic = "force-dynamic";

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
    <div className="h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <AdminNavbar />
      <main className="flex-1 mx-auto w-full max-w-5xl overflow-hidden">
        <div className="mx-3 bg-white dark:bg-neutral-900 rounded-t-2xl h-full overflow-y-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
