'use client';

import { useEffect, useState } from 'react';
import { useAnalytics } from '@/lib/analytics';
import { useAnimateOnScroll, useStaggeredAnimation } from '@/hooks/useAnimations';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

// Import sections
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ProofSection from '@/components/sections/ProofSection';
import PricingSection from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [nextSlotDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
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
    trackEvent('page_view', {
      path: '/',
      title: 'WDT Technologies - The Invisible Systems Architect™',
    });
    
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
      <Header onCTAClick={handleCTAClick} />
      
      <HeroSection 
        nextSlotDate={nextSlotDate} 
        onCTAClick={handleCTAClick}
        heroRef={heroRef as React.RefObject<HTMLDivElement>}
      />
      
      <ProblemSection problemRef={problemRef as React.RefObject<HTMLDivElement>} />
      <SolutionSection solutionRef={solutionRef as React.RefObject<HTMLDivElement>} />
      <HowItWorksSection howItWorksRef={howItWorksRef as React.RefObject<HTMLDivElement>} />
      <ProofSection proofRef={proofRef as React.RefObject<HTMLDivElement>} />
      <PricingSection pricingRef={pricingRef as React.RefObject<HTMLDivElement>} onCTAClick={handleCTAClick} />
      <FAQSection />
      <Footer />

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