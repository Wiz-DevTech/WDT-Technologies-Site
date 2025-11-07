'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface PricingSectionProps {
  pricingRef: React.RefObject<HTMLDivElement>;
  onCTAClick: (location: string) => void;
}

export default function PricingSection({ pricingRef, onCTAClick }: PricingSectionProps) {
  const features = [
    "Chaos Map™ + Systems Blueprint™",
    "Plug-and-Play Workspace",
    "3-hour handover training",
    "90-day cheat sheet",
    "No ongoing management"
  ];

  return (
    <section id="pricing" ref={pricingRef} className="container py-24 bg-muted/30 animate-on-scroll">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Fixed price. Fixed timeline. Fixed results.
          </p>
        </div>
        
        <Card className="border-2 border-primary hover-lift animate-pulse-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">$9,997</CardTitle>
            <CardDescription className="text-lg">
              4 weeks • 1 client • No retainers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-medium">Pay upfront. Get your system. I disappear.</p>
            </div>
            
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="w-full hover-lift" asChild onClick={() => onCTAClick('pricing')}>
              <a href="https://calendly.com/wdt-architect/clarity" target="_blank" rel="noopener noreferrer">
                Secure Your Slot
              </a>
            </Button>
            
            <div className="text-center">
              <Badge variant="destructive" className="text-xs">
                Only 1 slot available this month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}