"use client";

import { useState, useMemo } from "react";
import { ItemCard } from "@/components/ItemCard";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/Select";
import { items, categories, conditions } from "@/lib/mock-data";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sort, setSort] = useState("newest");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => item.status === "active");

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.sellerName.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    if (condition !== "all") {
      result = result.filter((item) => item.condition === condition);
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, category, condition, sort]);

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Marketplace
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Find great deals from fellow students
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search items, sellers..."
        />

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[140px]">
            <Select value={category} onChange={setCategory} options={categories} />
          </div>
          <div className="flex-1 min-w-[140px]">
            <Select value={condition} onChange={setCondition} options={conditions} />
          </div>
          <div className="flex-1 min-w-[140px]">
            <Select value={sort} onChange={setSort} options={sortOptions} />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredItems.length} items found
        </p>
        {(search || category !== "all" || condition !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setCondition("all");
            }}
            className="text-sm text-red-800 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-black dark:text-white">
            No items found
          </p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
