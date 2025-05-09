
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, UserRound, Lock, User, KeyRound, ChevronLeft, ExternalLink } from "lucide-react";
import { redirectToDerivLogin } from "@/services/deriv-auth";

// Admin credentials - hardcoded for security
const ADMIN_EMAIL = "williamsamoe2023@gmail.com";
const ADMIN_PASSWORD = "12345678";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check against hardcoded admin credentials
    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      toast({
        title: "Admin Login Successful",
        description: "Welcome back, admin!",
      });
      // Store admin status in localStorage
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Admin Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Deriv authorization
    redirectToDerivLogin();
    toast({
      title: "Redirecting to Deriv",
      description: "Please authenticate with your Deriv account.",
    });
  };

  const handleUserRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // For registration, we also redirect to Deriv
    if (registerEmail && registerPassword && registerConfirmPassword) {
      if (registerPassword !== registerConfirmPassword) {
        toast({
          title: "Registration Failed",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
      
      // Store registration info in localStorage for reference after Deriv auth
      localStorage.setItem("pending_registration", JSON.stringify({
        email: registerEmail,
        password: registerPassword
      }));
      
      redirectToDerivLogin();
      toast({
        title: "Redirecting to Deriv",
        description: "Please create or connect your Deriv account.",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill all fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout showFooter={false}>
      <div className="container max-w-5xl py-10">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground mb-8 hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 mb-4">
            <div className="flex items-center gap-2 text-sm px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">
                AI-Powered Trading Platform
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Login or Create an Account
          </h1>
          <p className="text-muted-foreground max-w-md text-center mt-3">
            Start trading with our AI-powered binary options platform. Trade smarter with real-time predictions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Login Section */}
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <UserRound className="h-8 w-8 text-primary mb-3" />
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Access the admin dashboard to manage users, view reports, and analyze platform data.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAdminLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@example.com"
                        className="pl-10"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign in as Admin
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* User Login/Register Section */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>User Account</CardTitle>
              <CardDescription>
                Login to your existing account or register a new one to start trading with Deriv.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleUserLogin} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="user-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full flex items-center gap-2">
                      <span>Sign in with Deriv</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      You will be redirected to Deriv.com to complete your login
                    </p>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleUserRegister} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10"
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full flex items-center gap-2">
                      <span>Create Account with Deriv</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      You will be redirected to Deriv.com to authorize this application
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              <p className="text-xs text-center w-full text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy and authorize access to your Deriv account.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
