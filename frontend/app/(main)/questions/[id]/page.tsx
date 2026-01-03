import Link from "next/link";
import { serverApi } from "@/lib/api-server";
import { QuestionDetail } from "./QuestionDetail";

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const question = await serverApi.questions.get(id);
  const answers = await serverApi.questions.getAnswers(id);

  return <QuestionDetail question={question} initialAnswers={answers} />;
}
