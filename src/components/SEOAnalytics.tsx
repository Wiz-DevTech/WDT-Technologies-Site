'use client';
import { useEffect } from 'react';
import { useAnalytics } from '@/lib/analytics';

export default function SEOAnalytics() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track Core Web Vitals
    const handleWebVitals = (metric) => {
      trackEvent('web_vital', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
      });
    };

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackEvent('page_hidden', {
          time_on_page: Math.round(performance.now()),
        });
      }
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track at specific scroll depths
      if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 90) {
        trackEvent('scroll_depth', { scrollPercent });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackEvent]);

  return null;
}