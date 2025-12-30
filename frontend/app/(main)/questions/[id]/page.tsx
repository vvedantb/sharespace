"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconSend } from "@tabler/icons-react";
import { questions, answers, currentUser } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [newAnswer, setNewAnswer] = useState("");

  const question = questions.find((q) => q.id === id);
  const questionAnswers = answers[id] || [];

  if (!question) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Question not found
        </h1>
        <Link href="/questions" className="mt-4 inline-block text-red-800 dark:text-red-500">
          Back to Questions
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="h-4 w-4" stroke={2} />
        Back
      </button>

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
            {questionAnswers.length} {questionAnswers.length === 1 ? "Answer" : "Answers"}
          </h2>

          {questionAnswers.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No answers yet. Be the first to help!
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {questionAnswers.map((answer) => (
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
          <div className="flex items-start gap-3">
            <Avatar name={`${currentUser.firstName} ${currentUser.lastName}`} size="sm" />
            <div className="flex-1">
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={3}
                placeholder="Write your answer..."
                className="w-full resize-none rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-sm text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
              />
              <button
                disabled={!newAnswer.trim()}
                className="mt-2 flex items-center gap-2 rounded-full bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50"
              >
                <IconSend className="h-4 w-4" stroke={2} />
                Post Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
