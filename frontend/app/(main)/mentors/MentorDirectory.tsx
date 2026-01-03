"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Mentor } from "@/lib/types";
import { MentorCard } from "@/components/MentorCard";
import { SearchInput } from "@/components/SearchInput";
import { mentorsSearchParams } from "./searchParams";
import { getMentors } from "@/lib/actions/mentors";

interface MentorDirectoryProps {
  initialMentors: Mentor[];
}

export function MentorDirectory({ initialMentors }: MentorDirectoryProps) {
  const [{ q }, setParams] = useQueryStates(mentorsSearchParams);

  const { data: mentors = initialMentors, isLoading: loading } = useQuery({
    queryKey: ["mentors", { q }],
    queryFn: () => getMentors(q || undefined),
    enabled: !!q,
    placeholderData: initialMentors,
  });

  return (
    <>
      <div className="mt-4">
        <SearchInput
          value={q}
          onChange={(value) => setParams({ q: value || null })}
          placeholder="Search by name or expertise..."
        />
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : mentors.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No mentors found
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </>
  );
}
