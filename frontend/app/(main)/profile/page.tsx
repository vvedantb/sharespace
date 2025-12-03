import { IconUser, IconSettings, IconPhoto } from "@tabler/icons-react";

export default function ProfilePage() {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Profile
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your account and listings
        </p>
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
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Student Name
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                @studentusername
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                University of Example • Computer Science
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-black px-4 py-2 font-medium text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900">
              <IconSettings className="h-4 w-4" stroke={2} />
              Settings
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                12
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Items Listed
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                8
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Items Sold
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
              <p className="text-3xl font-bold text-red-800 dark:text-red-500">
                4.9
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Your Listings
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-900">
                <IconPhoto
                  className="h-8 w-8 text-gray-300 dark:text-neutral-700"
                  stroke={1.5}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-black dark:text-white truncate">
                  Item Title {i}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Listed 3 days ago
                </p>
              </div>
              <p className="font-bold text-red-800 dark:text-red-500">
                £{i * 10}.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
