import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WebSocket Demo | WDT Technologies',
  description:
    'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
  keywords: 'WebSocket, real-time communication, interactive demo, technology showcase',
  openGraph: {
    title: 'WebSocket Demo | WDT Technologies',
    description:
      'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
    images: [
      {
        url: 'https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WDT Technologies WebSocket Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebSocket Demo | WDT Technologies',
    description:
      'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
    images: ['https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg'],
  },
};

export default function WebSocketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}