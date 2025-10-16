"use client";

import { useCompletion } from "@ai-sdk/react";

import { Button } from "./ui/button";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import { Sparkles } from "lucide-react";
import { Question } from "@/generated/prisma";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function AI({ question }: { question: Question }) {
  const { completion, complete, error, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const prompt = `Title: ${question.title},Content: ${question.content}`;

  const handleClick = async () => {
    const promise = complete(prompt, {
      body: {
        questionId: question.id,
      },
    });

    toast.promise(promise, {
      loading: "Generating answer...",
      success: () => {
        return "Answer generated successfully!";
      },
      error: "Error generating answer",
    });
  };

  return (
    <div className="border p-2 rounded-md shadow-md bg-background">
      <div className="flex justify-between px-4 py-2">
        <p className="flex gap-2 items-center justify-center">
          <Sparkles
            className={cn(
              isLoading &&
                "animate-pulse rotate-45 transition-transform duration-300",
            )}
          />{" "}
          AI Generated Answer
        </p>
        <Button
          onClick={handleClick}
          disabled={isLoading || Boolean(question.aiAnswer || completion)}
        >
          Generate
        </Button>
      </div>

      <div className="p-4">
        {question.aiAnswer ? (
          <MarkdownRenderer content={question.aiAnswer} id="content" />
        ) : (
          <MarkdownRenderer content={completion} id="ai" />
        )}
        {error && (
          <div className="text-red-500 mt-2">
            <p>Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
