"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { questions } from "@/lib/mock-data";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchInput } from "@/components/SearchInput";
import { Select } from "@/components/Select";
import { Tabs } from "@/components/Tabs";

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic" },
    { value: "student-life", label: "Student Life" },
    { value: "course-advice", label: "Course Advice" },
    { value: "textbook-recommendation", label: "Textbook" },
  ];

  const tabs = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "answered", label: "Answered" },
  ];

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.content.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "all") {
      result = result.filter((q) => q.category === category);
    }

    if (activeTab !== "all") {
      result = result.filter((q) => q.status === activeTab);
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [search, category, activeTab]);

  return (
    <div className="px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
            Questions
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Ask questions and get answers from mentors
          </p>
        </div>
        <Link
          href="/questions/ask"
          className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-6 py-3 font-semibold text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          <IconPlus className="h-5 w-5" stroke={2} />
          Ask Question
        </Link>
      </div>

      <div className="mb-6 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search questions..."
        />

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="w-48">
            <Select value={category} onChange={setCategory} options={categoryOptions} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredQuestions.length} questions found
        </p>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-black dark:text-white">
            No questions found
          </p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Be the first to ask a question!
          </p>
          <Link
            href="/questions/ask"
            className="mt-4 inline-block rounded-xl bg-red-800 px-6 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Ask Question
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
