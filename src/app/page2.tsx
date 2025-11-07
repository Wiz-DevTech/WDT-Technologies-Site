'use client';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { CheckCircle, XCircle, Calendar, Users, Wrench, Clock, Mail, ExternalLink, AlertTriangle, Search, FileText, Settings, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAnalytics } from '@/lib/analytics';
import { useAnimateOnScroll, useStaggeredAnimation } from '@/hooks/useAnimations';
import AnalyticsDashboard from '@/app/components/AnalyticsDashboard';

export default function Home() {
  const [nextSlotDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // 2 weeks from now
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });

  const [showAnalytics, setShowAnalytics] = useState(false);
  const { trackEvent, trackCTAClick } = useAnalytics();

  // Set up animations
  const heroRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });
  const problemRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });
  const solutionRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });
  const howItWorksRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });
  const proofRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });
  const pricingRef = useAnimateOnScroll({ animationClass: 'animate-fade-in-up' });

  // Set up staggered animations
  useStaggeredAnimation('.animate-stagger-cards', { animationClass: 'animate-fade-in-up' });
  useStaggeredAnimation('.animate-stagger-steps', { animationClass: 'animate-slide-in-left' });

  // Analytics tracking
  useEffect(() => {
    // Initialize analytics
    trackEvent('page_view', {
      path: '/',
      title: 'WDT Technologies - The Invisible Systems Architect™',
    });
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      trackEvent('scroll_depth', { scrollPercent });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  const handleCTAClick = (location: string = 'hero') => {
    trackCTAClick(location, 'Book Clarity Call');
    trackEvent('cta_click', { location, buttonText: 'Book Clarity Call' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="flex h-14 items-center max-w-7xl mx-auto">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold text-xl">WDT Technologies</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="#problem" className="transition-colors hover:text-foreground/80 text-foreground/60">
                The Problem
              </a>
              <a href="#solution" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Solution
              </a>
              <a href="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">
                How It Works
              </a>
              <a href="#proof" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Proof
              </a>
              <a href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Pricing
              </a>
            </nav>
            <Button asChild onClick={() => handleCTAClick('header')}>
              <a href="https://calendly.com/wdt-architect/clarity" target="_blank" rel="noopener noreferrer">
                Book Clarity Call
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="py-16 md:py-24 lg:py-32 px-6 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
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
              <Button size="lg" className="w-full hover-lift animate-pulse-glow" asChild onClick={() => handleCTAClick('hero')}>
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

      {/* The Problem (Chaos) */}
<section id="problem" ref={problemRef} className="py-24 bg-muted/30 px-6 animate-on-scroll">
  <div className="max-w-7xl mx-auto">
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter">The Problem</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You have the vision. You don't have the system.
        </p>
      </div>
      
      {/* Grid of cards should be INSIDE the space-y-12 div */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center border-red-200 hover-lift animate-on-scroll animate-stagger-cards">
          <CardContent className="pt-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">Scattered Notes</h3>
            <p className="text-muted-foreground">
              Ideas, tasks, and client information lost across multiple platforms and notebooks
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-red-200 hover-lift animate-on-scroll animate-stagger-cards">
          <CardContent className="pt-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">Missed Deadlines</h3>
            <p className="text-muted-foreground">
              Important dates slipping through the cracks due to lack of systematic tracking
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-red-200 hover-lift animate-on-scroll animate-stagger-cards">
          <CardContent className="pt-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">Overwhelm</h3>
            <p className="text-muted-foreground">
              Paralysis from too many options and no clear path forward for your business
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* The Solution (Clarity) */}
      <section id="solution" ref={solutionRef} className="py-24 px-6 animate-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">The Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From chaos to clarity in just 4 weeks
            </p>
          </div>
          
          {/* Before/After Split */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="border-red-200 hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-red-600">Before: Chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-red-50 dark:bg-red-950/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <XCircle className="h-12 w-12 mx-auto mb-2 text-red-600" />
                      <p className="text-sm">47 scattered Notion pages</p>
                    </div>
                  </div>
                  </div>
                  </section>

                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>No central hub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>Duplicate work</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>15+ hours wasted weekly</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* After */}
            <Card className="border-green-200 hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-green-600">After: Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                      <p className="text-sm">1 interconnected HQ</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Central command center</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Automated workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>15+ hours saved weekly</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 4-Week Timeline */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>4-Week Transformation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="font-semibold">Chaos Map™</h4>
                  <p className="text-sm text-muted-foreground">Audit + Discovery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="font-semibold">Systems Blueprint™</h4>
                  <p className="text-sm text-muted-foreground">Design Sprint</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="font-semibold">Build Workspace</h4>
                  <p className="text-sm text-muted-foreground">Implementation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">4</span>
                  </div>
                  <h4 className="font-semibold">Handover</h4>
                  <p className="text-sm text-muted-foreground">Training + Freedom</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

               {/* 4-Week Timeline */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>4-Week Transformation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="font-semibold">Chaos Map™</h4>
                  <p className="text-sm text-muted-foreground">Audit + Discovery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="font-semibold">Systems Blueprint™</h4>
                  <p className="text-sm text-muted-foreground">Design Sprint</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="font-semibold">Build Workspace</h4>
                  <p className="text-sm text-muted-foreground">Implementation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">4</span>
                  </div>
                  <h4 className="font-semibold">Handover</h4>
                  <p className="text-sm text-muted-foreground">Training + Freedom</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="container py-24 bg-muted/30 animate-on-scroll">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Four steps to your self-sufficient system
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: 1,
                icon: Search,
                title: "Audit",
                description: "Deep dive into your current chaos to map every process, tool, and pain point."
              },
              {
                step: 2,
                icon: FileText,
                title: "Design",
                description: "Create your custom Systems Blueprint™ with interconnected workflows and automations."
              },
              {
                step: 3,
                icon: Settings,
                title: "Build",
                description: "Construct your plug-and-play workspace in Notion/Airtable with all integrations."
              },
              {
                step: 4,
                icon: Check,
                title: "Handover",
                description: "3-hour training session. 90-day cheat sheet. Then I disappear."
              }
            ].map((item, index) => (
              <Card key={item.step} className="transition-all hover:shadow-lg hover-lift animate-on-scroll animate-stagger-steps">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-primary">STEP {item.step}</span>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Proof */}
      <section id="proof" ref={proofRef} className="py-24 px-6 animate-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Proof</h2>
            <p className="text-xl text-muted-foreground">
              Real results from real businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-lg">7-Figure Solopreneur</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-600 mb-2">Result: 15 hrs/week saved</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Turned 47 scattered Notion pages into 1 interconnected HQ. System runs perfectly 6 months later.
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-3 text-center">
                  <p className="text-xs text-muted-foreground">📹 Loom Testimonial</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-lg">SaaS Founder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-600 mb-2">Result: 40% faster onboarding</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Built client management system that reduced onboarding time from 2 weeks to 3 days.
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-3 text-center">
                  <p className="text-xs text-muted-foreground">📹 Loom Testimonial</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-lg">Agency Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-600 mb-2">Result: $50k/year saved</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Eliminated need for project manager. System handles all client workflows automatically.
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-3 text-center">
                  <p className="text-xs text-muted-foreground">📹 Loom Testimonial</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "He built the system, trained me in 3 hours, and vanished. It still runs perfectly 6 months later."
            </blockquote>
            <cite className="block mt-2 font-medium">– Alex K., Founder</cite>
          </div>
        </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" ref={pricingRef} className="py-24 bg-muted/30 px-6 animate-on-scroll">
      <div className="max-w-7xl mx-auto">
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
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Chaos Map™ + Systems Blueprint™</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Plug-and-Play Workspace</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>3-hour handover training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>90-day cheat sheet</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>No ongoing management</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full hover-lift" asChild onClick={() => handleCTAClick('pricing')}>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">FAQ</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you manage the system after?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>No. You do.</strong> That's the entire point. I build systems that run independently without ongoing management or retainer fees.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I need changes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your 90-day cheat sheet includes everything you need to make changes yourself. The system is designed to be maintained by you, not me.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What tools do you use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Notion</strong> (primary), <strong>Airtable</strong> (for complex data), and <strong>Make/Zapier</strong> (for automations). You'll own all accounts and have full access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a href="mailto:architect@wdt.tech" className="text-muted-foreground hover:text-foreground">
              architect@wdt.tech
            </a>
            <a href="https://linkedin.com/in/wdt-architect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </a>
            <Badge variant="outline">1 slot/month</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 WDT Technologies. All systems reserved.
          </div>
        </div>
      </footer>

      {/* Analytics Dashboard (Toggle with Ctrl+Shift+A) */}
      <AnalyticsDashboard isVisible={showAnalytics} />
      
      {/* Analytics Toggle Button (Dev Only) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="fixed bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-xs z-50"
        >
          {showAnalytics ? 'Hide' : 'Show'} Analytics
        </button>
      )}
    </div>
  );
}