import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  ActivityChart,
  type ActivityPoint,
} from "./_components/activity-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MiniArea, type MiniPoint } from "./_components/mini-area";
import { QuickActions } from "./_components/quick-actions";
import Link from "next/link";
import NextImage from "next/image";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatKey(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function rangeDays(n: number, end: Date) {
  const out: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    out.push(startOfDay(d));
  }
  return out;
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userId = user.id;
  const since90 = startOfDay(new Date(Date.now() - 89 * 24 * 60 * 60 * 1000));
  const days90 = rangeDays(90, new Date());

  // Stats
  const [
    totalQuestions,
    totalAnswers,
    groupsOwned,
    groupsJoined,
    topCompanies,
    topRoles,
  ] = await Promise.all([
    db.question.count({ where: { createdById: userId } }),
    db.answer.count({ where: { createdById: userId } }),
    db.group.count({ where: { userId } }),
    db.member.count({ where: { userId } }),
    db.company.findMany({
      take: 4,
      orderBy: { name: "asc" },
      select: { id: true, name: true, logoUrl: true },
    }),
    db.role.findMany({
      take: 4,
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  // Activity last 30 days (questions + answers)
  const [qTimes, aTimes] = await Promise.all([
    db.question.findMany({
      where: { createdById: userId, createdAt: { gte: since90 } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    db.answer.findMany({
      where: { createdById: userId, createdAt: { gte: since90 } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Build bins for 90 days, then slice for 30 and 7
  const binQ: Record<string, number> = {};
  const binA: Record<string, number> = {};
  for (const d of days90) {
    const k = formatKey(d);
    binQ[k] = 0;
    binA[k] = 0;
  }
  for (const q of qTimes) {
    const k = formatKey(startOfDay(q.createdAt));
    if (k in binQ) binQ[k] += 1;
  }
  for (const a of aTimes) {
    const k = formatKey(startOfDay(a.createdAt));
    if (k in binA) binA[k] += 1;
  }

  const series90: ActivityPoint[] = days90.map((d) => ({
    date: formatKey(d),
    questions: binQ[formatKey(d)] ?? 0,
    answers: binA[formatKey(d)] ?? 0,
  }));
  const series30 = series90.slice(-30);
  const series7 = series90.slice(-7);
  const totalActivity = series30.reduce(
    (s, p) => s + p.questions + p.answers,
    0
  );
  const bestDay = Math.max(0, ...series30.map((p) => p.questions + p.answers));

  // Trends for stat cards (last 30d vs prev 30d)
  const qLast30 = series30.reduce((s, p) => s + p.questions, 0);
  const qPrev30 = series90.slice(-60, -30).reduce((s, p) => s + p.questions, 0);
  const aLast30 = series30.reduce((s, p) => s + p.answers, 0);
  const aPrev30 = series90.slice(-60, -30).reduce((s, p) => s + p.answers, 0);

  function trendDirDelta(curr: number, prev: number) {
    if (curr > prev)
      return {
        dir: "up" as const,
        pct: ((curr - prev) / Math.max(prev, 1)) * 100,
      };
    if (curr < prev)
      return {
        dir: "down" as const,
        pct: ((prev - curr) / Math.max(prev, 1)) * 100,
      };
    return { dir: "neutral" as const, pct: 0 };
  }

  const qTrend = trendDirDelta(qLast30, qPrev30);
  const aTrend = trendDirDelta(aLast30, aPrev30);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back{user.name ? `, ${user.name}` : ""}
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Questions"
          value={totalQuestions}
          subtitle={`Last 30d: ${qLast30}`}
          trend={{ direction: qTrend.dir, percent: qTrend.pct }}
        />
        <StatCard
          title="Answers"
          value={totalAnswers}
          subtitle={`Last 30d: ${aLast30}`}
          trend={{ direction: aTrend.dir, percent: aTrend.pct }}
        />
        <StatCard
          title="Groups Owned"
          value={groupsOwned}
          subtitle="You manage"
        />
        <StatCard
          title="Groups Joined"
          value={groupsJoined}
          subtitle="Memberships"
        />
      </div>

      {/* Top assets-style section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-base md:text-lg">
              Top Companies
            </CardTitle>
            <Badge variant="secondary">{topCompanies.length} tracked</Badge>
          </CardHeader>
          <CardContent className="pt-0 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topCompanies.map((c, i) => (
              <AssetCard
                key={c.id}
                title={c.name}
                logoUrl={c.logoUrl ?? undefined}
                href={{ pathname: "/questions", query: { companies: c.name } }}
                index={i}
              />
            ))}
          </CardContent>
        </Card>

        <QuickActions />
      </div>

      <Card>
        <CardHeader className="pb-2 flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Top Roles</CardTitle>
          <Badge variant="secondary">{topRoles.length} tracked</Badge>
        </CardHeader>
        <CardContent className="pt-0 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {topRoles.map((r, i) => (
            <AssetCard
              key={r.id}
              title={r.name}
              href={{ pathname: "/questions", query: { roles: r.name } }}
              index={i + 2}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-muted-foreground mb-3 flex items-center justify-between">
            <span>
              {totalActivity} events in last 30 days · best day {bestDay}
            </span>
          </div>
          <Tabs defaultValue="30" className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <span>{series30.at(0)?.date}</span> –{" "}
                <span>{series30.at(-1)?.date}</span>
              </div>
              <TabsList>
                <TabsTrigger value="90">Last 3 months</TabsTrigger>
                <TabsTrigger value="30">Last 30 days</TabsTrigger>
                <TabsTrigger value="7">Last 7 days</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="90">
              <div className="h-56">
                <ActivityChart data={series90} />
              </div>
            </TabsContent>
            <TabsContent value="30">
              <div className="h-56">
                <ActivityChart data={series30} />
              </div>
            </TabsContent>
            <TabsContent value="7">
              <div className="h-56">
                <ActivityChart data={series7} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  trend,
}: {
  title: string;
  value: number;
  subtitle?: string;
  trend?: { direction: "up" | "down" | "neutral"; percent: number };
}) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        {trend ? (
          <Badge
            variant={
              trend.direction === "down"
                ? "destructive"
                : trend.direction === "up"
                  ? "default"
                  : "secondary"
            }
            className="gap-1"
          >
            {trend.direction === "up" ? (
              <TrendingUp className="size-3.5" />
            ) : trend.direction === "down" ? (
              <TrendingDown className="size-3.5" />
            ) : (
              <Minus className="size-3.5" />
            )}
            {`${Math.round(trend.percent)}%`}
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-semibold tabular-nums">{value}</div>
        {subtitle ? (
          <div className="text-xs text-muted-foreground mt-1">
            {trend ? (
              <span className="mr-1">
                {trend.direction === "up"
                  ? "Trending up"
                  : trend.direction === "down"
                    ? "Trending down"
                    : "No change"}
              </span>
            ) : null}
            {subtitle}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function AssetCard({
  title,
  href,
  index,
  logoUrl,
}: {
  title: string;
  href: { pathname: "/questions"; query: Record<string, string> };
  index: number;
  logoUrl?: string;
}) {
  // simple generated shape for sparkline
  const base: MiniPoint[] = Array.from({ length: 16 }, (_, x) => ({
    x,
    y: Math.max(
      0,
      Math.sin((x + index) / 2) * 5 + 6 + (index % 3) - (x % 5 === 0 ? 2 : 0)
    ),
  }));

  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden transition-colors hover:border-primary/40">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="truncate flex items-center gap-2">
              {logoUrl ? (
                <span className="relative inline-block size-5 overflow-hidden rounded-sm ring-1 ring-border/60">
                  <NextImage
                    src={logoUrl}
                    alt={`${title} logo`}
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-muted text-[10px] font-semibold">
                  {title.charAt(0)}
                </span>
              )}
              {title}
            </span>
          </CardTitle>
        </CardHeader>
        {/* <CardContent className="pt-0">
          <div className="h-20">
            <MiniArea data={base} muted={index % 2 === 1} className="h-full" />
          </div>
        </CardContent> */}
      </Card>
    </Link>
  );
}
