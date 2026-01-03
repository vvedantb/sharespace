import { Suspense } from "react";
import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { QuestionsFeed } from "./QuestionsFeed";

export default async function QuestionsPage() {
  const questions = await prisma.question.findMany({
    include: { asker: true, _count: { select: { answers: true } } },
    orderBy: { createdAt: "desc" },
  });

  const formattedQuestions = questions.map((q) => ({
    id: q.id,
    askerId: q.askerId,
    askerName: `${q.asker.firstName} ${q.asker.lastName}`,
    title: q.title,
    content: q.content,
    category: q.category,
    courseCode: q.courseCode,
    status: q.status,
    answerCount: q._count.answers,
    createdAt: dayjs(q.createdAt).toISOString(),
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">Q&A</h1>
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">Loading...</div>
        }
      >
        <QuestionsFeed initialQuestions={formattedQuestions} />
      </Suspense>
    </div>
  );
}
