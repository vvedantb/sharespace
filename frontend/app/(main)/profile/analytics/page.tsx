import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSellerAnalytics } from "@/lib/actions/items";
import { AnalyticsContent } from "./AnalyticsContent";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isSeller: true },
  });

  if (!dbUser?.isSeller) redirect("/profile");

  const analytics = await getSellerAnalytics();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Seller Analytics</h1>
      <AnalyticsContent analytics={analytics} />
    </div>
  );
}
