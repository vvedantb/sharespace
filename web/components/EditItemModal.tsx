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
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { overlayModalClassNames, overlayPopoverProps } from "@/lib/ui-surfaces";
import { useMutation } from "@tanstack/react-query";
import { updateItem } from "@/lib/actions/items";

const CONDITIONS = [
  { value: "NEW", label: "New" },
  { value: "LIKE_NEW", label: "Like New" },
  { value: "GOOD", label: "Good" },
  { value: "FAIR", label: "Fair" },
  { value: "POOR", label: "Poor" },
];

interface EditItemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    condition: string;
  };
}

export function EditItemModal({ isOpen, onOpenChange, item }: EditItemModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [price, setPrice] = useState(item.price.toString());
  const [condition, setCondition] = useState(item.condition);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(item.title);
      setDescription(item.description ?? "");
      setPrice(item.price.toString());
      setCondition(item.condition);
      setError("");
    }
  }, [isOpen, item]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateItem(item.id, {
        title,
        description,
        price: parseFloat(price),
        condition,
      }),
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to update item");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || parseFloat(price) <= 0) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    updateMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" shadow="none" classNames={overlayModalClassNames}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit Listing</ModalHeader>
          <ModalBody className="gap-4">
            {error && (
              <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">{error}</div>
            )}

            <Input
              label="Title"
              value={title}
              onValueChange={setTitle}
              variant="bordered"
              isRequired
            />

            <Textarea
              label="Description"
              value={description}
              onValueChange={setDescription}
              variant="bordered"
              minRows={3}
            />

            <Input
              label="Price (£)"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onValueChange={setPrice}
              variant="bordered"
              isRequired
            />

            <Select
              label="Condition"
              selectedKeys={[condition]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                if (typeof selected === "string") setCondition(selected);
              }}
              variant="bordered"
              popoverProps={overlayPopoverProps}
            >
              {CONDITIONS.map((c) => (
                <SelectItem key={c.value}>{c.label}</SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              radius="lg"
              isLoading={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
