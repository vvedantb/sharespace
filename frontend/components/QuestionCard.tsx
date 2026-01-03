import Link from "next/link";
import { Card, CardBody } from "@heroui/react";
import { IconMessageCircle } from "@tabler/icons-react";
import { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Link href={`/questions/${question.id}`}>
      <Card className="border border-default-200 hover:border-default-300 transition-all group">
        <CardBody className="p-5">
          <h3 className="font-medium text-black dark:text-white group-hover:text-danger transition-colors">
            {question.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {question.content}
          </p>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <span>{question.askerName} · {question.createdAt}</span>
            <span className="flex items-center gap-1">
              <IconMessageCircle className="h-4 w-4" stroke={1.5} />
              {question.answerCount}
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
