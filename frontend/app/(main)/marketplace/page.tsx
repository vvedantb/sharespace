import { Suspense } from "react";
import { MarketplaceBrowser } from "./MarketplaceBrowser";

export default function MarketplacePage() {
  return (
    <Suspense>
      <MarketplaceBrowser />
    </Suspense>
  );
}
