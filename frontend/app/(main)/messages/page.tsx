"use client";
import React, { useState } from "react";
import { Input, Button, Avatar, Chip, ScrollShadow } from "@heroui/react";
import { IconSearch, IconSend, IconPhoto, IconMessageCircle, IconDotsVertical, IconPhone } from "@tabler/icons-react";

//  Conversations & Messages 
const CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "",
    lastMessage: "Sure, I can help you with the Python assignment.",
    time: "10:30 AM",
    unread: true,
    isOnline: true,
    context: "Mentorship Request", // Shows connection to Mentors page
    type: "mentor"
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "",
    lastMessage: "",
    time: "Yesterday",
    unread: false,
    isOnline: false,
    context: "Sony WH-1000XM4", // Shows connection to Marketplace
    type: "buyer"
  },
  {
    id: 3,
    name: "Emily Rose",
    avatar: "",
    lastMessage: "Thanks! I'll pick it up at the library.",
    time: "Mon",
    unread: false,
    isOnline: true,
    context: "Statistics Textbook",
    type: "seller"
  }
];

const MESSAGES_DATA: Record<number, any[]> = {
  1: [
    { id: 1, sender: "me", content: "Hi Sarah, I saw your profile on the mentor list.", time: "10:25 AM" },
    { id: 2, sender: "me", content: "Are you free to help with algorithms?", time: "10:26 AM" },
    { id: 3, sender: "Sarah Jenkins", content: "Hey! Yes, I actually have a slot open tomorrow.", time: "10:28 AM" },
    { id: 4, sender: "Sarah Jenkins", content: "Sure, I can help you with the Python assignment.", time: "10:30 AM" },
  ],
  2: [
    { id: 1, sender: "David Chen", content: "Hi, is this still available?", time: "Yesterday" },
    { id: 2, sender: "me", content: "Yes it is!", time: "Yesterday" },
    { id: 3, sender: "David Chen", content: "Is the price negotiable for the headphones?", time: "Yesterday" },
  ],
  3: [
    { id: 1, sender: "me", content: "Can we meet at the library?", time: "Mon" },
    { id: 2, sender: "Emily Rose", content: "Thanks! I'll pick it up at the library.", time: "Mon" },
  ]
};

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1); // Default to first chat
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const activeConversation = CONVERSATIONS.find(c => c.id === selectedChatId);
  const activeMessages = selectedChatId ? MESSAGES_DATA[selectedChatId] : [];

  // Filter sidebar based on search
  const filteredConvos = CONVERSATIONS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-5rem)] w-full p-4 flex flex-col md:flex-row gap-4">
      
      {/*  Left Sidebar: Conversation List */}
      <div className="w-full md:w-80 flex flex-col gap-4 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 dark:border-neutral-800">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <Input 
            placeholder="Search chats..." 
            radius="full" 
            startContent={<IconSearch size={16} className="text-gray-400" />}
            value={search}
            onValueChange={setSearch}
            classNames={{ inputWrapper: "bg-gray-100 dark:bg-neutral-900" }}
          />
        </div>

        {/* Chat List */}
        <ScrollShadow className="flex-1 overflow-y-auto">
          {filteredConvos.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setSelectedChatId(conv.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
                selectedChatId === conv.id 
                  ? "bg-red-50 dark:bg-red-900/20 border-red-600" 
                  : "hover:bg-gray-50 dark:hover:bg-neutral-900 border-transparent"
              }`}
            >
              <Avatar 
                src={conv.avatar} 
                size="md" 
                isBordered 
                color={conv.isOnline ? "success" : "default"} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className={`font-semibold text-sm truncate ${selectedChatId === conv.id ? "text-red-700 dark:text-red-400" : ""}`}>
                    {conv.name}
                  </h3>
                  <span className="text-[10px] text-gray-400">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate dark:text-gray-400">{conv.lastMessage}</p>
                
                {/* Context Badge (Mentor vs Item) */}
                {conv.type === "mentor" ? (
                    <span className="text-[10px] text-green-600 font-medium flex items-center gap-1 mt-1">
                        • Mentorship
                    </span>
                ) : (
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                        Re: {conv.context}
                    </span>
                )}
              </div>
            </div>
          ))}
        </ScrollShadow>
      </div>

      {/*  Right Side: Chat Window  */}
      <div className="flex-1 flex flex-col bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
        {activeConversation ? (
            <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-gray-50/50 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-3">
                        <Avatar src={activeConversation.avatar} isBordered color={activeConversation.isOnline ? "success" : "default"} />
                        <div>
                            <h2 className="font-bold">{activeConversation.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-green-600 flex items-center gap-1">
                                    {activeConversation.isOnline ? "• Active now" : <span className="text-gray-400">• Offline</span>}
                                </span>
                                {/* Context Chip */}
                                <Chip size="sm" variant="flat" className="h-5 text-[10px] bg-gray-200 dark:bg-neutral-800 text-gray-600">
                                    {activeConversation.context}
                                </Chip>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button isIconOnly variant="light" size="sm"><IconPhone size={20} /></Button>
                        <Button isIconOnly variant="light" size="sm"><IconDotsVertical size={20} /></Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollShadow className="flex-1 p-4 space-y-4 bg-gray-50 dark:bg-black">
                    {activeMessages.map((msg) => {
                        const isMe = msg.sender === "me";
                        return (
                            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                                    isMe 
                                        ? "bg-red-700 text-white rounded-tr-none" 
                                        : "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-tl-none border border-gray-100 dark:border-neutral-700"
                                }`}>
                                    <p className="text-sm">{msg.content}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? "text-red-200" : "text-gray-400"}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollShadow>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-black border-t border-gray-100 dark:border-neutral-800 flex gap-2 items-center">
                    <Button isIconOnly variant="light" className="text-gray-400"><IconPhoto size={20} /></Button>
                    <Input 
                        placeholder="Type a message..." 
                        radius = "full"
                        value={inputText}
                        onValueChange={setInputText}
                        classNames={{ inputWrapper: "bg-gray-100 dark:bg-neutral-900" }}
                        fullWidth
                    />
                    <Button isIconOnly className="bg-red-700 text-white shadow-lg">
                        <IconSend size={18} />
                    </Button>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <IconMessageCircle size={64} stroke={1} />
                <p>Select a conversation</p>
            </div>
        )}
      </div>
    </div>
  );
}
