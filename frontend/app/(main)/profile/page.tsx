"use client";

import { useState } from "react";
import Link from "next/link";
import { IconUser, IconSettings, IconPhoto, IconEdit, IconSchool } from "@tabler/icons-react";
import { currentUser, userListings, reviews } from "@/lib/mock-data";
import { Tabs } from "@/components/Tabs";
import { RatingStars } from "@/components/RatingStars";
import { Badge } from "@/components/Badge";
import { Avatar } from "@/components/Avatar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings");

  const tabs = [
    { id: "listings", label: "Listings", count: userListings.length },
    { id: "reviews", label: "Reviews", count: reviews.length },
  ];

  return (
    <div className="px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
            Profile
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your account and listings
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black">
        <div className="relative h-32 bg-gradient-to-r from-red-800 to-red-600 dark:from-red-900 dark:to-red-700">
          <div className="absolute -bottom-12 left-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white dark:border-black bg-gray-100 dark:bg-neutral-800 shadow-lg">
              <IconUser
                className="h-12 w-12 text-gray-400 dark:text-gray-500"
                stroke={1.5}
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                {currentUser.isVerified && <Badge variant="verified" size="sm" />}
                {currentUser.isMentor && <Badge variant="mentor" size="sm" />}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                @{currentUser.username}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {currentUser.university} • {currentUser.course} • Year {currentUser.yearOfStudy}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-lg">
                {currentUser.bio}
              </p>
              <div className="mt-2">
                <RatingStars rating={currentUser.rating} size="sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/profile/edit"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-black px-4 py-2 font-medium text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
              >
                <IconEdit className="h-4 w-4" stroke={2} />
                Edit Profile
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-black px-4 py-2 font-medium text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
              >
                <IconSettings className="h-4 w-4" stroke={2} />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                {currentUser.itemsListed}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Items Listed
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                {currentUser.itemsSold}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Items Sold
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                {currentUser.rating}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
            </div>
          </div>

          {!currentUser.isMentor && (
            <div className="mt-6 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                    <IconSchool className="h-5 w-5 text-purple-600 dark:text-purple-400" stroke={2} />
                  </div>
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-300">
                      Become a Mentor
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Help other students and build your reputation
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile/mentor"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === "listings" && (
            <div className="grid gap-4 md:grid-cols-2">
              {userListings.map((item) => (
                <Link key={item.id} href={`/marketplace/${item.id}`}>
                  <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-900">
                      <IconPhoto
                        className="h-8 w-8 text-gray-300 dark:text-neutral-700"
                        stroke={1.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-black dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Listed {item.createdAt}
                      </p>
                    </div>
                    <p className="font-bold text-red-800 dark:text-red-500">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
              {userListings.length === 0 && (
                <div className="col-span-2 py-8 text-center text-gray-500 dark:text-gray-400">
                  No listings yet
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={review.reviewerName} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-black dark:text-white">
                          {review.reviewerName}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {review.createdAt}
                        </span>
                      </div>
                      <RatingStars rating={review.rating} size="sm" showValue={false} />
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No reviews yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
