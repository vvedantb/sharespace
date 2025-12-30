import { Suspense } from "react";
import { MarketplaceClient } from "./client";

export default function MarketplacePage() {
  return (
    <Suspense>
      <MarketplaceClient />
    </Suspense>
  );
}
