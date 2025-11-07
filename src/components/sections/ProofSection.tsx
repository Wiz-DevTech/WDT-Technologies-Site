'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProofSectionProps {
  proofRef: React.RefObject<HTMLDivElement>;
}

export default function ProofSection({ proofRef }: ProofSectionProps) {
  const testimonials = [
    {
      title: "7-Figure Solopreneur",
      result: "15 hrs/week saved",
      description: "Turned 47 scattered Notion pages into 1 interconnected HQ. System runs perfectly 6 months later."
    },
    {
      title: "SaaS Founder",
      result: "40% faster onboarding",
      description: "Built client management system that reduced onboarding time from 2 weeks to 3 days."
    },
    {
      title: "Agency Owner",
      result: "$50k/year saved",
      description: "Eliminated need for project manager. System handles all client workflows automatically."
    }
  ];

  return (
    <section id="proof" ref={proofRef} className="container py-24 animate-on-scroll">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">Proof</h2>
          <p className="text-xl text-muted-foreground">
            Real results from real businesses
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift animate-on-scroll animate-stagger-cards">
              <CardHeader>
                <CardTitle className="text-lg">{testimonial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-600 mb-2">Result: {testimonial.result}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {testimonial.description}
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-3 text-center">
                  <p className="text-xs text-muted-foreground">📹 Loom Testimonial</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
            "He built the system, trained me in 3 hours, and vanished. It still runs perfectly 6 months later."
          </blockquote>
          <cite className="block mt-2 font-medium">– Alex K., Founder</cite>
        </div>
      </div>
    </section>
  );
}