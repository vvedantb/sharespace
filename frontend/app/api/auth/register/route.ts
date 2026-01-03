import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: body.email }, { cognitoId: body.cognitoId }],
    },
  });

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      cognitoId: body.cognitoId,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      university: body.university,
    },
  });

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      university: user.university,
      course: user.course,
      yearOfStudy: user.yearOfStudy,
      bio: user.bio,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
    { status: 201 }
  );
}
