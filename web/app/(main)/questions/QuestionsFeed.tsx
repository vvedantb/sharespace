"use client";

import Link from "next/link";
import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Spinner, Button, useDisclosure, Card, CardBody } from "@heroui/react";
import { IconSearch, IconX, IconPlus, IconFlame, IconEye } from "@tabler/icons-react";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { questionsSearchParams } from "./searchParams";
import { getQuestions } from "@/lib/actions/questions";
import { AskQuestionModal } from "./AskQuestionModal";

interface QuestionsFeedProps {
  initialQuestions: Question[];
  trendingQuestions?: Question[];
}

export function QuestionsFeed({ initialQuestions, trendingQuestions = [] }: QuestionsFeedProps) {
  const [{ q }, setParams] = useQueryStates(questionsSearchParams);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: questions = initialQuestions, isLoading: loading } = useQuery({
    queryKey: ["questions", { q }],
    queryFn: () => getQuestions({ search: q || undefined }),
    enabled: !!q,
    placeholderData: initialQuestions,
  });

  return (
    <>
      <div className="mt-4 flex gap-3">
        <Input
          value={q}
          onValueChange={(value) => setParams({ q: value || null })}
          placeholder="Search questions..."
          startContent={<IconSearch className="h-5 w-5 text-default-400" stroke={2} />}
          endContent={
            q ? (
              <button onClick={() => setParams({ q: null })} className="text-default-400 hover:text-default-600">
                <IconX className="h-4 w-4" stroke={2} />
              </button>
            ) : null
          }
          variant="bordered"
          radius="lg"
          classNames={{ inputWrapper: "bg-default-50" }}
        />
        <Button
          color="danger"
          radius="lg"
          startContent={<IconPlus className="h-5 w-5" stroke={2} />}
          onPress={onOpen}
          className="shrink-0"
        >
          Ask
        </Button>
      </div>
      <AskQuestionModal isOpen={isOpen} onOpenChange={onOpenChange} />

      {trendingQuestions.length > 0 && !q && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <IconFlame className="h-5 w-5 text-orange-500" stroke={2} />
            <h2 className="font-semibold text-foreground">Trending This Week</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {trendingQuestions.map((question) => (
              <Link key={question.id} href={`/questions/${question.id}`} className="shrink-0 w-64">
                <Card className="border border-orange-200 dark:border-orange-800 hover:border-orange-400 transition-colors h-full">
                  <CardBody className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-2 text-sm">{question.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-default-500">
                      <span className="flex items-center gap-1">
                        <IconEye className="h-3 w-3" /> {question.views}
                      </span>
                      <span>{question.answerCount} answers</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-16 flex justify-center">
          <Spinner color="danger" />
        </div>
      ) : questions.length === 0 ? (
        <div className="py-16 text-center text-default-500">
          No questions found
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </>
  );
}
