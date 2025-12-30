import { Suspense } from "react";
import { MarketplaceBrowser } from "./MarketplaceBrowser";

export default function MarketplacePage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Marketplace
      </h1>
      <Suspense>
        <MarketplaceBrowser />
      </Suspense>
    </div>
  );
}
