'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, CheckCircle } from 'lucide-react';

interface SolutionSectionProps {
  solutionRef: React.RefObject<HTMLDivElement>;
}

export default function SolutionSection({ solutionRef }: SolutionSectionProps) {
  return (
    <section id="solution" ref={solutionRef} className="container py-24 animate-on-scroll">
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
    </section>
  );
}