
import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AISignalProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: string;
  direction: "up" | "down" | "neutral";
  confidence: number;
  timeframe: string;
  reasoning?: string;
}

export function AISignal({
  asset,
  direction,
  confidence,
  timeframe,
  reasoning,
  className,
  ...props
}: AISignalProps) {
  const directionMap = {
    up: {
      color: "bg-emerald-100 text-emerald-700",
      icon: <ArrowUpRight className="h-4 w-4" />,
      text: "BULLISH",
    },
    down: {
      color: "bg-red-100 text-red-700",
      icon: <ArrowDownRight className="h-4 w-4" />,
      text: "BEARISH",
    },
    neutral: {
      color: "bg-zinc-100 text-zinc-700",
      icon: null,
      text: "NEUTRAL",
    },
  };

  const confidenceBars = [];
  for (let i = 0; i < 5; i++) {
    confidenceBars.push(
      <div
        key={i}
        className={cn("h-1.5 rounded-full w-4", {
          "bg-primary": i < Math.round(confidence * 5),
          "bg-muted": i >= Math.round(confidence * 5),
        })}
      />
    );
  }

  return (
    <div
      className={cn(
        "trading-card p-4 flex flex-col gap-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold">AI Signal</span>
        </div>
        <Badge className={directionMap[direction].color}>
          {directionMap[direction].icon} {directionMap[direction].text}
        </Badge>
      </div>

      <h3 className="text-xl font-bold">{asset}</h3>
      
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">Confidence</div>
        <div className="flex gap-1">{confidenceBars}</div>
        <div className="text-xs text-right">
          {Math.round(confidence * 100)}%
        </div>
      </div>
      
      <div>
        <div className="text-xs text-muted-foreground">Timeframe</div>
        <div className="font-medium">{timeframe}</div>
      </div>
      
      {reasoning && (
        <div>
          <div className="text-xs text-muted-foreground">Analysis</div>
          <div className="text-sm">{reasoning}</div>
        </div>
      )}
    </div>
  );
}
