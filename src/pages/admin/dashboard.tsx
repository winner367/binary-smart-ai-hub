
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Bell,
  UserCheck,
  UserX,
  Clock,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradingChart } from "@/components/trading/chart";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Mock alerts for admin
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'system', message: 'System maintenance scheduled for 2025-05-01', read: false },
    { id: 2, type: 'user', message: 'Unusual activity detected on user ID #45892', read: false },
    { id: 3, type: 'security', message: 'Multiple failed login attempts from IP 192.168.1.134', read: false },
  ]);

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
  const [showAlerts, setShowAlerts] = useState(false);

  // Handle navigation to other admin pages
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Handle card click for user management
  const handleUserManagementClick = () => {
    navigate('/admin/users');
  };

  // Handle card click for activity logs
  const handleActivityLogsClick = () => {
    toast({
      title: "Activity Logs",
      description: "Loading activity logs...",
    });
    navigate('/admin/activity');
  };

  // Handle card click for system settings
  const handleSystemSettingsClick = () => {
    toast({
      title: "System Settings",
      description: "Opening system settings...",
    });
    navigate('/admin/settings');
  };

  // Handle alert click
  const handleAlertClick = (alertId: number) => {
    // Mark alert as read
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
    
    // Update alert count
    setStats(prev => ({
      ...prev,
      alertsCount: prev.alertsCount - 1
    }));
    
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as read",
    });
  };

  // Toggle alerts panel
  const handleToggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium">System: {stats.systemStatus}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleToggleAlerts}>
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts ({stats.alertsCount})</span>
          </Button>
        </div>
      </div>

      {/* Alerts Panel (conditionally rendered) */}
      {showAlerts && (
        <Card className="border-amber-200">
          <CardHeader className="bg-amber-50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Recent alerts that require your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {alerts.filter(alert => !alert.read).map(alert => (
              <div key={alert.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {alert.type === 'system' && <Settings className="h-4 w-4 text-amber-500" />}
                    {alert.type === 'user' && <Users className="h-4 w-4 text-blue-500" />}
                    {alert.type === 'security' && <Shield className="h-4 w-4 text-red-500" />}
                    <span className="font-medium capitalize">{alert.type} Alert</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleAlertClick(alert.id)}
                >
                  Acknowledge
                </Button>
              </div>
            ))}
            {alerts.filter(alert => !alert.read).length === 0 && (
              <p className="py-4 text-center text-muted-foreground">No unread alerts</p>
            )}
          </CardContent>
        </Card>
      )}

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

      {/* User Activity Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Platform Analytics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3 w-3" />
                <span>Filter</span>
              </Button>
              <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 24 hours</option>
              </select>
            </div>
          </div>
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

      {/* User Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="hover:bg-muted/40 transition-colors cursor-pointer"
          onClick={handleUserManagementClick}
        >
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

        <Card 
          className="hover:bg-muted/40 transition-colors cursor-pointer"
          onClick={handleActivityLogsClick}
        >
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

        <Card 
          className="hover:bg-muted/40 transition-colors cursor-pointer"
          onClick={handleSystemSettingsClick}
        >
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
      
      {/* Recent User Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent User Actions
          </CardTitle>
          <CardDescription>Latest activity from your users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">5 mins ago</p>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Successful trade completed</p>
                  <p className="text-sm text-muted-foreground">User #45128 • BTC/USD</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">12 mins ago</p>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Settings className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Account settings updated</p>
                  <p className="text-sm text-muted-foreground">User #23015</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">28 mins ago</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <UserX className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Account deactivation</p>
                  <p className="text-sm text-muted-foreground">User #10983</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">45 mins ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
