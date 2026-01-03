"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Card, CardBody } from "@heroui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { questionCategories } from "@/lib/constants";
import { createQuestion } from "@/lib/actions/questions";

export default function AskQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const categories = questionCategories.map((c) => ({
    value: c.value,
    label: c.label,
    description:
      c.value === "ACADEMIC" ? "Course content, assignments, exams" :
      c.value === "STUDENT_LIFE" ? "Campus life, accommodation, social" :
      c.value === "COURSE_ADVICE" ? "Module selection, career paths" :
      "Books and resources",
  }));

  const createQuestionMutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => router.push("/questions"),
  });

  const isSubmitting = createQuestionMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuestionMutation.mutate({
      title,
      content,
      category,
      courseCode: courseCode || undefined,
    });
  };

  const isFormValid = title && content && category;

  return (
    <div className="px-4 py-8">
      <Button
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        onPress={() => router.back()}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Ask a Question
        </h1>
        <p className="mt-2 text-default-500">
          Get help from experienced mentors and fellow students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Input
          label="Question Title"
          value={title}
          onValueChange={setTitle}
          placeholder="e.g., How do I prepare for organic chemistry exams?"
          variant="bordered"
          radius="lg"
          isRequired
          description="Be specific and concise"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category *
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <Card
                key={cat.value}
                isPressable
                onPress={() => setCategory(cat.value)}
                className={`border transition-colors ${
                  category === cat.value
                    ? "border-danger bg-danger-50"
                    : "border-default-200 hover:border-default-300"
                }`}
              >
                <CardBody className="p-4">
                  <p className={`font-medium ${
                    category === cat.value ? "text-danger" : ""
                  }`}>
                    {cat.label}
                  </p>
                  <p className="mt-0.5 text-sm text-default-500">
                    {cat.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <Input
          label="Course Code (optional)"
          value={courseCode}
          onValueChange={setCourseCode}
          placeholder="e.g., COMP101"
          variant="bordered"
          radius="lg"
          description="Add a course code to help mentors find relevant questions"
        />

        <Textarea
          label="Question Details"
          value={content}
          onValueChange={setContent}
          minRows={6}
          placeholder="Provide more context about your question. What have you tried? What specifically do you need help with?"
          variant="bordered"
          radius="lg"
          isRequired
          description={`${content.length}/2000 characters`}
        />

        <Card className="border border-primary-200 bg-primary-50">
          <CardBody className="p-4">
            <h3 className="font-medium text-primary">Tips for a great question</h3>
            <ul className="mt-2 space-y-1 text-sm text-primary-700">
              <li>• Be specific about what you need help with</li>
              <li>• Include relevant context (course, year, etc.)</li>
              <li>• Mention what you&apos;ve already tried</li>
              <li>• Keep it focused on one topic</li>
            </ul>
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="bordered"
            radius="lg"
            fullWidth
            onPress={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            radius="lg"
            fullWidth
            isDisabled={!isFormValid}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Question"}
          </Button>
        </div>
      </form>
    </div>
  );
}
