import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { CalendarDays, Clock, SquareArrowOutUpRight, User } from "lucide-react";
import { AnswerQuestionButton } from "@/app/(main)/_components/answer-question-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/avatar";
import { formatDate } from "@/lib/date";
import { AI } from "@/components/ai";
import { EditQuestionButton } from "../../_components/edit-question-button";
import { AIEvaluation } from "@/components/ai-evalution";
import { UrlObject } from "url";

type QuestionPageProps = {
  params: Promise<{
    questionId: string;
  }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { questionId } = await params;

  const question = await db.question.findFirst({
    where: {
      id: questionId,
    },
    include: {
      tags: true,
      Company: true,
      role: true,
      createdBy: true,
      answers: {
        include: {
          createdBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mx-auto space-y-6 max-w-7xl mt-12">
        <Card className="shadow-sm w-full">
          <CardHeader className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                  {question.title}
                </h1>
                <EditQuestionButton question={question} />
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question Content */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Question
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                {question.content}
              </p>
            </div>

            <Separator />

            {/* Creator Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Created By
              </h3>

              <div className="flex items-center space-x-4">
                <UserAvatar src={question.createdBy.image!} />
                <div className="space-y-1">
                  <p className="font-medium text-foreground lg:text-lg">
                    {question.createdBy.name}
                  </p>
                  {question.createdBy.emailVerified && (
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Created
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {formatDate(question.createdAt)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {formatDate(question.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card className="shadow-sm w-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Additional Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 text-sm">
              <div>
                <span className="font-medium text-foreground">
                  Question ID:
                </span>
                <p className="text-muted-foreground font-mono text-xs mt-1 break-all">
                  {question.id}
                </p>
              </div>

              <div>
                <span className="font-medium text-foreground">Role:</span>
                <p className="text-muted-foreground text-xs mt-1">
                  {question.role?.name || "Not specified"}
                </p>
              </div>

              <div>
                <span className="font-medium text-foreground">Company:</span>
                <p className="text-muted-foreground text-xs mt-1">
                  {question.Company?.name || "Not specified"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AI question={question} />

        <Card className="shadow-sm w-full">
          <CardHeader>
            <h3 className="text-lg font-semibold flex gap-4 items-center">
              Answers
              <AnswerQuestionButton questionId={questionId} />
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.answers.length > 0 &&
              question.answers.map((answer) => (
                <Card
                  key={answer.id}
                  className={cn(
                    question.createdById === answer.createdById
                      ? "border-primary"
                      : "border-muted",
                  )}
                >
                  <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      {answer.contentLink && (
                        <Link
                          href={answer.contentLink as unknown as UrlObject}
                          className="gap-2 flex items-center underline"
                        >
                          Answer
                          <SquareArrowOutUpRight className="size-4" />
                        </Link>
                      )}
                      {answer.content && (
                        <p className="max-w-3xl">{answer.content}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mt-2">
                        <UserAvatar src={answer.createdBy.image!} />
                        <span className="text-sm font-medium text-foreground">
                          {answer.createdBy.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(answer.createdAt)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <AIEvaluation
                      question={{
                        title: question.title,
                        content: question.content,
                        role: question.role?.name || null,
                      }}
                      answer={answer}
                    />
                  </CardFooter>
                </Card>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
