import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full overflow-hidden">
        <div className="mx-3 bg-white dark:bg-neutral-900 rounded-t-2xl h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
