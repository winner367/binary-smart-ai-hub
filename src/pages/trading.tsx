
import * as React from "react";
import { TradingPair } from "@/components/trading/trading-pair";
import { AISignal } from "@/components/trading/ai-signal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Bitcoin, Coins, BarChart3, LineChart } from "lucide-react";
import { getDerivAccounts } from "@/services/deriv-auth";

// Sample trading data for demonstration
const cryptoPairs = [
  {
    name: "Bitcoin",
    shortName: "BTC/USD",
    icon: <Bitcoin className="h-5 w-5 text-amber-500" />,
    currentPrice: 49850.25,
    previousPrice: 48230.75,
    changePercent: 3.36,
    chartData: generateChartData(48000, 2000, 30),
  },
  {
    name: "Ethereum",
    shortName: "ETH/USD",
    icon: <Avatar className="h-5 w-5 bg-indigo-100"><span className="text-xs text-indigo-600">ETH</span></Avatar>,
    currentPrice: 3272.18,
    previousPrice: 3180.42,
    changePercent: 2.89,
    chartData: generateChartData(3100, 200, 30),
  },
  {
    name: "Ripple",
    shortName: "XRP/USD",
    icon: <Avatar className="h-5 w-5 bg-blue-100"><span className="text-xs text-blue-600">XRP</span></Avatar>,
    currentPrice: 0.5318,
    previousPrice: 0.5202,
    changePercent: 2.23,
    chartData: generateChartData(0.52, 0.03, 30),
  },
  {
    name: "Cardano",
    shortName: "ADA/USD",
    icon: <Avatar className="h-5 w-5 bg-blue-100"><span className="text-xs text-blue-600">ADA</span></Avatar>,
    currentPrice: 0.4518,
    previousPrice: 0.4402,
    changePercent: 2.63,
    chartData: generateChartData(0.44, 0.02, 30),
  },
];

const forexPairs = [
  {
    name: "EUR/USD",
    shortName: "EUR/USD",
    icon: <Avatar className="h-5 w-5 bg-blue-100"><span className="text-xs text-blue-600">€/$</span></Avatar>,
    currentPrice: 1.0872,
    previousPrice: 1.0865,
    changePercent: 0.06,
    chartData: generateChartData(1.085, 0.005, 30),
  },
  {
    name: "GBP/USD",
    shortName: "GBP/USD",
    icon: <Avatar className="h-5 w-5 bg-blue-100"><span className="text-xs text-blue-600">£/$</span></Avatar>,
    currentPrice: 1.2645,
    previousPrice: 1.2680,
    changePercent: -0.28,
    chartData: generateChartData(1.265, 0.008, 30),
  },
  {
    name: "USD/JPY",
    shortName: "USD/JPY",
    icon: <Avatar className="h-5 w-5 bg-red-100"><span className="text-xs text-red-600">¥/$</span></Avatar>,
    currentPrice: 154.35,
    previousPrice: 153.89,
    changePercent: 0.30,
    chartData: generateChartData(154, 1.5, 30),
  },
  {
    name: "AUD/USD",
    shortName: "AUD/USD",
    icon: <Avatar className="h-5 w-5 bg-green-100"><span className="text-xs text-green-600">A$/$</span></Avatar>,
    currentPrice: 0.6635,
    previousPrice: 0.6658,
    changePercent: -0.35,
    chartData: generateChartData(0.66, 0.008, 30),
  },
];

// Stock market data
const stockPairs = [
  {
    name: "Apple Inc.",
    shortName: "AAPL",
    icon: <Avatar className="h-5 w-5 bg-gray-100"><span className="text-xs text-gray-600">AAPL</span></Avatar>,
    currentPrice: 185.92,
    previousPrice: 184.40,
    changePercent: 0.82,
    chartData: generateChartData(185, 4, 30),
  },
  {
    name: "Microsoft",
    shortName: "MSFT",
    icon: <Avatar className="h-5 w-5 bg-blue-100"><span className="text-xs text-blue-600">MSFT</span></Avatar>,
    currentPrice: 416.75,
    previousPrice: 420.35,
    changePercent: -0.86,
    chartData: generateChartData(418, 8, 30),
  },
  {
    name: "Amazon",
    shortName: "AMZN",
    icon: <Avatar className="h-5 w-5 bg-orange-100"><span className="text-xs text-orange-600">AMZN</span></Avatar>,
    currentPrice: 184.72,
    previousPrice: 181.56,
    changePercent: 1.74,
    chartData: generateChartData(182, 5, 30),
  },
];

// Commodities market data
const commoditiesPairs = [
  {
    name: "Gold",
    shortName: "XAU/USD",
    icon: <Avatar className="h-5 w-5 bg-yellow-100"><span className="text-xs text-yellow-600">AU</span></Avatar>,
    currentPrice: 2325.40,
    previousPrice: 2310.75,
    changePercent: 0.63,
    chartData: generateChartData(2320, 25, 30),
  },
  {
    name: "Silver",
    shortName: "XAG/USD",
    icon: <Avatar className="h-5 w-5 bg-gray-100"><span className="text-xs text-gray-600">AG</span></Avatar>,
    currentPrice: 28.45,
    previousPrice: 27.98,
    changePercent: 1.68,
    chartData: generateChartData(28, 1, 30),
  },
  {
    name: "Oil (Brent)",
    shortName: "UK Oil",
    icon: <Avatar className="h-5 w-5 bg-black"><span className="text-xs text-white">OIL</span></Avatar>,
    currentPrice: 88.05,
    previousPrice: 87.26,
    changePercent: 0.90,
    chartData: generateChartData(87.5, 2, 30),
  },
];

