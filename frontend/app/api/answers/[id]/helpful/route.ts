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

  const answer = await prisma.answer.findUnique({ where: { id } });
  if (!answer) {
    return NextResponse.json({ error: "Answer not found" }, { status: 404 });
  }

  await prisma.$transaction([
    prisma.answer.update({
      where: { id },
      data: { helpfulCount: { increment: 1 } },
    }),
    prisma.mentorProfile.updateMany({
      where: { userId: answer.mentorId },
      data: { helpfulAnswers: { increment: 1 } },
    }),
  ]);

  return new NextResponse(null, { status: 204 });
}
