"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import {
  Upload,
  BarChart2,
  Tag,
  Users,
  PlayCircle,
  Brain,
  Briefcase,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "motion/react";

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items?: BentoItem[];
}
const itemsSample: BentoItem[] = [
  {
    title: "Question Bank",
    meta: "1,000+ prompts",
    description:
      "Curated interview questions across roles and seniority levels. Filter by company, role, and tags to focus your prep.",
    icon: <BookOpen className="text-primary h-4 w-4" />,
    status: "Popular",
    tags: ["Questions", "Curated", "Tags"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "Explore questions →",
  },
  {
    title: "Role-based Tracks",
    meta: "Frontend · Backend · DS",
    description:
      "Follow tailored tracks by role and level so you always know what to practice next.",
    icon: <Briefcase className="text-primary h-4 w-4" />,
    status: "Guided",
    tags: ["Roles", "Roadmaps"],
  },
  {
    title: "AI Answers & Review",
    meta: "Real-time feedback",
    description:
      "Write your answer and get instant AI-generated reviews with strengths, gaps, and suggested improvements.",
    icon: <Brain className="text-primary h-4 w-4" />,
    status: "New",
    tags: ["AI", "Evaluation"],
    // colSpan: 2,
    cta: "Get AI feedback →",
  },
  {
    title: "Mock Interviews",
    meta: "Practice mode",
    description:
      "Time-bound sessions with prompts, hints, and structured scoring to simulate real interviews.",
    icon: <PlayCircle className="text-primary h-4 w-4" />,
    status: "Practice",
    tags: ["Timer", "Scoring"],
    cta: "Start a mock →",
  },
  {
    title: "Study Groups",
    meta: "Invite codes",
    description:
      "Form groups, share questions, and review answers together. Learn faster with peers.",
    icon: <Users className="text-primary h-4 w-4" />,
    status: "Beta",
    tags: ["Groups", "Collab"],
    cta: "Join a group →",
  },
  {
    title: "Tags & Collections",
    meta: "Smart filters",
    description:
      "Organize by tags and build collections for focused sprints and recurring practice.",
    icon: <Tag className="text-primary h-4 w-4" />,
    status: "Organize",
    tags: ["Tags", "Collections"],
  },
  {
    title: "Progress & Saves",
    meta: "Dashboard",
    description:
      "Bookmark questions, track your streak, and see improvement over time.",
    icon: <BarChart2 className="text-primary h-4 w-4" />,
    status: "Insight",
    tags: ["Bookmarks", "Progress"],
    cta: "View progress →",
  },
  {
    title: "Share & Upload",
    meta: "Files & links",
    description:
      "Upload snippets or share answers for feedback and discussion.",
    icon: <Upload className="text-primary h-4 w-4" />,
    status: "Collab",
    tags: ["Upload", "Review"],
  },
];
export default function BentoGrid({ items = itemsSample }: BentoGridProps) {
  return (
    <section className="relative overflow-hidden py-12">
      {/* Decorative elements */}
      {/* <div className="bg-primary/5 absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" /> */}
      {/* <div className="bg-primary/5 absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" /> */}
      
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.a
            href="#"
            key={`${item.title}-${item.status || item.meta}`}
            className={cn(
              item.colSpan || "col-span-1",
              item.colSpan === 2 ? "md:col-span-2" : ""
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "group bg-card/40 relative h-full transition-all duration-300 hover:shadow-md",
                "will-change-transform hover:-translate-y-1",
                "border-border/60 overflow-hidden",
                {
                  "-translate-y-1 shadow-md": item.hasPersistentHover,
                }
              )}
            >
              <div
                className={cn(
                  "absolute inset-0",
                  item.hasPersistentHover
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300"
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:4px_4px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
              </div>

              <CardHeader className="relative space-y-0 p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                    {item.icon}
                  </div>
                  <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium">
                    {item.status || "Active"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-2 p-4 pt-0">
                <h3 className="text-foreground text-[15px] font-medium tracking-tight">
                  {item.title}
                  {item.meta && (
                    <span className="text-muted-foreground ml-2 text-xs font-normal">
                      {item.meta}
                    </span>
                  )}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>

              <CardFooter className="relative p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="text-muted-foreground flex flex-wrap gap-2 text-xs">
                    {item.tags?.map((tag) => (
                      <span
                        key={`${item.title}-${tag}`}
                        className="bg-secondary/50 rounded-md px-2 py-1 backdrop-blur-xs transition-all duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    {item.cta || "Explore →"}
                  </span>
                </div>
              </CardFooter>

              <div
                className={cn(
                  "via-primary/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent to-transparent p-px",
                  item.hasPersistentHover
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300"
                )}
              />
            </Card>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
