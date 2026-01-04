"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Avatar,
} from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getItemBuyers, markAsSold } from "@/lib/actions/items";

interface MarkAsSoldModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemTitle: string;
}

export function MarkAsSoldModal({ isOpen, onOpenChange, itemId, itemTitle }: MarkAsSoldModalProps) {
  const router = useRouter();
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [error, setError] = useState("");

  const { data: buyers = [], isLoading: loadingBuyers } = useQuery({
    queryKey: ["itemBuyers", itemId],
    queryFn: () => getItemBuyers(itemId),
    enabled: isOpen,
  });

  const markAsSoldMutation = useMutation({
    mutationFn: () => markAsSold(itemId, selectedBuyer),
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to mark as sold");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedBuyer("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuyer) {
      setError("Please select a buyer");
      return;
    }
    setError("");
    markAsSoldMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Mark as Sold</ModalHeader>
          <ModalBody className="gap-4">
            <p className="text-sm text-default-500">
              Mark &quot;{itemTitle}&quot; as sold and select the buyer.
            </p>

            {error && (
              <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">{error}</div>
            )}

            {loadingBuyers ? (
              <p className="text-sm text-default-400">Loading potential buyers...</p>
            ) : buyers.length === 0 ? (
              <div className="rounded-lg border border-warning-200 bg-warning-50 p-3">
                <p className="text-sm text-warning-700">
                  No conversations found for this item. The buyer may have messaged you directly.
                </p>
              </div>
            ) : (
              <Select
                label="Select Buyer"
                placeholder="Choose who bought this item"
                variant="bordered"
                selectedKeys={selectedBuyer ? [selectedBuyer] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (typeof selected === "string") setSelectedBuyer(selected);
                }}
              >
                {buyers.map((buyer) => (
                  <SelectItem key={buyer.id} textValue={buyer.name}>
                    <div className="flex items-center gap-2">
                      <Avatar name={buyer.name} size="sm" />
                      <span>{buyer.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              radius="lg"
              isDisabled={!selectedBuyer || buyers.length === 0}
              isLoading={markAsSoldMutation.isPending}
            >
              {markAsSoldMutation.isPending ? "Marking..." : "Mark as Sold"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
