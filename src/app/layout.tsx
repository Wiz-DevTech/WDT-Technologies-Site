import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SEOAnalytics from '@/components/SEOAnalytics';
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WDT Technologies - The Invisible Systems Architect™",
    template: "%s | WDT Technologies"
  },
  description: "I design the invisible architecture that turns chaos into calm — and then I disappear. Building your business OS in 4 weeks, fixed price, zero ongoing management. 'Fixed-price 4-week business OS builds using Notion, Airtable, and automation. Scale your business with our invisible systems architecture.'",
  keywords: [
    "Systems Architect", 
    "Business Systems", 
    "Notion consultant", 
    "Airtable automation",
    'business OS',
    'systems architecture',
    'process automation', 
    "Process Design", 
    "Business Automation", 
    "WDT Technologies"
  ],
  authors: [{ name: "WDT Technologies" }],
  creator: 'WDT Technologies',
  publisher: 'WDT Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL('https://wdt-technologies-site.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US"
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: "I build the operating system your business runs on — in 4 weeks, fixed price, zero ongoing management.",
     url: 'https://wdt-technologies-site.vercel.app',
    siteName: "WDT Technologies",
    images: [
      {
        url: "https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WDT Technologies- The Invisible Systems Architect™",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: 'Fixed-price 4-week business OS builds using Notion, Airtable, and automation., "fixed price, zero ongoing management."',
    images: ["https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg"],
   creator: '@wdttech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification here
    // google: 'verification-token',
  },
  
  other: {
    "theme-color": "#0f172a",
    "msapplication-TileColor": "#0f172a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "WDT Technologies",
              "url": "https://wdt-technologies-site.vercel.app",
              "logo": "https://wdt-technologies-site.vercel.app/logo.png",
              "description": "The Invisible Systems Architect - Building scalable business operating systems in 4 weeks",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Remote",
                "addressCountry": "Global"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": []
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
            <Analytics />
            </ThemeProvider>
            <Toaster />
            <SEOAnalytics />
          </div>
        </div>
      </body>
    </html>
  );
}