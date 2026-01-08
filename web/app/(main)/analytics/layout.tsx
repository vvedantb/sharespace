import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AnalyticsNav } from "./AnalyticsNav";

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isSeller: true },
  });

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      <AnalyticsNav isSeller={dbUser?.isSeller ?? false} />
      {children}
    </div>
  );
}
