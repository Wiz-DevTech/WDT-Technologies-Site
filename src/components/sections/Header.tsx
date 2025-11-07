'use client';

import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/lib/analytics';

interface HeaderProps {
  onCTAClick: (location: string) => void;
}

export default function Header({ onCTAClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">WDT Technologies</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#problem" className="transition-colors hover:text-foreground/80 text-foreground/60">
              The Problem
            </a>
            <a href="#solution" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Solution
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">
              How It Works
            </a>
            <a href="#proof" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Proof
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Pricing
            </a>
          </nav>
          <Button asChild onClick={() => onCTAClick('header')}>
            <a href="https://calendly.com/wdt-architect/clarity" target="_blank" rel="noopener noreferrer">
              Book Clarity Call
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}