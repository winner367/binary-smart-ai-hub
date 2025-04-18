
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Upload,
  Play,
  Square,
  RefreshCcw,
  Settings,
  Sliders,
  PauseCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertCircle,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TradingChart } from "@/components/trading/chart";

export default function BinaryBotPage() {
  const { toast } = useToast();
  const [botActive, setBotActive] = useState(false);
  const [riskLevel, setRiskLevel] = useState(30);
  const [selectedMarket, setSelectedMarket] = useState("rise_fall");
  const [cooldownPeriod, setCooldownPeriod] = useState(3);
  const [martingaleMultiplier, setMartingaleMultiplier] = useState(2);
  const [stakeAmount, setStakeAmount] = useState(5);
  const [profitThreshold, setProfitThreshold] = useState(100);
  const [lossThreshold, setLossThreshold] = useState(50);
  const [selectedStrategy, setSelectedStrategy] = useState("probability");
  
  // Mock bot performance data
  const [botPerformance, setBotPerformance] = useState({
    totalStake: 0,
    totalPayout: 0,
    runs: 0,
    won: 0,
    lost: 0,
    profitLoss: 0,
  });
  
  // Mock chart data
  const generateChartData = (points: number = 100) => {
    return Array.from({ length: points }, (_, i) => {
      const baseValue = 100;
      const trend = Math.sin(i / 10) * 20; // Create a sine wave pattern
      const random = (Math.random() - 0.5) * 10; // Add some randomness
      
      const time = new Date();
      time.setMinutes(time.getMinutes() - (points - i));
      
      return {
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: baseValue + trend + random,
      };
    });
  };
  
  const [chartData, setChartData] = useState(generateChartData());
  
  const handleStartBot = () => {
    if (botActive) {
      setBotActive(false);
      toast({
        title: "Bot Stopped",
        description: "The trading bot has been stopped.",
      });
    } else {
      setBotActive(true);
      toast({
        title: "Bot Started",
        description: "The trading bot is now running.",
      });
      
      // Simulate bot activity for demo purposes
      simulateBotActivity();
    }
  };
  
  const simulateBotActivity = () => {
    // This is just for demonstration purposes
    const interval = setInterval(() => {
      if (!botActive) {
        clearInterval(interval);
        return;
      }
      
      const win = Math.random() > 0.4; // 60% win rate for demo
      const tradeAmount = stakeAmount;
      const payout = win ? tradeAmount * 1.8 : 0;
      const profitLoss = win ? tradeAmount * 0.8 : -tradeAmount;
      
      setBotPerformance(prev => ({
        totalStake: prev.totalStake + tradeAmount,
        totalPayout: prev.totalPayout + payout,
        runs: prev.runs + 1,
        won: prev.won + (win ? 1 : 0),
        lost: prev.lost + (win ? 0 : 1),
        profitLoss: prev.profitLoss + profitLoss,
      }));
      
      toast({
        title: win ? "Trade Won" : "Trade Lost",
        description: `${win ? 'Profit' : 'Loss'}: $${Math.abs(profitLoss).toFixed(2)}`,
        variant: win ? "default" : "destructive",
      });
      
      // Update chart data with new value
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (win ? 2 : -2) + (Math.random() - 0.5) * 3;
        
        const time = new Date();
        newData.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: newPrice,
        });
        
        return newData;
      });
      
    }, 5000); // Simulate a trade every 5 seconds
    
    return () => clearInterval(interval);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Bot Strategy Uploaded",
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };
  
  const handleReset = () => {
    setBotActive(false);
    setBotPerformance({
      totalStake: 0,
      totalPayout: 0,
      runs: 0,
      won: 0,
      lost: 0,
      profitLoss: 0,
    });
    
    toast({
      title: "Bot Reset",
      description: "All bot stats have been reset.",
    });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="h-7 w-7" />
          Binary Bot
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <label htmlFor="xml-upload" className="cursor-pointer">
            <Button variant="outline" as="span">
              <Upload className="mr-2 h-4 w-4" />
              Upload Strategy
            </Button>
            <input 
              id="xml-upload" 
              type="file" 
              accept=".xml" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Bot Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Market Chart</span>
                <Badge className={botActive ? 'bg-green-500' : 'bg-gray-500'}>
                  {botActive ? 'Bot Active' : 'Bot Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription>Live chart with bot activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <TradingChart data={chartData} height={350} />
              </div>
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <Button 
                  onClick={handleStartBot}
                  variant={botActive ? "destructive" : "default"}
                  className="flex-1"
                >
                  {botActive ? (
                    <>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Bot
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Bot
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  <PauseCircle className="mr-2 h-4 w-4" />
                  Pause (1 Cycle)
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Bot Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Bot Performance</CardTitle>
              <CardDescription>
                You'll be able to track your bot's performance here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Stake</div>
                  <div className="text-2xl font-bold">${botPerformance.totalStake.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Payout</div>
                  <div className="text-2xl font-bold">${botPerformance.totalPayout.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Profit/Loss</div>
                  <div className={`text-2xl font-bold ${botPerformance.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {botPerformance.profitLoss >= 0 ? '+' : '-'}${Math.abs(botPerformance.profitLoss).toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Number of Runs</div>
                  <div className="text-2xl font-bold">{botPerformance.runs}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Contracts Won</div>
                  <div className="text-2xl font-bold text-green-500">{botPerformance.won}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Contracts Lost</div>
                  <div className="text-2xl font-bold text-red-500">{botPerformance.lost}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bot Settings */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bot Settings
              </CardTitle>
              <CardDescription>Configure your trading bot parameters</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <Tabs defaultValue="market">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="risk">Risk</TabsTrigger>
                </TabsList>
                
                <TabsContent value="market" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Market Type</Label>
                    <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rise_fall">Rise/Fall</SelectItem>
                        <SelectItem value="high_low">Higher/Lower</SelectItem>
                        <SelectItem value="touch">Touch/No Touch</SelectItem>
                        <SelectItem value="even_odd">Even/Odd</SelectItem>
                        <SelectItem value="matches_differs">Matches/Differs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Symbol</Label>
                    <Select defaultValue="btc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select symbol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC/USD)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH/USD)</SelectItem>
                        <SelectItem value="eurusd">EUR/USD</SelectItem>
                        <SelectItem value="gbpusd">GBP/USD</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        min="1" 
                        defaultValue="5"
                      />
                      <Select defaultValue="minutes">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ticks">Ticks</SelectItem>
                          <SelectItem value="seconds">Seconds</SelectItem>
                          <SelectItem value="minutes">Minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Stake Amount ($)</Label>
                      <div className="text-sm">${stakeAmount}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setStakeAmount(prev => Math.max(1, prev - 1))}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setStakeAmount(prev => Math.min(100, prev + 1))}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="strategy" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Trading Strategy</Label>
                    <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="probability">Probability Calculation</SelectItem>
                        <SelectItem value="martingale">Martingale</SelectItem>
                        <SelectItem value="trends">Trend Following</SelectItem>
                        <SelectItem value="macd">MACD Crossover</SelectItem>
                        <SelectItem value="rsi">RSI Oversold/Overbought</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedStrategy === "martingale" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Martingale Multiplier</Label>
                        <div className="text-sm">{martingaleMultiplier}x</div>
                      </div>
                      <Slider
                        value={[martingaleMultiplier]} 
                        min={1.1}
                        max={5}
                        step={0.1}
                        onValueChange={(value) => setMartingaleMultiplier(value[0])}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Signal Threshold</Label>
                      <div className="text-sm">
                        {riskLevel}%
                      </div>
                    </div>
                    <Slider 
                      value={[riskLevel]} 
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => setRiskLevel(value[0])}
                    />
                    <div className="text-xs text-muted-foreground">
                      Higher values require stronger signals before placing trades
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Use AI Prediction</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Leverage AI analysis to improve trade accuracy
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="risk" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Take Profit ($)</Label>
                      <div className="text-sm">${profitThreshold}</div>
                    </div>
                    <Slider 
                      value={[profitThreshold]} 
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(value) => setProfitThreshold(value[0])}
                    />
                    <div className="text-xs text-muted-foreground">
                      Bot will stop when profit threshold is reached
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Stop Loss ($)</Label>
                      <div className="text-sm">${lossThreshold}</div>
                    </div>
                    <Slider 
                      value={[lossThreshold]} 
                      min={10}
                      max={200}
                      step={10}
                      onValueChange={(value) => setLossThreshold(value[0])}
                    />
                    <div className="text-xs text-muted-foreground">
                      Bot will stop when loss threshold is reached
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Cooldown After Losses</Label>
                      <div className="text-sm">{cooldownPeriod} trades</div>
                    </div>
                    <Slider 
                      value={[cooldownPeriod]} 
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => setCooldownPeriod(value[0])}
                    />
                    <div className="text-xs text-muted-foreground">
                      Number of consecutive losses before pausing for reanalysis
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        Trading bots involve risk. Only trade with funds you can afford to lose.
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${className || 'bg-primary text-primary-foreground'}`}>
      {children}
    </span>
  );
};
