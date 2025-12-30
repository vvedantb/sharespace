import { Suspense } from "react";
import { MessagesInbox } from "./MessagesInbox";

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesInbox />
    </Suspense>
  );
}
