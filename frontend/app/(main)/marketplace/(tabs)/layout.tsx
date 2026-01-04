import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPlatformSustainability } from "@/lib/actions/items";
import { SustainabilityBanner } from "@/components/SustainabilityBanner";
import { MarketplaceNav } from "./MarketplaceNav";

export default async function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  const [isSeller, sustainability] = await Promise.all([
    currentUser
      ? prisma.user.findUnique({ where: { id: currentUser.id }, select: { isSeller: true } }).then((u) => u?.isSeller ?? false)
      : false,
    getPlatformSustainability(),
  ]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">Marketplace</h1>
      <SustainabilityBanner stats={sustainability} />
      <MarketplaceNav isSeller={isSeller} />
      {children}
    </div>
  );
}
