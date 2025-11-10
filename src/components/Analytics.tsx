'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Load Google Analytics 4
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TLVDZ69BVC';
      script.async = true;
      document.head.appendChild(script);
      
      // Initialize GA4 with rest parameters instead of arguments
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-TLVDZ69BVC');
    }
  }, []);

  return null;
}