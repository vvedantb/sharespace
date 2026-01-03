"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { IconHeart, IconMessageCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { saveItem, unsaveItem } from "@/lib/actions/items";

interface ItemActionsProps {
  itemId: string;
  sellerId: string;
}

export function ItemActions({ itemId, sellerId }: ItemActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: (saved: boolean) => saved ? unsaveItem(itemId) : saveItem(itemId),
    onSuccess: () => setIsSaved(!isSaved),
  });

  const handleSave = () => saveMutation.mutate(isSaved);

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
    </div>
  );
}
