import { serverApi } from "@/lib/api-server";
import { EditProfileForm } from "./EditProfileForm";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function EditProfilePage() {
  const user = await serverApi.users.get(CURRENT_USER_ID);
  return <EditProfileForm user={user} />;
}
