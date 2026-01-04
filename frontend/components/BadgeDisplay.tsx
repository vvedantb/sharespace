"use client";

import { Card, CardBody, Tooltip } from "@heroui/react";
import {
  IconTrophy,
  IconStar,
  IconShoppingCart,
  IconHeart,
  IconMessageCircle,
  IconHelpCircle,
} from "@tabler/icons-react";
import { UserBadge } from "@/lib/types";

const iconMap: Record<string, typeof IconTrophy> = {
  trophy: IconTrophy,
  star: IconStar,
  "shopping-cart": IconShoppingCart,
  heart: IconHeart,
  "message-circle": IconMessageCircle,
  "help-circle": IconHelpCircle,
};

const categoryColors: Record<string, string> = {
  SELLER: "text-amber-500",
  BUYER: "text-blue-500",
  MENTOR: "text-purple-500",
  COMMUNITY: "text-green-500",
};

interface BadgeDisplayProps {
  badges: UserBadge[];
  points: number;
}

export function BadgeDisplay({ badges, points }: BadgeDisplayProps) {
  if (badges.length === 0 && points === 0) {
    return null;
  }

  return (
    <Card className="border border-default-200" shadow="none">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Achievements</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <IconStar className="h-4 w-4" stroke={2} fill="currentColor" />
            <span className="font-bold">{points}</span>
            <span className="text-xs text-default-500">pts</span>
          </div>
        </div>

        {badges.length === 0 ? (
          <p className="text-sm text-default-500">No badges earned yet. Keep participating!</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {badges.map((userBadge) => {
              const Icon = iconMap[userBadge.badge.icon] || IconTrophy;
              const colorClass = categoryColors[userBadge.badge.category] || "text-default-500";

              return (
                <Tooltip
                  key={userBadge.id}
                  content={
                    <div className="p-2">
                      <p className="font-semibold">{userBadge.badge.name}</p>
                      <p className="text-xs text-default-400">{userBadge.badge.description}</p>
                    </div>
                  }
                >
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-default-50 hover:bg-default-100 transition-colors cursor-pointer">
                    <Icon className={`h-8 w-8 ${colorClass}`} stroke={1.5} />
                    <span className="text-xs font-medium text-center text-foreground line-clamp-1">
                      {userBadge.badge.name}
                    </span>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
