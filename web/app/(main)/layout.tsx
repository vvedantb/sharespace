import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { getNotifications, getUnreadCount } from "@/lib/actions/notifications";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const [notifications, unreadCount] = await Promise.all([
    getNotifications(),
    getUnreadCount(),
  ]);

  return (
    <div className="h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <Navbar isAdmin={user?.isAdmin} notifications={notifications} unreadCount={unreadCount} />
      <main className="flex-1 mx-auto w-full overflow-hidden">
        <div className="mx-3 bg-white dark:bg-neutral-900 rounded-t-2xl h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
