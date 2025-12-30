"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

export default function AskQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "academic", label: "Academic", description: "Course content, assignments, exams" },
    { value: "student-life", label: "Student Life", description: "Campus life, accommodation, social" },
    { value: "course-advice", label: "Course Advice", description: "Module selection, career paths" },
    { value: "textbook-recommendation", label: "Textbook Recommendation", description: "Books and resources" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/questions");
    }, 1000);
  };

  const isFormValid = title && content && category;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Ask a Question
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Get help from experienced mentors and fellow students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Question Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., How do I prepare for organic chemistry exams?"
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Be specific and concise
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Category *
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  category === cat.value
                    ? "border-red-800 bg-red-50 dark:border-red-600 dark:bg-red-900/20"
                    : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
                }`}
              >
                <p className={`font-medium ${
                  category === cat.value
                    ? "text-red-800 dark:text-red-500"
                    : "text-black dark:text-white"
                }`}>
                  {cat.label}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Course Code (optional)
          </label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="e.g., COMP101"
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Add a course code to help mentors find relevant questions
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Question Details *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Provide more context about your question. What have you tried? What specifically do you need help with?"
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {content.length}/2000 characters
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-300">Tips for a great question</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-400">
            <li>• Be specific about what you need help with</li>
            <li>• Include relevant context (course, year, etc.)</li>
            <li>• Mention what you&apos;ve already tried</li>
            <li>• Keep it focused on one topic</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-6 py-3 font-semibold text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 rounded-xl bg-red-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Question"}
          </button>
        </div>
      </form>
    </div>
  );
}
