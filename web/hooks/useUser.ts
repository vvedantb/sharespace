import { useQuery } from "@tanstack/react-query";
import { getCurrentSession } from "@/lib/cognito";
import { User } from "@/lib/types";

export function useUser() {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await getCurrentSession();
      if (!session) return null;

      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${session.getAccessToken().getJwtToken()}` },
      });

      return res.ok ? res.json() : null;
    },
    staleTime: 1000 * 60 * 5,
  });
}
