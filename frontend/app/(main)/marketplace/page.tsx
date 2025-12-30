"use client";

import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { ItemCard } from "@/components/ItemCard";
import { SearchInput } from "@/components/SearchInput";
import { items, categories } from "@/lib/mock-data";
import { marketplaceSearchParams } from "./searchParams";

export default function MarketplacePage() {
  const [{ q, category }, setParams] = useQueryStates(marketplaceSearchParams);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => item.status === "active");

    if (q) {
      const searchLower = q.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    return result;
  }, [q, category]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Marketplace
      </h1>

      <div className="mt-4">
        <SearchInput
          value={q}
          onChange={(value) => setParams({ q: value || null })}
          placeholder="Search items..."
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setParams({ category: cat.value === "all" ? null : cat.value })}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              category === cat.value
                ? "bg-red-800 text-white dark:bg-red-700"
                : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No items found
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
