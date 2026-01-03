import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.$transaction([
    prisma.savedItem.create({
      data: { userId: user.id, itemId: id },
    }),
    prisma.item.update({
      where: { id },
      data: { saves: { increment: 1 } },
    }),
  ]);

  return new NextResponse(null, { status: 204 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.$transaction([
    prisma.savedItem.deleteMany({
      where: { userId: user.id, itemId: id },
    }),
    prisma.item.update({
      where: { id },
      data: { saves: { decrement: 1 } },
    }),
  ]);

  return new NextResponse(null, { status: 204 });
}
