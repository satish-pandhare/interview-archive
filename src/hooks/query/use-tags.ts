import { Tag } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });
};

async function fetchTags(): Promise<Tag[] | null> {
  const res = await fetch("/api/tags");
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
}
