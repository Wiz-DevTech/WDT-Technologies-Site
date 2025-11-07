'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const FAQSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">FAQ</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {/* Card 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you manage the system after?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>No. You do.</strong> That's the entire point. I
                  build systems that run independently without ongoing
                  management or retainer fees.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What if I need changes?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your 90-day cheat sheet includes everything you need to
                  make changes yourself. The system is designed to be
                  maintained by you, not me.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What tools do you use?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Notion</strong> (primary),{' '}
                  <strong>Airtable</strong> (for complex data), and{' '}
                  <strong>Make/Zapier</strong> (for automations). You'll
                  own all accounts and have full access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};