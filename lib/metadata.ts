import type { Metadata } from 'next';
import { site } from './site';

/** Title, description, canonical address and link-preview text for one inner page. */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, locale: site.locale, title, description, url: path },
    robots: index ? undefined : { index: false, follow: true },
  };
}
