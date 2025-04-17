
import * as React from "react";
import { TradingPair } from "@/components/trading/trading-pair";
import { AISignal } from "@/components/trading/ai-signal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Bitcoin, Coins } from "lucide-react";

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
  
  const handleOptionCall = (
    assetName: string, 
    direction: "up" | "down", 
    amount: number, 
    expiry: number
  ) => {
    toast({
      title: `New ${direction.toUpperCase()} option placed`,
      description: `${assetName} - $${amount} with ${expiry}s expiry`,
      variant: direction === "up" ? "default" : "destructive",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Trading Platform</h1>
      
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
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <div className="text-center">
                  <Coins className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Stocks Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Stock markets trading will be available soon
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="commodities">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <div className="text-center">
                  <Coins className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Commodities Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Commodities trading will be available soon
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>AI Trading Signals</CardTitle>
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
        </div>
      </div>
    </div>
  );
}
