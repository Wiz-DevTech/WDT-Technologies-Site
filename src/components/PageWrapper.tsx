// components/PageWrapper.tsx
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="border-x border-border/50 min-h-screen mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  );
}