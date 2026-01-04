"use server";

import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Question, Answer } from "@/lib/types";
import { onQuestionAsked, onAnswerGiven, onAnswerMarkedHelpful } from "./gamification";

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
    views: q.views,
    answerCount: q._count.answers,
    createdAt: dayjs(q.createdAt).toISOString(),
  }));
}

export async function getTrendingQuestions(): Promise<Question[]> {
  const sevenDaysAgo = dayjs().subtract(7, "day").toDate();

  const questions = await prisma.question.findMany({
    where: {
      createdAt: { gte: sevenDaysAgo },
    },
    include: { asker: true, _count: { select: { answers: true } } },
    orderBy: [{ views: "desc" }, { createdAt: "desc" }],
    take: 5,
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
    views: q.views,
    answerCount: q._count.answers,
    createdAt: dayjs(q.createdAt).toISOString(),
  }));
}

export async function incrementQuestionViews(questionId: string) {
  await prisma.question.update({
    where: { id: questionId },
    data: { views: { increment: 1 } },
  });
}

export async function createQuestion(data: {
  title: string;
  content: string;
  category: string;
  courseCode?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const question = await prisma.question.create({
    data: {
      askerId: user.id,
      title: data.title,
      content: data.content,
      category: data.category as never,
      courseCode: data.courseCode,
    },
  });

  await onQuestionAsked(user.id);

  return question;
}

export async function createAnswer(questionId: string, content: string): Promise<Answer> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: user.id, status: "APPROVED" },
  });

  if (!mentorProfile) {
    throw new Error("Only mentors can answer questions");
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { askerId: true, title: true },
  });

  if (!question) throw new Error("Question not found");

  const answer = await prisma.answer.create({
    data: {
      questionId,
      mentorId: user.id,
      content,
    },
  });

  await prisma.mentorProfile.update({
    where: { id: mentorProfile.id },
    data: { totalAnswers: { increment: 1 } },
  });

  await prisma.notification.create({
    data: {
      userId: question.askerId,
      type: "ANSWER",
      title: "New Answer",
      description: `${user.firstName} ${user.lastName} answered your question: "${question.title.slice(0, 40)}${question.title.length > 40 ? "..." : ""}"`,
      link: `/questions/${questionId}`,
    },
  });

  await onAnswerGiven(user.id);

  return {
    id: answer.id,
    questionId: answer.questionId,
    mentorId: mentorProfile.id,
    mentorName: `${user.firstName} ${user.lastName}`,
    content: answer.content,
    helpfulCount: answer.helpfulCount,
    isEndorsed: answer.isEndorsed,
    isBestAnswer: answer.isBestAnswer,
    createdAt: dayjs(answer.createdAt).toISOString(),
  };
}

export async function markAnswerHelpful(answerId: string) {
  const user = await getCurrentUser();

  const answer = await prisma.answer.update({
    where: { id: answerId },
    data: {
      helpfulCount: { increment: 1 },
      isEndorsed: true,
    },
    include: { question: { select: { title: true } } },
  });

  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: answer.mentorId },
  });

  if (mentorProfile) {
    await prisma.mentorProfile.update({
      where: { id: mentorProfile.id },
      data: { helpfulAnswers: { increment: 1 } },
    });
  }

  await prisma.notification.create({
    data: {
      userId: answer.mentorId,
      type: "ENDORSEMENT",
      title: "Answer Marked Helpful",
      description: `${user?.firstName ?? "Someone"} found your answer helpful on "${answer.question.title.slice(0, 30)}..."`,
      link: `/questions/${answer.questionId}`,
    },
  });

  await onAnswerMarkedHelpful(answer.mentorId);

  return answer.helpfulCount + 1;
}

export async function markBestAnswer(answerId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
    include: { question: true },
  });

  if (!answer) throw new Error("Answer not found");
  if (answer.question.askerId !== user.id) throw new Error("Only the question asker can mark best answer");

  await prisma.answer.updateMany({
    where: { questionId: answer.questionId },
    data: { isBestAnswer: false },
  });

  await prisma.answer.update({
    where: { id: answerId },
    data: { isBestAnswer: true },
  });

  await prisma.question.update({
    where: { id: answer.questionId },
    data: { status: "ANSWERED" },
  });
}
