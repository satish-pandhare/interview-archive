"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  "Unlimited browsing of question bank",
  "AI interview agent (fair use limits)",
  "Tags, roles, and companies filters",
  "Groups & collaboration",
  "AI answers with citations & evaluation",
];

export default function PricingPage() {
  return (
    <div className="px-4 md:px-8 lg:px-12 mt-12">
      {/* Hero */}
      <section className="mx-auto max-w-4xl py-10 md:py-16 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Pricing
          </Badge>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            Price: $0. Because paperwork is scary.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yep, it’s free. We haven’t implemented payments because we’re busy
            building useful stuff and avoiding the great credit-card hydra. When
            paid tiers arrive, the freebie stays generous. Pinky swear.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/interview">
              <Button size="lg" className="rounded-full">
                Start Interview
              </Button>
            </Link>
            <Link href="/questions">
              <Button size="lg" variant="secondary" className="rounded-full">
                Browse Questions
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* Free plan */}
      <section className="mx-auto max-w-6xl py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            className="md:col-span-2 order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  Everything you need to prep today. For the low, low price of
                  nada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold">$0</div>
                <div className="text-muted-foreground mb-4">
                  No credit card required. We don’t even want it. Keep it. Buy
                  tacos.
                </div>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <motion.li
                      key={f}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Check className="size-4 text-primary" /> <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Future Pro <Sparkles className="size-4" />
                </CardTitle>
                <CardDescription>Coming later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">TBD</div>
                <div className="text-muted-foreground mb-4">
                  We’ll keep the free plan generous. Like your favorite buffet,
                  minus the regret.
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {[
                    "Usage boosts",
                    "Advanced AI capabilities",
                    "Team features",
                  ].map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {t}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
            <div>
              <div className="font-medium">Is it really free?</div>
              <div className="text-sm text-muted-foreground">
                Yes. As in “$0, zip, zilch.” Payments aren’t a thing here...
                yet.
              </div>
            </div>
            <div>
              <div className="font-medium">Will you charge later?</div>
              <div className="text-sm text-muted-foreground">
                Probably—for fancy stuff. The free tier will stay chunky enough
                to chew on.
              </div>
            </div>
            <div>
              <div className="font-medium">Do I need a card?</div>
              <div className="text-sm text-muted-foreground">
                Nope. No billing, no card, no “oops I forgot to cancel.”
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="size-4" /> No hidden fees
            </div>
            <div className="text-sm text-muted-foreground">
              Just practice and collaborate. The only thing hidden is our
              ability to charge money.
            </div>
            <div className="flex gap-3 pt-4">
              <Link href="/interview">
                <Button className="rounded-full">Start Interview</Button>
              </Link>
              <Link href="/questions">
                <Button className="rounded-full" variant="secondary">
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
