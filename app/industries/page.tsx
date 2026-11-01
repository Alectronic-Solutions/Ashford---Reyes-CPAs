import { DepthPhoto } from '@/components/Depth';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { industries } from '@/lib/industries';
import { glue } from '@/lib/text';
import { PageHeader } from '@/components/PageHeader';
import { Rise, RiseGroup } from '@/components/Reveal';
import { textLink } from '@/components/Button';
import { Contact } from '@/components/Contact';

export const metadata = pageMetadata({
  title: 'Who we serve',
  description: 'Farms and wineries, small businesses and families across Lodi and San Joaquin County.',
  path: '/industries',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Who we serve"
        lede="Three kinds of clients, three different years. We learn yours before we give advice."
      />
      <section aria-label="Client types" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <RiseGroup as="ul" className="grid gap-16 md:gap-24">
          {industries.map((i, n) => (
            <Rise as="li" key={i.slug} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-8">
              <DepthPhoto
                src={i.photo.src}
                alt={i.photo.alt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`aspect-[4/3] md:col-span-6 ${n % 2 === 1 ? 'md:order-2 md:col-start-7' : ''}`}
              />
              <div className={`text-center md:col-span-5 md:text-left ${n % 2 === 1 ? 'md:order-1' : 'md:col-start-8'}`}>
                <h2 className="text-h2">{i.name}</h2>
                <p className="mx-auto mt-5 max-w-[36ch] text-statement md:mx-0">{i.lede}</p>
                <Link href={`/industries/${i.slug}`} className={`${textLink} mt-4`}>
                  {glue(`How we work with ${i.name.toLowerCase()}`)}
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
