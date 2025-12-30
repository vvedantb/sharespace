"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconThumbUp,
  IconCheck,
  IconSend,
} from "@tabler/icons-react";
import { questions, answers, mentors, currentUser } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { RatingStars } from "@/components/RatingStars";

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [newAnswer, setNewAnswer] = useState("");

  const question = questions.find((q) => q.id === id);
  const questionAnswers = answers[id] || [];

  if (!question) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Question not found
          </h1>
          <Link
            href="/questions"
            className="mt-4 inline-block rounded-xl bg-red-800 px-6 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    academic: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    "student-life": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    "course-advice": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    "textbook-recommendation": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  };

  const categoryLabels = {
    academic: "Academic",
    "student-life": "Student Life",
    "course-advice": "Course Advice",
    "textbook-recommendation": "Textbook",
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return;
    setNewAnswer("");
  };

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="max-w-3xl">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
          <div className="flex items-start gap-4">
            <Avatar name={question.askerName} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-black dark:text-white">
                  {question.askerName}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {question.createdAt}
                </span>
              </div>
              <h1 className="mt-2 text-xl font-bold text-black dark:text-white md:text-2xl">
                {question.title}
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {question.content}
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${categoryColors[question.category]}`}>
                  {categoryLabels[question.category]}
                </span>
                {question.courseCode && (
                  <span className="rounded-full bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-600 dark:text-gray-400">
                    {question.courseCode}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-black dark:text-white">
            {questionAnswers.length} {questionAnswers.length === 1 ? "Answer" : "Answers"}
          </h2>

          {questionAnswers.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No answers yet. Be the first to help!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questionAnswers.map((answer) => {
                const mentor = mentors.find((m) => m.id === answer.mentorId);
                return (
                  <div
                    key={answer.id}
                    className={`rounded-2xl border bg-white dark:bg-black p-5 ${
                      answer.isEndorsed
                        ? "border-green-300 dark:border-green-800"
                        : "border-gray-200 dark:border-neutral-800"
                    }`}
                  >
                    {answer.isEndorsed && (
                      <div className="mb-3 flex items-center gap-2 text-green-600 dark:text-green-500">
                        <IconCheck className="h-5 w-5" stroke={2} />
                        <span className="text-sm font-medium">Endorsed Answer</span>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Link href={`/mentors/${answer.mentorId}`}>
                        <Avatar name={answer.mentorName} size="md" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/mentors/${answer.mentorId}`}
                            className="font-medium text-black dark:text-white hover:text-red-800 dark:hover:text-red-500"
                          >
                            {answer.mentorName}
                          </Link>
                          <Badge variant="mentor" size="sm" />
                          {mentor && (
                            <RatingStars rating={mentor.rating} size="sm" />
                          )}
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                          {answer.content}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-800 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                            <IconThumbUp className="h-4 w-4" stroke={1.5} />
                            {answer.helpfulCount} Helpful
                          </button>
                          <span className="text-sm text-gray-400 dark:text-gray-500">
                            {answer.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-black dark:text-white">
            Your Answer
          </h2>
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4">
            <div className="flex items-start gap-3">
              <Avatar name={`${currentUser.firstName} ${currentUser.lastName}`} size="md" />
              <div className="flex-1">
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={4}
                  placeholder="Share your knowledge and help answer this question..."
                  className="w-full resize-none rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!newAnswer.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-6 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <IconSend className="h-4 w-4" stroke={2} />
                    Post Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
