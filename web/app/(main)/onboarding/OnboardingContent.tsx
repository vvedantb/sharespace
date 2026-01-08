"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { ProfileOnboardingModal } from "@/components/ProfileOnboardingModal";

interface OnboardingContentProps {
  user: User;
}

export function OnboardingContent({ user }: OnboardingContentProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ProfileOnboardingModal user={user} isOpen={isOpen} onComplete={() => setIsOpen(false)} />
    </div>
  );
}
