import Link from "next/link";
import { IconMessageCircle, IconThumbUp } from "@tabler/icons-react";
import { Mentor } from "@/lib/types";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { RatingStars } from "./RatingStars";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/mentors/${mentor.id}`}>
      <div className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-5 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <Avatar name={mentor.name} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-black dark:text-white truncate">
                {mentor.name}
              </h3>
              {mentor.isVerified && <Badge variant="verified" size="sm" />}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mentor.course}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {mentor.university}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {mentor.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
            >
              {skill}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              +{mentor.expertise.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-neutral-800 pt-4">
          <RatingStars rating={mentor.rating} size="sm" />
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <IconMessageCircle className="h-4 w-4" stroke={1.5} />
              {mentor.totalAnswers}
            </span>
            <span className="flex items-center gap-1">
              <IconThumbUp className="h-4 w-4" stroke={1.5} />
              {mentor.endorsements}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
