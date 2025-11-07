'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Settings, Check, AlertTriangle, XCircle, CheckCircle, Wrench } from 'lucide-react';

interface HeroSectionProps {
  nextSlotDate: string;
  onCTAClick: (location: string) => void;
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function HeroSection({ nextSlotDate, onCTAClick, heroRef }: HeroSectionProps) {
  return (
    <section ref={heroRef} className="container py-16 md:py-24 lg:py-32 animate-on-scroll">
      {/* ... Hero section content (copy from original) ... */}
      <div className="grid lg:grid-cols-5 gap-12 items-center">
        {/* Left Column - Visual Elements (60%) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Primary Hero Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8">
            <div className="aspect-video bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Wrench className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold">Architect's Blueprint</p>
                <p className="text-sm text-muted-foreground">Overlaid on modern workspace</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Supporting Visual Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - The Transformation */}
            <Card className="border-2 hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">The Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-sm">Chaotic network</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-red-500 to-green-500"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">Organized flowchart</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - The Timeline */}
            <Card className="border-2 hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">4-Week Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center hover-scale">
                    <Search className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-xs">Discovery</p>
                  </div>
                  <div className="text-center hover-scale">
                    <FileText className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-xs">Design</p>
                  </div>
                  <div className="text-center hover-scale">
                    <Settings className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-xs">Build</p>
                  </div>
                  <div className="text-center hover-scale">
                    <Check className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-xs">Handover</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Content & CTA (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trust Badges */}
          <div className="flex gap-3">
            <Badge variant="secondary" className="text-xs">Enterprise-Grade Systems</Badge>
            <Badge variant="outline" className="text-xs">Proven Framework</Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              The <span className="text-primary">Invisible</span> Systems Architect™
            </h1>
            
            {/* Problem Statement */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-semibold">
                  Your Empire Runs on a <span className="text-red-600">Broken Foundation</span>
                </h2>
              </div>
              <p className="text-muted-foreground">
                Hidden system flaws are costing you time, money, and growth opportunities every single day.
              </p>
            </div>
          </div>

          {/* Solution Benefits */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">👤</span>
              </div>
              <div>
                <p className="font-medium">One Dedicated Architect</p>
                <p className="text-sm text-muted-foreground">Expert focus on your unique challenges</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">📅</span>
              </div>
              <div>
                <p className="font-medium">Four Intensive Weeks</p>
                <p className="text-sm text-muted-foreground">Rapid transformation, minimal disruption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">⚡</span>
              </div>
              <div>
                <p className="font-medium">Self-Sufficient System</p>
                <p className="text-sm text-muted-foreground">Never depends on me again - truly independent</p>
              </div>
            </div>
          </div>

          {/* Urgency Section */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <Badge variant="destructive" className="text-xs">Limited Availability</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Next Available: {nextSlotDate}</p>
                <p className="text-lg font-bold text-red-600">Only 1 Seat Remains</p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="space-y-3">
            <Button size="lg" className="w-full hover-lift animate-pulse-glow" asChild onClick={() => onCTAClick('hero')}>
              <a href="https://calendly.com/wdt-architect/clarity" target="_blank" rel="noopener noreferrer">
                Secure My Transformation
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Free System Assessment Included
            </p>
            <p className="text-center text-sm text-amber-600 font-medium">
              ⏳ This slot will vanish within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}