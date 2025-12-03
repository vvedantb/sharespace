import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-black">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-5rem)] py-2">
        <div className="px-4 mx-10 bg-white dark:bg-neutral-900 rounded-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}
