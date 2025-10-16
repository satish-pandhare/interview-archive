import { tool } from "ai";
import z from "zod";
import { db } from "./db";

export const getInterviewQuestions = tool({
  inputSchema: z.object({
    role: z.string().optional(),
    company: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  description:
    "Fetches interview questions from the database based on role, company, and tags.",
  execute: async ({ role, company, tags }) => {
    console.log("Fetching interview questions from the database...");
    console.log({ role, company, tags });

    const whereClause: Record<string, unknown> = {};

    // capitalize first letter of company
    company = company
      ? company.charAt(0).toUpperCase() + company.slice(1)
      : company;

    if (company) {
      whereClause.Company = {
        name: company,
      };
    }

    if (role) {
      whereClause.role = {
        name: role,
      };
    }

    if (tags && tags.length > 0) {
      whereClause.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    const questions = await db.question.findMany({
      where: whereClause,
      include: {
        Company: true,
        tags: true,
        role: true,
        answers: {
          include: {
            createdBy: false,
          },
        },
      },
    });

    return questions;
  },
});

export const getCompanies = tool({
  description: "Fetches all companies from the database.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Fetching all companies from the database...");
    const companies = await db.company.findMany();
    return companies;
  },
});

export const getTags = tool({
  description: "Fetches all tags from the database.",
  inputSchema: z.object({}),
  execute: async () => {
    console.log("Fetching all tags from the database...");
    const tags = await db.tag.findMany();
    return tags;
  },
});
