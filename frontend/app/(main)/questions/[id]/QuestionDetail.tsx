"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { IconArrowLeft, IconThumbUp } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Question, Answer } from "@/lib/types";
import { markAnswerHelpful } from "@/lib/actions/questions";
import { AnswerForm } from "./AnswerForm";
import { BecomeMentorModal } from "@/components/BecomeMentorModal";

dayjs.extend(relativeTime);

interface QuestionDetailProps {
  question: Question;
  initialAnswers: Answer[];
  currentUserId?: string;
  isMentor?: boolean;
  mentorStatus?: "PENDING" | "APPROVED" | "REJECTED" | null;
  userYearOfStudy?: number | null;
}

export function QuestionDetail({
  question,
  initialAnswers,
  currentUserId,
  isMentor,
  mentorStatus,
  userYearOfStudy,
}: QuestionDetailProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState(initialAnswers);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAnswerPosted = (answer: Answer) => {
    setAnswers([...answers, answer]);
  };

  const markHelpfulMutation = useMutation({
    mutationFn: (answerId: string) => markAnswerHelpful(answerId),
    onSuccess: (_, answerId) => {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answerId ? { ...a, isEndorsed: true, helpfulCount: a.helpfulCount + 1 } : a
        )
      );
    },
  });

  const isAsker = currentUserId === question.askerId;

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
          {question.askerName} · {dayjs(question.createdAt).fromNow()}
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
                      <Avatar
                        name={answer.mentorName}
                        size="sm"
                        color="danger"
                        showFallback
                      />
                      <Link
                        href={`/mentors/${answer.mentorId}`}
                        className="text-sm font-medium text-black dark:text-white hover:text-danger"
                      >
                        {answer.mentorName}
                      </Link>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        · {dayjs(answer.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {answer.content}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {answer.helpfulCount} found helpful
                      </p>
                      {isAsker && !answer.isEndorsed && (
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<IconThumbUp className="h-4 w-4" />}
                          isLoading={markHelpfulMutation.isPending}
                          onPress={() => markHelpfulMutation.mutate(answer.id)}
                        >
                          Mark Helpful
                        </Button>
                      )}
                      {answer.isEndorsed && (
                        <span className="text-xs text-success-500 flex items-center gap-1">
                          <IconThumbUp className="h-3 w-3" /> Helpful
                        </span>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-6">
          {isMentor ? (
            <AnswerForm
              questionId={question.id}
              onAnswerPosted={handleAnswerPosted}
            />
          ) : mentorStatus === "PENDING" ? (
            <Card className="border border-warning-200 bg-warning-50">
              <CardBody className="p-4 text-center">
                <p className="text-warning-700">Your mentor application is pending review.</p>
                <p className="text-sm text-warning-600 mt-1">You&apos;ll be able to answer questions once approved.</p>
              </CardBody>
            </Card>
          ) : (
            <Card className="border border-default-200">
              <CardBody className="p-4 text-center">
                <p className="text-default-600">Only mentors can answer questions.</p>
                <Button color="danger" variant="flat" size="sm" className="mt-3" onPress={onOpen}>
                  {mentorStatus === "REJECTED" ? "Reapply as Mentor" : "Become a Mentor"}
                </Button>
              </CardBody>
            </Card>
          )}
          {!isMentor && mentorStatus !== "PENDING" && (
            <BecomeMentorModal isOpen={isOpen} onOpenChange={onOpenChange} userYearOfStudy={userYearOfStudy} />
          )}
        </div>
      </div>
    </div>
  );
}
