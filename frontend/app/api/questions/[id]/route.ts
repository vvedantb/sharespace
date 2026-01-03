import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const question = await prisma.question.findUnique({
    where: { id },
    include: { asker: true, _count: { select: { answers: true } } },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: question.id,
    askerId: question.askerId,
    askerName: `${question.asker.firstName} ${question.asker.lastName}`,
    title: question.title,
    content: question.content,
    category: question.category,
    courseCode: question.courseCode,
    status: question.status,
    answerCount: question._count.answers,
    createdAt: question.createdAt,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing || existing.askerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const question = await prisma.question.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      courseCode: body.courseCode,
    },
    include: { asker: true, _count: { select: { answers: true } } },
  });

  return NextResponse.json({
    id: question.id,
    askerId: question.askerId,
    askerName: `${question.asker.firstName} ${question.asker.lastName}`,
    title: question.title,
    content: question.content,
    category: question.category,
    courseCode: question.courseCode,
    status: question.status,
    answerCount: question._count.answers,
    createdAt: question.createdAt,
  });
}
