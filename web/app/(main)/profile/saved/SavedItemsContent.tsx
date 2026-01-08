"use client";

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { ItemCard } from "@/components/ItemCard";
import { Item } from "@/lib/types";
import { getSavedItems } from "@/lib/actions/items";

interface SavedItemsContentProps {
  initialItems: Item[];
}

export function SavedItemsContent({ initialItems }: SavedItemsContentProps) {
  const { data: items = initialItems, isLoading } = useQuery({
    queryKey: ["savedItems"],
    queryFn: getSavedItems,
    initialData: initialItems,
  });

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <Spinner color="danger" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-default-500">
        No saved items yet. Browse the marketplace and save items you like!
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
