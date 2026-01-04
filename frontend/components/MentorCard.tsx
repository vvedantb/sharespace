import Link from "next/link";
import { Avatar, Card, CardBody } from "@heroui/react";
import { Mentor } from "@/lib/types";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/mentors/${mentor.id}`}>
      <Card className="border border-default-200 hover:border-default-300 transition-all" shadow="none">
        <CardBody className="p-5">
        <div className="flex items-center gap-3">
          <Avatar name={mentor.name} size="lg" color="danger" showFallback />
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-black dark:text-white truncate">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mentor.course}
            </p>
          </div>
          <span className="text-sm font-medium text-red-800 dark:text-red-500">
            {mentor.rating > 0 ? `${mentor.rating.toFixed(1)}★` : "-"}
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
        </CardBody>
      </Card>
    </Link>
  );
}
