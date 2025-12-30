import { parseAsString, createLoader } from "nuqs/server";

export const marketplaceSearchParams = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
};

export const loadMarketplaceSearchParams = createLoader(marketplaceSearchParams);
