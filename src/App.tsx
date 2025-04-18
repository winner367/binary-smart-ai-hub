
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
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = isDerivAuthenticated();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  // For admin routes
  if (window.location.pathname.startsWith('/admin') && !isAdmin) {
    console.log("Unauthorized admin access attempt, redirecting to login");
    return <Navigate to="/login" />;
  }
  
  // For user routes
  if (!window.location.pathname.startsWith('/admin') && 
      !isAuthenticated && 
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/' &&
      !window.location.pathname.startsWith('/auth')) {
    console.log("Unauthorized user access attempt, redirecting to login");
    return <Navigate to="/login" />;
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
    
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            
            {/* User routes - protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trading"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <TradingPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/signals"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/binarybot"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <BinaryBotPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoute>
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
                <ProtectedRoute>
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AdminUsers />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activity"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
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
