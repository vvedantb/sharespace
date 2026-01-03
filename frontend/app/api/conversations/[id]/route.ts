import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      participant1: true,
      participant2: true,
      item: true,
      messages: {
        orderBy: { sentAt: "desc" },
        take: 1,
      },
    },
  });

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  if (
    conversation.participant1Id !== user.id &&
    conversation.participant2Id !== user.id
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const otherParticipant =
    conversation.participant1Id === user.id
      ? conversation.participant2
      : conversation.participant1;
  const lastMessage = conversation.messages[0];

  const unreadCount = await prisma.message.count({
    where: {
      conversationId: id,
      senderId: { not: user.id },
      isRead: false,
    },
  });

  return NextResponse.json({
    id: conversation.id,
    participantId: otherParticipant.id,
    participantName: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
    lastMessage: lastMessage?.content || null,
    lastMessageTime: lastMessage?.sentAt || conversation.createdAt,
    unread: unreadCount > 0,
    itemId: conversation.itemId,
    itemTitle: conversation.item?.title || null,
  });
}
