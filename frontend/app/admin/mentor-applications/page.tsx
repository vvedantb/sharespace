import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { MentorApplicationsList } from "./MentorApplicationsList";

export default async function MentorApplicationsPage() {
  const applications = await prisma.mentorProfile.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { appliedAt: "desc" },
  });

  const formattedApplications = applications.map((app) => ({
    id: app.id,
    userId: app.userId,
    userName: `${app.user.firstName} ${app.user.lastName}`,
    userEmail: app.user.email,
    university: app.user.university,
    course: app.user.course,
    yearOfStudy: app.user.yearOfStudy,
    graduationYear: app.user.graduationYear,
    bio: app.bio,
    expertise: app.expertise,
    mentorType: app.mentorType,
    appliedAt: dayjs(app.appliedAt).toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Mentor Applications</h1>
      <p className="mt-1 text-sm text-default-500">
        Review and approve mentor applications
      </p>
      <MentorApplicationsList initialApplications={formattedApplications} />
    </div>
  );
}
