"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { IconMessageCircle, IconSend, IconPhoto } from "@tabler/icons-react";
import { Conversation, Message } from "@/lib/types";
import { Avatar } from "@/components/Avatar";
import { SearchInput } from "@/components/SearchInput";
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
    <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black mx-4 mb-4">
        <div className="flex h-full">
          <div className="w-80 shrink-0 border-r border-gray-200 dark:border-neutral-800 flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-neutral-800">
              <SearchInput
                value={q}
                onChange={(value) => setParams({ q: value || null })}
                placeholder="Search conversations..."
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No conversations found
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setParams({ conversation: conv.id })}
                    className={`flex w-full items-center gap-3 border-b border-gray-100 dark:border-neutral-800 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900 ${
                      selectedConversation === conv.id ? "bg-gray-50 dark:bg-neutral-900" : ""
                    }`}
                  >
                    <Avatar name={conv.participantName} size="md" showOnline={conv.unread} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-black dark:text-white truncate">
                          {conv.participantName}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {conv.lastMessage}
                      </p>
                      {conv.itemTitle && (
                        <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                          Re: {conv.itemTitle}
                        </p>
                      )}
                    </div>
                    {conv.unread && (
                      <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-800 dark:bg-red-500" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {selectedConv ? (
              <>
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
                  <Avatar name={selectedConv.participantName} size="md" showOnline />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black dark:text-white">
                      {selectedConv.participantName}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-500">Online</p>
                  </div>
                  {selectedConv.itemTitle && (
                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-neutral-800 px-3 py-1.5">
                      <IconPhoto className="h-4 w-4 text-gray-400" stroke={1.5} />
                      <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
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
                              ? "bg-red-800 text-white dark:bg-red-700"
                              : "bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`mt-1 text-xs ${
                              isOwn ? "text-red-200" : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {msg.sentAt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-800 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-2.5 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="rounded-xl bg-red-800 px-4 py-2.5 text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
                    >
                      <IconSend className="h-5 w-5" stroke={2} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <IconMessageCircle
                    className="mx-auto h-16 w-16 text-gray-300 dark:text-neutral-700"
                    stroke={1.5}
                  />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
