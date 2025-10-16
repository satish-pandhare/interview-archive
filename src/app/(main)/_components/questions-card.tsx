import { UserAvatar } from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { QuestionsType } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const SkeletonCard = () => {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-3 mt-auto">
        <div className="flex items-center gap-2 w-full">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-wrap gap-1.5 w-full">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardFooter>
    </Card>
  );
};

export const QuestionsCard = ({ question }: { question: QuestionsType }) => {
  return (
    <Card className="w-full h-full flex flex-col transition-all hover:shadow-md hover:scale-[1.02] group">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between text-lg sm:text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          <p>{question.title}</p>
          {question.Company && <Badge>{question.Company?.name}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
          {question.content}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-3 mt-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 w-full">
            <UserAvatar src={question.createdBy.image!} />
            <span className="text-sm font-medium truncate">
              {question.createdBy.name}
            </span>
          </div>
          <Link href={`/questions/${question.id}`}>
            <Button variant="secondary">
              Details <ArrowRight />
            </Button>
          </Link>
        </div>
        {question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 w-full">
            {question.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
