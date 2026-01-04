"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardBody, Button, Chip, Image } from "@heroui/react";
import { IconCheck, IconX, IconPhoto } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { resolveReport, dismissReport } from "@/lib/actions/reports";

dayjs.extend(relativeTime);

interface Report {
  id: string;
  reason: string;
  description: string | null;
  createdAt: string;
  reporter: { id: string; firstName: string; lastName: string };
  item: { id: string; title: string; images: string[] } | null;
  reportedUser: { id: string; firstName: string; lastName: string } | null;
}

interface ReportsListProps {
  initialReports: Report[];
}

const REASON_LABELS: Record<string, string> = {
  inappropriate: "Inappropriate content",
  spam: "Spam or scam",
  offensive: "Offensive behavior",
  fake: "Fake listing",
  other: "Other",
};

export function ReportsList({ initialReports }: ReportsListProps) {
  const router = useRouter();
  const [reports, setReports] = useState(initialReports);

  const resolveMutation = useMutation({
    mutationFn: resolveReport,
    onSuccess: (_, reportId) => {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      router.refresh();
    },
  });

  const dismissMutation = useMutation({
    mutationFn: dismissReport,
    onSuccess: (_, reportId) => {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      router.refresh();
    },
  });

  if (reports.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-default-200 bg-default-50 p-6 text-center">
        <p className="text-default-500">No pending reports</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="border border-default-200" shadow="none">
          <CardBody className="p-4 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip size="sm" variant="flat" color="danger">
                    {REASON_LABELS[report.reason] || report.reason}
                  </Chip>
                  {report.item && <Chip size="sm" variant="flat">Item Report</Chip>}
                  {report.reportedUser && <Chip size="sm" variant="flat">User Report</Chip>}
                </div>
                <p className="mt-2 text-sm text-default-500">
                  Reported by: {report.reporter.firstName} {report.reporter.lastName}
                </p>
              </div>
              <div className="text-xs md:text-sm text-default-400 md:text-right shrink-0">
                {dayjs(report.createdAt).fromNow()}
              </div>
            </div>

            {report.item && (
              <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-default-50">
                <div className="h-12 w-12 rounded-lg bg-default-100 flex items-center justify-center overflow-hidden shrink-0">
                  {report.item.images.length > 0 ? (
                    <Image src={report.item.images[0]} alt={report.item.title} className="h-full w-full object-cover" />
                  ) : (
                    <IconPhoto className="h-6 w-6 text-default-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/marketplace/${report.item.id}`} className="font-medium text-foreground hover:underline">
                    {report.item.title}
                  </Link>
                </div>
              </div>
            )}

            {report.reportedUser && (
              <div className="mt-4 p-3 rounded-lg bg-default-50">
                <p className="text-sm text-default-600">
                  Reported user: <span className="font-medium">{report.reportedUser.firstName} {report.reportedUser.lastName}</span>
                </p>
              </div>
            )}

            {report.description && (
              <div className="mt-4">
                <p className="text-sm font-medium text-default-700">Additional details</p>
                <p className="mt-1 text-sm text-default-600 break-words">{report.description}</p>
              </div>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 md:flex-row md:justify-end md:gap-3">
              <Button
                variant="flat"
                radius="lg"
                startContent={<IconX className="h-4 w-4" stroke={2} />}
                isLoading={dismissMutation.isPending}
                onPress={() => dismissMutation.mutate(report.id)}
                className="w-full md:w-auto"
              >
                Dismiss
              </Button>
              <Button
                color="danger"
                radius="lg"
                startContent={<IconCheck className="h-4 w-4" stroke={2} />}
                isLoading={resolveMutation.isPending}
                onPress={() => resolveMutation.mutate(report.id)}
                className="w-full md:w-auto"
              >
                Resolve
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
