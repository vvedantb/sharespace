export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-black min-h-screen">
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
              <svg
                className="h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
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
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
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
                <svg
                  className="h-8 w-8 text-gray-300 dark:text-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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
