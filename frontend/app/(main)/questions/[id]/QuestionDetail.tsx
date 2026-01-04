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
    <div className="px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="light"
          startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
          onPress={() => router.back()}
          className="mb-6 text-default-500"
        >
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
          <div>
            <Card className="border border-default-200" shadow="none">
              <CardBody className="p-6">
                <h1 className="text-xl font-bold text-foreground md:text-2xl">
                  {question.title}
                </h1>
                <p className="mt-2 text-sm text-default-500">
                  Asked by {question.askerName} · {dayjs(question.createdAt).fromNow()}
                </p>
                <p className="mt-4 text-default-600 leading-relaxed">
                  {question.content}
                </p>
              </CardBody>
            </Card>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">
                {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
              </h2>

              {answers.length === 0 ? (
                <p className="mt-4 text-sm text-default-500">
                  No answers yet. Be the first to help!
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {answers.map((answer) => (
                    <Card key={answer.id} className="border border-default-200" shadow="none">
                      <CardBody className="p-5">
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={answer.mentorName}
                            size="sm"
                            color="danger"
                            showFallback
                          />
                          <div>
                            <Link
                              href={`/mentors/${answer.mentorId}`}
                              className="font-medium text-foreground hover:text-danger"
                            >
                              {answer.mentorName}
                            </Link>
                            <p className="text-xs text-default-400">
                              {dayjs(answer.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-default-600 leading-relaxed">
                          {answer.content}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-default-100 pt-3">
                          <p className="text-xs text-default-400">
                            {answer.helpfulCount} found helpful
                          </p>
                          {isAsker && !answer.isEndorsed && (
                            <Button
                              size="sm"
                              variant="flat"
                              color="success"
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
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <Card className="border border-default-200" shadow="none">
              <CardBody className="p-5">
                <h3 className="font-semibold text-foreground mb-4">Your Answer</h3>
                {isMentor ? (
                  <AnswerForm
                    questionId={question.id}
                    onAnswerPosted={handleAnswerPosted}
                  />
                ) : mentorStatus === "PENDING" ? (
                  <div className="text-center py-4">
                    <p className="text-warning-600 font-medium">Application Pending</p>
                    <p className="text-sm text-default-500 mt-1">You&apos;ll be able to answer once approved.</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-default-500">Only mentors can answer questions.</p>
                    <Button color="danger" variant="flat" size="sm" className="mt-3" onPress={onOpen}>
                      {mentorStatus === "REJECTED" ? "Reapply as Mentor" : "Become a Mentor"}
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
            {!isMentor && mentorStatus !== "PENDING" && (
              <BecomeMentorModal isOpen={isOpen} onOpenChange={onOpenChange} userYearOfStudy={userYearOfStudy} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
