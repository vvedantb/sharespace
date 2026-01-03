"use client";

import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Answer } from "@/lib/types";
import { Avatar } from "@/components/Avatar";

interface AnswerFormProps {
  questionId: string;
  onAnswerPosted: (answer: Answer) => void;
}

export function AnswerForm({ questionId, onAnswerPosted }: AnswerFormProps) {
  const [newAnswer, setNewAnswer] = useState("");

  const createAnswerMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to post answer");
      return res.json() as Promise<Answer>;
    },
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
      <Avatar name="You" size="sm" />
      <div className="flex-1">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows={3}
          placeholder="Write your answer..."
          className="w-full resize-none rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-sm text-black dark:text-white placeholder:text-gray-400 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
        />
        <button
          onClick={handleSubmit}
          disabled={!newAnswer.trim() || isSubmitting}
          className="mt-2 flex items-center gap-2 rounded-full bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50"
        >
          <IconSend className="h-4 w-4" stroke={2} />
          {isSubmitting ? "Posting..." : "Post Answer"}
        </button>
      </div>
    </div>
  );
}
