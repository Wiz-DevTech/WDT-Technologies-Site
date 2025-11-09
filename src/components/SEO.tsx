import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  imageUrl,
  noIndex = false
}: SEOProps): Metadata {
  const baseUrl = 'https://wiz-devtech.github.io/WDT-Technologies-Site';
  
  return {
    title: title ? `${title} | WDT Technologies` : undefined,
    description,
    keywords,
    openGraph: {
      title: title ? `${title} | WDT Technologies` : undefined,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      title: title ? `${title} | WDT Technologies` : undefined,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : undefined,
  };
}