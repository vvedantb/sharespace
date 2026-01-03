"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconUser, IconArrowLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { BackButton } from "@/components/BackButton";
import { updateUser } from "@/lib/actions/users";

interface EditProfileFormProps {
  user: User;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [course, setCourse] = useState(user.course ?? "");
  const [yearOfStudy, setYearOfStudy] = useState((user.yearOfStudy ?? 1).toString());

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof updateUser>[1]) => updateUser(user.id, data),
    onSuccess: () => router.push("/profile"),
  });

  const isSubmitting = updateProfileMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      firstName,
      lastName,
      username,
      bio,
      course,
      yearOfStudy: parseInt(yearOfStudy),
    });
  };

  return (
    <div className="px-4 py-8">
      <BackButton />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Edit Profile
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Update your profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 dark:bg-neutral-800">
            <IconUser className="h-10 w-10 text-gray-400 dark:text-gray-500" stroke={1.5} />
          </div>
          <button
            type="button"
            className="rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Change Photo
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 text-gray-500 dark:text-gray-400">
              @
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-r-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Email cannot be changed
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Course / Major
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Year of Study
            </label>
            <select
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            >
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
              <option value="5">Postgraduate</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell other students about yourself..."
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {bio.length}/200 characters
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-6 py-3 font-semibold text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-red-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
