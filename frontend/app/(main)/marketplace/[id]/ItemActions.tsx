"use client";

import { useState } from "react";
import Link from "next/link";
import { IconHeart, IconMessageCircle } from "@tabler/icons-react";
import { api } from "@/lib/api";

interface ItemActionsProps {
  itemId: string;
  sellerId: string;
}

export function ItemActions({ itemId, sellerId }: ItemActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    try {
      if (isSaved) {
        await api.items.unsave(itemId);
      } else {
        await api.items.save(itemId);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  return (
    <div className="mt-6 flex gap-3">
      <Link
        href={`/messages?user=${sellerId}`}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-800 py-3 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
      >
        <IconMessageCircle className="h-5 w-5" stroke={2} />
        Message
      </Link>
      <button
        onClick={handleSave}
        className={`rounded-xl border px-4 ${
          isSaved
            ? "border-red-800 text-red-800 dark:border-red-500 dark:text-red-500"
            : "border-gray-200 dark:border-neutral-700 text-gray-500"
        }`}
      >
        <IconHeart className="h-5 w-5" stroke={2} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
