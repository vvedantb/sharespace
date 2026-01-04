"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { approveMentor, rejectMentor } from "@/lib/actions/mentors";
import { MentorType } from "@/lib/types";

dayjs.extend(relativeTime);

interface MentorApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  university: string | null;
  course: string | null;
  yearOfStudy: number | null;
  graduationYear: number | null;
  bio: string | null;
  expertise: string[];
  mentorType: MentorType;
  appliedAt: string;
}

interface MentorApplicationsListProps {
  initialApplications: MentorApplication[];
}

export function MentorApplicationsList({ initialApplications }: MentorApplicationsListProps) {
  const router = useRouter();
  const [applications, setApplications] = useState(initialApplications);

  const approveMutation = useMutation({
    mutationFn: approveMentor,
    onSuccess: (_, mentorId) => {
      setApplications((prev) => prev.filter((app) => app.id !== mentorId));
      router.refresh();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectMentor,
    onSuccess: (_, mentorId) => {
      setApplications((prev) => prev.filter((app) => app.id !== mentorId));
      router.refresh();
    },
  });

  if (applications.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-default-200 bg-default-50 p-6 text-center">
        <p className="text-default-500">No pending applications</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="border border-default-200" shadow="none">
          <CardBody className="p-4 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{app.userName}</h3>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={app.mentorType === "ALUMNI" ? "secondary" : "primary"}
                  >
                    {app.mentorType === "ALUMNI" ? "Alumni" : "Student"}
                  </Chip>
                </div>
                <p className="mt-1 text-sm text-default-500 truncate">{app.userEmail}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-default-600">
                  {app.university && <span>{app.university}</span>}
                  {app.course && <span>{app.course}</span>}
                  {app.mentorType === "STUDENT" && app.yearOfStudy && (
                    <span>Year {app.yearOfStudy}</span>
                  )}
                  {app.mentorType === "ALUMNI" && app.graduationYear && (
                    <span>Graduated {app.graduationYear}</span>
                  )}
                </div>
              </div>
              <div className="text-xs md:text-sm text-default-400 md:text-right shrink-0">
                {dayjs(app.appliedAt).fromNow()}
              </div>
            </div>

            {app.bio && (
              <div className="mt-4">
                <p className="text-sm font-medium text-default-700">Bio</p>
                <p className="mt-1 text-sm text-default-600 break-words">{app.bio}</p>
              </div>
            )}

            {app.expertise.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-default-700">Expertise</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {app.expertise.map((skill, index) => (
                    <Chip key={index} size="sm" variant="flat" color="default">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 md:flex-row md:justify-end md:gap-3">
              <Button
                color="danger"
                variant="flat"
                radius="lg"
                startContent={<IconX className="h-4 w-4" stroke={2} />}
                isLoading={rejectMutation.isPending}
                onPress={() => rejectMutation.mutate(app.id)}
                className="w-full md:w-auto"
              >
                Reject
              </Button>
              <Button
                color="success"
                radius="lg"
                startContent={<IconCheck className="h-4 w-4" stroke={2} />}
                isLoading={approveMutation.isPending}
                onPress={() => approveMutation.mutate(app.id)}
                className="w-full md:w-auto"
              >
                Approve
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
