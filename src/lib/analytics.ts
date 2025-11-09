// Analytics tracking utilities for WDT Technologies
export interface AnalyticsEvent {
  event: string;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  properties: Record<string, any>;
}

export interface VisitorData {
  sessionId: string;
  timestamp: Date;
  userAgent: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

class AnalyticsTracker {
  private sessionId: string;
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUTMParameters(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmContent: params.get('utm_content') ?? '',
      utmTerm: params.get('utm_term') ?? '',
    };
  }

  private getVisitorData(): VisitorData {
    if (typeof window === 'undefined') {
      return {
        sessionId: this.sessionId,
        timestamp: new Date(),
        userAgent: '',
        referrer: '',
      };
    }

    return {
      sessionId: this.sessionId,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      ...this.getUTMParameters(),
    };
  }

  public init() {
    if (this.isInitialized) return;

    // Track initial page view
    this.track('page_view', {
      path: window.location.pathname,
      title: document.title,
      ...this.getVisitorData(),
    });

    // Track scroll depth
    this.trackScrollDepth();

    // Track time on page
    this.trackTimeOnPage();

    // Track CTA clicks
    this.trackCTAClicks();

    // Track form submissions
    this.trackFormSubmissions();

    this.isInitialized = true;
  }

  private trackScrollDepth() {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90];

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !this.hasTracked(`scroll_${threshold}`)) {
            this.track('scroll_depth', {
              depth: threshold,
              maxScroll: scrollPercent,
            });
            this.markAsTracked(`scroll_${threshold}`);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  private trackTimeOnPage() {
    if (typeof window === 'undefined') return;

    const startTime = Date.now();
    const timeIntervals = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m

    timeIntervals.forEach(seconds => {
      setTimeout(() => {
        this.track('time_on_page', {
          seconds: seconds,
          totalSeconds: Math.floor((Date.now() - startTime) / 1000),
        });
      }, seconds * 1000);
    });
  }

  private trackCTAClicks() {
    if (typeof window === 'undefined') return;

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const ctaButton = target.closest('a[href*="calendly"], button[data-cta="true"]');

      if (ctaButton) {
        const sectionId = target.closest('section')?.id;
        this.track('cta_click', {
          buttonText: ctaButton.textContent?.trim(),
          buttonType: ctaButton.tagName.toLowerCase(),
          href: (ctaButton as HTMLAnchorElement).href,
          location: sectionId ?? 'hero',
        });
      }
    });
  }

  private trackFormSubmissions() {
    if (typeof window === 'undefined') return;

    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      this.track('form_submission', {
        formId: form.id || 'unknown',
        formAction: form.action,
        formMethod: form.method,
      });
    });
  }

  public track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date(),
      sessionId: this.sessionId,
      properties: {
        ...properties,
        ...this.getVisitorData(),
      },
    };

    // Send to console for development
    console.log('Analytics Event:', analyticsEvent);

    // In production, send to your analytics service
    this.sendToAnalyticsService(analyticsEvent);
  }

  private sendToAnalyticsService(event: AnalyticsEvent) {
    if (typeof window !== 'undefined') {
      const events = JSON.parse(localStorage.getItem('wdt_analytics_events') || '[]');
      events.push(event);

      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }

      localStorage.setItem('wdt_analytics_events', JSON.stringify(events));
    }
  }

  private hasTracked(key: string): boolean {
    if (typeof window === 'undefined') return false;
    const tracked = JSON.parse(localStorage.getItem('wdt_tracked_events') || '{}');
    return tracked[key] || false;
  }

  private markAsTracked(key: string) {
    if (typeof window === 'undefined') return;
    const tracked = JSON.parse(localStorage.getItem('wdt_tracked_events') || '{}');
    tracked[key] = true;
    localStorage.setItem('wdt_tracked_events', JSON.stringify(tracked));
  }

  public getEvents(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('wdt_analytics_events') || '[]');
  }

  public getMetrics() {
    const events = this.getEvents();

    return {
      totalVisitors: new Set(events.filter(e => e.event === 'page_view').map(e => e.sessionId)).size,
      totalCTAClicks: events.filter(e => e.event === 'cta_click').length,
      scrollDepthDistribution: {
        25: events.filter(e => e.event === 'scroll_depth' && e.properties.depth >= 25).length,
        50: events.filter(e => e.event === 'scroll_depth' && e.properties.depth >= 50).length,
        75: events.filter(e => e.event === 'scroll_depth' && e.properties.depth >= 75).length,
        90: events.filter(e => e.event === 'scroll_depth' && e.properties.depth >= 90).length,
      },
      utmSources: [...new Set(events.map(e => e.properties.utmSource).filter(Boolean))],
      conversionRate: events.filter(e => e.event === 'cta_click').length / Math.max(events.filter(e => e.event === 'page_view').length, 1) * 100,
    };
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();

// React hook for tracking
export function useAnalytics() {
  const trackEvent = (event: string, properties?: Record<string, any>) => {
    analytics.track(event, properties);
  };

  const trackCTAClick = (location: string, buttonText: string) => {
    analytics.track('cta_click', {
      location,
      buttonText,
      timestamp: new Date(),
    });
  };

  return { trackEvent, trackCTAClick };
}