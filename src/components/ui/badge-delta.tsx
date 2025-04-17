
import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"

interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  value: number
  decimal?: number
  showSymbol?: boolean
}

export function BadgeDelta({
  children,
  value,
  decimal = 2,
  showSymbol = true,
  className,
  ...props
}: BadgeDeltaProps) {
  const isPositive = value > 0
  const isNegative = value < 0
  const isNeutral = value === 0
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
        {
          "bg-emerald-100 text-emerald-700": isPositive,
          "bg-red-100 text-red-700": isNegative,
          "bg-zinc-100 text-zinc-700": isNeutral,
        },
        className
      )}
      {...props}
    >
      {children}
      {isPositive && (
        <>
          <ArrowUp className="h-3 w-3" />
          {showSymbol && "+"}
          {value.toFixed(decimal)}%
        </>
      )}
      {isNegative && (
        <>
          <ArrowDown className="h-3 w-3" />
          {value.toFixed(decimal)}%
        </>
      )}
      {isNeutral && `${value.toFixed(decimal)}%`}
    </span>
  )
}
