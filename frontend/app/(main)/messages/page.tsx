import { prisma } from "@/lib/prisma";
import { MessagesInbox } from "./MessagesInbox";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function MessagesPage() {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ participant1Id: CURRENT_USER_ID }, { participant2Id: CURRENT_USER_ID }],
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
      c.participant1Id === CURRENT_USER_ID ? c.participant2 : c.participant1;
    const lastMessage = c.messages[0];

    return {
      id: c.id,
      participantId: otherParticipant.id,
      participantName: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
      lastMessage: lastMessage?.content || null,
      lastMessageTime: (lastMessage?.sentAt || c.createdAt).toISOString(),
      unread: lastMessage ? !lastMessage.isRead && lastMessage.senderId !== CURRENT_USER_ID : false,
      itemId: c.itemId,
      itemTitle: c.item?.title || null,
    };
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 px-4 pt-4">
        <h1 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
          Messages
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Chat with other students about items
        </p>
      </div>
      <MessagesInbox initialConversations={formattedConversations} />
    </div>
  );
}
