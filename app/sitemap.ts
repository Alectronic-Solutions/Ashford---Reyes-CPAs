import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import { industries } from '@/lib/industries';
import { insights } from '@/lib/insights';
import { people } from '@/lib/people';

export const dynamic = 'force-static';

// Add each new page here as the site grows. /thanks is left out on purpose.
const pages = [
  '',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/industries',
  ...industries.map((i) => `/industries/${i.slug}`),
  '/how-it-works',
  '/team',
  ...people.map((p) => `/team/${p.slug}`),
  '/insights',
  ...insights.map((a) => `/insights/${a.slug}`),
  '/faq',
  '/contact',
  '/careers',
  '/client-center',
  '/privacy',
  '/terms',
  '/accessibility',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
}
