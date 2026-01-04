"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { questionCategories } from "@/lib/constants";
import { createQuestion } from "@/lib/actions/questions";

const questionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Question details are required"),
  courseCode: z.string().optional(),
});

type QuestionFormData = z.infer<typeof questionSchema>;

const categories = questionCategories.map((c) => ({
  value: c.value,
  label: c.label,
  description:
    c.value === "ACADEMIC" ? "Course content, assignments, exams" :
    c.value === "STUDENT_LIFE" ? "Campus life, accommodation, social" :
    c.value === "COURSE_ADVICE" ? "Module selection, career paths" :
    "Books and resources",
}));

interface AskQuestionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AskQuestionModal({ isOpen, onOpenChange }: AskQuestionModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      courseCode: "",
    },
  });

  const content = watch("content");

  const createQuestionMutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      reset();
      onOpenChange(false);
    },
  });

  const isSubmitting = createQuestionMutation.isPending;

  const onSubmit = (data: QuestionFormData) => {
    createQuestionMutation.mutate({
      title: data.title,
      content: data.content,
      category: data.category,
      courseCode: data.courseCode || undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) reset();
        onOpenChange(open);
      }}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Ask a Question</ModalHeader>
          <ModalBody className="gap-4">
            <Input
              {...register("title")}
              label="Question Title"
              placeholder="e.g., How do I prepare for organic chemistry exams?"
              variant="bordered"
              radius="lg"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="mb-2 block text-sm font-medium">Category</label>
                  <div className="grid gap-3 md:grid-cols-2">
                    {categories.map((cat) => (
                      <Card
                        key={cat.value}
                        isPressable
                        onPress={() => field.onChange(cat.value)}
                        className={`border transition-colors ${
                          field.value === cat.value
                            ? "border-danger bg-danger-50"
                            : "border-default-200 hover:border-default-300"
                        }`}
                      >
                        <CardBody className="p-3">
                          <p className={`font-medium ${field.value === cat.value ? "text-danger" : ""}`}>
                            {cat.label}
                          </p>
                          <p className="mt-0.5 text-xs text-default-500">{cat.description}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-xs text-danger">{errors.category.message}</p>
                  )}
                </div>
              )}
            />

            <Input
              {...register("courseCode")}
              label="Course Code (optional)"
              placeholder="e.g., COMP101"
              variant="bordered"
              radius="lg"
            />

            <Textarea
              {...register("content")}
              label="Question Details"
              minRows={4}
              placeholder="Provide more context about your question. What have you tried? What specifically do you need help with?"
              variant="bordered"
              radius="lg"
              isInvalid={!!errors.content}
              errorMessage={errors.content?.message}
              description={`${content?.length || 0}/2000 characters`}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" color="danger" radius="lg" isLoading={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
