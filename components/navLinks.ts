import { industries } from '@/lib/industries';
import { services } from '@/lib/services';

export type NavLink = { href: string; label: string; blurb?: string };
export type NavGroup = { label: string; href: string; all: string; links: NavLink[] };

/** The two menus that open a panel on desktop and a list on phones. */
export const navGroups: NavGroup[] = [
  {
    label: 'Services',
    href: '/services',
    all: 'All services',
    links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name, blurb: s.blurb })),
  },
  {
    label: 'Who we serve',
    href: '/industries',
    all: 'Everyone we serve',
    links: industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.name, blurb: i.blurb })),
  },
];

export const navLinks: NavLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/team', label: 'Team' },
  { href: '/insights', label: 'Insights' },
  { href: '/faq', label: 'FAQ' },
];

export const utilityLinks: NavLink[] = [
  { href: '/client-center', label: 'Client center' },
  { href: '/client-center#pay', label: 'Pay an invoice' },
  { href: '/careers', label: 'Careers' },
];
