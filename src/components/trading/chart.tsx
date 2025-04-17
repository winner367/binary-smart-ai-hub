
import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface TradingChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{
    time: string;
    price: number;
  }>;
  height?: number;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  upColor?: string;
  downColor?: string;
}

export function TradingChart({
  data,
  height = 300,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  upColor = "#10b981",
  downColor = "#ef4444",
  className,
  ...props
}: TradingChartProps) {
  const isPositive = data.length > 1 ? data[data.length - 1].price >= data[0].price : true;
  const gradientColor = isPositive ? upColor : downColor;

  return (
    <div className={cn("chart-container w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showXAxis && (
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              minTickGap={120}
            />
          )}
          {showYAxis && (
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              width={60}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const value = payload[0].value;
                  const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
                  return (
                    <div className="rounded-lg bg-background/95 p-2 shadow-md border border-border">
                      <div className="text-sm text-foreground font-medium">
                        ${formattedValue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {payload[0].payload.time}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="price"
            stroke={gradientColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
