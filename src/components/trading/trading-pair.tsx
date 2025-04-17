
import * as React from "react";
import { TradingChart } from "@/components/trading/chart";
import { BadgeDelta } from "@/components/ui/badge-delta";
import { PriceDisplay } from "@/components/ui/price-display";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingPairProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  shortName: string;
  icon?: React.ReactNode;
  currentPrice: number;
  previousPrice: number;
  changePercent: number;
  chartData: Array<{
    time: string;
    price: number;
  }>;
  chartHeight?: number;
  onCallOption?: (direction: "up" | "down", amount: number, expiry: number) => void;
}

export function TradingPair({
  name,
  shortName,
  icon,
  currentPrice,
  previousPrice,
  changePercent,
  chartData,
  chartHeight = 200,
  onCallOption,
  className,
  ...props
}: TradingPairProps) {
  const [selectedAmount, setSelectedAmount] = React.useState(100);
  const [selectedExpiry, setSelectedExpiry] = React.useState(60); // in seconds
  
  const handleOptionCall = (direction: "up" | "down") => {
    if (onCallOption) {
      onCallOption(direction, selectedAmount, selectedExpiry);
    }
  };

  return (
    <div className={cn("trading-card p-4 space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="h-6 w-6">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-xs text-muted-foreground">{shortName}</p>
          </div>
        </div>
        <BadgeDelta value={changePercent} />
      </div>
      
      <PriceDisplay value={currentPrice} prevValue={previousPrice} />
      
      <TradingChart data={chartData} height={chartHeight} />
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <select
            id="amount"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="w-full bg-background rounded-md border border-input px-3 py-2"
          >
            <option value={50}>$50</option>
            <option value={100}>$100</option>
            <option value={250}>$250</option>
            <option value={500}>$500</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="expiry" className="text-sm font-medium">
            Expiry
          </label>
          <select
            id="expiry"
            value={selectedExpiry}
            onChange={(e) => setSelectedExpiry(Number(e.target.value))}
            className="w-full bg-background rounded-md border border-input px-3 py-2"
          >
            <option value={30}>30 sec</option>
            <option value={60}>1 min</option>
            <option value={300}>5 min</option>
            <option value={900}>15 min</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => handleOptionCall("up")} 
          className="btn-trade-up"
        >
          <TrendingUp className="mr-1 h-4 w-4" />
          Call / Up
        </Button>
        
        <Button 
          onClick={() => handleOptionCall("down")} 
          className="btn-trade-down"
        >
          <TrendingDown className="mr-1 h-4 w-4" />
          Put / Down
        </Button>
      </div>
      
      <div className="flex items-center justify-center text-xs text-muted-foreground pt-2">
        <Clock className="h-3 w-3 mr-1" />
        Expires in {Math.floor(selectedExpiry / 60)}m {selectedExpiry % 60}s
      </div>
    </div>
  );
}
