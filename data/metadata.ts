import type { Metadata } from 'next';
import { site } from './site';

const socialImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Rohan Magar — Websites, Apps, Digital Products',
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = title === site.name ? title : `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/og-image.png'],
    },
  };
}
