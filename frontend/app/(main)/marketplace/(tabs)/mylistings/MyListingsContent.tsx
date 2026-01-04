"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input, Spinner } from "@heroui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ItemCard } from "@/components/ItemCard";
import { Item } from "@/lib/types";
import { getMyItems } from "@/lib/actions/items";

interface MyListingsContentProps {
  initialItems: Item[];
}

export function MyListingsContent({ initialItems }: MyListingsContentProps) {
  const [search, setSearch] = useState("");

  const { data: items = initialItems, isLoading } = useQuery({
    queryKey: ["myItems"],
    queryFn: getMyItems,
    initialData: initialItems,
  });

  const filteredItems = search
    ? items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <>
      <div className="mt-4">
        <Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search your listings..."
          startContent={<IconSearch className="h-5 w-5 text-default-400" stroke={2} />}
          endContent={
            search ? (
              <button onClick={() => setSearch("")} className="text-default-400 hover:text-default-600">
                <IconX className="h-4 w-4" stroke={2} />
              </button>
            ) : null
          }
          variant="bordered"
          radius="lg"
          classNames={{ inputWrapper: "bg-default-50" }}
        />
      </div>

      {isLoading ? (
        <div className="py-16 flex justify-center">
          <Spinner color="danger" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center text-default-500">
          {items.length === 0 ? "You haven't listed any items yet" : "No items match your search"}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
