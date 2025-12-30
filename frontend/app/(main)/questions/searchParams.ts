import { parseAsString, createLoader } from "nuqs/server";

export const questionsSearchParams = {
  q: parseAsString.withDefault(""),
};

export const loadQuestionsSearchParams = createLoader(questionsSearchParams);
