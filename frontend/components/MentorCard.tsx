import Link from "next/link";
import { Mentor } from "@/lib/types";
import { Avatar } from "./Avatar";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/mentors/${mentor.id}`}>
      <div className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-5 transition-all hover:border-gray-300 dark:hover:border-neutral-700">
        <div className="flex items-center gap-3">
          <Avatar name={mentor.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-black dark:text-white truncate">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mentor.course}
            </p>
          </div>
          <span className="text-sm font-medium text-red-800 dark:text-red-500">
            {mentor.rating}★
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {mentor.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs text-gray-500 dark:text-gray-500"
            >
              {skill}{mentor.expertise.indexOf(skill) < Math.min(2, mentor.expertise.length - 1) ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
