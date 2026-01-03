"use client";

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { api } from "@/lib/api";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";
import { questionsSearchParams } from "./searchParams";

interface QuestionsFeedProps {
  initialQuestions: Question[];
}

export function QuestionsFeed({ initialQuestions }: QuestionsFeedProps) {
  const [{ q }, setParams] = useQueryStates(questionsSearchParams);
  const [questions, setQuestions] = useState(initialQuestions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setQuestions(initialQuestions);
      return;
    }
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await api.questions.list({ search: q || undefined });
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [q, initialQuestions]);

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
