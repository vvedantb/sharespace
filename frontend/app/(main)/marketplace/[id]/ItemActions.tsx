"use client";

import { useState } from "react";
import Link from "next/link";
import { IconHeart, IconMessageCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { saveItem, unsaveItem } from "@/lib/actions/items";

interface ItemActionsProps {
  itemId: string;
  sellerId: string;
}

export function ItemActions({ itemId, sellerId }: ItemActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: (saved: boolean) => saved ? unsaveItem(itemId) : saveItem(itemId),
    onSuccess: () => setIsSaved(!isSaved),
  });

  const handleSave = () => saveMutation.mutate(isSaved);

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
