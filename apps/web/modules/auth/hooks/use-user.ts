import { useQuery } from "@tanstack/react-query";
import client from "@/lib/api/client";

interface User {
  id: number;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
}

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await client.GET("/users/me", {
        credentials: "include",
      });

      if (!data) return null;

      // Ensure the data matches the User interface
      const user: User = {
        id: data.id!,
        email: data.email || null,
        username: data.username || null,
        avatarUrl: data.profile?.avatarUrl || null,
        isVerified: data.isVerified!,
      };

      return user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return user;
}
