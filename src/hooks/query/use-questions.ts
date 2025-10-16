import { QuestionsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface FetchQuestionsParams {
  tags: string[];
  companies: string[];
  roles: string[];
  groups: string[];
}

export const useQuestions = (filters: FetchQuestionsParams) => {
  return useQuery({
    queryKey: ["questions", filters],
    queryFn: () => fetchQuestions(filters),
    staleTime: 1000 * 60 * 1,
  });
};

async function fetchQuestions({
  tags = [],
  companies = [],
  roles = [],
  groups = [],
}: FetchQuestionsParams): Promise<QuestionsType[]> {
  try {
    const params = new URLSearchParams();

    const tagQuery = tags.join(",");
    const companiesQuery = companies.join(",");
    const rolesQuery = roles.join(",");
    const groupsQuery = groups.join(",");

    if (tagQuery) params.set("tags", tagQuery);
    if (companiesQuery) params.set("companies", companiesQuery);
    if (rolesQuery) params.set("roles", rolesQuery);
    if (groupsQuery) params.set("groups", groupsQuery);

    const url = `/api/questions${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}
