"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, useDisclosure } from "@heroui/react";
import { IconMessageCircle, IconArrowLeft, IconThumbUp, IconFlag } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { endorseMentor } from "@/lib/actions/mentors";
import { ReportModal } from "@/components/ReportModal";

interface MentorDetailProps {
  mentorId: string;
  mentor: {
    userId: string;
    bio: string | null;
    expertise: string[];
    totalAnswers: number;
    helpfulAnswers: number;
    endorsements: number;
    rating: number;
    user: {
      firstName: string;
      lastName: string;
      course: string | null;
      university: string | null;
    };
  };
  hasEndorsed: boolean;
  currentUserId?: string;
}

export function MentorDetail({ mentorId, mentor, hasEndorsed, currentUserId }: MentorDetailProps) {
  const isOwnProfile = currentUserId === mentor.userId;
  const name = `${mentor.user.firstName} ${mentor.user.lastName}`;
  const [endorsed, setEndorsed] = useState(hasEndorsed);
  const [endorsements, setEndorsements] = useState(mentor.endorsements);
  const { isOpen: isReportOpen, onOpen: onReportOpen, onOpenChange: onReportOpenChange } = useDisclosure();

  const endorseMutation = useMutation({
    mutationFn: () => endorseMentor(mentorId),
    onSuccess: () => {
      setEndorsed(true);
      setEndorsements((e) => e + 1);
    },
  });

  return (
    <div className="px-4 py-6">
      <Button
        as={Link}
        href="/mentors"
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="flex items-center gap-4">
        <Avatar name={name} size="lg" color="danger" showFallback className="h-16 w-16 text-xl" />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{name}</h1>
          <p className="text-default-500">{mentor.user.course}</p>
          <p className="text-sm text-default-400">{mentor.user.university}</p>
        </div>
        {!isOwnProfile && (
          <Button
            color={endorsed ? "default" : "danger"}
            variant={endorsed ? "bordered" : "solid"}
            isDisabled={endorsed}
            isLoading={endorseMutation.isPending}
            startContent={<IconThumbUp className="h-5 w-5" />}
            onPress={() => endorseMutation.mutate()}
          >
            {endorsed ? "Endorsed" : "Endorse"}
          </Button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">
            {mentor.rating > 0 ? mentor.rating.toFixed(1) : "-"}
          </p>
          <p className="text-xs text-default-500">Rating</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{mentor.totalAnswers}</p>
          <p className="text-xs text-default-500">Answers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{endorsements}</p>
          <p className="text-xs text-default-500">Endorsements</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-medium text-foreground">About</h2>
        <p className="mt-2 text-sm text-default-600">{mentor.bio}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-medium text-foreground">Expertise</h2>
        <p className="mt-2 text-sm text-default-500">{mentor.expertise.join(" · ")}</p>
      </div>

      {!isOwnProfile && (
        <div className="mt-6 flex gap-2">
          <Button
            as={Link}
            href={`/messages?user=${mentor.userId}`}
            color="danger"
            radius="lg"
            fullWidth
            startContent={<IconMessageCircle className="h-5 w-5" stroke={2} />}
          >
            Message
          </Button>
          <Button
            variant="bordered"
            radius="lg"
            isIconOnly
            onPress={onReportOpen}
          >
            <IconFlag className="h-5 w-5" stroke={2} />
          </Button>
        </div>
      )}

      <ReportModal
        isOpen={isReportOpen}
        onOpenChange={onReportOpenChange}
        userId={mentor.userId}
        targetName={name}
      />
    </div>
  );
}
