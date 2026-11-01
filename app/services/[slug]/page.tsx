import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { service, services } from '@/lib/services';
import { industries } from '@/lib/industries';
import { glue } from '@/lib/text';
import { insight } from '@/lib/insights';
import { person } from '@/lib/people';
import { PageHeader } from '@/components/PageHeader';
import { PersonCard } from '@/components/PersonCard';
import { InsightCards } from '@/components/InsightList';
import { Rise, RiseGroup } from '@/components/Reveal';
import { Contact } from '@/components/Contact';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const s = service(params.slug);
  if (!s) return {};
  return pageMetadata({
    title: s.name,
    description: `${s.lede} ${s.blurb}`,
    path: `/services/${s.slug}`,
    image: '/services/opengraph-image.png',
  });
}

const subhead = 'text-h2';

export default function Page({ params }: Props) {
  const s = service(params.slug);
  if (!s) notFound();
  const forWhom = industries.filter((i) => i.services.includes(s.slug));
  const reading = s.insight ? insight(s.insight) : undefined;

  return (
    <>
      <PageHeader title={s.name} lede={s.lede} photo={s.photo} />

      <section aria-labelledby="included-title" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Rise mask>
                <h2 id="included-title" className={subhead}>
                  What is included
                </h2>
              </Rise>
              <Rise className="mt-8 md:mt-12 md:pr-8">
                <PersonCard person={person(s.contact)} />
              </Rise>
            </div>
          </RiseGroup>
          <RiseGroup as="ul" className="grid gap-10 md:col-span-7 md:gap-12 lg:grid-cols-2 lg:gap-x-8">
            {s.included.map((item) => (
              <Rise as="li" key={item.name} className="rounded-lg border-l-4 border-accent pl-5">
                <h3 className="font-display text-h3">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[44ch]">{item.text}</p>
              </Rise>
            ))}
          </RiseGroup>
        </div>
      </section>

      <section aria-labelledby="for-whom-title" className="slab bg-surface px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[90rem]">
          <RiseGroup>
            <Rise mask>
              <h2 id="for-whom-title" className={subhead}>
                Who we do this for
              </h2>
            </Rise>
          </RiseGroup>
          <RiseGroup as="ul" className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-8">
            {forWhom.map((i) => (
              <Rise as="li" key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-bg shadow-rest">
                  <span className="relative block aspect-[3/2] overflow-hidden">
                    <Image
                      src={i.photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-6 md:p-8">
                    <span className="block font-display text-h3 font-semibold group-hover:text-accent">
                      {i.name}
                    </span>
                    <span className="mt-2 block">{i.blurb}</span>
                    <span className="mt-6 block font-medium underline decoration-accent decoration-2 underline-offset-8">
                      {glue(`How we work with ${i.name.toLowerCase()}`)}
                    </span>
                  </span>
                </Link>
              </Rise>
            ))}
          </RiseGroup>
        </div>
      </section>

      <section aria-labelledby="questions-title" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-40">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <Rise mask>
              <h2 id="questions-title" className={subhead}>
                Common questions
              </h2>
            </Rise>
          </RiseGroup>
          <RiseGroup className="md:col-span-7">
            <dl className="grid gap-10">
              {s.questions.map((item) => (
                <Rise key={item.q}>
                  <dt className="font-display text-h3 font-semibold">
                    {item.q}
                  </dt>
                  <dd className="mt-3 max-w-[60ch]">{item.a}</dd>
                </Rise>
              ))}
            </dl>
          </RiseGroup>
        </div>
        {reading && (
          <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-8">
            <RiseGroup className="md:col-span-5">
              <Rise mask>
                <h2 className="text-h2">Further reading</h2>
              </Rise>
            </RiseGroup>
            <div className="md:col-span-7">
              <InsightCards items={[reading]} />
            </div>
          </div>
        )}
      </section>

      <Contact />
    </>
  );
}
