import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WDT Technologies - The Invisible Systems Architect™",
  description: "I design the invisible architecture that turns chaos into calm — and then I disappear. Building your business OS in 4 weeks, fixed price, zero ongoing management.",
  keywords: ["Systems Architect", "Business Systems", "Notion", "Airtable", "Process Design", "Business Automation", "WDT Technologies"],
  authors: [{ name: "WDT Technologies" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: "I build the operating system your business runs on — in 4 weeks, fixed price, zero ongoing management.",
    url: "https://wdt.tech",
    siteName: "WDT Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WDT Technologies - The Invisible Systems Architect™",
    description: "I build the operating system your business runs on — in 4 weeks, fixed price, zero ongoing management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
      >
        <div className="min-h-screen mx-auto max-w-[90rem] border-x border-border/20 bg-gradient-to-r from-border/10 via-background to-border/10">
          <div className="bg-background text-foreground min-h-screen">
            {children}
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}