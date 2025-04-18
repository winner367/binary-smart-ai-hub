import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import LandingPage from "./pages/landing";
import DashboardPage from "./pages/dashboard";
import TradingPage from "./pages/trading";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/login";
import AuthCallbackPage from "./pages/auth/callback";
import { isDerivAuthenticated } from './services/deriv-auth';
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import BinaryBotPage from "./pages/binarybot";
import PerformanceAnalysis from "./pages/performance";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children, path }: { children: React.ReactNode, path: string }) => {
  const isAuthenticated = isDerivAuthenticated();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  console.log("Protected Route Check:", { path, isAuthenticated, isAdmin });
  
  // Allow admins to access user routes
  if (path.startsWith('/admin') && !isAdmin) {
    console.log("Unauthorized admin access attempt, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // For user routes that require authentication
  if (!path.startsWith('/admin') && 
      !isAuthenticated && 
      !isAdmin && // Allow admins to bypass Deriv auth
      path !== '/login' &&
      path !== '/' &&
      !path.startsWith('/auth')) {
    console.log("Unauthorized user access attempt, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  // State to trigger re-render on login status change
  const [isLoggedIn, setIsLoggedIn] = useState(isDerivAuthenticated());
  
  // Check login status on mount and when local storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(isDerivAuthenticated());
    };
    
    // Check login status initially
    checkLoginStatus();
    
    // Setup event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for auth status changes
    const handleAuthEvent = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('authStatusChanged', handleAuthEvent);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authStatusChanged', handleAuthEvent);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            
            {/* User routes - protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute path="/dashboard">
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trading"
              element={
                <ProtectedRoute path="/trading">
                  <AppLayout>
                    <TradingPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/signals"
              element={
                <ProtectedRoute path="/signals">
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute path="/history">
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/binarybot"
              element={
                <ProtectedRoute path="/binarybot">
                  <AppLayout>
                    <BinaryBotPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoute path="/performance">
                  <AppLayout>
                    <PerformanceAnalysis />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Admin routes - protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute path="/admin/dashboard">
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute path="/admin/users">
                  <AppLayout>
                    <AdminUsers />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activity"
              element={
                <ProtectedRoute path="/admin/activity">
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute path="/admin/settings">
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
