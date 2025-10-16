"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export type ActivityPoint = {
  date: string;
  questions: number;
  answers: number;
};

const chartConfig: ChartConfig = {
  questions: {
    label: "Questions",
    color: "var(--chart-5)",
  },
  answers: {
    label: "Answers",
    color: "var(--chart-4)",
  },
};

export function ActivityChart({ data }: { data: ActivityPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <LineChart
        data={data}
        margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
        />
        <YAxis
          width={28}
          tickMargin={4}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="questions"
          type="monotone"
          stroke="var(--color-questions)"
          strokeWidth={2}
          dot={false}
          name="questions"
        />
        <Line
          dataKey="answers"
          type="monotone"
          stroke="var(--color-answers)"
          strokeWidth={2}
          dot={false}
          name="answers"
        />
      </LineChart>
    </ChartContainer>
  );
}
