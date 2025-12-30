"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import { IconPlus } from "@tabler/icons-react";
import { questions } from "@/lib/mock-data";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";
import { questionsSearchParams } from "./searchParams";

export function QuestionsClient() {
  const [{ q }, setParams] = useQueryStates(questionsSearchParams);

  const filteredQuestions = useMemo(() => {
    if (!q) return questions;
    const searchLower = q.toLowerCase();
    return questions.filter(
      (question) =>
        question.title.toLowerCase().includes(searchLower) ||
        question.content.toLowerCase().includes(searchLower)
    );
  }, [q]);

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
          value={q}
          onChange={(value) => setParams({ q: value || null })}
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
