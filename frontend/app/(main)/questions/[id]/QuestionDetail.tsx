"use client";

import { useState } from "react";
import Link from "next/link";
import { Question, Answer } from "@/lib/types";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import { AnswerForm } from "./AnswerForm";

interface QuestionDetailProps {
  question: Question;
  initialAnswers: Answer[];
}

export function QuestionDetail({ question, initialAnswers }: QuestionDetailProps) {
  const [answers, setAnswers] = useState(initialAnswers);

  const handleAnswerPosted = (answer: Answer) => {
    setAnswers([...answers, answer]);
  };

  return (
    <div className="px-4 py-6">
      <BackButton />

      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-black dark:text-white">
          {question.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {question.askerName} · {question.createdAt}
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {question.content}
        </p>

        <div className="mt-8 border-t border-gray-100 dark:border-neutral-800 pt-6">
          <h2 className="font-medium text-black dark:text-white">
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </h2>

          {answers.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No answers yet. Be the first to help!
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={answer.mentorName} size="sm" />
                    <Link
                      href={`/mentors/${answer.mentorId}`}
                      className="text-sm font-medium text-black dark:text-white hover:text-red-800 dark:hover:text-red-500"
                    >
                      {answer.mentorName}
                    </Link>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      · {answer.createdAt}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {answer.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {answer.helpfulCount} found helpful
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-6">
          <AnswerForm questionId={question.id} onAnswerPosted={handleAnswerPosted} />
        </div>
      </div>
    </div>
  );
}
