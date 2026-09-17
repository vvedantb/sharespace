"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Textarea,
  addToast,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { createReport } from "@/lib/actions/reports";
import { overlayModalClassNames } from "@/lib/ui-surfaces";

const REPORT_REASONS = [
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "spam", label: "Spam or scam" },
  { value: "offensive", label: "Offensive behavior" },
  { value: "fake", label: "Fake listing" },
  { value: "other", label: "Other" },
];

interface ReportModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemId?: string;
  userId?: string;
  targetName: string;
}

export function ReportModal({ isOpen, onOpenChange, itemId, userId, targetName }: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const reportMutation = useMutation({
    mutationFn: () =>
      createReport({
        itemId,
        reportedUserId: userId,
        reason,
        description: description || undefined,
      }),
    onSuccess: () => {
      addToast({ title: "Report submitted", description: "Thank you for helping keep our community safe.", color: "success" });
      onOpenChange(false);
      setReason("");
      setDescription("");
    },
    onError: () => {
      addToast({ title: "Failed to submit report", color: "danger" });
    },
  });

  const handleSubmit = () => {
    if (!reason) return;
    reportMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} shadow="none" classNames={overlayModalClassNames}>
      <ModalContent>
        <ModalHeader>Report {itemId ? "Item" : "User"}</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-500 mb-4">
            You are reporting: <span className="font-medium text-foreground">{targetName}</span>
          </p>
          <RadioGroup label="Reason for reporting" value={reason} onValueChange={setReason}>
            {REPORT_REASONS.map((r) => (
              <Radio key={r.value} value={r.value}>
                {r.label}
              </Radio>
            ))}
          </RadioGroup>
          <Textarea
            label="Additional details (optional)"
            placeholder="Provide more context about this report..."
            value={description}
            onValueChange={setDescription}
            variant="bordered"
            className="mt-4"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleSubmit}
            isDisabled={!reason}
            isLoading={reportMutation.isPending}
          >
            Submit Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
