"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconMessageCircle,
  IconThumbUp,
  IconStar,
  IconCheck,
} from "@tabler/icons-react";
import { mentors, questions, answers } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { RatingStars } from "@/components/RatingStars";

export default function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const mentor = mentors.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Mentor not found
          </h1>
          <Link
            href="/mentors"
            className="mt-4 inline-block rounded-xl bg-red-800 px-6 py-2 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Back to Mentors
          </Link>
        </div>
      </div>
    );
  }

  const mentorAnswers = Object.values(answers)
    .flat()
    .filter((a) => a.mentorId === mentor.id)
    .slice(0, 5);

  const answeredQuestions = questions.filter((q) =>
    mentorAnswers.some((a) => a.questionId === q.id)
  );

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
            <div className="text-center">
              <Avatar name={mentor.name} size="xl" />
              <div className="mt-4 flex items-center justify-center gap-2">
                <h1 className="text-xl font-bold text-black dark:text-white">
                  {mentor.name}
                </h1>
                {mentor.isVerified && <Badge variant="verified" size="sm" />}
              </div>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{mentor.course}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">{mentor.university}</p>
              <div className="mt-3 flex justify-center">
                <RatingStars rating={mentor.rating} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-neutral-800 pt-6">
              <div className="text-center">
                <p className="text-xl font-bold text-red-800 dark:text-red-500">
                  {mentor.totalAnswers}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Answers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-red-800 dark:text-red-500">
                  {mentor.endorsements}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Endorsements</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-red-800 dark:text-red-500">
                  {Math.round((mentor.helpfulAnswers / mentor.totalAnswers) * 100)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Helpful</p>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-6">
              <h2 className="font-semibold text-black dark:text-white">About</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{mentor.bio}</p>
            </div>

            <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-6">
              <h2 className="font-semibold text-black dark:text-white">Expertise</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-700 dark:text-purple-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/messages?user=${mentor.userId}`}
              className="mt-6 block w-full rounded-xl bg-red-800 py-3 text-center font-semibold text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              Message Mentor
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
            Recent Answers
          </h2>

          {mentorAnswers.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No answers yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mentorAnswers.map((answer) => {
                const question = answeredQuestions.find((q) => q.id === answer.questionId);
                return (
                  <Link key={answer.id} href={`/questions/${answer.questionId}`}>
                    <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-5 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900">
                      {question && (
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Q: {question.title}
                        </p>
                      )}
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                        {answer.content}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <IconThumbUp className="h-4 w-4" stroke={1.5} />
                          {answer.helpfulCount} helpful
                        </span>
                        {answer.isEndorsed && (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-500">
                            <IconCheck className="h-4 w-4" stroke={2} />
                            Endorsed
                          </span>
                        )}
                        <span>{answer.createdAt}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <Link
            href="/questions/ask"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-neutral-700 py-4 text-gray-500 hover:border-red-800 hover:text-red-800 dark:hover:border-red-500 dark:hover:text-red-500 transition-colors"
          >
            <IconMessageCircle className="h-5 w-5" stroke={1.5} />
            Ask {mentor.name.split(" ")[0]} a Question
          </Link>
        </div>
      </div>
    </div>
  );
}
