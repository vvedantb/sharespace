"use client";

import { useState, useRef } from "react";
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
  Avatar,
} from "@heroui/react";
import { IconUser } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { completeProfileOnboarding, skipProfileOnboarding } from "@/lib/actions/users";
import { uploadToS3 } from "@/lib/upload";
import { overlayModalClassNames, overlayPopoverProps } from "@/lib/ui-surfaces";

const yearOptions = [
  { value: "1", label: "Year 1" },
  { value: "2", label: "Year 2" },
  { value: "3", label: "Year 3" },
  { value: "4", label: "Year 4" },
  { value: "5", label: "Postgraduate" },
];

interface ProfileOnboardingModalProps {
  user: User;
  isOpen: boolean;
  onComplete: () => void;
}

export function ProfileOnboardingModal({ user, isOpen, onComplete }: ProfileOnboardingModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("1");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadToS3(file, "avatars"),
  });

  const completeMutation = useMutation({
    mutationFn: completeProfileOnboarding,
    onSuccess: () => {
      onComplete();
      router.push("/marketplace");
    },
  });

  const skipMutation = useMutation({
    mutationFn: skipProfileOnboarding,
    onSuccess: () => {
      onComplete();
      router.push("/marketplace");
    },
  });

  const isSubmitting = uploadAvatarMutation.isPending || completeMutation.isPending;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleComplete = async () => {
    let avatarUrl: string | undefined;
    if (avatarFile) {
      avatarUrl = await uploadAvatarMutation.mutateAsync(avatarFile);
    }

    completeMutation.mutate({
      username: username || undefined,
      avatarUrl,
      university: university || undefined,
      course: course || undefined,
      yearOfStudy: parseInt(yearOfStudy),
      bio: bio || undefined,
    });
  };

  const handleSkip = () => {
    skipMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" scrollBehavior="inside" hideCloseButton isDismissable={false} shadow="none" classNames={overlayModalClassNames}>
      <ModalContent>
        <ModalHeader className="flex-col gap-1">
          <h2 className="text-xl">Welcome to ShareSpace!</h2>
          <p className="text-sm font-normal text-default-500">Complete your profile to get started</p>
        </ModalHeader>
        <ModalBody className="gap-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            <Avatar
              src={avatarPreview ?? undefined}
              name={`${user.firstName} ${user.lastName}`}
              size="lg"
              color="danger"
              showFallback
              className="h-20 w-20 text-xl"
              fallback={<IconUser className="h-10 w-10" stroke={1.5} />}
            />
            <Button variant="bordered" radius="lg" onPress={() => fileInputRef.current?.click()}>
              Add Photo
            </Button>
          </div>

          <Input
            label="Username"
            value={username}
            onValueChange={setUsername}
            variant="bordered"
            radius="lg"
            startContent={<span className="text-default-400">@</span>}
            placeholder="Choose a username"
          />

          <Input
            label="University"
            value={university}
            onValueChange={setUniversity}
            variant="bordered"
            radius="lg"
            placeholder="e.g. University of Manchester"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Course / Major"
              value={course}
              onValueChange={setCourse}
              variant="bordered"
              radius="lg"
              placeholder="e.g. Computer Science"
            />
            <Select
              label="Year of Study"
              selectedKeys={[yearOfStudy]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                if (selected) setYearOfStudy(selected.toString());
              }}
              variant="bordered"
              radius="lg"
              popoverProps={overlayPopoverProps}
            >
              {yearOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          <Textarea
            label="Bio"
            value={bio}
            onValueChange={setBio}
            variant="bordered"
            radius="lg"
            minRows={3}
            placeholder="Tell other students about yourself..."
          />
        </ModalBody>
        <ModalFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="light"
            radius="lg"
            onPress={handleSkip}
            isLoading={skipMutation.isPending}
            className="w-full sm:w-auto"
          >
            Skip for now
          </Button>
          <Button
            color="danger"
            radius="lg"
            isLoading={isSubmitting}
            onPress={handleComplete}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Complete Profile"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
