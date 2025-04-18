
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Activity,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradingChart } from "@/components/trading/chart";

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const [stats, setStats] = useState({
    totalUsers: 127,
    activeUsers: 84,
    newSignups: 12,
    totalTrades: 5487,
    todayTrades: 342,
    profit: 28750.25,
    systemStatus: "Operational",
    alertsCount: 3,
  });

  // Mock chart data
  const generateChartData = (days: number = 30) => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      return {
        time: date.toISOString().split('T')[0],
        users: Math.floor(70 + Math.random() * 40),
        trades: Math.floor(150 + Math.random() * 250),
      };
    });
  };

  const [chartData, setChartData] = useState(generateChartData());

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium">System: {stats.systemStatus}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts ({stats.alertsCount})</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{stats.activeUsers} active</span>
              <span className="text-green-500">+{stats.newSignups} today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Trades</CardDescription>
            <CardTitle className="text-3xl">{stats.totalTrades.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">All time</span>
              <span className="text-green-500">+{stats.todayTrades} today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Platform Revenue</CardDescription>
            <CardTitle className="text-3xl">${stats.profit.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">All time</span>
              <span className="text-green-500">+12.4% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>System Health</CardDescription>
            <CardTitle className="text-3xl">98.7%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uptime</span>
              <span className="text-green-500">All systems go</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Platform Analytics
          </CardTitle>
          <CardDescription>User activity and trading volume over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <TradingChart 
              data={chartData.map(item => ({
                time: item.time,
                price: item.trades // Using trades count as the "price" for the chart
              }))} 
              height={350} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:bg-muted/40 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">View and manage user accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/40 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Activity Logs</h3>
                <p className="text-sm text-muted-foreground">Audit trails and system logs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/40 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">System Settings</h3>
                <p className="text-sm text-muted-foreground">Configure platform settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
