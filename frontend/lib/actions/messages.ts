"use server";

import { prisma } from "@/lib/prisma";
import { Message } from "@/lib/types";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

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
    sentAt: m.sentAt.toISOString(),
    isRead: m.isRead,
  }));
}

export async function sendMessage(conversationId: string, content: string): Promise<Message> {
  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: CURRENT_USER_ID,
      content,
    },
  });

  return {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    sentAt: message.sentAt.toISOString(),
    isRead: message.isRead,
  };
}

export async function markConversationRead(conversationId: string) {
  return prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: CURRENT_USER_ID },
      isRead: false,
    },
    data: { isRead: true },
  });
}
