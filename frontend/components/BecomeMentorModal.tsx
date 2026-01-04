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
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconPlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createMentor } from "@/lib/actions/mentors";
import { MentorType } from "@/lib/types";

const yearOptions = [
  { value: "3", label: "Year 3" },
  { value: "4", label: "Year 4" },
  { value: "5", label: "Postgraduate" },
];

interface BecomeMentorModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userYearOfStudy?: number | null;
}

export function BecomeMentorModal({ isOpen, onOpenChange, userYearOfStudy }: BecomeMentorModalProps) {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");
  const [mentorType, setMentorType] = useState<MentorType>("STUDENT");
  const [yearOfStudy, setYearOfStudy] = useState(
    userYearOfStudy && userYearOfStudy >= 3 ? userYearOfStudy.toString() : "3"
  );
  const [graduationYear, setGraduationYear] = useState("");
  const [error, setError] = useState("");

  const createMentorMutation = useMutation({
    mutationFn: createMentor,
    onSuccess: () => {
      onOpenChange(false);
      router.refresh();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to submit application");
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
    setError("");
    createMentorMutation.mutate({
      bio,
      expertise,
      mentorType,
      yearOfStudy: mentorType === "STUDENT" ? parseInt(yearOfStudy) : undefined,
      graduationYear: mentorType === "ALUMNI" ? parseInt(graduationYear) : undefined,
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setBio("");
      setExpertise([]);
      setNewExpertise("");
      setMentorType("STUDENT");
      setYearOfStudy("3");
      setGraduationYear("");
      setError("");
    }
    onOpenChange(open);
  };

  const currentYear = new Date().getFullYear();
  const isGraduationYearValid =
    mentorType === "ALUMNI"
      ? graduationYear && parseInt(graduationYear) <= currentYear && parseInt(graduationYear) >= currentYear - 20
      : true;

  const isFormValid =
    bio.length >= 50 &&
    expertise.length >= 2 &&
    (mentorType === "STUDENT" ? parseInt(yearOfStudy) >= 3 : isGraduationYearValid);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Become a Mentor</ModalHeader>
          <ModalBody className="gap-4">
            <p className="text-sm text-default-500">
              Help fellow students by answering questions, endorsing quality items, and recommending resources.
            </p>

            {error && (
              <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">{error}</div>
            )}

            <RadioGroup
              label="I am a..."
              value={mentorType}
              onValueChange={(value) => setMentorType(value as MentorType)}
              orientation="horizontal"
            >
              <Radio value="STUDENT">Current Student (Year 3+)</Radio>
              <Radio value="ALUMNI">Alumni (Graduated)</Radio>
            </RadioGroup>

            {mentorType === "STUDENT" && (
              <Select
                label="Year of Study"
                selectedKeys={[yearOfStudy]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected) setYearOfStudy(selected.toString());
                }}
                variant="bordered"
                radius="lg"
                description="Mentors must be in year 3 or above"
              >
                {yearOptions.map((option) => (
                  <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
              </Select>
            )}

            {mentorType === "ALUMNI" && (
              <Input
                type="number"
                label="Graduation Year"
                value={graduationYear}
                onValueChange={setGraduationYear}
                placeholder={`e.g. ${currentYear - 1}`}
                variant="bordered"
                radius="lg"
                min={currentYear - 20}
                max={currentYear}
                isInvalid={graduationYear !== "" && !isGraduationYearValid}
                errorMessage="Please enter a valid graduation year"
              />
            )}

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
                <li className={mentorType === "STUDENT" ? (parseInt(yearOfStudy) >= 3 ? "text-success" : "") : (isGraduationYearValid ? "text-success" : "")}>
                  ✓ {mentorType === "STUDENT" ? "Year 3 or above" : "Valid graduation year"}
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-warning-200 bg-warning-50 p-3">
              <p className="text-sm text-warning-700">
                Your application will be reviewed by an admin before you can start mentoring.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" color="secondary" radius="lg" isDisabled={!isFormValid} isLoading={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
