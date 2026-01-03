"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Question, Answer } from "@/lib/types";

export async function getQuestions(params?: { search?: string }): Promise<Question[]> {
  const questions = await prisma.question.findMany({
    where: params?.search
      ? {
          OR: [
            { title: { contains: params.search, mode: "insensitive" } },
            { content: { contains: params.search, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: { asker: true, _count: { select: { answers: true } } },
    orderBy: { createdAt: "desc" },
  });

  return questions.map((q) => ({
    id: q.id,
    askerId: q.askerId,
    askerName: `${q.asker.firstName} ${q.asker.lastName}`,
    title: q.title,
    content: q.content,
    category: q.category,
    courseCode: q.courseCode,
    status: q.status,
    answerCount: q._count.answers,
    createdAt: q.createdAt.toISOString(),
  }));
}

export async function createQuestion(data: {
  title: string;
  content: string;
  category: string;
  courseCode?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.question.create({
    data: {
      askerId: user.id,
      title: data.title,
      content: data.content,
      category: data.category as never,
      courseCode: data.courseCode,
    },
  });
}

export async function createAnswer(questionId: string, content: string): Promise<Answer> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: user.id },
  });

  if (!mentorProfile) {
    throw new Error("Only mentors can answer questions");
  }

  const answer = await prisma.answer.create({
    data: {
      questionId,
      mentorId: mentorProfile.id,
      content,
    },
  });

  return {
    id: answer.id,
    questionId: answer.questionId,
    mentorId: answer.mentorId,
    mentorName: `${user.firstName} ${user.lastName}`,
    content: answer.content,
    helpfulCount: answer.helpfulCount,
    isEndorsed: answer.isEndorsed,
    createdAt: answer.createdAt.toISOString(),
  };
}
