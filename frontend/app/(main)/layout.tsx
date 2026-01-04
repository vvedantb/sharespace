import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <Navbar isAdmin={user?.isAdmin} />
      <main className="flex-1 mx-auto w-full overflow-hidden">
        <div className="mx-3 bg-white dark:bg-neutral-900 rounded-t-2xl h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
