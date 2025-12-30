import { Suspense } from "react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { QuestionsFeed } from "./QuestionsFeed";

export default function QuestionsPage() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">Q&A</h1>
        <Link
          href="/questions/ask"
          className="flex items-center gap-1 rounded-full bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
        >
          <IconPlus className="h-4 w-4" stroke={2} />
          Ask
        </Link>
      </div>
      <Suspense>
        <QuestionsFeed />
      </Suspense>
    </div>
  );
}
