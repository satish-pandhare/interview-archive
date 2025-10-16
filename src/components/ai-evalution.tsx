"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useMounted } from "@/hooks/use-mounted";
import { aiEvaluationSchema } from "@/types";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useRef } from "react";

interface AIEvaluationProps {
  question: {
    title: string;
    content: string;
    role: string | null;
  };
  answer: {
    id: string;
    content: string;
    createdBy: {
      name: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aiEvaluation: any;
  };
}

export const AIEvaluation = ({ question, answer }: AIEvaluationProps) => {
  const mounted = useMounted();
  const { object, submit, isLoading } = useObject({
    api: "/api/answers/evaluate",
    schema: aiEvaluationSchema,
  });

  const evaluationRef = useRef<HTMLDivElement | null>(null);

  // Scroll to evaluation when available
  useEffect(() => {
    if ((object || answer.aiEvaluation) && evaluationRef.current) {
      evaluationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [object, answer.aiEvaluation]);

  if (!mounted) return null;

  return (
    <div className="w-full mt-6 space-y-4" ref={evaluationRef}>
      {(object || answer.aiEvaluation) && (
        <Collapsible defaultOpen={Boolean(object)}>
          <Card className="py-2">
            <CardHeader>
              <CollapsibleTrigger className="flex justify-start items-center">
                <CardTitle className="flex items-center gap-2 focus:ring-0 focus:outline-0 p-2">
                  AI Evaluation <ChevronDown className="size-4" />
                </CardTitle>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-semibold text-foreground">
                        Score:
                      </span>{" "}
                      {object?.score ?? answer.aiEvaluation?.score}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        Correct:
                      </span>{" "}
                      {(object?.isCorrect ?? answer.aiEvaluation?.isCorrect)
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-foreground">
                        Verdict:
                      </span>{" "}
                      {object?.verdict ?? answer.aiEvaluation?.verdict}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Strengths
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {(
                      object?.strengths ??
                      answer.aiEvaluation?.strengths ??
                      []
                    ).map((item: string, idx: number) => (
                      <li key={`s-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Suggestions
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {(
                      object?.suggestions ??
                      answer.aiEvaluation?.suggestions ??
                      []
                    ).map((item: string, idx: number) => (
                      <li key={`su-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pb-4">
                  <p className="font-semibold text-foreground mb-1">Issues</p>
                  <ul className="list-disc list-inside space-y-1">
                    {(object?.issues ?? answer.aiEvaluation?.issues ?? []).map(
                      (item: string, idx: number) => (
                        <li key={`i-${idx}`}>{item}</li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      <div className="flex justify-end">
        <Button
          className="group"
          variant="secondary"
          disabled={
            Boolean(answer.aiEvaluation) || isLoading || Boolean(object)
          }
          onClick={() =>
            submit({
              question: `${question.title}\n\n${question.content}`,
              answer: answer.content,
              answerId: answer.id,
            })
          }
        >
          Evaluate using AI{" "}
          <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};
