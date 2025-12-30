import Link from "next/link";
import { IconMessageCircle } from "@tabler/icons-react";
import { Question } from "@/lib/types";
import { Avatar } from "./Avatar";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
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

  const statusColors = {
    open: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    answered: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    closed: "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400",
  };

  return (
    <Link href={`/questions/${question.id}`}>
      <div className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-5 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-start gap-3">
          <Avatar name={question.askerName} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-black dark:text-white">
                {question.askerName}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {question.createdAt}
              </span>
            </div>
            <h3 className="mt-1 font-semibold text-black dark:text-white group-hover:text-red-800 dark:group-hover:text-red-500 transition-colors">
              {question.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {question.content}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[question.category]}`}>
              {categoryLabels[question.category]}
            </span>
            {question.courseCode && (
              <span className="rounded-full bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                {question.courseCode}
              </span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[question.status]}`}>
              {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <IconMessageCircle className="h-4 w-4" stroke={1.5} />
            {question.answerCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
