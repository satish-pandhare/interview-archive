"use client";

import React from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  Search,
  Sparkles,
  Layers,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Product model
type Product = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  href: Route;
  cta: string;
  icon?: React.ReactNode;
  category: "AI" | "Collaboration" | "Content";
};

const products: Product[] = [
  {
    id: "questions",
    name: "Questions",
    description: "Crowd-sourced question bank with tags, roles, and companies.",
    tags: ["Search", "Tags", "Companies", "Roles"],
    href: "/questions",
    cta: "Explore questions",
    icon: <Layers className="size-5" />,
    category: "Content",
  },
  {
    id: "interview-agent",
    name: "Interview Agent",
    description:
      "Simulate interviews and receive AI-powered feedback and scoring.",
    tags: ["Simulation", "Feedback", "Scoring"],
    href: "/interview",
    cta: "Try interview agent",
    icon: <Sparkles className="size-5" />,
    category: "AI",
  },
  {
    id: "groups",
    name: "Groups & Collaboration",
    description: "Create private groups, invite teammates, and share threads.",
    tags: ["Groups", "Invites", "Sharing"],
    cta: "Create a group",
    href: "/",
    icon: <MessageSquare className="size-5" />,
    category: "Collaboration",
  },
  {
    id: "answers",
    name: "Knowledge & Answers",
    description:
      "AI answers with sources, citations, code, and automatic evaluation.",
    tags: ["AI", "Citations", "Evaluation"],
    href: "/questions",
    cta: "Ask a question",
    icon: <ShieldCheck className="size-5" />,
    category: "AI",
  },
];

export default function ProductsPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const inSearch =
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    const inCategory =
      category === "all" || p.category.toLowerCase() === category;
    return inSearch && inCategory;
  });

  return (
    <div className="px-4 md:px-8 lg:px-12 mt-12">
      {/* Hero */}
      <section className="mx-auto max-w-5xl py-10 md:py-16">
        <motion.div className="text-center space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            What you can build with Interview Archive
          </Badge>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Ship interviews faster with AI and a rich question bank
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful building blocks for practicing and collaborating: AI
            interview simulations, curated questions, real-time collaboration,
            and trustworthy AI answers.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/interview">
              <Button size="lg" className="rounded-full">
                Try Interview Agent
              </Button>
            </Link>
            <Link href="/questions">
              <Button size="lg" variant="secondary" className="rounded-full">
                Browse Questions
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <motion.div className="mt-10 md:mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}>
          <div className="flex flex-col md:flex-row items-stretch gap-3 md:items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, features, or tags..."
                className="pl-10 h-11"
                aria-label="Search products"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                aria-label="Filter by category"
                className="h-11 min-w-40"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="collaboration">Collaboration</SelectItem>
                <SelectItem value="content">Content</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl py-10 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <Link key={p.id} href={p.href} className="group">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full border-muted/60 transition-all hover:shadow-md hover:border-primary/60">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="rounded-md bg-muted text-muted-foreground p-2">
                          {p.icon}
                        </span>
                        <span>{p.name}</span>
                      </span>
                      <Badge variant="outline" className="capitalize">
                        {p.category.toLowerCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="pt-1">
                      {p.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t, j) => (
                        <motion.div key={t} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: j * 0.03 }}>
                          <Badge
                            variant="secondary"
                            className="rounded-full"
                          >
                            {t}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                    >
                      {p.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            No products found. Try a different search or category.
          </div>
        )}
      </section>

      {/* Comparison strip */}
      <section className="mx-auto max-w-6xl pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "AI-first", desc: "Reasoning, citations, and evals" },
            { title: "Curated", desc: "Quality questions and tags" },
            { title: "Collaboration", desc: "Groups, sharing, and invites" },
            { title: "Trusted", desc: "Privacy and control" },
          ].map((f, i) => (
            <motion.div key={f.title} className="rounded-lg border bg-card p-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="font-medium">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ / CTA */}
      <section className="mx-auto max-w-5xl pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div className="space-y-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-xl font-semibold tracking-tight">
              Frequently asked
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is the question bank free?",
                  a: "Yes, browsing questions is free. Some AI features may require limits.",
                },
                {
                  q: "Can I use this for mock interviews?",
                  a: "Yes. The Interview Agent simulates interviews and scores your answers.",
                },
                {
                  q: "How do groups work?",
                  a: "Create a private group, invite teammates, and share threads securely.",
                },
              ].map((item, i) => (
                <motion.div key={item.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <div className="font-medium">{item.q}</div>
                  <div className="text-sm text-muted-foreground">{item.a}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div className="rounded-xl border bg-card p-6 md:p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Ready to get started?</h3>
              <p className="text-muted-foreground">
                Jump into an AI interview or explore curated questions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/interview">
                <Button className="rounded-full" size="lg">
                  Start Interview
                </Button>
              </Link>
              <Link href="/questions">
                <Button className="rounded-full" size="lg" variant="secondary">
                  Browse Questions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
