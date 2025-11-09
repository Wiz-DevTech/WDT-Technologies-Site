import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'The Invisible Systems Architect™ | WDT Technologies',
  description: 'Transform your business with our invisible systems architecture. We optimize, streamline, and future-proof your technology infrastructure for maximum efficiency and growth.',
  keywords: 'systems architecture, business optimization, technology consulting, IT infrastructure, digital transformation, process automation, scalability solutions',
  openGraph: {
    title: 'The Invisible Systems Architect™ | WDT Technologies',
    description: 'Transform your business with our invisible systems architecture. We optimize, streamline, and future-proof your technology infrastructure.',
    images: [
      {
        url: 'https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WDT Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Invisible Systems Architect™ | WDT Technologies',
    description: 'Transform your business with our invisible systems architecture. We optimize, streamline, and future-proof your technology infrastructure.',
    images: ['https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg'],
  },
};

export default function Home() {
  return <HomeClient />;
}