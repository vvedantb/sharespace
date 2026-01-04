"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Chip, Image, useDisclosure } from "@heroui/react";
import { IconPhoto, IconArrowLeft, IconStar, IconCheck, IconEdit, IconRosetteDiscountCheck } from "@tabler/icons-react";
import { ItemActions } from "./ItemActions";
import { ReviewModal } from "./ReviewModal";
import { MarkAsSoldModal } from "@/components/MarkAsSoldModal";
import { EditItemModal } from "@/components/EditItemModal";

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
    status: string;
    university: string | null;
    images: string[];
    sellerId: string;
    sellerName: string;
    sellerRating?: number;
    isMentorRecommended?: boolean;
    isVerifiedSeller?: boolean;
  };
  isMentor?: boolean;
  currentUserId?: string;
  initialSaved?: boolean;
}

export function ItemDetail({ item, isMentor, currentUserId, initialSaved }: ItemDetailProps) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const { isOpen: isSoldModalOpen, onOpen: onSoldModalOpen, onOpenChange: onSoldModalOpenChange } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalOpenChange } = useDisclosure();
  const canReview = currentUserId && currentUserId !== item.sellerId;
  const isOwner = currentUserId === item.sellerId;
  const isSold = item.status === "SOLD";

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
        <div className="aspect-square overflow-hidden rounded-2xl bg-default-100 flex items-center justify-center relative">
          {item.images && item.images.length > 0 ? (
            <Image src={item.images[0]} alt={item.title} className="h-full w-full object-cover" radius="lg" />
          ) : (
            <IconPhoto className="h-20 w-20 text-default-300" stroke={1.5} />
          )}
          {item.isMentorRecommended && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-success-500 px-2 py-1 text-xs text-white">
              <IconStar className="h-3 w-3" />
              Mentor Pick
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
            {isSold && (
              <Chip color="success" variant="flat" startContent={<IconCheck className="h-3 w-3" />}>
                Sold
              </Chip>
            )}
          </div>
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
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{item.sellerName}</p>
                {item.isVerifiedSeller && (
                  <span className="flex items-center gap-1 text-xs text-success-600">
                    <IconRosetteDiscountCheck className="h-4 w-4" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-default-500">
                {item.sellerRating && item.sellerRating > 0
                  ? `${item.sellerRating.toFixed(1)}★`
                  : "No rating yet"}
              </p>
            </div>
            {canReview && (
              <Button size="sm" variant="flat" onPress={() => setReviewOpen(true)}>
                Leave Review
              </Button>
            )}
          </div>

          <ItemActions itemId={item.id} sellerId={item.sellerId} currentUserId={currentUserId} isMentor={isMentor} isMentorRecommended={item.isMentorRecommended} initialSaved={initialSaved} />

          {isOwner && !isSold && (
            <div className="mt-3 flex gap-2">
              <Button
                color="default"
                variant="bordered"
                radius="lg"
                fullWidth
                startContent={<IconEdit className="h-5 w-5" stroke={2} />}
                onPress={onEditModalOpen}
              >
                Edit
              </Button>
              <Button
                color="success"
                variant="bordered"
                radius="lg"
                fullWidth
                startContent={<IconCheck className="h-5 w-5" stroke={2} />}
                onPress={onSoldModalOpen}
              >
                Mark as Sold
              </Button>
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        revieweeId={item.sellerId}
        itemId={item.id}
      />

      <MarkAsSoldModal
        isOpen={isSoldModalOpen}
        onOpenChange={onSoldModalOpenChange}
        itemId={item.id}
        itemTitle={item.title}
      />

      <EditItemModal
        isOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
        item={{
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          condition: item.condition,
        }}
      />
    </div>
  );
}
