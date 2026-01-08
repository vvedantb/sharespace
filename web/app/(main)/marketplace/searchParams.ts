import { parseAsString, parseAsFloat, createLoader } from "nuqs/server";

export const marketplaceSearchParams = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
  minPrice: parseAsFloat.withDefault(0),
  maxPrice: parseAsFloat.withDefault(0),
  courseCode: parseAsString.withDefault(""),
  sortBy: parseAsString.withDefault("newest"),
};

export const loadMarketplaceSearchParams = createLoader(marketplaceSearchParams);
