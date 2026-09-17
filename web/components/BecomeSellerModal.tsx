"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { becomeSeller } from "@/lib/actions/sellers";
import { overlayModalClassNames } from "@/lib/ui-surfaces";

interface BecomeSellerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BecomeSellerModal({ isOpen, onOpenChange }: BecomeSellerModalProps) {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const becomeSellerMutation = useMutation({
    mutationFn: becomeSeller,
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to become seller");
    },
  });

  const isSubmitting = becomeSellerMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    becomeSellerMutation.mutate({ bio });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setBio("");
      setError("");
    }
    onOpenChange(open);
  };

  const isFormValid = bio.length >= 30;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      size="lg"
      scrollBehavior="inside"
      shadow="none"
      classNames={{ ...overlayModalClassNames, body: "max-h-[60vh] overflow-y-auto" }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Become a Seller</ModalHeader>
          <ModalBody className="gap-4">
            <p className="text-sm text-default-500">
              Start listing your items on the marketplace and connect with fellow students.
            </p>

            {error && (
              <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">{error}</div>
            )}

            <div className="rounded-lg border border-danger-200 bg-danger-50 p-3">
              <p className="text-sm font-medium text-danger-700">What You Can Sell</p>
              <ul className="mt-2 space-y-1 text-sm text-danger-600">
                <li>• Textbooks and course materials</li>
                <li>• Lecture notes and revision packs</li>
                <li>• Electronics and gadgets</li>
                <li>• Furniture and dorm essentials</li>
              </ul>
            </div>

            <Textarea
              label="Seller Bio"
              value={bio}
              onValueChange={setBio}
              minRows={3}
              placeholder="Tell buyers about yourself and what you'll be selling..."
              variant="bordered"
              radius="lg"
              isRequired
              description={`${bio.length}/300 characters (minimum 30)`}
            />

            <div className="rounded-lg border border-default-200 bg-default-50 p-3">
              <p className="text-sm font-medium text-foreground">Guidelines</p>
              <ul className="mt-2 space-y-1 text-sm text-default-600">
                <li className={bio.length >= 30 ? "text-success" : ""}>
                  ✓ Bio with at least 30 characters
                </li>
                <li>• List items honestly with accurate descriptions</li>
                <li>• Respond to buyer messages promptly</li>
                <li>• Arrange safe pickup locations on campus</li>
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" color="danger" radius="lg" isDisabled={!isFormValid} isLoading={isSubmitting}>
              {isSubmitting ? "Setting up..." : "Start Selling"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
