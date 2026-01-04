"use client";

import { useState, useRef, useEffect } from "react";
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
import { updateUser } from "@/lib/actions/users";
import { uploadToS3 } from "@/lib/upload";

const yearOptions = [
  { value: "1", label: "Year 1" },
  { value: "2", label: "Year 2" },
  { value: "3", label: "Year 3" },
  { value: "4", label: "Year 4" },
  { value: "5", label: "Postgraduate" },
];

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileModal({ user, isOpen, onOpenChange }: EditProfileModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [course, setCourse] = useState(user.course ?? "");
  const [yearOfStudy, setYearOfStudy] = useState((user.yearOfStudy ?? 1).toString());
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatarUrl ?? null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username ?? "");
      setBio(user.bio ?? "");
      setCourse(user.course ?? "");
      setYearOfStudy((user.yearOfStudy ?? 1).toString());
      setAvatarFile(null);
      setAvatarPreview(user.avatarUrl ?? null);
      setError("");
    }
  }, [isOpen, user]);

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadToS3(file, "avatars"),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof updateUser>[1]) => updateUser(user.id, data),
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    },
  });

  const isSubmitting = uploadAvatarMutation.isPending || updateProfileMutation.isPending;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError("");
    try {
      let avatarUrl = user.avatarUrl;
      if (avatarFile) {
        avatarUrl = await uploadAvatarMutation.mutateAsync(avatarFile);
      }

      await updateProfileMutation.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim() || undefined,
        avatarUrl: avatarUrl ?? undefined,
        bio: bio.trim() || undefined,
        course: course.trim() || undefined,
        yearOfStudy: parseInt(yearOfStudy),
      });
    } catch {
      // Error is handled by mutation onError
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody className="gap-4">
          {error && (
            <div className="p-3 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger text-sm">
              {error}
            </div>
          )}

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
              name={`${firstName} ${lastName}`}
              size="lg"
              color="danger"
              showFallback
              className="h-20 w-20 text-xl"
              fallback={<IconUser className="h-10 w-10" stroke={1.5} />}
            />
            <Button variant="bordered" radius="lg" onPress={() => fileInputRef.current?.click()}>
              Change Photo
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="First Name"
              value={firstName}
              onValueChange={setFirstName}
              variant="bordered"
              radius="lg"
            />
            <Input
              label="Last Name"
              value={lastName}
              onValueChange={setLastName}
              variant="bordered"
              radius="lg"
            />
          </div>

          <Input
            label="Username"
            value={username}
            onValueChange={setUsername}
            variant="bordered"
            radius="lg"
            startContent={<span className="text-default-400">@</span>}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Course"
              value={course}
              onValueChange={setCourse}
              variant="bordered"
              radius="lg"
            />
            <Select
              label="Year of Study"
              selectedKeys={yearOfStudy ? [yearOfStudy] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                if (selected) setYearOfStudy(selected.toString());
              }}
              variant="bordered"
              radius="lg"
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
        <ModalFooter>
          <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button color="danger" radius="lg" isLoading={isSubmitting} onPress={handleSubmit}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
