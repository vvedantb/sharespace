import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { BrowseContent } from "./BrowseContent";

export default async function BrowsePage() {
  const items = await prisma.item.findMany({
    where: { status: "ACTIVE" },
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

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

  return <BrowseContent initialItems={formattedItems} />;
}
