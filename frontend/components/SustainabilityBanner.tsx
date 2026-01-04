import { IconRecycle, IconCoin, IconLeaf } from "@tabler/icons-react";
import { formatMoney, formatCO2 } from "@/lib/sustainability";

interface SustainabilityBannerProps {
  stats: {
    itemsReused: number;
    moneySaved: number;
    co2Saved: number;
  };
}

export function SustainabilityBanner({ stats }: SustainabilityBannerProps) {
  if (stats.itemsReused === 0) return null;

  return (
    <div className="rounded-xl bg-success/10 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-6 text-success">
        <div className="flex items-center gap-2">
          <IconRecycle className="h-5 w-5" stroke={1.5} />
          <span className="text-sm">
            <span className="font-bold">{stats.itemsReused}</span> items reused
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconCoin className="h-5 w-5" stroke={1.5} />
          <span className="text-sm">
            <span className="font-bold">{formatMoney(stats.moneySaved)}</span> saved
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconLeaf className="h-5 w-5" stroke={1.5} />
          <span className="text-sm">
            <span className="font-bold">{formatCO2(stats.co2Saved)}</span> CO₂ prevented
          </span>
        </div>
      </div>
    </div>
  );
}
