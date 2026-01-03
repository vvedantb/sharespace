"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";
import { questionsSearchParams } from "./searchParams";

interface QuestionsFeedProps {
  initialQuestions: Question[];
}

export function QuestionsFeed({ initialQuestions }: QuestionsFeedProps) {
  const [{ q }, setParams] = useQueryStates(questionsSearchParams);

  const { data: questions = initialQuestions, isLoading: loading } = useQuery({
    queryKey: ["questions", { q }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      const res = await fetch(`/api/questions?${params}`);
      if (!res.ok) throw new Error("Failed to fetch questions");
      return res.json() as Promise<Question[]>;
    },
    enabled: !!q,
    placeholderData: initialQuestions,
  });

  return (
    <>
      <div className="mt-4">
        <SearchInput
          value={q}
          onChange={(value) => setParams({ q: value || null })}
          placeholder="Search questions..."
        />
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : questions.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No questions found
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </>
  );
}
