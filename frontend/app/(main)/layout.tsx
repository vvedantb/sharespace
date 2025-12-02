import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
