"use server";

import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Message, Conversation } from "@/lib/types";

export async function getMessages(conversationId: string): Promise<Message[]> {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { sentAt: "asc" },
  });

  return messages.map((m) => ({
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    content: m.content,
    sentAt: dayjs(m.sentAt).toISOString(),
    isRead: m.isRead,
  }));
}

export async function sendMessage(
  conversationId: string,
  content: string
): Promise<Message> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: user.id,
      content,
    },
  });

  return {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    sentAt: dayjs(message.sentAt).toISOString(),
    isRead: message.isRead,
  };
}

export async function markConversationRead(conversationId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: user.id },
      isRead: false,
    },
    data: { isRead: true },
  });
}

export async function getOrCreateConversation(otherUserId: string): Promise<Conversation> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (otherUserId === user.id) throw new Error("Cannot message yourself");

  const existing = await prisma.conversation.findFirst({
    where: {
      OR: [
        { participant1Id: user.id, participant2Id: otherUserId },
        { participant1Id: otherUserId, participant2Id: user.id },
      ],
    },
    include: {
      participant1: true,
      participant2: true,
      item: true,
      messages: { orderBy: { sentAt: "desc" }, take: 1 },
    },
  });

  if (existing) {
    const other = existing.participant1Id === user.id ? existing.participant2 : existing.participant1;
    const lastMsg = existing.messages[0];
    return {
      id: existing.id,
      participantId: other.id,
      participantName: `${other.firstName} ${other.lastName}`,
      lastMessage: lastMsg?.content || null,
      lastMessageTime: dayjs(lastMsg?.sentAt || existing.createdAt).toISOString(),
      unread: lastMsg ? !lastMsg.isRead && lastMsg.senderId !== user.id : false,
      itemId: existing.itemId,
      itemTitle: existing.item?.title || null,
    };
  }

  const otherUser = await prisma.user.findUnique({ where: { id: otherUserId } });
  if (!otherUser) throw new Error("User not found");

  const conversation = await prisma.conversation.create({
    data: { participant1Id: user.id, participant2Id: otherUserId },
  });

  return {
    id: conversation.id,
    participantId: otherUser.id,
    participantName: `${otherUser.firstName} ${otherUser.lastName}`,
    lastMessage: null,
    lastMessageTime: dayjs(conversation.createdAt).toISOString(),
    unread: false,
    itemId: null,
    itemTitle: null,
  };
}
