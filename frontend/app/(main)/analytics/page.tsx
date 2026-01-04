import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSellerAnalytics } from "@/lib/actions/items";
import { AnalyticsContent } from "./AnalyticsContent";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [dbUser, sellerAnalytics, listings] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { isSeller: true },
    }),
    getSellerAnalytics().catch(() => null),
    prisma.item.findMany({
      where: { sellerId: user.id },
      select: { status: true },
    }),
  ]);

  const profileStats = {
    itemsListed: listings.length,
    itemsSold: listings.filter((i) => i.status === "SOLD").length,
  };

  return (
    <AnalyticsContent
      isSeller={dbUser?.isSeller ?? false}
      sellerAnalytics={sellerAnalytics}
      profileStats={profileStats}
    />
  );
}
