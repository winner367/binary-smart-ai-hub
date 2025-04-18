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
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AreaChart,
  Activity,
  Calendar,
  TrendingUp,
  Award,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PerformanceAnalysis() {
  // Mock data for performance metrics
  const [target, setTarget] = useState(1000);
  const [currentProfit, setCurrentProfit] = useState(620);
  const [completionPercent, setCompletionPercent] = useState(62);
  
  // Generate mock data for daily performance
  const generateDailyData = () => {
    const data = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      // Create a pattern with some randomness
      const dayOfMonth = date.getDate();
      const basePerformance = Math.sin(dayOfMonth / 5) * 20 + 50; // sine wave pattern
      const randomness = (Math.random() - 0.5) * 30; // random variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        profit: Math.max(0, Math.round(basePerformance + randomness)),
        trades: Math.floor(Math.random() * 15) + 5,
        winRate: Math.floor(Math.random() * 30) + 55,
      });
    }
    return data;
  };
  
  // Generate mock data for weekly performance
  const generateWeeklyData = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    return weeks.map(week => ({
      name: week,
      profit: Math.floor(Math.random() * 200) + 100,
      target: 300,
      trades: Math.floor(Math.random() * 50) + 30,
      winRate: Math.floor(Math.random() * 20) + 60,
    }));
  };
  
  // Generate mock data for monthly performance
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      name: month,
      profit: Math.floor(Math.random() * 1000) - 200,
      target: 800,
      trades: Math.floor(Math.random() * 100) + 50,
      winRate: Math.floor(Math.random() * 15) + 60,
    }));
  };
  
  const [dailyData] = useState(generateDailyData());
  const [weeklyData] = useState(generateWeeklyData());
  const [monthlyData] = useState(generateMonthlyData());
  const [yearlyData] = useState([
    { name: '2022', profit: 4200, target: 5000, winRate: 63 },
    { name: '2023', profit: 7500, target: 7000, winRate: 68 },
    { name: '2024', profit: 3100, target: 10000, winRate: 71 },
  ]);
  
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTarget = parseInt(e.target.value);
    if (!isNaN(newTarget)) {
      setTarget(newTarget);
      setCompletionPercent(Math.min(100, Math.round((currentProfit / newTarget) * 100)));
    }
  };
  
  // Best and worst performing assets
  const assets = [
    { name: "BTC/USD", winRate: 78, trades: 42, profit: 324.50 },
    { name: "ETH/USD", winRate: 65, trades: 37, profit: 187.25 },
    { name: "EUR/USD", winRate: 59, trades: 63, profit: 145.80 },
    { name: "GBP/USD", winRate: 73, trades: 22, profit: 98.50 },
    { name: "Gold", winRate: 62, trades: 18, profit: 87.30 },
  ].sort((a, b) => b.profit - a.profit);
  
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="h-7 w-7" />
          Performance Analysis
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Analysis Report
          </Button>
        </div>
      </div>
      
      {/* Goal Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Goals</CardTitle>
          <CardDescription>Track your trading objectives and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Profit Goal */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="target">Profit Target ($)</Label>
                  <span className="text-sm font-medium">{completionPercent}% Complete</span>
                </div>
                <Input 
                  id="target" 
                  type="number" 
                  value={target} 
                  onChange={handleTargetChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: ${currentProfit}</span>
                  <span>Goal: ${target}</span>
                </div>
                <Progress value={completionPercent} className="h-2" />
              </div>
            </div>
            
            {/* Other Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="text-2xl font-bold">68%</div>
                <div className="text-xs text-green-500">+5% vs last month</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Trades</div>
                <div className="text-2xl font-bold">345</div>
                <div className="text-xs text-muted-foreground">This month</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Avg Profit/Trade</div>
                <div className="text-2xl font-bold">$4.35</div>
                <div className="text-xs text-green-500">+$0.82 vs last month</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Longest Streak</div>
                <div className="text-2xl font-bold">7 Wins</div>
                <div className="text-xs text-muted-foreground">Current: 3 wins</div>
              </div>
            </div>
            
            {/* Best & Worst Performers */}
            <div>
              <div className="text-sm font-medium mb-3">Best Performing Assets</div>
              <div className="space-y-3">
                {assets.slice(0, 3).map((asset, i) => (
                  <div key={asset.name} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-amber-100 text-amber-800' :
                      i === 1 ? 'bg-gray-200 text-gray-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{asset.name}</span>
                        <span className="text-green-500">+${asset.profit}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Win rate: {asset.winRate}%</span>
                        <span>{asset.trades} trades</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>View your trading performance over different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="profit"
                      name="Profit ($)"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="winRate"
                      name="Win Rate (%)"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" name="Actual Profit ($)" fill="#8884d8" />
                    <Bar dataKey="target" name="Target Profit ($)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" name="Profit ($)" fill="#8884d8" />
                    <Bar dataKey="target" name="Target ($)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" name="Profit ($)" fill="#8884d8" />
                    <Bar dataKey="target" name="Target ($)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Tips and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Performance Improvement Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Focus on EUR/USD</h3>
              <p className="text-sm text-muted-foreground">
                Your win rate on EUR/USD trades has been consistently above 70% over the past month.
                Consider allocating more of your trading budget to this asset.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Avoid Trading at 2-3 PM</h3>
              <p className="text-sm text-muted-foreground">
                Your performance analysis shows that trades executed between 2-3 PM have a 30% lower win rate 
                than your average. Consider avoiding this time period.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Optimize Bot Settings</h3>
              <p className="text-sm text-muted-foreground">
                Increasing the signal threshold to 65% has shown a 12% improvement 
                in win rate during our testing. Try adjusting this parameter.
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Risk Management Alert</p>
              <p>Your maximum loss threshold was nearly reached on May 15th. Consider reducing trade size or reviewing your strategy during high volatility periods.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
