"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Spinner, Button, useDisclosure } from "@heroui/react";
import { IconSearch, IconX, IconPlus } from "@tabler/icons-react";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { questionsSearchParams } from "./searchParams";
import { getQuestions } from "@/lib/actions/questions";
import { AskQuestionModal } from "./AskQuestionModal";

interface QuestionsFeedProps {
  initialQuestions: Question[];
}

export function QuestionsFeed({ initialQuestions }: QuestionsFeedProps) {
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
