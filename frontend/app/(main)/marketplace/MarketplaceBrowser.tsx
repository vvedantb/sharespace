"use client";

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { ItemCard } from "@/components/ItemCard";
import { SearchInput } from "@/components/SearchInput";
import { api, categories } from "@/lib/api";
import { Item } from "@/lib/types";
import { marketplaceSearchParams } from "./searchParams";

const allCategories = [{ value: "all", label: "All" }, ...categories];

interface MarketplaceBrowserProps {
  initialItems: Item[];
}

export function MarketplaceBrowser({ initialItems }: MarketplaceBrowserProps) {
  const [{ q, category }, setParams] = useQueryStates(marketplaceSearchParams);
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q && !category) {
      setItems(initialItems);
      return;
    }
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await api.items.list({
          category: category !== "all" ? category : undefined,
          search: q || undefined,
        });
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [q, category, initialItems]);

  return (
    <>
      <div className="mt-4">
        <SearchInput
          value={q}
          onChange={(value) => setParams({ q: value || null })}
          placeholder="Search items..."
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {allCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setParams({ category: cat.value === "all" ? null : cat.value })}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              (category || "all") === cat.value
                ? "bg-red-800 text-white dark:bg-red-700"
                : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No items found
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
