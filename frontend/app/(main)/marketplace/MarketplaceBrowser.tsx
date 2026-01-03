"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { ItemCard } from "@/components/ItemCard";
import { SearchInput } from "@/components/SearchInput";
import { categories } from "@/lib/constants";
import { Item } from "@/lib/types";
import { marketplaceSearchParams } from "./searchParams";
import { getItems } from "@/lib/actions/items";

const allCategories = [{ value: "all", label: "All" }, ...categories];

interface MarketplaceBrowserProps {
  initialItems: Item[];
}

export function MarketplaceBrowser({ initialItems }: MarketplaceBrowserProps) {
  const [{ q, category }, setParams] = useQueryStates(marketplaceSearchParams);

  const { data: items = initialItems, isLoading: loading } = useQuery({
    queryKey: ["items", { q, category }],
    queryFn: () => getItems({
      search: q || undefined,
      category: category && category !== "all" ? category : undefined,
    }),
    enabled: !!(q || category),
    placeholderData: initialItems,
  });

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
