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
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      price: true,
      status: true,
      images: true,
    },
  });

  const serializedListings = listings.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  return (
    <ProfileContent
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        course: user.course,
        yearOfStudy: user.yearOfStudy,
      }}
      listings={serializedListings}
    />
  );
}
