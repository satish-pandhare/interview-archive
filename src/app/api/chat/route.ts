import { google } from "@ai-sdk/google";
import {
  stepCountIs,
  smoothStream,
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { getSYSTEM_PROMPT_INTERVIEW_AGENT } from "@/lib/prompts";
import { getCompanies, getInterviewQuestions, getTags } from "@/lib/tools";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { env } from "@/env";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const {
    messages,
    model,
    interviewMode,
  }: { messages: UIMessage[]; model: string; interviewMode: boolean } =
    await req.json();

  const providerOptions = {
    google: {
      thinkingConfig: {
        thinkingBudget: 4096,
        includeThoughts: true,
      },
    },
  };

  const aiModel = model.includes("gemini")
    ? google(model)
    : openrouter.chat(model);

  console.log("Model selected:", model);
  const result = streamText({
    model: aiModel,
    messages: convertToModelMessages(messages),
    providerOptions: model === "gemini-2.5-flash" ? providerOptions : undefined,
    system: getSYSTEM_PROMPT_INTERVIEW_AGENT({
      interviewerMode: interviewMode,
    }),
    tools: {
      getInterviewQuestions,
      getCompanies,
      getTags,
    },
    stopWhen: stepCountIs(5),
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: "word",
    }),
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
