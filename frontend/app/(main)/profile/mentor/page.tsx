"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Chip, Card, CardBody } from "@heroui/react";
import { IconArrowLeft, IconSchool, IconPlus, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createMentor } from "@/lib/actions/mentors";

export default function MentorApplicationPage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  const createMentorMutation = useMutation({
    mutationFn: createMentor,
    onSuccess: () => router.push("/profile"),
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

  const isFormValid = bio.length >= 50 && expertise.length >= 2;

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
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondary-100 p-3">
            <IconSchool className="h-6 w-6 text-secondary" stroke={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Become a Mentor
            </h1>
            <p className="mt-1 text-default-500">
              Help fellow students and build your reputation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card className="mb-8 border border-secondary-200 bg-secondary-50">
          <CardBody className="p-6">
            <h2 className="font-semibold text-secondary">
              What Mentors Do
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-secondary-600">
              <li>• Answer academic and student-life questions</li>
              <li>• Endorse quality items and sellers</li>
              <li>• Recommend textbooks and resources</li>
              <li>• Help new students navigate university life</li>
            </ul>
          </CardBody>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            label="Mentor Bio"
            value={bio}
            onValueChange={setBio}
            minRows={4}
            placeholder="Tell students about yourself, your experience, and how you can help them..."
            variant="bordered"
            radius="lg"
            isRequired
            description={`${bio.length}/500 characters (minimum 50)`}
            classNames={{
              inputWrapper: "focus-within:border-secondary focus-within:ring-secondary/20",
            }}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Areas of Expertise * (2-6)
            </label>
            <div className="flex gap-2">
              <Input
                value={newExpertise}
                onValueChange={setNewExpertise}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
                placeholder="e.g., Python, Calculus, Essay Writing"
                variant="bordered"
                radius="lg"
                classNames={{
                  inputWrapper: "focus-within:border-secondary focus-within:ring-secondary/20",
                }}
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
                  <Chip
                    key={index}
                    color="secondary"
                    variant="flat"
                    onClose={() => removeExpertise(index)}
                  >
                    {skill}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          <Card className="border border-default-200 bg-default-50">
            <CardBody className="p-4">
              <h3 className="font-medium text-foreground">Requirements</h3>
              <ul className="mt-2 space-y-1 text-sm text-default-600">
                <li className={bio.length >= 50 ? "text-success" : ""}>
                  ✓ Bio with at least 50 characters
                </li>
                <li className={expertise.length >= 2 ? "text-success" : ""}>
                  ✓ At least 2 areas of expertise
                </li>
                <li className="text-success">
                  ✓ Verified university email
                </li>
              </ul>
            </CardBody>
          </Card>

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
              color="secondary"
              radius="lg"
              fullWidth
              isDisabled={!isFormValid}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Apply to be a Mentor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
