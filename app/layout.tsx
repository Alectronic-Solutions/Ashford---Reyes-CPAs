import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';
import { Motion } from '@/components/Motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileActionBar } from '@/components/MobileActionBar';
import { contactInfo, site } from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tax and advisory in Lodi, California`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: `${site.name} | Tax and advisory in Lodi, California`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Tax and advisory in Lodi, California`,
    description: site.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#F3F5F0',
};

// Tells search engines what the firm is and where to find it.
const firmData = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: contactInfo.phoneHref.replace('tel:', ''),
  email: contactInfo.email,
  image: `${site.url}/opengraph-image.png`,
  logo: `${site.url}/icons/icon-512.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contactInfo.city,
    addressRegion: contactInfo.region,
    addressCountry: 'US',
  },
  areaServed: [...contactInfo.towns, 'San Joaquin County', 'Lodi AVA'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(firmData) }}
        />
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}'}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-24 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        <Motion>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none focus-visible:shadow-none">{children}</main>
          <Footer />
          <MobileActionBar />
        </Motion>
      </body>
    </html>
  );
}
