"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { IconMessageCircle, IconArrowLeft } from "@tabler/icons-react";

interface MentorDetailProps {
  mentor: {
    userId: string;
    bio: string | null;
    expertise: string[];
    totalAnswers: number;
    endorsements: number;
    user: {
      firstName: string;
      lastName: string;
      course: string | null;
      university: string | null;
    };
  };
}

export function MentorDetail({ mentor }: MentorDetailProps) {
  const name = `${mentor.user.firstName} ${mentor.user.lastName}`;

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
        <div>
          <h1 className="text-xl font-bold text-foreground">{name}</h1>
          <p className="text-default-500">{mentor.user.course}</p>
          <p className="text-sm text-default-400">{mentor.user.university}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">-</p>
          <p className="text-xs text-default-500">Rating</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{mentor.totalAnswers}</p>
          <p className="text-xs text-default-500">Answers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{mentor.endorsements}</p>
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

      <Button
        as={Link}
        href={`/messages?user=${mentor.userId}`}
        color="danger"
        radius="lg"
        fullWidth
        startContent={<IconMessageCircle className="h-5 w-5" stroke={2} />}
        className="mt-6"
      >
        Message
      </Button>
    </div>
  );
}
