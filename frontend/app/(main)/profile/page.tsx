import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Review } from "@/lib/types";
import { ProfileContent } from "./ProfileContent";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [listings, reviewsData, mentorProfile, dbUser] = await Promise.all([
    prisma.item.findMany({
      where: { sellerId: user.id },
      select: { status: true },
    }),
    prisma.review.findMany({
      where: { revieweeId: user.id },
      include: { reviewer: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.mentorProfile.findUnique({ where: { userId: user.id } }),
    prisma.user.findUnique({ where: { id: user.id }, select: { isSeller: true } }),
  ]);

  const reviews: Review[] = reviewsData.map((r) => ({
    id: r.id,
    reviewerId: r.reviewerId,
    reviewerName: `${r.reviewer.firstName} ${r.reviewer.lastName}`,
    rating: r.rating,
    comment: r.comment ?? "",
    createdAt: dayjs(r.createdAt).toISOString(),
  }));

  const rating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const stats = {
    itemsListed: listings.length,
    itemsSold: listings.filter((i) => i.status === "SOLD").length,
    rating,
  };

  return (
    <ProfileContent
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
      stats={stats}
      reviews={reviews}
      isMentor={mentorProfile?.status === "APPROVED"}
      mentorProfileId={mentorProfile?.id}
      mentorStatus={mentorProfile?.status}
      isSeller={dbUser?.isSeller ?? false}
    />
  );
}
