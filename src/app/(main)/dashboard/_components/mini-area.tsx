"use client";

import { Area, AreaChart, CartesianGrid } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export type MiniPoint = { x: string | number; y: number };

const config: ChartConfig = {
  series: {
    label: "",
    color: "hsl(var(--primary))",
  },
};

export function MiniArea({
  data,
  className,
  muted = false,
}: {
  data: MiniPoint[];
  className?: string;
  muted?: boolean;
}) {
  return (
    <ChartContainer
      className={className}
      config={{
        series: {
          label: "",
          color: muted ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))",
        },
      }}
    >
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
        <defs>
          <linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-series)"
              stopOpacity={0.25}
            />
            <stop
              offset="95%"
              stopColor="var(--color-series)"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeOpacity={0.1} />
        <Area
          dataKey="y"
          type="monotone"
          stroke="var(--color-series)"
          fill="url(#miniFill)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
