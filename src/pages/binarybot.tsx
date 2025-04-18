
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Play,
  Square,
  RotateCcw,
  Upload,
  Settings,
  LineChart,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";
import { TradingChart } from "@/components/trading/chart";

export default function BinaryBotPage() {
  const [botStatus, setBotStatus] = useState<"stopped" | "running">("stopped");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock data for bot stats
  const [botStats, setBotStats] = useState({
    totalStake: 0,
    totalPayout: 0,
    runs: 0,
    lost: 0,
    won: 0,
    profit: 0,
  });

  // Sample chart data
  const chartData = Array.from({ length: 24 }, (_, i) => {
    const baseValue = 0;
    const volatility = 3;
    const time = new Date();
    time.setHours(time.getHours() - 24 + i);
    
    return {
      time: time.toISOString().split('T')[0],
      price: baseValue + (Math.random() * volatility),
    };
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRun = () => {
    // Simulate bot running
    setBotStatus("running");
    
    // Mock bot activity with random data
    const interval = setInterval(() => {
      setBotStats(prev => {
        const stake = 10;
        const won = Math.random() > 0.4;
        const payout = won ? stake * 1.8 : 0;
        
        return {
          totalStake: prev.totalStake + stake,
          totalPayout: prev.totalPayout + payout,
          runs: prev.runs + 1,
          won: prev.won + (won ? 1 : 0),
          lost: prev.lost + (won ? 0 : 1),
          profit: prev.totalPayout - prev.totalStake,
        };
      });
    }, 5000);
    
    // Store interval ID to clear on stop
    (window as any).botInterval = interval;
  };

  const handleStop = () => {
    setBotStatus("stopped");
    clearInterval((window as any).botInterval);
  };

  const handleReset = () => {
    setBotStatus("stopped");
    clearInterval((window as any).botInterval);
    setBotStats({
      totalStake: 0,
      totalPayout: 0,
      runs: 0,
      lost: 0,
      won: 0,
      profit: 0,
    });
    setSelectedFile(null);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Binary Bot</h1>
        <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
          botStatus === "running" 
            ? "bg-green-100 text-green-800" 
            : "bg-amber-100 text-amber-800"
        }`}>
          <span className={`h-2 w-2 rounded-full ${
            botStatus === "running" ? "bg-green-500" : "bg-amber-500"
          }`}></span>
          <span className="font-medium">Bot {botStatus === "running" ? "Running" : "Stopped"}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Bot Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bot Configuration
              </CardTitle>
              <CardDescription>
                Configure your trading bot parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="settings">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="risk">Risk Management</TabsTrigger>
                  <TabsTrigger value="upload">Upload Bot</TabsTrigger>
                </TabsList>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Trading Parameters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Market Type</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                          <option>Rise/Fall</option>
                          <option>Even/Odd</option>
                          <option>Matches/Differs</option>
                          <option>Over/Under</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Symbol</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                          <option>BTC/USD</option>
                          <option>ETH/USD</option>
                          <option>EUR/USD</option>
                          <option>GBP/USD</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <div className="flex gap-2">
                          <input type="number" defaultValue={5} min={1} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                          <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                            <option>Minutes</option>
                            <option>Ticks</option>
                            <option>Seconds</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stake</label>
                        <div className="flex gap-2">
                          <select className="w-20 h-10 px-3 rounded-md border border-input bg-background">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                          </select>
                          <input type="number" defaultValue={10} min={1} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="strategy" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">AI Strategy Configuration</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Strategy Type</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                          <option>Probability Calculation</option>
                          <option>Martingale</option>
                          <option>Digit Analysis</option>
                          <option>Trend Following</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Indicators</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                          <option>RSI + MACD</option>
                          <option>Moving Average</option>
                          <option>Bollinger Bands</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Signal Threshold (%)</label>
                        <input type="number" defaultValue={65} min={1} max={100} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Analysis Period</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                          <option>Short Term (1-5 min)</option>
                          <option>Medium Term (5-15 min)</option>
                          <option>Long Term (15+ min)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="risk" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Risk Management</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Take Profit</label>
                        <div className="flex gap-2">
                          <input type="number" defaultValue={100} min={0} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                          <select className="w-24 h-10 px-3 rounded-md border border-input bg-background">
                            <option>USD</option>
                            <option>%</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stop Loss</label>
                        <div className="flex gap-2">
                          <input type="number" defaultValue={50} min={0} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                          <select className="w-24 h-10 px-3 rounded-md border border-input bg-background">
                            <option>USD</option>
                            <option>%</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Max Consecutive Losses</label>
                        <input type="number" defaultValue={5} min={1} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cooldown Period (minutes)</label>
                        <input type="number" defaultValue={15} min={1} className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-6">
                  <div className="border-2 border-dashed border-input p-6 rounded-md text-center">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">Upload XML Bot File</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your XML bot file here or click to browse
                    </p>
                    <div className="relative">
                      <Button variant="outline" className="w-full">
                        Choose File
                        <input
                          type="file"
                          accept=".xml"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </Button>
                    </div>
                    {selectedFile && (
                      <p className="mt-4 text-sm">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Bot Controls */}
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Bot Controls</h3>
                  <p className="text-sm text-muted-foreground">
                    Start, stop or reset your trading bot
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  {botStatus === "stopped" ? (
                    <Button
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      onClick={handleRun}
                    >
                      <Play className="h-4 w-4" />
                      Run Bot
                    </Button>
                  ) : (
                    <Button
                      className="gap-2 bg-red-600 hover:bg-red-700"
                      onClick={handleStop}
                    >
                      <Square className="h-4 w-4" />
                      Stop Bot
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Bot Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Performance Chart
              </CardTitle>
              <CardDescription>
                Real-time visualization of your bot's performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <TradingChart data={chartData} height={350} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bot Stats & Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Bot Summary</CardTitle>
              <CardDescription>
                Track your bot's performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Stake</p>
                  <p className="text-xl font-semibold">${botStats.totalStake.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Payout</p>
                  <p className="text-xl font-semibold">${botStats.totalPayout.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Number of Runs</p>
                  <p className="text-xl font-semibold">{botStats.runs}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contracts Won</p>
                  <p className="text-xl font-semibold text-green-600">{botStats.won}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contracts Lost</p>
                  <p className="text-xl font-semibold text-red-600">{botStats.lost}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
                  <p className={`text-xl font-semibold ${
                    botStats.profit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {botStats.profit >= 0 ? '+' : ''}{botStats.profit.toFixed(2)} USD
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Win Rate</span>
                  <span className="text-sm font-medium">
                    {botStats.runs > 0 
                      ? Math.round((botStats.won / botStats.runs) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ 
                      width: `${botStats.runs > 0 
                        ? Math.round((botStats.won / botStats.runs) * 100) 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {botStatus === "running" && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">Bot is currently running. Performance metrics are being updated in real-time.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                Trade History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {botStats.runs > 0 ? (
                  Array.from({ length: Math.min(5, botStats.runs) }).map((_, i) => {
                    const won = Math.random() > 0.4;
                    const amount = (Math.random() * 10 + 5).toFixed(2);
                    const time = new Date();
                    time.setMinutes(time.getMinutes() - i * 5);
                    
                    return (
                      <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">BTC/USD</div>
                          <div className="text-xs text-muted-foreground">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div className={`${won ? 'text-green-600' : 'text-red-600'}`}>
                          {won ? '+' : '-'}${amount}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No trade history available yet. Start the bot to begin trading.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
