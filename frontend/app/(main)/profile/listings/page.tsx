import { serverApi } from "@/lib/api-server";
import { ListingsManager } from "./ListingsManager";

const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export default async function ProfileListingsPage() {
  const listings = await serverApi.users.getListings(CURRENT_USER_ID);
  return <ListingsManager initialListings={listings} />;
}
