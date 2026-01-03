"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Avatar, Button, Input, Card, CardBody } from "@heroui/react";
import { IconMessageCircle, IconSend, IconPhoto, IconSearch, IconX } from "@tabler/icons-react";
import { Conversation, Message } from "@/lib/types";
import { messagesSearchParams } from "./searchParams";
import { getMessages, sendMessage, markConversationRead } from "@/lib/actions/messages";

interface MessagesInboxProps {
  initialConversations: Conversation[];
  currentUserId: string;
}

export function MessagesInbox({ initialConversations, currentUserId }: MessagesInboxProps) {
  const [{ q, conversation }, setParams] = useQueryStates(messagesSearchParams);
  const [conversations] = useState(initialConversations);
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation = conversation || conversations[0]?.id || "";
  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", selectedConversation],
    queryFn: async () => {
      const data = await getMessages(selectedConversation);
      markConversationRead(selectedConversation).catch(() => {});
      return data;
    },
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendMessage(selectedConversation, content),
  });

  const filteredConversations = q
    ? conversations.filter((conv) =>
        conv.participantName.toLowerCase().includes(q.toLowerCase())
      )
    : conversations;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    sendMessageMutation.mutate(newMessage, {
      onSuccess: () => setNewMessage(""),
    });
  };

  return (
    <Card className="flex-1 overflow-hidden mx-4 mb-4 border border-default-200">
      <CardBody className="p-0">
        <div className="flex h-full">
          <div className="w-80 shrink-0 border-r border-default-200 flex flex-col">
            <div className="p-3 border-b border-default-200">
              <Input
                value={q}
                onValueChange={(value) => setParams({ q: value || null })}
                placeholder="Search conversations..."
                startContent={<IconSearch className="h-5 w-5 text-default-400" stroke={2} />}
                endContent={
                  q ? (
                    <button onClick={() => setParams({ q: null })} className="text-default-400 hover:text-default-600">
                      <IconX className="h-4 w-4" stroke={2} />
                    </button>
                  ) : null
                }
                variant="bordered"
                radius="lg"
                classNames={{ inputWrapper: "bg-default-50" }}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-default-500">
                  No conversations found
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setParams({ conversation: conv.id })}
                    className={`flex w-full items-center gap-3 border-b border-default-100 px-4 py-3 text-left transition-colors hover:bg-default-100 ${
                      selectedConversation === conv.id ? "bg-default-100" : ""
                    }`}
                  >
                    <Avatar name={conv.participantName} size="md" color="danger" showFallback isBordered={conv.unread} classNames={{ base: conv.unread ? "ring-success" : undefined }} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground truncate">
                          {conv.participantName}
                        </p>
                        <span className="text-xs text-default-400 shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="truncate text-sm text-default-500">
                        {conv.lastMessage}
                      </p>
                      {conv.itemTitle && (
                        <p className="truncate text-xs text-default-400">
                          Re: {conv.itemTitle}
                        </p>
                      )}
                    </div>
                    {conv.unread && (
                      <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-danger" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {selectedConv ? (
              <>
                <div className="flex items-center gap-3 border-b border-default-200 px-4 py-3">
                  <Avatar name={selectedConv.participantName} size="md" color="danger" showFallback isBordered classNames={{ base: "ring-success" }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">
                      {selectedConv.participantName}
                    </p>
                    <p className="text-xs text-success">Online</p>
                  </div>
                  {selectedConv.itemTitle && (
                    <div className="flex items-center gap-2 rounded-lg bg-default-100 px-3 py-1.5">
                      <IconPhoto className="h-4 w-4 text-default-400" stroke={1.5} />
                      <span className="text-sm text-default-600 truncate max-w-[150px]">
                        {selectedConv.itemTitle}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => {
                    const isOwn = msg.senderId === currentUserId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isOwn
                              ? "bg-danger text-white"
                              : "bg-default-100 text-foreground"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`mt-1 text-xs ${
                              isOwn ? "text-danger-200" : "text-default-400"
                            }`}
                          >
                            {msg.sentAt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-default-200 p-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onValueChange={setNewMessage}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      variant="bordered"
                      radius="lg"
                      classNames={{ inputWrapper: "bg-default-50" }}
                    />
                    <Button
                      onPress={handleSendMessage}
                      color="danger"
                      radius="lg"
                      isIconOnly
                    >
                      <IconSend className="h-5 w-5" stroke={2} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <IconMessageCircle
                    className="mx-auto h-16 w-16 text-default-300"
                    stroke={1.5}
                  />
                  <p className="mt-4 text-default-500">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
