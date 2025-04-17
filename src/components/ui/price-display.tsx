
import * as React from "react"
import { cn } from "@/lib/utils"

interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  currency?: string
  value: number
  prevValue?: number
  compact?: boolean
}

export function PriceDisplay({
  currency = "USD",
  value,
  prevValue,
  compact = false,
  className,
  ...props
}: PriceDisplayProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: compact ? 2 : 4,
    notation: compact ? "compact" : "standard",
  })
  
  const priceChange = prevValue ? value - prevValue : 0
  const isPositive = priceChange > 0
  const isNegative = priceChange < 0
  
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="text-2xl font-bold">{formatter.format(value)}</div>
      {prevValue && (
        <div 
          className={cn("text-sm", {
            "text-emerald-500": isPositive,
            "text-red-500": isNegative,
            "text-muted-foreground": !isPositive && !isNegative,
          })}
        >
          {isPositive && "+"}
          {formatter.format(priceChange)} 
          {isPositive && "▲"} 
          {isNegative && "▼"}
        </div>
      )}
    </div>
  )
}
