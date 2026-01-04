"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Chip, Spinner } from "@heroui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ItemCard } from "@/components/ItemCard";
import { categories } from "@/lib/constants";
import { Item } from "@/lib/types";
import { marketplaceSearchParams } from "../../searchParams";
import { getItems } from "@/lib/actions/items";

const allCategories = [{ value: "all", label: "All" }, ...categories];

interface BrowseContentProps {
  initialItems: Item[];
}

export function BrowseContent({ initialItems }: BrowseContentProps) {
  const [{ q, category }, setParams] = useQueryStates(marketplaceSearchParams);

  const { data: items = initialItems, isLoading } = useQuery({
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
        <Input
          value={q}
          onValueChange={(value) => setParams({ q: value || null })}
          placeholder="Search items..."
          startContent={<IconSearch className="h-5 w-5 text-default-400" stroke={2} />}
          endContent={
            q ? (
              <button onClick={() => setParams({ q: null })} className="text-default-400 hover:text-default-600">
                <IconX className="h-4 w-4" stroke={2} />
              </button>
            ) : null
          }
          variant="bordered"
          radius="lg"
          classNames={{ inputWrapper: "bg-default-50" }}
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {allCategories.map((cat) => (
          <Chip
            key={cat.value}
            onClick={() => setParams({ category: cat.value === "all" ? null : cat.value })}
            color={(category || "all") === cat.value ? "danger" : "default"}
            variant={(category || "all") === cat.value ? "solid" : "flat"}
            className="cursor-pointer shrink-0"
          >
            {cat.label}
          </Chip>
        ))}
      </div>

      {isLoading ? (
        <div className="py-16 flex justify-center">
          <Spinner color="danger" />
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center text-default-500">No items found</div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
