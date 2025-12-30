import { Suspense } from "react";
import { QuestionsFeed } from "./QuestionsFeed";

export default function QuestionsPage() {
  return (
    <Suspense>
      <QuestionsFeed />
    </Suspense>
  );
}
