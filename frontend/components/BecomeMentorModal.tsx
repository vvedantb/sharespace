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
  Input,
  Textarea,
  Chip,
} from "@heroui/react";
import { IconPlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createMentor } from "@/lib/actions/mentors";

interface BecomeMentorModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BecomeMentorModal({ isOpen, onOpenChange }: BecomeMentorModalProps) {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  const createMentorMutation = useMutation({
    mutationFn: createMentor,
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
  });

  const isSubmitting = createMentorMutation.isPending;

  const addExpertise = () => {
    if (newExpertise.trim() && expertise.length < 6) {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const removeExpertise = (index: number) => {
    setExpertise(expertise.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMentorMutation.mutate({ bio, expertise });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setBio("");
      setExpertise([]);
      setNewExpertise("");
    }
    onOpenChange(open);
  };

  const isFormValid = bio.length >= 50 && expertise.length >= 2;

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Become a Mentor</ModalHeader>
          <ModalBody className="gap-4">
            <p className="text-sm text-default-500">
              Help fellow students by answering questions, endorsing quality items, and recommending resources.
            </p>

            <Textarea
              label="Mentor Bio"
              value={bio}
              onValueChange={setBio}
              minRows={3}
              placeholder="Tell students about yourself, your experience, and how you can help them..."
              variant="bordered"
              radius="lg"
              isRequired
              description={`${bio.length}/500 characters (minimum 50)`}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Areas of Expertise (2-6)
              </label>
              <div className="flex gap-2">
                <Input
                  value={newExpertise}
                  onValueChange={setNewExpertise}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
                  placeholder="e.g., Python, Calculus, Essay Writing"
                  variant="bordered"
                  radius="lg"
                />
                <Button
                  isIconOnly
                  color="secondary"
                  radius="lg"
                  onPress={addExpertise}
                  isDisabled={expertise.length >= 6}
                >
                  <IconPlus className="h-5 w-5" stroke={2} />
                </Button>
              </div>
              {expertise.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <Chip key={index} color="secondary" variant="flat" onClose={() => removeExpertise(index)}>
                      {skill}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-default-200 bg-default-50 p-3">
              <p className="text-sm font-medium text-foreground">Requirements</p>
              <ul className="mt-2 space-y-1 text-sm text-default-600">
                <li className={bio.length >= 50 ? "text-success" : ""}>
                  ✓ Bio with at least 50 characters
                </li>
                <li className={expertise.length >= 2 ? "text-success" : ""}>
                  ✓ At least 2 areas of expertise
                </li>
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" color="secondary" radius="lg" isDisabled={!isFormValid} isLoading={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
