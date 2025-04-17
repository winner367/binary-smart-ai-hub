
import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface AppLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function AppLayout({ children, showFooter = true }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
