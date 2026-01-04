"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Chip, Spinner, Select, SelectItem, Button } from "@heroui/react";
import { IconSearch, IconX, IconFilter, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ItemCard } from "@/components/ItemCard";
import { categories } from "@/lib/constants";
import { Item } from "@/lib/types";
import { marketplaceSearchParams } from "../../searchParams";
import { getItems } from "@/lib/actions/items";

const allCategories = [{ value: "all", label: "All" }, ...categories];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

interface BrowseContentProps {
  initialItems: Item[];
}

export function BrowseContent({ initialItems }: BrowseContentProps) {
  const [{ q, category, minPrice, maxPrice, courseCode, sortBy }, setParams] = useQueryStates(marketplaceSearchParams);
  const [showFilters, setShowFilters] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || "");
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || "");
  const [localCourseCode, setLocalCourseCode] = useState(courseCode || "");

  const { data: items = initialItems, isLoading } = useQuery({
    queryKey: ["items", { q, category, minPrice, maxPrice, courseCode, sortBy }],
    queryFn: () => getItems({
      search: q || undefined,
      category: category && category !== "all" ? category : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      courseCode: courseCode || undefined,
      sortBy: sortBy || undefined,
    }),
    enabled: !!(q || category || minPrice || maxPrice || courseCode || sortBy !== "newest"),
    placeholderData: initialItems,
  });

  function applyFilters() {
    setParams({
      minPrice: localMinPrice ? parseFloat(localMinPrice) : null,
      maxPrice: localMaxPrice ? parseFloat(localMaxPrice) : null,
      courseCode: localCourseCode || null,
    });
  }

  function clearFilters() {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setLocalCourseCode("");
    setParams({ minPrice: null, maxPrice: null, courseCode: null });
  }

  const hasActiveFilters = minPrice || maxPrice || courseCode;

  return (
    <>
      <div className="mt-4 flex gap-2">
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
          className="flex-1"
        />
        <Button
          variant={showFilters || hasActiveFilters ? "solid" : "bordered"}
          color={hasActiveFilters ? "danger" : "default"}
          onPress={() => setShowFilters(!showFilters)}
          startContent={<IconFilter className="h-4 w-4" />}
          endContent={showFilters ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}
        >
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-default-50 rounded-lg border border-default-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Min Price</label>
              <Input
                type="number"
                placeholder="0"
                value={localMinPrice}
                onValueChange={setLocalMinPrice}
                startContent={<span className="text-default-400">£</span>}
                variant="bordered"
                size="sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Max Price</label>
              <Input
                type="number"
                placeholder="Any"
                value={localMaxPrice}
                onValueChange={setLocalMaxPrice}
                startContent={<span className="text-default-400">£</span>}
                variant="bordered"
                size="sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Course Code</label>
              <Input
                placeholder="e.g. CS101"
                value={localCourseCode}
                onValueChange={setLocalCourseCode}
                variant="bordered"
                size="sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Sort By</label>
              <Select
                selectedKeys={[sortBy || "newest"]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0]?.toString();
                  setParams({ sortBy: value === "newest" ? null : value });
                }}
                variant="bordered"
                size="sm"
              >
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value}>{opt.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            {hasActiveFilters && (
              <Button variant="light" size="sm" onPress={clearFilters}>
                Clear Filters
              </Button>
            )}
            <Button color="danger" size="sm" onPress={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

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
