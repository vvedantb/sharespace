import { Suspense } from "react";
import { MentorDirectory } from "./MentorDirectory";

export default function MentorsPage() {
  return (
    <Suspense>
      <MentorDirectory />
    </Suspense>
  );
}
