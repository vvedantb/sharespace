import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-neutral-200 dark:bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto py-2 w-full overflow-hidden">
        <div className="md:px-4 mx-3 md:mx-10 bg-white dark:bg-neutral-900 rounded-2xl h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
