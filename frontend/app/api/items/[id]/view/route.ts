import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.item.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return new NextResponse(null, { status: 204 });
}
