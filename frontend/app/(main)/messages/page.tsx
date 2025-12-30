import { Suspense } from "react";
import { MessagesClient } from "./client";

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesClient />
    </Suspense>
  );
}
