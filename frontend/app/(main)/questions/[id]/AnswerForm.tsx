"use client";

import { useState } from "react";
import { Avatar, Button, Textarea } from "@heroui/react";
import { IconSend } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Answer } from "@/lib/types";
import { createAnswer } from "@/lib/actions/questions";

interface AnswerFormProps {
  questionId: string;
  onAnswerPosted: (answer: Answer) => void;
}

export function AnswerForm({ questionId, onAnswerPosted }: AnswerFormProps) {
  const [newAnswer, setNewAnswer] = useState("");

  const createAnswerMutation = useMutation({
    mutationFn: (content: string) => createAnswer(questionId, content),
    onSuccess: (answer) => {
      onAnswerPosted(answer);
      setNewAnswer("");
    },
  });

  const isSubmitting = createAnswerMutation.isPending;

  const handleSubmit = () => {
    if (!newAnswer.trim()) return;
    createAnswerMutation.mutate(newAnswer);
  };

  return (
    <div className="flex items-start gap-3">
      <Avatar name="You" size="sm" color="danger" showFallback />
      <div className="flex-1">
        <Textarea
          value={newAnswer}
          onValueChange={setNewAnswer}
          minRows={3}
          placeholder="Write your answer..."
          variant="bordered"
        />
        <Button
          onPress={handleSubmit}
          isDisabled={!newAnswer.trim()}
          isLoading={isSubmitting}
          color="danger"
          radius="full"
          startContent={!isSubmitting && <IconSend className="h-4 w-4" stroke={2} />}
          className="mt-2"
        >
          {isSubmitting ? "Posting..." : "Post Answer"}
        </Button>
      </div>
    </div>
  );
}
