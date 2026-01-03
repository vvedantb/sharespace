"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button, Card, CardBody } from "@heroui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Question, Answer } from "@/lib/types";
import { AnswerForm } from "./AnswerForm";

interface QuestionDetailProps {
  question: Question;
  initialAnswers: Answer[];
}

export function QuestionDetail({ question, initialAnswers }: QuestionDetailProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState(initialAnswers);

  const handleAnswerPosted = (answer: Answer) => {
    setAnswers([...answers, answer]);
  };

  return (
    <div className="px-4 py-6">
      <Button
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        onPress={() => router.back()}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-black dark:text-white">
          {question.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {question.askerName} · {question.createdAt}
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {question.content}
        </p>

        <div className="mt-8 border-t border-gray-100 dark:border-neutral-800 pt-6">
          <h2 className="font-medium text-black dark:text-white">
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </h2>

          {answers.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No answers yet. Be the first to help!
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {answers.map((answer) => (
                <Card key={answer.id} className="border border-default-200">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={answer.mentorName} size="sm" color="danger" showFallback />
                      <Link
                        href={`/mentors/${answer.mentorId}`}
                        className="text-sm font-medium text-black dark:text-white hover:text-danger"
                      >
                        {answer.mentorName}
                      </Link>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        · {answer.createdAt}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {answer.content}
                    </p>
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      {answer.helpfulCount} found helpful
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-6">
          <AnswerForm questionId={question.id} onAnswerPosted={handleAnswerPosted} />
        </div>
      </div>
    </div>
  );
}
