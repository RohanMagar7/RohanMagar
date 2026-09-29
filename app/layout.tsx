import type { Metadata } from 'next';
import '../app/globals.css';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { site } from '@/data/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Rohan Magar — Websites, Apps & Digital Products',
    template: '%s — Rohan Magar',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rohan Magar — Websites, Apps & Digital Products',
    description: site.description,
    type: 'website',
    url: '/',
    siteName: 'Rohan Magar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rohan Magar — Websites, Apps, Digital Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Magar — Websites, Apps & Digital Products',
    description: site.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
