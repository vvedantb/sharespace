"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconHeart,
  IconShare,
  IconMessageCircle,
  IconMapPin,
  IconCalendar,
  IconEye,
  IconPhoto,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { items } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { RatingStars } from "@/components/RatingStars";
import { useState } from "react";

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Item not found
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            This item may have been removed or doesn&apos;t exist.
          </p>
          <Link
            href="/marketplace"
            className="mt-4 inline-block rounded-xl bg-red-800 px-6 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Back to Marketplace
          </Link>
        </div>
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

  const categoryLabels = {
    textbooks: "Textbooks",
    electronics: "Electronics",
    furniture: "Furniture",
    clothing: "Clothing",
    notes: "Notes",
    other: "Other",
  };

  const mockImages = [1, 2, 3];

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-900">
            <div className="flex h-full items-center justify-center">
              <IconPhoto
                className="h-24 w-24 text-gray-300 dark:text-neutral-700"
                stroke={1.5}
              />
            </div>
            {item.isMentorRecommended && (
              <div className="absolute top-4 left-4">
                <Badge variant="recommended" />
              </div>
            )}
            {mockImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev === 0 ? mockImages.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/80 p-2 shadow-lg hover:bg-white dark:hover:bg-black"
                >
                  <IconChevronLeft className="h-5 w-5 text-black dark:text-white" stroke={2} />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev === mockImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/80 p-2 shadow-lg hover:bg-white dark:hover:bg-black"
                >
                  <IconChevronRight className="h-5 w-5 text-black dark:text-white" stroke={2} />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {mockImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                  currentImage === index
                    ? "border-red-800 dark:border-red-500"
                    : "border-transparent"
                }`}
              >
                <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-neutral-900">
                  <IconPhoto
                    className="h-8 w-8 text-gray-300 dark:text-neutral-700"
                    stroke={1.5}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                {item.title}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`rounded-xl border p-2 transition-colors ${
                    isSaved
                      ? "border-red-800 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-900/20 dark:text-red-500"
                      : "border-gray-200 dark:border-neutral-700 text-gray-500 hover:border-red-800 hover:text-red-800 dark:hover:border-red-500 dark:hover:text-red-500"
                  }`}
                >
                  <IconHeart className="h-5 w-5" stroke={2} fill={isSaved ? "currentColor" : "none"} />
                </button>
                <button className="rounded-xl border border-gray-200 dark:border-neutral-700 p-2 text-gray-500 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors">
                  <IconShare className="h-5 w-5" stroke={2} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold text-red-800 dark:text-red-500">
              £{item.price.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
              {categoryLabels[item.category]}
            </span>
            <span className="rounded-full bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
              {conditionLabels[item.condition]}
            </span>
            {item.courseCode && (
              <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-400">
                {item.courseCode}
              </span>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4">
            <h2 className="font-semibold text-black dark:text-white">Description</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <IconMapPin className="h-4 w-4" stroke={1.5} />
              {item.university}
            </span>
            <span className="flex items-center gap-1">
              <IconCalendar className="h-4 w-4" stroke={1.5} />
              Listed {item.createdAt}
            </span>
            <span className="flex items-center gap-1">
              <IconEye className="h-4 w-4" stroke={1.5} />
              {item.views} views
            </span>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={item.sellerName} size="lg" />
                <div>
                  <p className="font-semibold text-black dark:text-white">
                    {item.sellerName}
                  </p>
                  <RatingStars rating={item.sellerRating} size="sm" />
                </div>
              </div>
              <Link
                href={`/messages?user=${item.sellerId}`}
                className="rounded-xl bg-red-800 px-4 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <IconMessageCircle className="h-5 w-5" stroke={2} />
                  Message
                </span>
              </Link>
            </div>
          </div>

          <button className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 transition-colors">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
