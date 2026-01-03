import Link from "next/link";
import { IconPhoto } from "@tabler/icons-react";
import { serverApi } from "@/lib/api-server";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import { ItemActions } from "./ItemActions";

const conditionLabels: Record<string, string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let item;
  try {
    item = await serverApi.items.get(id);
  } catch {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Item not found
        </h1>
        <Link
          href="/marketplace"
          className="mt-4 inline-block text-red-800 dark:text-red-500"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <BackButton />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
          {item.images && item.images.length > 0 ? (
            <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <IconPhoto className="h-20 w-20 text-gray-300 dark:text-neutral-700" stroke={1.5} />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {item.title}
          </h1>
          <p className="mt-2 text-3xl font-bold text-red-800 dark:text-red-500">
            £{item.price.toFixed(2)}
          </p>

          <div className="mt-4 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{conditionLabels[item.condition] || item.condition}</span>
            <span>·</span>
            <span>{item.university}</span>
          </div>

          <p className="mt-6 text-gray-600 dark:text-gray-300">
            {item.description}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-gray-100 dark:border-neutral-800 pt-6">
            <Avatar name={item.sellerName} size="md" />
            <div className="flex-1">
              <p className="font-medium text-black dark:text-white">
                {item.sellerName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.sellerRating ? `${item.sellerRating.toFixed(1)}★ rating` : "No rating yet"}
              </p>
            </div>
          </div>

          <ItemActions itemId={item.id} sellerId={item.sellerId} />
        </div>
      </div>
    </div>
  );
}
