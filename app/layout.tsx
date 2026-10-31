import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';
import { Motion } from '@/components/Motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
  title: 'Ashford and Reyes CPAs | Tax and advisory in Lodi, California',
  description:
    'Tax, bookkeeping, advisory and succession planning for Lodi farms, wineries, small businesses and families.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <Motion>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Motion>
      </body>
    </html>
  );
}
