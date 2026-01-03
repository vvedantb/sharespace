import Link from "next/link";
import { IconArrowLeft, IconMessageCircle } from "@tabler/icons-react";
import { serverApi } from "@/lib/api-server";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";

export default async function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let mentor;
  try {
    mentor = await serverApi.mentors.get(id);
  } catch {
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

  return (
    <div className="px-4 py-6">
      <BackButton />

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
    </div>
  );
}
