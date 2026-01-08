import { parseAsString, createLoader } from "nuqs/server";

export const mentorsSearchParams = {
  q: parseAsString.withDefault(""),
};

export const loadMentorsSearchParams = createLoader(mentorsSearchParams);
