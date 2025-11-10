'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Settings, Check, AlertTriangle, XCircle, CheckCircle, Wrench } from 'lucide-react';
import { ArrowRight, CheckCircle, Star, Users, Clock } from 'lucide-react'
import { LeadMagnetForm } from '@/components/lead-magnet-form'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  nextSlotDate: string;
  onCTAClick: (location: string) => void;
  heroRef: React.RefObject<HTMLDivElement>;
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-6">
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
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Your Business OS,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Built in 4 Weeks.
                </span>
                Fixed Price.
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 mt-6 max-w-2xl">
                Stop wrestling with scattered tools and manual processes. We build your integrated 
                <span className="font-semibold text-gray-900"> Notion + Airtable business operating system </span>
                so you can focus on growth, not admin work.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 mt-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Fixed-price $7,500 - no surprises</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Zero ongoing management fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Hands-off implementation - we do all the work</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">30-day money-back guarantee</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="text-lg px-8 py-3 h-auto">
                  Start Your 4-Week Build
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 h-auto">
                  View Case Studies
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">28+ founders</span> scaled their business with our systems
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Lead Magnet Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-20" />
              <div className="relative bg-white rounded-xl shadow-xl border border-gray-100">
                <LeadMagnetForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </div>
    </section>
  )
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