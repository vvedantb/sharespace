"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconMessageCircle } from "@tabler/icons-react";
import { mentors, answers } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

export default function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const mentor = mentors.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Mentor not found
        </h1>
        <Link href="/mentors" className="mt-4 inline-block text-red-800 dark:text-red-500">
          Back to Mentors
        </Link>
      </div>
    );
  }

  const mentorAnswers = Object.values(answers)
    .flat()
    .filter((a) => a.mentorId === mentor.id)
    .slice(0, 3);

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="h-4 w-4" stroke={2} />
        Back
      </button>

      <div className="flex items-center gap-4">
        <Avatar name={mentor.name} size="xl" />
        <div>
          <h1 className="text-xl font-bold text-black dark:text-white">
            {mentor.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{mentor.course}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">{mentor.university}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-black dark:text-white">{mentor.rating}★</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-black dark:text-white">{mentor.totalAnswers}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Answers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-black dark:text-white">{mentor.endorsements}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Endorsements</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-medium text-black dark:text-white">About</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{mentor.bio}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-medium text-black dark:text-white">Expertise</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {mentor.expertise.join(" · ")}
        </p>
      </div>

      <Link
        href={`/messages?user=${mentor.userId}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-800 py-3 font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
      >
        <IconMessageCircle className="h-5 w-5" stroke={2} />
        Message
      </Link>

      {mentorAnswers.length > 0 && (
        <div className="mt-8">
          <h2 className="font-medium text-black dark:text-white">Recent Answers</h2>
          <div className="mt-3 space-y-3">
            {mentorAnswers.map((answer) => (
              <Link key={answer.id} href={`/questions/${answer.questionId}`}>
                <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {answer.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {answer.helpfulCount} found helpful
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
