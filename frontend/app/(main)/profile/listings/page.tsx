import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ListingsManager } from "./ListingsManager";

export default async function ProfileListingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const listings = await prisma.item.findMany({
    where: { sellerId: user.id },
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
    createdAt: dayjs(item.createdAt).toISOString(),
  }));

  return <ListingsManager initialListings={formattedListings} />;
}
