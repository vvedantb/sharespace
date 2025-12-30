import Link from "next/link";
import { IconPhoto, IconHeart, IconEye } from "@tabler/icons-react";
import { Item } from "@/lib/types";
import { Badge } from "./Badge";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const conditionLabels = {
    new: "New",
    "like-new": "Like New",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
  };

  return (
    <Link href={`/marketplace/${item.id}`}>
      <div className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
          <IconPhoto className="h-16 w-16 text-gray-300 dark:text-neutral-700" stroke={1.5} />
          {item.isMentorRecommended && (
            <div className="absolute top-2 left-2">
              <Badge variant="recommended" size="sm" />
            </div>
          )}
          {item.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="sold" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-black dark:text-white truncate flex-1">
              {item.title}
            </h3>
            <span className="shrink-0 rounded-full bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
              {conditionLabels[item.condition]}
            </span>
          </div>
          <p className="mt-1 text-lg font-bold text-red-800 dark:text-red-500">
            £{item.price.toFixed(2)}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>{item.sellerName}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <IconEye className="h-3 w-3" stroke={1.5} />
                {item.views}
              </span>
              <span className="flex items-center gap-0.5">
                <IconHeart className="h-3 w-3" stroke={1.5} />
                {item.saves}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
