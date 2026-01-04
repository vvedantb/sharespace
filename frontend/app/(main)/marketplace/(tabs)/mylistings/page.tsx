import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getMyItems } from "@/lib/actions/items";
import { MyListingsContent } from "./MyListingsContent";

export default async function MyListingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const items = await getMyItems();

  return <MyListingsContent initialItems={items} />;
}
