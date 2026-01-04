import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { QuestionDetail } from "./QuestionDetail";
import { incrementQuestionViews } from "@/lib/actions/questions";
import Link from "next/link";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  await incrementQuestionViews(id);

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
    include: { mentor: { include: { mentorProfile: true } } },
    orderBy: [{ isBestAnswer: "desc" }, { createdAt: "desc" }],
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
    views: question.views,
    answerCount: question._count.answers,
    createdAt: dayjs(question.createdAt).toISOString(),
  };

  const formattedAnswers = answers.map((a) => ({
    id: a.id,
    questionId: a.questionId,
    mentorId: a.mentor.mentorProfile?.id ?? a.mentorId,
    mentorName: `${a.mentor.firstName} ${a.mentor.lastName}`,
    content: a.content,
    helpfulCount: a.helpfulCount,
    isEndorsed: a.isEndorsed,
    isBestAnswer: a.isBestAnswer,
    createdAt: dayjs(a.createdAt).toISOString(),
  }));

  const mentorProfile = currentUser
    ? await prisma.mentorProfile.findUnique({ where: { userId: currentUser.id } })
    : null;

  return (
    <QuestionDetail
      question={formattedQuestion}
      initialAnswers={formattedAnswers}
      currentUserId={currentUser?.id}
      isMentor={mentorProfile?.status === "APPROVED"}
      mentorStatus={mentorProfile?.status}
      userYearOfStudy={currentUser?.yearOfStudy}
    />
  );
}
