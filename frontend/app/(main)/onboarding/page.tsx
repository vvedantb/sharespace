import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { OnboardingContent } from "./OnboardingContent";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.hasCompletedOnboarding) {
    redirect("/marketplace");
  }

  return (
    <OnboardingContent
      user={{
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatarUrl: user.avatarUrl,
        university: user.university,
        course: user.course,
        yearOfStudy: user.yearOfStudy,
        graduationYear: user.graduationYear,
        bio: user.bio,
      }}
    />
  );
}
