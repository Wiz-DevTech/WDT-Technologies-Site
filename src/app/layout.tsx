import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SEOAnalytics from '@/components/SEOAnalytics';
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";

// Safe font configuration that won't break the build
const geistSans = {
  variable: "--font-geist-sans",
  className: "font-sans"
};

const geistMono = {
  variable: "--font-geist-mono", 
  className: "font-mono"
};

// Try to load Google Fonts using dynamic import (ESLint compliant)
if (typeof window !== 'undefined') {
  import("next/font/google").then(({ Geist, Geist_Mono }) => {
    Object.assign(geistSans, Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    }));
    
    Object.assign(geistMono, Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    }));
  }).catch(() => {
    console.warn("Google Fonts not available, using system fonts");
  });
}

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
    locale: "en_US",
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: "I build the operating system your business runs on — in 4 weeks, fixed price, zero ongoing management.",
    url: 'https://wdt-technologies-site.vercel.app',
    siteName: "WDT Technologies",
    images: [
      {
        url: "https://wdt-technologies-site.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WDT Technologies - The Invisible Systems Architect™",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: 'Fixed-price 4-week business OS builds using Notion, Airtable, and automation.',
    images: ["https://wdt-technologies-site.vercel.app/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager using next/script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NJ4VRN75');`
          }}
        />

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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ4VRN75"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
          <SEOAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}