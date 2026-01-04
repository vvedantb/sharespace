import { Suspense } from "react";
import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPlatformSustainability } from "@/lib/actions/items";
import { SustainabilityBanner } from "@/components/SustainabilityBanner";
import { MarketplaceBrowser } from "./MarketplaceBrowser";

export default async function MarketplacePage() {
  const currentUser = await getCurrentUser();

  const [items, isSeller, sustainability] = await Promise.all([
    prisma.item.findMany({
      where: { status: "ACTIVE" },
      include: { seller: true },
      orderBy: { createdAt: "desc" },
    }),
    currentUser
      ? prisma.user.findUnique({ where: { id: currentUser.id }, select: { isSeller: true } }).then((u) => u?.isSeller ?? false)
      : false,
    getPlatformSustainability(),
  ]);

  const formattedItems = items.map((item) => ({
    id: item.id,
    sellerId: item.sellerId,
    sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
    sellerRating: 0,
    title: item.title,
    description: item.description,
    price: Number(item.price),
    category: item.category,
    condition: item.condition,
    status: item.status,
    images: item.images,
    courseCode: item.courseCode,
    university: item.university,
    views: item.views,
    saves: item.saves,
    isMentorRecommended: item.isMentorRecommended,
    createdAt: dayjs(item.createdAt).toISOString(),
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Marketplace
      </h1>
      <SustainabilityBanner stats={sustainability} />
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">Loading...</div>
        }
      >
        <MarketplaceBrowser initialItems={formattedItems} isSeller={isSeller} />
      </Suspense>
    </div>
  );
}
