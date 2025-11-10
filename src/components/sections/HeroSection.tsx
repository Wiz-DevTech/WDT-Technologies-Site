'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Settings, Check, AlertTriangle, XCircle, CheckCircle, Wrench, Star, Users, Clock } from 'lucide-react';
import { LeadMagnetForm } from '@/components/lead-magnet-form';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  nextSlotDate: string;
  onCTAClick: (location: string) => void;
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function HeroSection({ nextSlotDate, onCTAClick, heroRef }: HeroSectionProps) {
  return (
    <section ref={heroRef} className="container py-16 md:py-24 lg:py-32 animate-on-scroll">
      <div className="grid lg:grid-cols-5 gap-12 items-center">
        {/* Left Column - Visual Elements (60%) - KEEP YOUR EXISTING */}
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

        {/* Right Column - Content & CTA (40%) - ENHANCED SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* ENHANCED Trust Badges - Combined from both versions */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>12+ Systems Built</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>4.9/5 Founder Reviews</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>4-Week Delivery</span>
            </div>
            <Badge variant="secondary" className="text-xs">Enterprise-Grade Systems</Badge>
            <Badge variant="outline" className="text-xs">Proven Framework</Badge>
          </div>

          {/* KEEP YOUR EXISTING Headline & Problem Statement */}
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

          {/* KEEP YOUR EXISTING Solution Benefits */}
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

          {/* ADD Lead Magnet Form HERE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-20" />
            <div className="relative bg-white rounded-xl shadow-xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
              <LeadMagnetForm />
            </div>
          </motion.div>

          {/* KEEP YOUR EXISTING Urgency Section */}
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

          {/* KEEP YOUR EXISTING CTA Button */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full hover-lift animate-pulse-glow" 
              onClick={() => onCTAClick('hero')}
            >
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

          {/* Social Proof - Added from new version */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-900"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">28+ founders</span> scaled their business with our systems
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}