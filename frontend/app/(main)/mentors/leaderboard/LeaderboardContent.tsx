"use client";

import Link from "next/link";
import { Avatar, Card, CardBody } from "@heroui/react";
import { IconTrophy, IconMedal, IconThumbUp, IconSparkles } from "@tabler/icons-react";

interface Mentor {
  id: string;
  rank: number;
  name: string;
  course: string | null;
  helpfulAnswers: number;
  totalAnswers: number;
  endorsements: number;
}

interface LeaderboardContentProps {
  mentors: Mentor[];
}

function getRankDisplay(rank: number) {
  if (rank === 1) return <IconTrophy className="h-6 w-6 text-yellow-500" fill="currentColor" />;
  if (rank === 2) return <IconMedal className="h-6 w-6 text-gray-400" fill="currentColor" />;
  if (rank === 3) return <IconMedal className="h-6 w-6 text-amber-600" fill="currentColor" />;
  return <span className="text-lg font-bold text-default-400">#{rank}</span>;
}

function getRankBgColor(rank: number) {
  if (rank === 1) return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800";
  if (rank === 2) return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700";
  if (rank === 3) return "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800";
  return "border-default-200";
}

export function LeaderboardContent({ mentors }: LeaderboardContentProps) {
  if (mentors.length === 0) {
    return (
      <div className="py-16 text-center text-default-500">
        No mentors on the leaderboard yet
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {mentors.map((mentor) => (
        <Link key={mentor.id} href={`/mentors/${mentor.id}`}>
          <Card className={`border hover:border-danger transition-all ${getRankBgColor(mentor.rank)}`} shadow="none">
            <CardBody className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 flex justify-center">
                  {getRankDisplay(mentor.rank)}
                </div>
                <Avatar name={mentor.name} size="md" color="danger" showFallback />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                  <p className="text-sm text-default-500 truncate">{mentor.course ?? "No course"}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-success-600">
                      <IconThumbUp className="h-4 w-4" />
                      <span className="font-bold">{mentor.helpfulAnswers}</span>
                    </div>
                    <p className="text-xs text-default-400">Helpful</p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="flex items-center gap-1 text-default-600">
                      <IconSparkles className="h-4 w-4" />
                      <span className="font-bold">{mentor.endorsements}</span>
                    </div>
                    <p className="text-xs text-default-400">Endorsements</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
