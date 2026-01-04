"use client";

import { ItemCard } from "@/components/ItemCard";
import { Item } from "@/lib/types";

interface SimilarItemsProps {
  items: Item[];
}

export function SimilarItems({ items }: SimilarItemsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12 border-t border-default-200 pt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">You may also like</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
