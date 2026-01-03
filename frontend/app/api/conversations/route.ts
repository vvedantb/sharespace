import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ participant1Id: user.id }, { participant2Id: user.id }],
    },
    include: {
      participant1: true,
      participant2: true,
      item: true,
      messages: {
        orderBy: { sentAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const unreadCounts = await prisma.message.groupBy({
    by: ["conversationId"],
    where: {
      conversationId: { in: conversations.map((c) => c.id) },
      senderId: { not: user.id },
      isRead: false,
    },
    _count: true,
  });

  const unreadMap = new Map(
    unreadCounts.map((u) => [u.conversationId, u._count])
  );

  return NextResponse.json(
    conversations.map((c) => {
      const otherParticipant =
        c.participant1Id === user.id ? c.participant2 : c.participant1;
      const lastMessage = c.messages[0];

      return {
        id: c.id,
        participantId: otherParticipant.id,
        participantName: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
        lastMessage: lastMessage?.content || null,
        lastMessageTime: lastMessage?.sentAt || c.createdAt,
        unread: (unreadMap.get(c.id) || 0) > 0,
        itemId: c.itemId,
        itemTitle: c.item?.title || null,
      };
    })
  );
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const existing = await prisma.conversation.findFirst({
    where: {
      OR: [
        { participant1Id: user.id, participant2Id: body.participantId },
        { participant1Id: body.participantId, participant2Id: user.id },
      ],
      ...(body.itemId && { itemId: body.itemId }),
    },
  });

  if (existing) {
    if (body.initialMessage) {
      await prisma.message.create({
        data: {
          conversationId: existing.id,
          senderId: user.id,
          content: body.initialMessage,
        },
      });
    }
    return NextResponse.json({ id: existing.id });
  }

  const conversation = await prisma.conversation.create({
    data: {
      participant1Id: user.id,
      participant2Id: body.participantId,
      itemId: body.itemId,
      ...(body.initialMessage && {
        messages: {
          create: {
            senderId: user.id,
            content: body.initialMessage,
          },
        },
      }),
    },
    include: {
      participant1: true,
      participant2: true,
      item: true,
    },
  });

  const otherParticipant =
    conversation.participant1Id === user.id
      ? conversation.participant2
      : conversation.participant1;

  return NextResponse.json(
    {
      id: conversation.id,
      participantId: otherParticipant.id,
      participantName: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
      lastMessage: body.initialMessage || null,
      lastMessageTime: conversation.createdAt,
      unread: false,
      itemId: conversation.itemId,
      itemTitle: conversation.item?.title || null,
    },
    { status: 201 }
  );
}
