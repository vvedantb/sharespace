import { parseAsString, createLoader } from "nuqs/server";

export const messagesSearchParams = {
  q: parseAsString.withDefault(""),
  conversation: parseAsString.withDefault(""),
  user: parseAsString.withDefault(""),
};

export const loadMessagesSearchParams = createLoader(messagesSearchParams);
