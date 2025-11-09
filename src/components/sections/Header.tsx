'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/lib/analytics';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onCTAClick: (location: string) => void;
}

export default function Header({ onCTAClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const sections = [
    { id: 'problem', label: 'The Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'proof', label: 'Proof' },
    { id: 'pricing', label: 'Pricing' },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation click with smooth scrolling
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for sticky header
        behavior: 'smooth'
      });
      
      // Track navigation click
      trackEvent('navigation_click', {
        section: sectionId,
        location: 'header'
      });
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  // Handle CTA click
  const handleCTAClick = () => {
    onCTAClick('header');
    trackEvent('cta_click', {
      location: 'header',
      buttonText: 'Book Clarity Call'
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <span className="font-bold text-xl">WDT Technologies</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`transition-colors hover:text-foreground/80 ${
                  activeSection === section.id 
                    ? 'text-foreground font-medium' 
                    : 'text-foreground/60'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
          <Button onClick={handleCTAClick}>
            Book Clarity Call
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                  activeSection === section.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground/60 hover:text-foreground/80 hover:bg-accent'
                }`}
              >
                {section.label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <Button onClick={handleCTAClick} className="w-full">
                Book Clarity Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}