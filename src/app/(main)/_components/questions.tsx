import { QuestionsCard, SkeletonCard } from "./questions-card";
import { useQuestions } from "@/hooks/query/use-questions";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export const Questions = () => {
  const [tags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [companies] = useQueryState(
    "companies",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [roles] = useQueryState(
    "roles",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [groups] = useQueryState(
    "groups",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const { isLoading, data: questions } = useQuestions({
    tags,
    companies,
    roles,
    groups,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!questions || questions?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-2">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">
          No questions found
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          It seems there are no questions matching your filters. Try adjusting
          your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {questions.map((question) => (
        <QuestionsCard key={question.id} question={question} />
      ))}
    </div>
  );
};
