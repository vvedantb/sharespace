import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LeaderboardContent } from "./LeaderboardContent";

export default async function LeaderboardPage() {
  const mentors = await prisma.mentorProfile.findMany({
    where: { status: "APPROVED" },
    include: { user: true },
    orderBy: { helpfulAnswers: "desc" },
    take: 20,
  });

  const formattedMentors = mentors.map((mentor, index) => ({
    id: mentor.id,
    rank: index + 1,
    name: `${mentor.user.firstName} ${mentor.user.lastName}`,
    course: mentor.user.course,
    helpfulAnswers: mentor.helpfulAnswers,
    totalAnswers: mentor.totalAnswers,
    endorsements: mentor.endorsements,
  }));

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Mentor Leaderboard</h1>
        <Link href="/mentors" className="text-sm text-danger hover:underline">
          View All Mentors
        </Link>
      </div>
      <p className="mt-2 text-default-500">Top mentors ranked by helpful answers</p>
      <LeaderboardContent mentors={formattedMentors} />
    </div>
  );
}
