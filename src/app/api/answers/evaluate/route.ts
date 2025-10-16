import { db } from "@/lib/db";
import { SYSTEM_PROMPT_INTERVIEWER } from "@/lib/prompts";
import { aiEvaluationSchema } from "@/types";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    question,
    answer,
    answerId,
  }: { question: string; answer: string; answerId: string } = await req.json();

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    providerOptions: {
      google: {
        structuredOutputs: true,
      },
    },
    schema: aiEvaluationSchema,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT_INTERVIEWER,
      },
      {
        role: "user",
        content: `Question: ${question}\n\nAnswer: ${answer}`,
      },
    ],
    onFinish: async ({ object, error }) => {
      if (!error) {
        await db.answer.update({
          where: { id: answerId },
          data: {
            aiEvaluation: object,
          },
        });
      }
    },
  });

  return result.toTextStreamResponse();
}
