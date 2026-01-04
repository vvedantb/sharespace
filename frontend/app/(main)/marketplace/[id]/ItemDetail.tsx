"use client";

import Link from "next/link";
import { Avatar, Button, Image } from "@heroui/react";
import { IconPhoto, IconArrowLeft } from "@tabler/icons-react";
import { ItemActions } from "./ItemActions";

const conditionLabels: Record<string, string> = {
  NEW: "New",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor",
};

interface ItemDetailProps {
  item: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    condition: string;
    university: string | null;
    images: string[];
    sellerId: string;
    sellerName: string;
  };
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="px-4 py-6">
      <Button
        as={Link}
        href="/marketplace"
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-default-100 flex items-center justify-center">
          {item.images && item.images.length > 0 ? (
            <Image src={item.images[0]} alt={item.title} className="h-full w-full object-cover" radius="lg" />
          ) : (
            <IconPhoto className="h-20 w-20 text-default-300" stroke={1.5} />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
          <p className="mt-2 text-3xl font-bold text-danger">£{item.price.toFixed(2)}</p>

          <div className="mt-4 flex gap-2 text-sm text-default-500">
            <span>{conditionLabels[item.condition] || item.condition}</span>
            <span>·</span>
            <span>{item.university}</span>
          </div>

          <p className="mt-6 text-default-600">{item.description}</p>

          <div className="mt-8 flex items-center gap-3 border-t border-default-200 pt-6">
            <Avatar name={item.sellerName} size="md" color="danger" showFallback />
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.sellerName}</p>
              <p className="text-sm text-default-500">No rating yet</p>
            </div>
          </div>

          <ItemActions itemId={item.id} sellerId={item.sellerId} />
        </div>
      </div>
    </div>
  );
}
