import Link from 'next/link';
import { contactInfo } from '@/lib/site';
import { buttonClass } from './Button';
import { navGroups, navLinks, utilityLinks } from './navLinks';
import { NewsletterForm } from './NewsletterForm';

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/credits', label: 'Photo credits' },
];

const columns = [
  ...navGroups.map((g) => ({ title: g.label, links: [...g.links, { href: g.href, label: g.all }] })),
  {
    title: 'The firm',
    links: [...navLinks, { href: '/contact', label: 'Contact' }, ...utilityLinks.filter((l) => !l.href.includes('#'))],
  },
];

const listLink = 'inline-block py-1.5 text-bg/85 transition-colors hover:text-bg hover:underline hover:underline-offset-4';
const plainLink = 'underline decoration-bg/40 underline-offset-4 transition-colors hover:decoration-bg';

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      {/* The close: one last, plain ask before the details. */}
      <div className="mx-auto max-w-[90rem] px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
        <h2 className="text-h2 lg:text-display">Talk to us before December&nbsp;31.</h2>
        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-[44ch] text-statement">
            The fall planning meeting is where this year&rsquo;s tax bill is decided. The first conversation is free.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/contact" className={buttonClass}>
              Book a consultation
            </Link>
            <a href={contactInfo.phoneHref} className={`inline-block py-3 font-medium ${plainLink}`}>
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="grid gap-12 bg-bg/[0.06] p-6 md:p-10 lg:grid-cols-12 lg:gap-8">
          {/* The firm, where it works, and how to reach it. */}
          <div className="lg:col-span-4">
            <p className="font-display text-h3 font-semibold">Ashford and Reyes CPAs</p>
            <p className="mt-3 max-w-[36ch] text-bg/85">
              Tax, bookkeeping, advisory and succession planning for farms, wineries, businesses and families.
            </p>
            <p className="mt-6 font-medium">Serving {contactInfo.area}</p>
            <p className="mt-1 max-w-[36ch] text-small text-bg/85">{contactInfo.towns.join(', ')}.</p>
            <dl className="mt-6 grid gap-3 text-small">
              <div>
                <dt className="sr-only">Hours</dt>
                <dd className="text-bg/85">{contactInfo.hours}</dd>
              </div>
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={contactInfo.phoneHref} className={`font-medium ${plainLink}`}>
                    {contactInfo.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={contactInfo.emailHref} className={`break-all ${plainLink}`}>
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Links: three open columns on larger screens, folded groups on phones. */}
          <nav aria-label="Footer" className="lg:col-span-8">
            <div className="hidden gap-8 md:grid md:grid-cols-3">
              {columns.map((c) => (
                <div key={c.title}>
                  <h2 className="font-sans text-small font-medium text-bg">{c.title}</h2>
                  <ul className="mt-2">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={listLink}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid gap-2 md:hidden">
              {columns.map((c) => (
                <details key={c.title} className="group bg-bg/[0.06]">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-4 font-medium [&::-webkit-details-marker]:hidden">
                    {c.title}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-200 group-open:rotate-45"
                    >
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </summary>
                  <ul className="px-4 pb-4">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={`${listLink} py-2`}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-12">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* The name returns at full width as the page's last word, sized to fill the measure exactly. */}
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="footer-wordmark-frame">
          <p aria-hidden="true" className="footer-wordmark mt-16 whitespace-nowrap font-display font-semibold md:mt-24">
            Ashford and Reyes
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[90rem] flex-col gap-x-8 gap-y-3 px-5 pb-8 pt-6 text-small md:flex-row md:items-center md:justify-between md:px-8 md:pb-10">
        <ul className="flex flex-wrap gap-x-6">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-3 text-bg/85 hover:text-bg hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-6">
          <a href="#main" className="inline-block py-3 text-bg/85 hover:text-bg hover:underline">
            Back to top
          </a>
          <p>
            Website by{' '}
            <a href="https://alectronicsolutions.com" className={plainLink}>
              Alectronic Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
