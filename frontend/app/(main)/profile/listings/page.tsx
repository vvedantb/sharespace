import { prisma } from "@/lib/prisma";
import { ListingsManager } from "./ListingsManager";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function ProfileListingsPage() {
  const listings = await prisma.item.findMany({
    where: { sellerId: CURRENT_USER_ID },
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedListings = listings.map((item) => ({
    id: item.id,
    sellerId: item.sellerId,
    sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
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
    createdAt: item.createdAt.toISOString(),
  }));

  return <ListingsManager initialListings={formattedListings} />;
}
