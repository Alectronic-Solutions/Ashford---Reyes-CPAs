import Image from 'next/image';
import Link from 'next/link';
import { Tilt } from '@/components/Depth';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { industries, industry } from '@/lib/industries';
import { service } from '@/lib/services';
import { person } from '@/lib/people';
import { stories } from '@/lib/proof';
import { PageHeader } from '@/components/PageHeader';
import { PersonCard } from '@/components/PersonCard';
import { Stories } from '@/components/Proof';
import { Rise, RiseGroup } from '@/components/Reveal';
import { Contact } from '@/components/Contact';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props) {
  const i = industry(params.slug);
  if (!i) return {};
  return pageMetadata({
    title: i.name,
    description: `${i.lede} ${i.blurb}`,
    path: `/industries/${i.slug}`,
    image: '/industries/opengraph-image.png',
  });
}

const subhead = 'text-h2';

export default function Page({ params }: Props) {
  const i = industry(params.slug);
  if (!i) notFound();
  const theirStories = stories.filter((s) => s.industry === i.slug);

  return (
    <>
      <PageHeader title={i.name} lede={i.lede} photo={i.photo} />

      <section aria-label="Overview" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-7 md:col-start-6">
            {i.intro.map((p, n) => (
              <Rise key={p}>
                <p className={n === 0 ? 'max-w-[36ch] text-statement' : 'mt-6 max-w-[60ch]'}>{p}</p>
              </Rise>
            ))}
            <Rise className="mt-12">
              <PersonCard person={person(i.contact)} heading="Ask for" />
            </Rise>
          </RiseGroup>
        </div>
      </section>

      <section aria-labelledby="year-title" className="slab bg-delta px-5 py-24 text-bg md:px-8 md:py-32">
        <div className="mx-auto max-w-[90rem]">
          <RiseGroup>
            <div className="grid gap-8 md:grid-cols-12 md:gap-8">
              <Rise className="md:col-span-5" mask>
                <h2 id="year-title" className={subhead}>
                  Your year, and ours
                </h2>
              </Rise>
              <Rise className="md:col-span-7 md:pt-2">
                <p className="max-w-[36ch] text-statement">What is on your plate each season, and what we do about it.</p>
              </Rise>
            </div>
          </RiseGroup>
          <RiseGroup as="ol" className="mt-12 grid list-none gap-3 md:mt-16">
            {i.year.map((y) => (
              <Rise
                as="li"
                key={y.when}
                className="grid gap-4 rounded-2xl bg-bg/10 p-6 md:grid-cols-12 md:gap-8 md:p-10"
              >
                <h3 className="font-display text-h3 md:col-span-4">
                  {y.when}
                </h3>
                <dl className="grid gap-4 md:col-span-8 md:grid-cols-2 md:gap-8">
                  <div>
                    <dt className="font-medium">You</dt>
                    <dd className="mt-1 max-w-[40ch]">{y.you}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Us</dt>
                    <dd className="mt-1 max-w-[40ch]">{y.we}</dd>
                  </div>
                </dl>
              </Rise>
            ))}
          </RiseGroup>
        </div>
      </section>

      {i.gallery && (
        <section aria-label="Through the seasons" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-40">
          <RiseGroup as="ul" className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {i.gallery.map((g, n) => (
              <Rise as="li" key={g.src} className={n % 2 === 1 ? 'md:mt-20' : ''}>
                <Tilt max={6}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-rest">
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 23vw, 50vw" className="object-cover" />
                  </div>
                </Tilt>
              </Rise>
            ))}
          </RiseGroup>
        </section>
      )}

      <section aria-labelledby="help-title" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Rise mask>
                <h2 id="help-title" className={subhead}>
                  Where we help
                </h2>
              </Rise>
              <Rise>
                <p className="mt-6 font-medium">Services you are likely to use</p>
                <ul className="mt-2">
                  {i.services.map((slug) => {
                    const s = service(slug);
                    return s ? (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          className="inline-block py-1.5 underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </Rise>
            </div>
          </RiseGroup>
          <RiseGroup as="ul" className="grid gap-10 md:col-span-7 md:gap-12 lg:grid-cols-2 lg:gap-x-8">
            {i.help.map((h) => (
              <Rise as="li" key={h.name} className="rounded-lg border-l-4 border-accent pl-5">
                <h3 className="font-display text-h3">
                  {h.name}
                </h3>
                <p className="mt-3 max-w-[44ch]">{h.text}</p>
              </Rise>
            ))}
          </RiseGroup>
        </div>
      </section>

      {theirStories.length > 0 && (
        <Stories
          stories={theirStories}
          linkOut={false}
          title={theirStories.length > 1 ? 'Client stories' : 'A client story'}
          lede="What changed once the numbers followed the client’s own calendar."
        />
      )}

      <Contact />
    </>
  );
}
