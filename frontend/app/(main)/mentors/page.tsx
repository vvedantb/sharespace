import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MentorDirectory } from "./MentorDirectory";

export default async function MentorsPage() {
  const currentUser = await getCurrentUser();

  const [mentors, isMentor] = await Promise.all([
    prisma.mentorProfile.findMany({
      include: { user: true },
      orderBy: { endorsements: "desc" },
    }),
    currentUser
      ? prisma.mentorProfile.findUnique({ where: { userId: currentUser.id } }).then(Boolean)
      : false,
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
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">Mentors</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get help from experienced students
      </p>
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">Loading...</div>
        }
      >
        <MentorDirectory initialMentors={formattedMentors} isMentor={isMentor} />
      </Suspense>
    </div>
  );
}
