
import * as React from "react";
import { TradingChart } from "@/components/trading/chart";
import { AISignal } from "@/components/trading/ai-signal";
import { PriceDisplay } from "@/components/ui/price-display";
import { BadgeDelta } from "@/components/ui/badge-delta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Wallet,
  ArrowUpRight,
  Activity,
  Sparkles,
  ArrowRightLeft,
  Clock,
} from "lucide-react";

// Sample data for demonstration
const portfolioValue = 10245.65;
const portfolioPrevValue = 9850.32;

const todaysProfitLoss = 395.33;
const todaysProfitLossPercent = 4.01;

const activeTradesCount = 3;
const completedTradesCount = 142;
const winRate = 68;

const btcPrice = 49850.25;
const btcPrevPrice = 48230.75;
const btcChangePercent = 3.36;

const chartData = Array.from({ length: 24 }, (_, i) => {
  const basePrice = 48000;
  const volatility = 2000;
  const time = new Date();
  time.setHours(time.getHours() - 24 + i);
  
  return {
    time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: basePrice + (Math.random() - 0.5) * volatility,
  };
});

const recentTrades = [
  {
    id: 'tr-001',
    asset: 'BTC/USD',
    type: 'CALL',
    amount: 100,
    entryPrice: 48950.25,
    exitPrice: 49050.75,
    profit: 82.50,
    time: '15:30',
    status: 'win',
  },
  {
    id: 'tr-002',
    asset: 'ETH/USD',
    type: 'PUT',
    amount: 75,
    entryPrice: 3250.50,
    exitPrice: 3180.25,
    profit: 58.75,
    time: '14:45',
    status: 'win',
  },
  {
    id: 'tr-003',
    asset: 'XRP/USD',
    type: 'PUT',
    amount: 50,
    entryPrice: 0.5250,
    exitPrice: 0.5350,
    profit: -25.00,
    time: '14:15',
    status: 'loss',
  },
];

export default function DashboardPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceDisplay 
              value={portfolioValue} 
              prevValue={portfolioPrevValue} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Profit/Loss
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">
              ${todaysProfitLoss.toFixed(2)}
            </div>
            <BadgeDelta value={todaysProfitLossPercent} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trading Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-muted-foreground">Active</div>
                <div className="text-xl font-bold">{activeTradesCount}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Completed</div>
                <div className="text-xl font-bold">{completedTradesCount}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="text-xl font-bold">{winRate}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Overview
              </CardTitle>
              <CardDescription>
                Bitcoin/USD 24-hour price chart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground">BTC/USD</div>
                  <PriceDisplay value={btcPrice} prevValue={btcPrevPrice} />
                </div>
                <BadgeDelta value={btcChangePercent} />
              </div>
              <TradingChart data={chartData} height={350} />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Trading Signals
              </CardTitle>
              <CardDescription>
                Latest algorithmic predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AISignal 
                asset="BTC/USD"
                direction="up"
                confidence={0.82}
                timeframe="1-5 min"
                reasoning="Strong bullish momentum with increasing volume and breaking key resistance level at $49,500."
              />
              <AISignal 
                asset="ETH/USD"
                direction="down"
                confidence={0.71}
                timeframe="15-30 min"
                reasoning="Approaching resistance with bearish divergence on RSI indicator."
              />
              <AISignal 
                asset="XRP/USD"
                direction="neutral"
                confidence={0.53}
                timeframe="5-15 min"
                reasoning="Consolidation phase with decreasing volatility."
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map(trade => (
                  <div key={trade.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <div className="font-medium">{trade.asset}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          trade.type === 'CALL' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {trade.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {trade.time}
                        </span>
                      </div>
                    </div>
                    <div className={`text-right ${
                      trade.profit > 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {trade.profit > 0 ? '+' : ''}${Math.abs(trade.profit).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
