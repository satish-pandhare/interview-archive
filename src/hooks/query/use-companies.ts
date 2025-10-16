import { Company } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: Infinity,
  });
};

async function fetchCompanies(): Promise<Company[] | null> {
  const res = await fetch("/api/companies");
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
}
