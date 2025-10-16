import z from "zod";
import { Company, Question, Role, Tag, User } from "./generated/prisma";

export type QuestionsType = Question & {
  createdBy: User;
  tags: Tag[];
  Company?: Company | null;
  role: Role | null;
};

export const aiEvaluationSchema = z.object({
  score: z.number().min(0).max(10).describe("Score from 0 to 10"),
  verdict: z.string().min(1).max(1000).describe("Verdict of the answer"),
  strengths: z.array(z.string()).describe("Strengths of the answer"),
  issues: z.array(z.string()).describe("Issues with the answer"),
  suggestions: z.array(z.string()).describe("Suggestions for improvement"),
  isCorrect: z.boolean(),
});
