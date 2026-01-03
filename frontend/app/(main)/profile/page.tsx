import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ProfileContent } from "./ProfileContent";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const listings = await prisma.item.findMany({
    where: { sellerId: user.id },
    select: { status: true },
  });

  const stats = {
    itemsListed: listings.length,
    itemsSold: listings.filter((i) => i.status === "SOLD").length,
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
        bio: user.bio,
      }}
      stats={stats}
    />
  );
}
