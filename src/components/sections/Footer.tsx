'use client';

import { Badge } from '@/components/ui/badge';

export default function Footer() {
  return (
    <footer className="border-t py-12 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <a href="mailto:architect@wdt.tech" className="text-muted-foreground hover:text-foreground">
            architect@wdt.tech
          </a>
          <a href="https://linkedin.com/in/wdt-architect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            LinkedIn
          </a>
          <Badge variant="outline">1 slot/month</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          © 2025 WDT Technologies. All systems reserved.
        </div>
      </div>
    </footer>
  );
}