import Link from 'next/link';
import { contactInfo } from './contactInfo';
import { navLinks } from './navLinks';

const link = 'inline-block py-3 underline underline-offset-4 hover:no-underline';

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-20 text-bg md:px-8 md:pb-10 md:pt-32">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-12 lg:col-span-4">
            <p className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Ashford and Reyes CPAs
            </p>
            <p className="mt-6 max-w-[32ch] text-small">
              Tax, bookkeeping, advisory and succession planning in Lodi, California.
            </p>
          </div>
          <nav aria-label="Footer" className="text-small md:col-span-4 lg:col-span-2">
            <p className="font-medium">Pages</p>
            <ul className="mt-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-small md:col-span-4 lg:col-span-3">
            <p className="font-medium">Office</p>
            <p className="mt-1">
              {contactInfo.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{contactInfo.hours}</span>
            </p>
            <p className="mt-3">
              <a href={contactInfo.phoneHref} className={link}>
                {contactInfo.phone}
              </a>
              <br />
              <a href={contactInfo.emailHref} className={link}>
                {contactInfo.email}
              </a>
            </p>
          </div>
          <div className="text-small md:col-span-4 lg:col-span-3">
            <p className="font-medium">Photo and video credits</p>
            <p className="mt-1">
              Video:{' '}
              <a href="https://www.pexels.com/@rdne/" className={link}>
                RDNE Stock project on Pexels
              </a>
            </p>
            <p>The hero still is a frame from that video.</p>
            <p className="mt-3">
              Photographs and team portraits:{' '}
              <a href="https://www.pexels.com" className={link}>
                Pexels
              </a>
              , portraits used as sample people.
            </p>
          </div>
        </div>
        <p className="mt-16 text-small md:mt-24">
          Website by{' '}
          <a href="https://alectronicsolutions.com" className={link}>
            Alectronic Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
