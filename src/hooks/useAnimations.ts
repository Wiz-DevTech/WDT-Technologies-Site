'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

export function useAnimateOnScroll(
  options: AnimationOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    animationClass: 'animate-fade-in-up'
  }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(options.animationClass || 'animate-fade-in-up');
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}

// Utility function to add staggered animations to multiple elements
export function useStaggeredAnimation(
  selector: string,
  options: AnimationOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    animationClass: 'animate-fade-in-up'
  }
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(options.animationClass || 'animate-fade-in-up');
            }, index * 100); // Stagger delay
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [selector, options]);
}

// Hook for counter animations
export function useCounterAnimation(
  target: number,
  duration: number = 2000,
  start: number = 0
) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(start + (target - start) * easeOutQuart);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          animate();
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration, start]);

  return { count, ref };
}