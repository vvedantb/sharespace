"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { questions } from "@/lib/mock-data";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";

export default function QuestionsPage() {
  const [search, setSearch] = useState("");

  const filteredQuestions = useMemo(() => {
    if (!search) return questions;
    const searchLower = search.toLowerCase();
    return questions.filter(
      (q) =>
        q.title.toLowerCase().includes(searchLower) ||
        q.content.toLowerCase().includes(searchLower)
    );
  }, [search]);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Q&A
        </h1>
        <Link
          href="/questions/ask"
          className="flex items-center gap-1 rounded-full bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
        >
          <IconPlus className="h-4 w-4" stroke={2} />
          Ask
        </Link>
      </div>

      <div className="mt-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search questions..."
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No questions found
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
