import { Tag } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    staleTime: Infinity,
  });
};

async function fetchRoles(): Promise<Tag[] | null> {
  const res = await fetch("/api/roles");
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
}
