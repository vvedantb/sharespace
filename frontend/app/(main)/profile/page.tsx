import Link from "next/link";
import {
  IconUser,
  IconSettings,
  IconPhoto,
  IconChevronRight,
} from "@tabler/icons-react";
import { serverApi } from "@/lib/api-server";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function ProfilePage() {
  const user = await serverApi.users.get(CURRENT_USER_ID);
  const listings = await serverApi.users.getListings(CURRENT_USER_ID);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Profile
        </h1>
        <Link
          href="/settings"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <IconSettings className="h-5 w-5" stroke={1.5} />
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
          <IconUser
            className="h-8 w-8 text-gray-400 dark:text-gray-500"
            stroke={1.5}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-black dark:text-white">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.course} · Year {user.yearOfStudy}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <p className="text-xl font-bold text-black dark:text-white">
            {user.itemsListed}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Listed</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <p className="text-xl font-bold text-black dark:text-white">
            {user.itemsSold}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sold</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <p className="text-xl font-bold text-black dark:text-white">
            {user.rating ? user.rating.toFixed(1) : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Link
          href="/profile/edit"
          className="flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4"
        >
          <span className="font-medium text-black dark:text-white">
            Edit Profile
          </span>
          <IconChevronRight className="h-5 w-5 text-gray-400" stroke={1.5} />
        </Link>
        <Link
          href="/profile/listings"
          className="flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4"
        >
          <span className="font-medium text-black dark:text-white">
            My Listings
          </span>
          <IconChevronRight className="h-5 w-5 text-gray-400" stroke={1.5} />
        </Link>
        <Link
          href="/notifications"
          className="flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4"
        >
          <span className="font-medium text-black dark:text-white">
            Notifications
          </span>
          <IconChevronRight className="h-5 w-5 text-gray-400" stroke={1.5} />
        </Link>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">
            Recent Listings
          </h3>
          <Link
            href="/profile/listings"
            className="text-sm text-red-800 dark:text-red-500"
          >
            View all
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {listings.slice(0, 4).map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
                <div className="aspect-square bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <IconPhoto
                      className="h-8 w-8 text-gray-300 dark:text-neutral-700"
                      stroke={1.5}
                    />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-black dark:text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-red-800 dark:text-red-500">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
