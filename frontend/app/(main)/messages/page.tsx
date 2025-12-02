const dummyUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    lastMessage: "Is the textbook still available?",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    name: "Sam Williams",
    lastMessage: "Thanks! I'll pick it up tomorrow",
    time: "1h",
    unread: false,
  },
  {
    id: 3,
    name: "Jordan Lee",
    lastMessage: "Can you do £15 for the lamp?",
    time: "3h",
    unread: false,
  },
  {
    id: 4,
    name: "Taylor Brown",
    lastMessage: "Perfect, see you then!",
    time: "1d",
    unread: false,
  },
  {
    id: 5,
    name: "Morgan Davis",
    lastMessage: "Is the condition really like new?",
    time: "2d",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Messages
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Chat with other students about items
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black">
        <div className="flex flex-col md:flex-row md:h-[600px]">
          <div className="border-b border-gray-200 dark:border-neutral-800 md:w-80 md:border-b-0 md:border-r">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-2 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
              />
            </div>
            <div className="max-h-64 overflow-y-auto md:max-h-none md:h-[calc(600px-72px)]">
              {dummyUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex cursor-pointer items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900 ${
                    user.id === 1 ? "bg-gray-50 dark:bg-neutral-900" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <span className="text-lg font-semibold text-red-800 dark:text-red-400">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-black dark:text-white truncate">
                        {user.name}
                      </p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {user.time}
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {user.lastMessage}
                    </p>
                  </div>
                  {user.unread && (
                    <div className="h-2 w-2 shrink-0 rounded-full bg-red-800 dark:bg-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <span className="font-semibold text-red-800 dark:text-red-400">
                  A
                </span>
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">
                  Alex Johnson
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Online
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-300 dark:text-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-neutral-800 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-4 py-2 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none dark:focus:border-red-600"
                />
                <button className="rounded-xl bg-red-800 px-4 py-2 text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
