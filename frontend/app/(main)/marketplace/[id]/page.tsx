import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ItemDetail } from "./ItemDetail";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: { seller: true },
  });

  if (!item) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-foreground">Item not found</h1>
        <Link href="/marketplace" className="mt-4 inline-block text-danger">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <ItemDetail
      item={{
        id: item.id,
        title: item.title,
        description: item.description,
        price: Number(item.price),
        condition: item.condition,
        university: item.university,
        images: item.images,
        sellerId: item.sellerId,
        sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      }}
    />
  );
}
