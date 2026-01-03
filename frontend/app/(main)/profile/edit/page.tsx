import { prisma } from "@/lib/prisma";
import { EditProfileForm } from "./EditProfileForm";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function EditProfilePage() {
  const user = await prisma.user.findUnique({
    where: { id: CURRENT_USER_ID },
  });

  if (!user) {
    return <div className="px-4 py-6">User not found</div>;
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
