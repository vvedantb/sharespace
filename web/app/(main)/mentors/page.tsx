import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MentorDirectory } from "./MentorDirectory";

export default async function MentorsPage() {
  const currentUser = await getCurrentUser();

  const [mentors, mentorProfile] = await Promise.all([
    prisma.mentorProfile.findMany({
      where: { status: "APPROVED" },
      include: { user: true },
      orderBy: { endorsements: "desc" },
    }),
    currentUser
      ? prisma.mentorProfile.findUnique({ where: { userId: currentUser.id } })
      : null,
  ]);

  const formattedMentors = mentors.map((m) => ({
    id: m.id,
    userId: m.userId,
    name: `${m.user.firstName} ${m.user.lastName}`,
    university: m.user.university,
    course: m.user.course,
    bio: m.bio,
    expertise: m.expertise,
    rating: 0,
    endorsements: m.endorsements,
    totalAnswers: m.totalAnswers,
    helpfulAnswers: m.helpfulAnswers,
    isVerified: m.isVerified,
    status: m.status,
    mentorType: m.mentorType,
  }));

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mentors</h1>
          <p className="mt-1 text-sm text-default-500">
            Get help from experienced students
          </p>
        </div>
        <Link href="/mentors/leaderboard" className="text-sm text-danger hover:underline">
          View Leaderboard
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">Loading...</div>
        }
      >
        <MentorDirectory
          initialMentors={formattedMentors}
          isMentor={mentorProfile?.status === "APPROVED"}
          mentorStatus={mentorProfile?.status}
          userYearOfStudy={currentUser?.yearOfStudy}
        />
      </Suspense>
    </div>
  );
}
