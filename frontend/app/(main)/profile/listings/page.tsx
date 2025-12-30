"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconPhoto, IconEdit, IconTrash, IconEye, IconHeart } from "@tabler/icons-react";
import { userListings } from "@/lib/mock-data";
import { Tabs } from "@/components/Tabs";
import { Badge } from "@/components/Badge";

export default function ProfileListingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");

  const activeListings = userListings.filter((item) => item.status === "active");
  const soldListings = userListings.filter((item) => item.status === "sold");

  const tabs = [
    { id: "active", label: "Active", count: activeListings.length },
    { id: "sold", label: "Sold", count: soldListings.length },
  ];

  const listings = activeTab === "active" ? activeListings : soldListings;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

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
        {listings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No {activeTab} listings
            </p>
          </div>
        ) : (
          listings.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-900">
                <IconPhoto className="h-10 w-10 text-gray-300 dark:text-neutral-700" stroke={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-black dark:text-white truncate">
                    {item.title}
                  </h3>
                  {item.isMentorRecommended && <Badge variant="recommended" size="sm" />}
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
                <button className="rounded-lg border border-red-200 dark:border-red-800 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
