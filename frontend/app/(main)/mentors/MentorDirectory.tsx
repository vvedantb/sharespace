"use client";

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Input, Spinner } from "@heroui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Mentor } from "@/lib/types";
import { MentorCard } from "@/components/MentorCard";
import { mentorsSearchParams } from "./searchParams";
import { getMentors } from "@/lib/actions/mentors";

interface MentorDirectoryProps {
  initialMentors: Mentor[];
}

export function MentorDirectory({ initialMentors }: MentorDirectoryProps) {
  const [{ q }, setParams] = useQueryStates(mentorsSearchParams);

  const { data: mentors = initialMentors, isLoading: loading } = useQuery({
    queryKey: ["mentors", { q }],
    queryFn: () => getMentors(q || undefined),
    enabled: !!q,
    placeholderData: initialMentors,
  });

  return (
    <>
      <div className="mt-4">
        <Input
          value={q}
          onValueChange={(value) => setParams({ q: value || null })}
          placeholder="Search by name or expertise..."
          startContent={<IconSearch className="h-5 w-5 text-default-400" stroke={2} />}
          endContent={
            q ? (
              <button onClick={() => setParams({ q: null })} className="text-default-400 hover:text-default-600">
                <IconX className="h-4 w-4" stroke={2} />
              </button>
            ) : null
          }
          variant="bordered"
          radius="lg"
          classNames={{ inputWrapper: "bg-default-50" }}
        />
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <Spinner color="danger" />
        </div>
      ) : mentors.length === 0 ? (
        <div className="py-16 text-center text-default-500">
          No mentors found
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </>
  );
}
