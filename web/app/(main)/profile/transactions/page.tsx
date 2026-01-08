import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { TransactionsContent } from "./TransactionsContent";

export default async function TransactionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [purchases, sales] = await Promise.all([
    prisma.item.findMany({
      where: { buyerId: user.id, status: "SOLD" },
      include: { seller: true },
      orderBy: { soldAt: "desc" },
    }),
    prisma.item.findMany({
      where: { sellerId: user.id, status: "SOLD" },
      include: { buyer: true },
      orderBy: { soldAt: "desc" },
    }),
  ]);

  const formattedPurchases = purchases.map((item) => ({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    image: item.images[0] ?? null,
    otherPartyId: item.sellerId,
    otherPartyName: `${item.seller.firstName} ${item.seller.lastName}`,
    soldAt: item.soldAt ? dayjs(item.soldAt).toISOString() : null,
  }));

  const formattedSales = sales.map((item) => ({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    image: item.images[0] ?? null,
    otherPartyId: item.buyerId,
    otherPartyName: item.buyer ? `${item.buyer.firstName} ${item.buyer.lastName}` : "Unknown",
    soldAt: item.soldAt ? dayjs(item.soldAt).toISOString() : null,
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
      <TransactionsContent purchases={formattedPurchases} sales={formattedSales} />
    </div>
  );
}
