// src/app/examples/websocket/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WebSocket Demo | WDT Technologies',
  description: 'Interactive real-time WebSocket demo.',
  openGraph: { images: ['/og-image.jpg'] },
};

export default function WebSocketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}