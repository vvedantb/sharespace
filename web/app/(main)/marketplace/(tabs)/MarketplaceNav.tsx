"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, Tab, Button, useDisclosure } from "@heroui/react";
import { IconPlus, IconShoppingBag } from "@tabler/icons-react";
import { BecomeSellerModal } from "@/components/BecomeSellerModal";
import { CreateItemModal } from "../CreateItemModal";

interface MarketplaceNavProps {
  isSeller: boolean;
}

export function MarketplaceNav({ isSeller }: MarketplaceNavProps) {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isSellerModalOpen, onOpen: onSellerModalOpen, onOpenChange: onSellerModalOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex items-center justify-between mt-2">
        <Tabs
          selectedKey={pathname}
          color="danger"
          variant="underlined"
          classNames={{ tabList: "gap-4" }}
        >
          <Tab key="/marketplace/browse" as={Link} href="/marketplace/browse" title="Browse" />
          <Tab key="/marketplace/mylistings" as={Link} href="/marketplace/mylistings" title="My Listings" />
        </Tabs>
        {isSeller ? (
          <Button
            color="danger"
            radius="lg"
            size="sm"
            startContent={<IconPlus className="h-4 w-4" stroke={2} />}
            onPress={onOpen}
          >
            List Item
          </Button>
        ) : (
          <Button
            color="danger"
            radius="lg"
            size="sm"
            startContent={<IconShoppingBag className="h-4 w-4" stroke={2} />}
            onPress={onSellerModalOpen}
          >
            Become a Seller
          </Button>
        )}
      </div>
      {isSeller && <CreateItemModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {!isSeller && <BecomeSellerModal isOpen={isSellerModalOpen} onOpenChange={onSellerModalOpenChange} />}
    </>
  );
}
