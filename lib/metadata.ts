import type { Metadata } from 'next';
import { site } from './site';

/**
 * Title, description, canonical address and link-preview text for one inner page.
 * A page that sets its own openGraph replaces the one it would inherit, card image included,
 * so pages without a card file of their own pass `image` to reuse their section's card.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
  image,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  image?: string;
}): Metadata {
  // The key must be absent, not undefined, on pages with a card file of their own, or it hides that card.
  const card = image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {};
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, locale: site.locale, title, description, url: path, ...card },
    twitter: { card: 'summary_large_image', title, description, ...card },
    robots: index ? undefined : { index: false, follow: true },
  };
}
