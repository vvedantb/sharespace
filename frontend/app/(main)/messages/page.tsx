import { Suspense } from "react";
import { MessagesInbox } from "./MessagesInbox";

export default function MessagesPage() {
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
      <Suspense>
        <MessagesInbox />
      </Suspense>
    </div>
  );
}
