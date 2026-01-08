import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getSavedItems } from "@/lib/actions/items";
import { SavedItemsContent } from "./SavedItemsContent";

export default async function SavedItemsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const items = await getSavedItems();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Saved Items</h1>
      <p className="mt-1 text-sm text-default-500">Items you&apos;ve bookmarked</p>
      <SavedItemsContent initialItems={items} />
    </div>
  );
}
