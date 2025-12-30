import Link from "next/link";
import { IconPhoto } from "@tabler/icons-react";
import { Item } from "@/lib/types";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/marketplace/${item.id}`}>
      <div className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black transition-all hover:border-gray-300 dark:hover:border-neutral-700">
        <div className="relative aspect-square bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
          <IconPhoto className="h-12 w-12 text-gray-300 dark:text-neutral-700" stroke={1.5} />
          {item.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-sm font-medium text-white">Sold</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-black dark:text-white truncate text-sm">
            {item.title}
          </h3>
          <p className="mt-1 font-bold text-red-800 dark:text-red-500">
            £{item.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
