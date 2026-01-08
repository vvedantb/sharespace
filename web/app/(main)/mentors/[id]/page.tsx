import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { hasEndorsed } from "@/lib/actions/mentors";
import { MentorDetail } from "./MentorDetail";

export default async function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const mentor = await prisma.mentorProfile.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!mentor) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-foreground">Mentor not found</h1>
        <Link href="/mentors" className="mt-4 inline-block text-danger">
          Back to Mentors
        </Link>
      </div>
    );
  }

  const endorsed = await hasEndorsed(mentor.id);
  const rating = mentor.totalAnswers > 0 ? (mentor.helpfulAnswers / mentor.totalAnswers) * 5 : 0;

  return (
    <MentorDetail
      mentorId={mentor.id}
      mentor={{
        userId: mentor.userId,
        bio: mentor.bio,
        expertise: mentor.expertise,
        totalAnswers: mentor.totalAnswers,
        helpfulAnswers: mentor.helpfulAnswers,
        endorsements: mentor.endorsements,
        rating,
        user: {
          firstName: mentor.user.firstName,
          lastName: mentor.user.lastName,
          course: mentor.user.course,
          university: mentor.user.university,
        },
      }}
      hasEndorsed={endorsed}
      currentUserId={currentUser?.id}
    />
  );
}
