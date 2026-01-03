import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { QuestionCategory } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const questions = await prisma.question.findMany({
    where: {
      ...(category && { category: category as QuestionCategory }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: { asker: true, _count: { select: { answers: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    questions.map((q) => ({
      id: q.id,
      askerId: q.askerId,
      askerName: `${q.asker.firstName} ${q.asker.lastName}`,
      title: q.title,
      content: q.content,
      category: q.category,
      courseCode: q.courseCode,
      status: q.status,
      answerCount: q._count.answers,
      createdAt: q.createdAt,
    }))
  );
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const question = await prisma.question.create({
    data: {
      askerId: user.id,
      title: body.title,
      content: body.content,
      category: body.category,
      courseCode: body.courseCode,
    },
    include: { asker: true },
  });

  return NextResponse.json(
    {
      id: question.id,
      askerId: question.askerId,
      askerName: `${question.asker.firstName} ${question.asker.lastName}`,
      title: question.title,
      content: question.content,
      category: question.category,
      courseCode: question.courseCode,
      status: question.status,
      answerCount: 0,
      createdAt: question.createdAt,
    },
    { status: 201 }
  );
}
