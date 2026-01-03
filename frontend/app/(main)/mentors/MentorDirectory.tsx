"use client";

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { api } from "@/lib/api";
import { Mentor } from "@/lib/types";
import { MentorCard } from "@/components/MentorCard";
import { SearchInput } from "@/components/SearchInput";
import { mentorsSearchParams } from "./searchParams";

interface MentorDirectoryProps {
  initialMentors: Mentor[];
}

export function MentorDirectory({ initialMentors }: MentorDirectoryProps) {
  const [{ q }, setParams] = useQueryStates(mentorsSearchParams);
  const [mentors, setMentors] = useState(initialMentors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setMentors(initialMentors);
      return;
    }
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const data = await api.mentors.list(q || undefined);
        setMentors(data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [q, initialMentors]);

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
