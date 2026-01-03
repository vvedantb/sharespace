import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const answers = await prisma.answer.findMany({
    where: { questionId: id },
    include: { mentor: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    answers.map((a) => ({
      id: a.id,
      questionId: a.questionId,
      mentorId: a.mentorId,
      mentorName: `${a.mentor.firstName} ${a.mentor.lastName}`,
      content: a.content,
      helpfulCount: a.helpfulCount,
      isEndorsed: a.isEndorsed,
      createdAt: a.createdAt,
    }))
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mentorProfile = await prisma.mentorProfile.findUnique({
    where: { userId: user.id },
  });

  if (!mentorProfile) {
    return NextResponse.json(
      { error: "Only mentors can answer questions" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const [answer] = await prisma.$transaction([
    prisma.answer.create({
      data: {
        questionId: id,
        mentorId: user.id,
        content: body.content,
      },
      include: { mentor: true },
    }),
    prisma.mentorProfile.update({
      where: { userId: user.id },
      data: { totalAnswers: { increment: 1 } },
    }),
    prisma.question.update({
      where: { id },
      data: { status: "ANSWERED" },
    }),
  ]);

  return NextResponse.json(
    {
      id: answer.id,
      questionId: answer.questionId,
      mentorId: answer.mentorId,
      mentorName: `${answer.mentor.firstName} ${answer.mentor.lastName}`,
      content: answer.content,
      helpfulCount: answer.helpfulCount,
      isEndorsed: answer.isEndorsed,
      createdAt: answer.createdAt,
    },
    { status: 201 }
  );
}
