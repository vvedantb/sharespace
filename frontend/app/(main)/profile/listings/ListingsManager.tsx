"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconPhoto,
  IconEdit,
  IconTrash,
  IconEye,
  IconHeart,
} from "@tabler/icons-react";
import { api } from "@/lib/api";
import { Item } from "@/lib/types";
import { Tabs } from "@/components/Tabs";
import { Badge } from "@/components/Badge";
import { BackButton } from "@/components/BackButton";
import Image from "next/image";

interface ListingsManagerProps {
  initialListings: Item[];
}

export function ListingsManager({ initialListings }: ListingsManagerProps) {
  const [listings, setListings] = useState(initialListings);
  const [activeTab, setActiveTab] = useState("active");

  const activeListings = listings.filter((item) => item.status === "active");
  const soldListings = listings.filter((item) => item.status === "sold");

  const tabs = [
    { id: "active", label: "Active", count: activeListings.length },
    { id: "sold", label: "Sold", count: soldListings.length },
  ];

  const displayedListings =
    activeTab === "active" ? activeListings : soldListings;

  const handleDelete = async (id: string) => {
    try {
      await api.items.delete(id);
      setListings(listings.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="px-4 py-8">
      <BackButton />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
            My Listings
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your items for sale
          </p>
        </div>
        <Link
          href="/upload"
          className="rounded-xl bg-red-800 px-4 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          + New Listing
        </Link>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6 space-y-4">
        {displayedListings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No {activeTab} listings
            </p>
          </div>
        ) : (
          displayedListings.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-900">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover rounded-xl"
                    width={80}
                    height={80}
                  />
                ) : (
                  <IconPhoto
                    className="h-10 w-10 text-gray-300 dark:text-neutral-700"
                    stroke={1.5}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-black dark:text-white truncate">
                    {item.title}
                  </h3>
                  {item.isMentorRecommended && (
                    <Badge variant="recommended" size="sm" />
                  )}
                </div>
                <p className="text-lg font-bold text-red-800 dark:text-red-500">
                  £{item.price.toFixed(2)}
                </p>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <IconEye className="h-4 w-4" stroke={1.5} />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconHeart className="h-4 w-4" stroke={1.5} />
                    {item.saves}
                  </span>
                  <span>Listed {item.createdAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/marketplace/${item.id}`}
                  className="rounded-lg border border-gray-200 dark:border-neutral-700 p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  <IconEye className="h-5 w-5" stroke={1.5} />
                </Link>
                <button className="rounded-lg border border-gray-200 dark:border-neutral-700 p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
                  <IconEdit className="h-5 w-5" stroke={1.5} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-red-200 dark:border-red-800 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <IconTrash className="h-5 w-5" stroke={1.5} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
