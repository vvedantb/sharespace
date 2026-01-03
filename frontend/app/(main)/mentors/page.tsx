import { serverApi } from "@/lib/api-server";
import { MentorDirectory } from "./MentorDirectory";

export default async function MentorsPage() {
  const mentors = await serverApi.mentors.list();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Mentors
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get help from experienced students
      </p>
      <MentorDirectory initialMentors={mentors} />
    </div>
  );
}
