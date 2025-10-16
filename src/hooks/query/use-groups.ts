import { Group } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    staleTime: Infinity,
  });
};

async function fetchGroups(): Promise<Group[] | null> {
  const res = await fetch("/api/groups");
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
}
