const CONDITION_DISCOUNTS: Record<string, number> = {
  NEW: 0.1,
  LIKE_NEW: 0.25,
  GOOD: 0.4,
  FAIR: 0.55,
  POOR: 0.7,
};

const CATEGORY_CO2_KG: Record<string, number> = {
  TEXTBOOKS: 2.5,
  ELECTRONICS: 50,
  CLOTHING: 10,
  FURNITURE: 30,
  STATIONERY: 1,
  OTHER: 5,
};

export function calculateMoneySaved(price: number, condition: string): number {
  const discount = CONDITION_DISCOUNTS[condition] ?? 0.3;
  const retailPrice = price / (1 - discount);
  return retailPrice - price;
}

export function calculateCO2Saved(category: string): number {
  return CATEGORY_CO2_KG[category] ?? 5;
}

export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg.toFixed(0)}kg`;
}

export function formatMoney(amount: number): string {
  if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(1)}k`;
  }
  return `£${amount.toFixed(0)}`;
}
