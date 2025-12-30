import { Suspense } from "react";
import { QuestionsClient } from "./client";

export default function QuestionsPage() {
  return (
    <Suspense>
      <QuestionsClient />
    </Suspense>
  );
}
