import { prisma } from "@/lib/prisma";
import { EditProfileForm } from "./EditProfileForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  const userData = await prisma.user.findUnique({
    where: { id: user?.id },
  });
  if (!user || !userData) {
    redirect("/login");
  }

  return (
    <EditProfileForm
      user={{
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        university: user.university,
        course: user.course,
        yearOfStudy: user.yearOfStudy,
        bio: user.bio,
      }}
    />
  );
}
