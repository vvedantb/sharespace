import { serverApi } from "@/lib/api-server";
import { MarketplaceBrowser } from "./MarketplaceBrowser";

export default async function MarketplacePage() {
  const items = await serverApi.items.list();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Marketplace
      </h1>
      <MarketplaceBrowser initialItems={items} />
    </div>
  );
}
