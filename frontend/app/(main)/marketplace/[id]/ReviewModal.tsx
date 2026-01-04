"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from "@heroui/react";
import { IconStar } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/lib/actions/reviews";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  revieweeId: string;
  itemId: string;
}

export function ReviewModal({ isOpen, onClose, revieweeId, itemId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: () => createReview({ revieweeId, itemId, rating, comment: comment || undefined }),
    onSuccess: () => {
      setRating(0);
      setComment("");
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Leave a Review</ModalHeader>
        <ModalBody>
          <div className="flex justify-center gap-1 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <IconStar
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-warning text-warning"
                      : "text-default-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            label="Comment (optional)"
            placeholder="Share your experience..."
            value={comment}
            onValueChange={setComment}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            isDisabled={rating === 0}
            isLoading={mutation.isPending}
            onPress={() => mutation.mutate()}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
