"use client";

import { useState, useMemo } from "react";
import { mentors } from "@/lib/mock-data";
import { MentorCard } from "@/components/MentorCard";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/Select";

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("all");
  const [sort, setSort] = useState("rating");

  const allExpertise = useMemo(() => {
    const skills = new Set<string>();
    mentors.forEach((m) => m.expertise.forEach((e) => skills.add(e)));
    return [
      { value: "all", label: "All Subjects" },
      ...Array.from(skills).map((s) => ({ value: s, label: s })),
    ];
  }, []);

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "answers", label: "Most Answers" },
    { value: "endorsements", label: "Most Endorsed" },
  ];

  const filteredMentors = useMemo(() => {
    let result = [...mentors];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(searchLower) ||
          m.bio.toLowerCase().includes(searchLower) ||
          m.expertise.some((e) => e.toLowerCase().includes(searchLower))
      );
    }

    if (expertise !== "all") {
      result = result.filter((m) => m.expertise.includes(expertise));
    }

    switch (sort) {
      case "answers":
        result.sort((a, b) => b.totalAnswers - a.totalAnswers);
        break;
      case "endorsements":
        result.sort((a, b) => b.endorsements - a.endorsements);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, expertise, sort]);

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Mentors
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Connect with experienced students who can help you succeed
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search mentors by name or expertise..."
        />

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[160px]">
            <Select value={expertise} onChange={setExpertise} options={allExpertise} />
          </div>
          <div className="flex-1 min-w-[160px]">
            <Select value={sort} onChange={setSort} options={sortOptions} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredMentors.length} mentors found
        </p>
      </div>

      {filteredMentors.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-black dark:text-white">
            No mentors found
          </p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
