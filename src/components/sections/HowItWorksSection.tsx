'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Search, FileText, Settings, Check } from 'lucide-react';

interface HowItWorksSectionProps {
  howItWorksRef: React.RefObject<HTMLDivElement>;
}

export default function HowItWorksSection({ howItWorksRef }: HowItWorksSectionProps) {
  const steps = [
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
  ];

  return (
    <section id="how-it-works" ref={howItWorksRef} className="py-24 bg-muted/30 px-6 animate-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Four steps to your self-sufficient system
            </p>
          </div>
          
          <div className="space-y-8">
            {steps.map((item) => (
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
  );
}