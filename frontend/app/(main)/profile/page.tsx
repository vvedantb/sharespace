"use client";
import Link from "next/link";
import { 
  IconUser, IconSettings, IconPhoto, IconChevronRight, 
  IconCertificate, IconBook, IconSchool, IconShieldCheck 
} from "@tabler/icons-react";
import { Chip } from "@heroui/react"; 
import { currentUser, userListings } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      {/* Top Navigation */}
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

      {/* Header Section */}
      <div className="mt-6 flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 shadow-sm">
          <IconUser className="h-10 w-10 text-gray-400 dark:text-gray-500" stroke={1.5} />
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-black dark:text-white truncate">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            
            {/* FEATURE: Verified Mentor Badge (Green) */}
            <Chip
              startContent={<IconCertificate size={16} />}
              variant="flat"
              size="md"
              className="pl-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800"
            >
              Verified Mentor
            </Chip>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {currentUser.course} · Year {currentUser.yearOfStudy}
          </p>

          {/* FEATURE: University Identity Verification */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
            <IconShieldCheck size={14} className="text-green-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Verified: Sharespace
            </span>
          </div>
        </div>
      </div>

      {/*  Stats Grid  */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {/* Listed */}
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <p className="text-xl font-bold text-black dark:text-white">
            {currentUser.itemsListed}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Listed</p>
        </div>
        
        {/* FEATURE: Students Helped (Replaces "Sold") */}
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <p className="text-xl font-bold text-black dark:text-white">
            14
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Students Helped</p>
        </div>

        {/* Rating */}
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <p className="text-xl font-bold text-black dark:text-white">4.9</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rating</p>
        </div>
      </div>

      {/*  FEATURE: Trust Score  */}
      <div className="mt-4 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black">
         <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Trust Score</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">98% Very High</span>
         </div>
         <div className="h-2 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[98%]"></div>
         </div>
         <p className="text-[10px] text-gray-400 mt-2">
           Analysis based on 14 transactions, 5 endorsements, and response time.
         </p>
      </div>

      {/*  Mentorship Section  */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <IconBook size={16} className="text-red-700" /> 
            Mentor Expertise
        </h3>
        
        {/* FEATURE: Green Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
            <Chip size="sm" className="bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-100 dark:border-green-800/50">
                Java Programming
            </Chip>
            <Chip size="sm" className="bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-100 dark:border-green-800/50">
                Cloud Computing
            </Chip>
            <Chip size="sm" className="bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-100 dark:border-green-800/50">
                System Design
            </Chip>
        </div>

        {/* FEATURE: Course Codes  */}
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-4">
            Selling Resources For
        </h3>
        <div className="flex flex-wrap gap-2">
            <Chip variant="bordered" size="sm" className="text-gray-600 border-gray-300"> Cloud Computing</Chip>
            <Chip variant="bordered" size="sm" className="text-gray-600 border-gray-300"> Algorithms</Chip>
        </div>
      </div>

      {/* Menu Links */}
      <div className="mt-8 space-y-2">
        <Link
          href="/profile/edit"
          className="flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-black dark:text-white">Edit Profile</span>
          <IconChevronRight className="h-5 w-5 text-gray-400" stroke={1.5} />
        </Link>
        <Link
          href="/profile/listings"
          className="flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-black dark:text-white">My Listings</span>
          <IconChevronRight className="h-5 w-5 text-gray-400" stroke={1.5} />
        </Link>
      </div>

      {/*  Recent Listings */}
      <div className="mt-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-black dark:text-white">Recent Listings</h3>
          <Link
            href="/profile/listings"
            className="text-sm font-medium text-red-700 hover:text-red-800 dark:text-red-500"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {userListings.slice(0, 4).map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50 dark:bg-neutral-900 flex items-center justify-center relative">
                  <IconPhoto className="h-8 w-8 text-gray-300 dark:text-neutral-700" stroke={1.5} />
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                    £{item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-black dark:text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Used - Good</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}