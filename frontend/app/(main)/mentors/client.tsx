"use client";

import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { mentors } from "@/lib/mock-data";
import { MentorCard } from "@/components/MentorCard";
import { SearchInput } from "@/components/SearchInput";
import { mentorsSearchParams } from "./searchParams";

export function MentorsClient() {
  const [{ q }, setParams] = useQueryStates(mentorsSearchParams);

  const filteredMentors = useMemo(() => {
    if (!q) return mentors;
    const searchLower = q.toLowerCase();
    return mentors.filter(
      (m) =>
        m.name.toLowerCase().includes(searchLower) ||
        m.expertise.some((e) => e.toLowerCase().includes(searchLower))
    );
  }, [q]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Mentors
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get help from experienced students
      </p>

      <div className="mt-4">
        <SearchInput
          value={q}
          onChange={(value) => setParams({ q: value || null })}
          placeholder="Search by name or expertise..."
        />
      </div>

      {filteredMentors.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No mentors found
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
