"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Select, SelectItem, Avatar } from "@heroui/react";
import { IconUser, IconArrowLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { updateUser } from "@/lib/actions/users";
import { uploadToS3 } from "@/lib/upload";

interface EditProfileFormProps {
  user: User;
}

const yearOptions = [
  { value: "1", label: "Year 1" },
  { value: "2", label: "Year 2" },
  { value: "3", label: "Year 3" },
  { value: "4", label: "Year 4" },
  { value: "5", label: "Postgraduate" },
];

export function EditProfileForm({ user }: EditProfileFormProps) {
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

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadToS3(file, "avatars"),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof updateUser>[1]) => updateUser(user.id, data),
    onSuccess: () => router.push("/profile"),
  });

  const isSubmitting = uploadAvatarMutation.isPending || updateProfileMutation.isPending;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let avatarUrl = user.avatarUrl;
    if (avatarFile) {
      avatarUrl = await uploadAvatarMutation.mutateAsync(avatarFile);
    }

    updateProfileMutation.mutate({
      firstName,
      lastName,
      username,
      avatarUrl: avatarUrl ?? undefined,
      bio,
      course,
      yearOfStudy: parseInt(yearOfStudy),
    });
  };

  return (
    <div className="px-4 py-8">
      <Button
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        onPress={() => router.back()}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Edit Profile
        </h1>
        <p className="mt-2 text-default-500">
          Update your profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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

        <Input
          label="Email"
          value={user.email}
          isDisabled
          variant="bordered"
          radius="lg"
          description="Email cannot be changed"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Course / Major"
            value={course}
            onValueChange={setCourse}
            variant="bordered"
            radius="lg"
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
          minRows={4}
          placeholder="Tell other students about yourself..."
          description={`${bio.length}/200 characters`}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="bordered"
            radius="lg"
            fullWidth
            onPress={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            radius="lg"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
