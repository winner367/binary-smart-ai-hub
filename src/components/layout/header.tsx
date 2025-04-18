
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Bell, Menu, X, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutDeriv, isDerivAuthenticated, getDerivAccounts, getDerivUserInfo } from "@/services/deriv-auth";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState<any[]>([]);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isAuthenticated = isDerivAuthenticated();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      const derivAccounts = getDerivAccounts();
      setAccounts(derivAccounts || []);
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem("isAdmin");
      toast({
        title: "Logged Out",
        description: "You have been logged out of the admin account",
      });
    } else {
      logoutDeriv();
      toast({
        title: "Logged Out",
        description: "You have been disconnected from Deriv",
      });
    }
    navigate("/login");
  };
  
  const getNavigationItems = () => {
    if (isAdmin) {
      return [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "User Management", path: "/admin/users" },
        { name: "Reports", path: "/admin/reports" },
        { name: "Settings", path: "/admin/settings" },
      ];
    } else {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Trading", path: "/trading" },
        { name: "AI Signals", path: "/signals" },
        { name: "Binary Bot", path: "/binarybot" },
        { name: "Performance", path: "/performance" },
        { name: "History", path: "/history" },
      ];
    }
  };
  
  const navigationItems = getNavigationItems();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/"} className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">WinnerAI</span>
          </Link>
          
          {isAuthenticated && (
            <nav className="hidden md:flex gap-6">
              {navigationItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              {accounts.length > 0 && (
                <div className="hidden md:flex items-center gap-4">
                  {accounts.map((account) => (
                    <div key={account.loginid} className="text-sm">
                      <span className="text-xs text-muted-foreground block">
                        {account.account_type === 'demo' ? 'Demo' : 'Real'}
                      </span>
                      <span className="font-semibold">
                        {account.currency} {account.balance?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserRound className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {isAdmin ? 'Admin Account' : 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && isAuthenticated && (
        <div className="md:hidden border-t py-4">
          <nav className="container flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {accounts.length > 0 && (
              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">Your Accounts</p>
                {accounts.map((account) => (
                  <div key={account.loginid} className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      {account.account_type === 'demo' ? 'Demo' : 'Real'}
                    </span>
                    <span className="font-semibold">
                      {account.currency} {account.balance?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
