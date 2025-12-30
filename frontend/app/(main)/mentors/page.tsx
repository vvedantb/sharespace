import { Suspense } from "react";
import { MentorsClient } from "./client";

export default function MentorsPage() {
  return (
    <Suspense>
      <MentorsClient />
    </Suspense>
  );
}
