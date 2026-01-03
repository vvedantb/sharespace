"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
    >
      <IconArrowLeft className="h-4 w-4" stroke={2} />
      Back
    </button>
  );
}
