"use client";

import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { questions } from "@/lib/mock-data";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";
import { questionsSearchParams } from "./searchParams";

export function QuestionsFeed() {
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
    <>
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
    </>
  );
}
