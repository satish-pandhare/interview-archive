import { db } from "@/lib/db";
import { ANSWER_SYSTEM_PROMPT } from "@/lib/prompts";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, questionId }: { prompt: string; questionId: string } =
    await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: ANSWER_SYSTEM_PROMPT,
    prompt,
    onFinish: async ({ text }) => {
      await db.question.update({
        where: {
          id: questionId,
        },
        data: {
          aiAnswer: text,
        },
      });
    },
  });

  return result.toUIMessageStreamResponse();
}
