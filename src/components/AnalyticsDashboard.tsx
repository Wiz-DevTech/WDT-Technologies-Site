'use client';

import { useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';

interface AnalyticsDashboardProps {
  isVisible?: boolean;
}

export default function AnalyticsDashboard({ isVisible = false }: AnalyticsDashboardProps) if (process.env.NODE_ENV === 'production') {
    return null;
  }{
  const [metrics, setMetrics] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Initialize analytics if not already done
      analytics.init();
      
      // Update metrics every 5 seconds when visible
      const interval = setInterval(() => {
        setMetrics(analytics.getMetrics());
        setEvents(analytics.getEvents().slice(-10)); // Last 10 events
      }, 5000);

      // Initial load
      setMetrics(analytics.getMetrics());
      setEvents(analytics.getEvents().slice(-10));

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-background border rounded-lg shadow-lg p-4 z-50 max-h-96 overflow-y-auto">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Analytics Dashboard</h3>
        
        {/* Key Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Total Visitors:</span>
            <span className="font-medium">{metrics.totalVisitors}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">CTA Clicks:</span>
            <span className="font-medium">{metrics.totalCTAClicks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Conversion Rate:</span>
            <span className="font-medium">{metrics.conversionRate.toFixed(1)}%</span>
          </div>
        </div>

        {/* Scroll Depth */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Scroll Depth Reached</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>25%:</span>
              <span>{metrics.scrollDepthDistribution[25]}</span>
            </div>
            <div className="flex justify-between">
              <span>50%:</span>
              <span>{metrics.scrollDepthDistribution[50]}</span>
            </div>
            <div className="flex justify-between">
              <span>75%:</span>
              <span>{metrics.scrollDepthDistribution[75]}</span>
            </div>
            <div className="flex justify-between">
              <span>90%:</span>
              <span>{metrics.scrollDepthDistribution[90]}</span>
            </div>
          </div>
        </div>

        {/* UTM Sources */}
        {metrics.utmSources.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">UTM Sources</h4>
            <div className="space-y-1 text-xs">
              {metrics.utmSources.map((source: string, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{source}:</span>
                  <span>
                    {events.filter(e => e.properties.utmSource === source).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Events */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Events</h4>
          <div className="space-y-1 text-xs max-h-24 overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="flex justify-between">
                <span className="truncate">{event.event}:</span>
                <span className="text-muted-foreground">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={() => {
            const data = {
              metrics,
              events: analytics.getEvents(),
              exportDate: new Date().toISOString(),
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wdt-analytics-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90"
        >
          Export Analytics Data
        </button>
      </div>
    </div>
  );
}