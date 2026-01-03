"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Message } from "@/lib/types";

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
    sentAt: message.sentAt.toISOString(),
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
