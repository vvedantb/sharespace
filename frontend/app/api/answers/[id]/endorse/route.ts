import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const answer = await prisma.answer.findUnique({
    where: { id },
    include: { question: true },
  });

  if (!answer) {
    return NextResponse.json({ error: "Answer not found" }, { status: 404 });
  }

  if (answer.question.askerId !== user.id) {
    return NextResponse.json(
      { error: "Only the question asker can endorse answers" },
      { status: 403 }
    );
  }

  await prisma.$transaction([
    prisma.answer.update({
      where: { id },
      data: { isEndorsed: true },
    }),
    prisma.mentorProfile.updateMany({
      where: { userId: answer.mentorId },
      data: { endorsements: { increment: 1 } },
    }),
  ]);

  return new NextResponse(null, { status: 204 });
}
