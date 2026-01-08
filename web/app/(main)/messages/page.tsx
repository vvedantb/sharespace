import { Suspense } from "react";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MessagesInbox } from "./MessagesInbox";
import { loadMessagesSearchParams } from "./searchParams";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { user: initialUserId } = await loadMessagesSearchParams(searchParams);
  const user = await getCurrentUser();
  if (!user) redirect("/login");

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

  const formattedConversations = conversations.map((c) => {
    const otherParticipant =
      c.participant1Id === user.id ? c.participant2 : c.participant1;
    const lastMessage = c.messages[0];

    return {
      id: c.id,
      participantId: otherParticipant.id,
      participantName: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
      lastMessage: lastMessage?.content || null,
      lastMessageTime: dayjs(lastMessage?.sentAt || c.createdAt).toISOString(),
      unread: lastMessage
        ? !lastMessage.isRead && lastMessage.senderId !== user.id
        : false,
      itemId: c.itemId,
      itemTitle: c.item?.title || null,
    };
  });

  return (
    <div className="flex h-full flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Messages
      </h1>
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">Loading...</div>
        }
      >
        <MessagesInbox
          initialConversations={formattedConversations}
          currentUserId={user.id}
          initialUserId={initialUserId || undefined}
        />
      </Suspense>
    </div>
  );
}
