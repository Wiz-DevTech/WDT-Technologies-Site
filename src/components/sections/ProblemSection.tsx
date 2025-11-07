'use client';

import { Card, CardContent } from '@/components/ui/card';
import { XCircle, Clock, AlertTriangle } from 'lucide-react';

interface ProblemSectionProps {
  problemRef: React.RefObject<HTMLDivElement>;
}

export default function ProblemSection({ problemRef }: ProblemSectionProps) {
  return (
    <section id="problem" ref={problemRef} className="py-24 bg-muted/30 px-6 animate-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">The Problem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You have the vision. You don't have the system.
            </p>
          </div>
          
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
  );
}