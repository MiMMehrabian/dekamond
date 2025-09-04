import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { RandomUserResponse } from "../types/user";

export function useRandomUser(enabled: boolean = false) {
  return useQuery<RandomUserResponse, Error>({
    queryKey: ["randomUser"],
    queryFn: () => userService.getRandomUser(),
    enabled,
    staleTime: 5 * 60 * 1000,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    retry: (failureCount, error) => {
      if (
        error.message.includes("Invalid") ||
        error.message.includes("Failed to fetch")
      ) {
        return false;
      }
      return failureCount < 2;
    },
    meta: {
      description: "Fetch random user data for demo purposes",
    },
  });
}
