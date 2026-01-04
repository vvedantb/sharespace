"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { IconHeart, IconMessageCircle, IconStar } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { saveItem, unsaveItem, recommendItem } from "@/lib/actions/items";

interface ItemActionsProps {
  itemId: string;
  sellerId: string;
  currentUserId?: string;
  isMentor?: boolean;
  isMentorRecommended?: boolean;
}

export function ItemActions({ itemId, sellerId, currentUserId, isMentor, isMentorRecommended }: ItemActionsProps) {
  const isOwnItem = currentUserId === sellerId;
  const [isSaved, setIsSaved] = useState(false);
  const [recommended, setRecommended] = useState(isMentorRecommended ?? false);

  const saveMutation = useMutation({
    mutationFn: (saved: boolean) => saved ? unsaveItem(itemId) : saveItem(itemId),
    onSuccess: () => setIsSaved(!isSaved),
  });

  const recommendMutation = useMutation({
    mutationFn: () => recommendItem(itemId),
    onSuccess: () => setRecommended(true),
  });

  const handleSave = () => saveMutation.mutate(isSaved);

  if (isOwnItem) return null;

  return (
    <div className="mt-6 flex gap-3">
      <Button
        as={Link}
        href={`/messages?user=${sellerId}`}
        color="danger"
        radius="lg"
        fullWidth
        startContent={<IconMessageCircle className="h-5 w-5" stroke={2} />}
      >
        Message
      </Button>
      <Button
        variant="bordered"
        radius="lg"
        isIconOnly
        color={isSaved ? "danger" : "default"}
        onPress={handleSave}
      >
        <IconHeart className="h-5 w-5" stroke={2} fill={isSaved ? "currentColor" : "none"} />
      </Button>
      {isMentor && !recommended && (
        <Button
          variant="bordered"
          radius="lg"
          color="success"
          isLoading={recommendMutation.isPending}
          onPress={() => recommendMutation.mutate()}
          startContent={<IconStar className="h-5 w-5" stroke={2} />}
        >
          Recommend
        </Button>
      )}
    </div>
  );
}
