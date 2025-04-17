
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, 
  LineChart, 
  Brain, 
  AreaChart, 
  TrendingUp, 
  Shield, 
  Zap, 
  Check, 
  BarChart,
  Sparkles 
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-24 sm:py-32">
        <div className="hero-dots" />
        <div className="container flex flex-col items-center text-center max-w-4xl">
          <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 mb-6">
            <div className="flex items-center gap-2 text-sm px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">
                AI-Powered Binary Trading
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Trade Smarter with <span className="gradient-text">AI-Powered</span> Binary Options
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl">
            Advanced trading platform with AI predictions, real-time market data, and up to 85% profit on successful trades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" asChild className="text-base flex-1">
              <Link to="/login">Start Trading</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-base flex-1">
              <Link to="/trading">View Demo</Link>
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-5xl overflow-hidden rounded-xl border bg-card/30 backdrop-blur-sm shadow-xl">
            <img 
              src="https://placehold.co/1200x600/0f172a/e2e8f0?text=Trading+Dashboard+Mockup" 
              alt="Trading platform preview" 
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Advanced Trading Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with a user-friendly interface to provide the best binary options trading experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Signal Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our advanced machine learning algorithms analyze market data to generate high-confidence trading signals in real-time.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Advanced Charts</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Interactive charting with multiple timeframes and technical indicators to support your trading decisions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>60-Second Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Execute trades with expiry times as short as 60 seconds, perfect for capturing quick market movements.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <LineChart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multi-Asset Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Trade a diverse range of assets including cryptocurrencies, forex pairs, stocks, and commodities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Built-in risk management tools help you control your exposure and protect your capital.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fast Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Lightning-fast trade execution with no delays or slippage, ensuring you get the price you expect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* AI Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                AI-Powered Trading Signals
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our advanced AI algorithms analyze millions of data points across multiple markets to generate high-probability trading signals.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Pattern Recognition</span>
                    <p className="text-muted-foreground">
                      AI detects complex chart patterns that often precede significant price movements.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Sentiment Analysis</span>
                    <p className="text-muted-foreground">
                      Real-time analysis of news, social media, and market sentiment indicators.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Technical Indicators</span>
                    <p className="text-muted-foreground">
                      Combines multiple technical indicators for comprehensive market analysis.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Self-Improving Algorithms</span>
                    <p className="text-muted-foreground">
                      Our AI continuously learns and improves from each trade to increase accuracy.
                    </p>
                  </div>
                </li>
              </ul>
              
              <Button className="mt-8" asChild>
                <Link to="/signals">View AI Signals</Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-card/30 backdrop-blur-sm rounded-xl border shadow-xl overflow-hidden">
                <div className="p-4 border-b bg-card/50">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">AI Signal Dashboard</h3>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-100/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AreaChart className="h-8 w-8 text-emerald-500" />
                      <div>
                        <div className="font-medium">BTC/USD</div>
                        <div className="text-xs text-muted-foreground">5 min timeframe</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-500 font-medium">BULLISH</div>
                      <div className="text-xs text-muted-foreground">85% confidence</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-100/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart className="h-8 w-8 text-red-500" />
                      <div>
                        <div className="font-medium">ETH/USD</div>
                        <div className="text-xs text-muted-foreground">15 min timeframe</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-500 font-medium">BEARISH</div>
                      <div className="text-xs text-muted-foreground">73% confidence</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-100/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <LineChart className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-medium">EUR/USD</div>
                        <div className="text-xs text-muted-foreground">1 min timeframe</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-500 font-medium">NEUTRAL</div>
                      <div className="text-xs text-muted-foreground">51% confidence</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 h-48 w-48 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 h-48 w-48 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of traders using our AI-powered platform to make smarter binary options trades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link to="/login">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link to="/trading">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
