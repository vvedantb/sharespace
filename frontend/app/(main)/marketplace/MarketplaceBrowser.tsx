"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Chip, Spinner, Button, useDisclosure, Tabs, Tab } from "@heroui/react";
import { IconSearch, IconX, IconPlus, IconShoppingBag } from "@tabler/icons-react";
import { ItemCard } from "@/components/ItemCard";
import { categories } from "@/lib/constants";
import { Item } from "@/lib/types";
import { marketplaceSearchParams } from "./searchParams";
import { getItems, getMyItems } from "@/lib/actions/items";
import { CreateItemModal } from "./CreateItemModal";

const allCategories = [{ value: "all", label: "All" }, ...categories];

interface MarketplaceBrowserProps {
  initialItems: Item[];
  isSeller?: boolean;
}

export function MarketplaceBrowser({ initialItems, isSeller }: MarketplaceBrowserProps) {
  const [tab, setTab] = useState("browse");
  const [{ q, category }, setParams] = useQueryStates(marketplaceSearchParams);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: browseItems = initialItems, isLoading: browseLoading } = useQuery({
    queryKey: ["items", { q, category }],
    queryFn: () => getItems({
      search: q || undefined,
      category: category && category !== "all" ? category : undefined,
    }),
    enabled: tab === "browse" && !!(q || category),
    placeholderData: initialItems,
  });

  const { data: myItems = [], isLoading: myItemsLoading } = useQuery({
    queryKey: ["myItems"],
    queryFn: getMyItems,
    enabled: tab === "my-listings",
  });

  const items = tab === "browse" ? browseItems : myItems;
  const loading = tab === "browse" ? browseLoading : myItemsLoading;

  return (
    <>
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key.toString())}
        color="danger"
        variant="underlined"
        classNames={{ tabList: "mt-2" }}
      >
        <Tab key="browse" title="Browse" />
        <Tab key="my-listings" title="My Listings" />
      </Tabs>

      <div className="mt-4 flex gap-3">
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
        {isSeller ? (
          <Button
            color="danger"
            radius="lg"
            startContent={<IconPlus className="h-5 w-5" stroke={2} />}
            onPress={onOpen}
            className="shrink-0"
          >
            List Item
          </Button>
        ) : (
          <Button
            as={Link}
            href="/profile/seller"
            color="danger"
            radius="lg"
            startContent={<IconShoppingBag className="h-5 w-5" stroke={2} />}
            className="shrink-0"
          >
            Become a Seller
          </Button>
        )}
      </div>
      {isSeller && <CreateItemModal isOpen={isOpen} onOpenChange={onOpenChange} />}

      {tab === "browse" && (
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
      )}

      {loading ? (
        <div className="py-16 flex justify-center">
          <Spinner color="danger" />
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center text-default-500">
          {tab === "browse" ? "No items found" : "You haven't listed any items yet"}
        </div>
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
