"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, Tab } from "@heroui/react";

interface AnalyticsNavProps {
  isSeller: boolean;
}

export function AnalyticsNav({ isSeller }: AnalyticsNavProps) {
  const pathname = usePathname();

  return (
    <Tabs
      selectedKey={pathname}
      color="danger"
      variant="underlined"
      classNames={{ tabList: "gap-4 mt-2" }}
    >
      <Tab key="/analytics/profile" as={Link} href="/analytics/profile" title="Profile" />
      {isSeller && <Tab key="/analytics/seller" as={Link} href="/analytics/seller" title="Seller" />}
    </Tabs>
  );
}
