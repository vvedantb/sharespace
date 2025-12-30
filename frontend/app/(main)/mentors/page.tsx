import { Suspense } from "react";
import { MentorDirectory } from "./MentorDirectory";

export default function MentorsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Mentors
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get help from experienced students
      </p>
      <Suspense>
        <MentorDirectory />
      </Suspense>
    </div>
  );
}
