"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconHeart,
  IconMessageCircle,
  IconPhoto,
} from "@tabler/icons-react";
import { items } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import { useState } from "react";

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Item not found
        </h1>
        <Link
          href="/marketplace"
          className="mt-4 inline-block text-red-800 dark:text-red-500"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const conditionLabels = {
    new: "New",
    "like-new": "Like New",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
  };

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="h-4 w-4" stroke={2} />
        Back
      </button>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
          <IconPhoto className="h-20 w-20 text-gray-300 dark:text-neutral-700" stroke={1.5} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {item.title}
          </h1>
          <p className="mt-2 text-3xl font-bold text-red-800 dark:text-red-500">
            £{item.price.toFixed(2)}
          </p>

          <div className="mt-4 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{conditionLabels[item.condition]}</span>
            <span>·</span>
            <span>{item.university}</span>
          </div>

          <p className="mt-6 text-gray-600 dark:text-gray-300">
            {item.description}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-gray-100 dark:border-neutral-800 pt-6">
            <Avatar name={item.sellerName} size="md" />
            <div className="flex-1">
              <p className="font-medium text-black dark:text-white">
                {item.sellerName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.sellerRating}★ rating
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/messages?user=${item.sellerId}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-800 py-3 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
            >
              <IconMessageCircle className="h-5 w-5" stroke={2} />
              Message
            </Link>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`rounded-xl border px-4 ${
                isSaved
                  ? "border-red-800 text-red-800 dark:border-red-500 dark:text-red-500"
                  : "border-gray-200 dark:border-neutral-700 text-gray-500"
              }`}
            >
              <IconHeart className="h-5 w-5" stroke={2} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
