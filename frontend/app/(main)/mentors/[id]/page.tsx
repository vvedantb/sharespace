import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MentorDetail } from "./MentorDetail";

export default async function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

  return (
    <MentorDetail
      mentor={{
        userId: mentor.userId,
        bio: mentor.bio,
        expertise: mentor.expertise,
        totalAnswers: mentor.totalAnswers,
        endorsements: mentor.endorsements,
        user: {
          firstName: mentor.user.firstName,
          lastName: mentor.user.lastName,
          course: mentor.user.course,
          university: mentor.user.university,
        },
      }}
    />
  );
}
