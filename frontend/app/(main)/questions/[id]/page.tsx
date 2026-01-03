import { prisma } from "@/lib/prisma";
import { QuestionDetail } from "./QuestionDetail";
import Link from "next/link";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const question = await prisma.question.findUnique({
    where: { id },
    include: { asker: true, _count: { select: { answers: true } } },
  });

  if (!question) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Question not found
        </h1>
        <Link href="/questions" className="mt-4 inline-block text-red-800 dark:text-red-500">
          Back to Q&A
        </Link>
      </div>
    );
  }

  const answers = await prisma.answer.findMany({
    where: { questionId: id },
    include: { mentor: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedQuestion = {
    id: question.id,
    askerId: question.askerId,
    askerName: `${question.asker.firstName} ${question.asker.lastName}`,
    title: question.title,
    content: question.content,
    category: question.category,
    courseCode: question.courseCode,
    status: question.status,
    answerCount: question._count.answers,
    createdAt: question.createdAt.toISOString(),
  };

  const formattedAnswers = answers.map((a) => ({
    id: a.id,
    questionId: a.questionId,
    mentorId: a.mentorId,
    mentorName: `${a.mentor.firstName} ${a.mentor.lastName}`,
    content: a.content,
    helpfulCount: a.helpfulCount,
    isEndorsed: a.isEndorsed,
    createdAt: a.createdAt.toISOString(),
  }));

  return <QuestionDetail question={formattedQuestion} initialAnswers={formattedAnswers} />;
}
