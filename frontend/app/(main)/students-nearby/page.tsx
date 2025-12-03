import {
  IconMapPin,
  IconClock,
  IconUsersGroup,
  IconArrowsExchange,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function StudentsNearbyPage() {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Students Nearby
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Connect with students around your campus
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black">
        <div className="max-w-md px-4 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <IconMapPin
              className="h-12 w-12 text-red-800 dark:text-red-400"
              stroke={1.5}
            />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            Find students around your university
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Discover and connect with fellow students near you. Exchange items,
            form study groups, or just make new friends!
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <IconClock className="h-4 w-4 animate-pulse" stroke={2} />
            Proximity search coming soon
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <IconUsersGroup
              className="h-6 w-6 text-red-800 dark:text-red-400"
              stroke={2}
            />
          </div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Find Study Buddies
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connect with students taking the same courses
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <IconArrowsExchange
              className="h-6 w-6 text-red-800 dark:text-red-400"
              stroke={2}
            />
          </div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Easy Exchanges
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Meet up safely on campus to exchange items
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <IconShieldCheck
              className="h-6 w-6 text-red-800 dark:text-red-400"
              stroke={2}
            />
          </div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Verified Students
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Only verified university students can join
          </p>
        </div>
      </div>
    </div>
  );
}