// Generate random chart data for demonstration
function generateChartData(basePrice: number, volatility: number, points: number) {
  return Array.from({ length: points }, (_, i) => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (points - i));
    
    // Create some patterns in the data
    let modifier = Math.sin(i / 5) * 0.5 + (Math.random() - 0.5) * 0.5;
    
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: basePrice + modifier * volatility,
    };
  });
}

export default function TradingPage() {
  const { toast } = useToast();
  const [userAccounts, setUserAccounts] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    // Fetch user accounts from Deriv
    const accounts = getDerivAccounts();
    setUserAccounts(accounts || []);
  }, []);
  
  const handleOptionCall = (
    assetName: string, 
    direction: "up" | "down", 
    amount: number, 
    expiry: number
  ) => {
    // Real trading implementation would go here
    toast({
      title: `New ${direction.toUpperCase()} option placed`,
      description: `${assetName} - $${amount} with ${expiry}s expiry`,
      variant: direction === "up" ? "default" : "destructive",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trading Platform</h1>
        <div className="flex items-center gap-4">
          {userAccounts.map((account) => (
            <div key={account.loginid} className="text-sm bg-card p-2 rounded-md border">
              <span className="text-xs text-muted-foreground block">
                {account.account_type === 'demo' ? 'Demo' : 'Real'}
              </span>
              <span className="font-semibold">
                {account.currency} {account.balance?.toFixed(2) || '0.00'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Tabs defaultValue="crypto" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="forex">Forex</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="commodities">Commodities</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="crypto" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cryptoPairs.map((pair) => (
                  <TradingPair
                    key={pair.shortName}
                    name={pair.name}
                    shortName={pair.shortName}
                    icon={pair.icon}
                    currentPrice={pair.currentPrice}
                    previousPrice={pair.previousPrice}
                    changePercent={pair.changePercent}
                    chartData={pair.chartData}
                    onCallOption={(direction, amount, expiry) => 
                      handleOptionCall(pair.name, direction, amount, expiry)
                    }
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="forex" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {forexPairs.map((pair) => (
                  <TradingPair
                    key={pair.shortName}
                    name={pair.name}
                    shortName={pair.shortName}
                    icon={pair.icon}
                    currentPrice={pair.currentPrice}
                    previousPrice={pair.previousPrice}
                    changePercent={pair.changePercent}
                    chartData={pair.chartData}
                    onCallOption={(direction, amount, expiry) => 
                      handleOptionCall(pair.name, direction, amount, expiry)
                    }
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="stocks">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stockPairs.map((pair) => (
                  <TradingPair
                    key={pair.shortName}
                    name={pair.name}
                    shortName={pair.shortName}
                    icon={pair.icon}
                    currentPrice={pair.currentPrice}
                    previousPrice={pair.previousPrice}
                    changePercent={pair.changePercent}
                    chartData={pair.chartData}
                    onCallOption={(direction, amount, expiry) => 
                      handleOptionCall(pair.name, direction, amount, expiry)
                    }
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="commodities">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {commoditiesPairs.map((pair) => (
                  <TradingPair
                    key={pair.shortName}
                    name={pair.name}
                    shortName={pair.shortName}
                    icon={pair.icon}
                    currentPrice={pair.currentPrice}
                    previousPrice={pair.previousPrice}
                    changePercent={pair.changePercent}
                    chartData={pair.chartData}
                    onCallOption={(direction, amount, expiry) => 
                      handleOptionCall(pair.name, direction, amount, expiry)
                    }
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="space-y-4 sticky top-20">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Trading Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Today's trades:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Win rate:</span>
                    <span className="font-medium text-emerald-500">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Profit/Loss:</span>
                    <span className="font-medium text-emerald-500">+$235.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Trading Signals</CardTitle>
                <CardDescription>Real-time market predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AISignal 
                  asset="BTC/USD"
                  direction="up"
                  confidence={0.82}
                  timeframe="1-5 min"
                />
                <AISignal 
                  asset="ETH/USD"
                  direction="down"
                  confidence={0.71}
                  timeframe="15-30 min"
                />
                <AISignal 
                  asset="XRP/USD"
                  direction="neutral"
                  confidence={0.53}
                  timeframe="5-15 min"
                />
                <AISignal 
                  asset="EUR/USD"
                  direction="down"
                  confidence={0.65}
                  timeframe="5-10 min"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Tech sector:</span>
                    <span className="text-sm font-medium text-emerald-500">Bullish</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Crypto market:</span>
                    <span className="text-sm font-medium text-emerald-500">Bullish</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Forex:</span>
                    <span className="text-sm font-medium">Neutral</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Commodities:</span>
                    <span className="text-sm font-medium text-red-500">Bearish</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
