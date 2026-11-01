import Image from 'next/image';
import Link from 'next/link';
import { Tilt } from '@/components/Depth';
import { pageMetadata } from '@/lib/metadata';
import { services } from '@/lib/services';
import { PageHeader } from '@/components/PageHeader';
import { Rise, RiseGroup } from '@/components/Reveal';
import { textLink } from '@/components/Button';
import { Contact } from '@/components/Contact';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Tax, bookkeeping, advisory, and estate and succession planning from Ashford and Reyes CPAs in Lodi, California.',
  path: '/services',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Services"
        lede="Four kinds of work, one team that knows your books. Most clients use two or three of them together."
        photo={{ src: '/photos/rows-aerial.jpg', alt: 'Long rows of grapevines seen from the air, split by a line of trees' }}
      />
      <section aria-label="All services" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <RiseGroup as="ul" className="grid gap-20 md:gap-32">
          {services.map((s) => (
            <Rise
              as="li"
              key={s.slug}
              className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8"
            >
              <Tilt max={5} className="md:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-rest">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
              </Tilt>
              <div className="text-center md:col-span-6 md:col-start-7 md:text-left">
                <h2 className="text-h2">
                  <Link href={`/services/${s.slug}`} className="hover:text-accent">
                    {s.name}
                  </Link>
                </h2>
                <p className="mx-auto mt-5 max-w-[36ch] text-statement md:mx-0">{s.lede}</p>
                <ul className="mx-auto mt-6 grid w-fit max-w-[44rem] gap-x-8 gap-y-2 text-left sm:grid-cols-2 md:mx-0 md:w-auto">
                  {s.included.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
                      {item.name}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className={`${textLink} mt-4`}>
                  More on {s.name.toLowerCase()}
                  <span className="sr-only"> services</span>
                </Link>
              </div>
            </Rise>
          ))}
        </RiseGroup>
      </section>
      <Contact />
    </>
  );
}
