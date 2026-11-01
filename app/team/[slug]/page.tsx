import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { askHref, firstName, people, personBySlug } from '@/lib/people';
import { contactInfo, site } from '@/lib/site';
import { Rise, RiseGroup } from '@/components/Reveal';
import { Tilt } from '@/components/Depth';
import { buttonClass, textLink } from '@/components/Button';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const p = personBySlug(params.slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}, ${p.title}`,
    description: `Sample team member. ${p.name}, ${p.title.toLowerCase()} at ${site.name}: ${p.specialty}`,
    path: `/team/${p.slug}`,
  });
}

export default function Page({ params }: Props) {
  const p = personBySlug(params.slug);
  if (!p) notFound();
  const others = people.filter((other) => other.slug !== p.slug).slice(0, 4);

  return (
    <>
      <article className="mx-auto max-w-page px-5 pb-24 pt-16 md:px-8 md:pb-40 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <Rise>
              <Tilt max={6}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-rest">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className={`object-cover ${p.focus ?? ''}`}
                  />
                </div>
              </Tilt>
            </Rise>
          </RiseGroup>
          <RiseGroup className="md:col-span-6 md:col-start-7 md:pt-8">
            <Rise mask>
              <h1 className="text-h2">{p.name}</h1>
              <p className="mt-3 text-statement">{p.title}</p>
            </Rise>
            <Rise>
              <p className="mt-10 max-w-[36ch] font-display text-h3 font-semibold">{p.specialty}</p>
            </Rise>
            {p.bio.map((para) => (
              <Rise key={para}>
                <p className="mt-6 max-w-[60ch]">{para}</p>
              </Rise>
            ))}
            <Rise className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="rounded-lg border-l-4 border-accent pl-5">
                <h2 className="font-medium">Background</h2>
                <ul className="mt-2 grid gap-1.5">
                  {p.background.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border-l-4 border-delta pl-5">
                <h2 className="font-medium">Outside the office</h2>
                <p className="mt-2">{p.outside}</p>
              </div>
            </Rise>
            <Rise className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={askHref(p)} className={buttonClass}>
                Email {firstName(p)}
              </a>
              <a href={contactInfo.phoneHref} className="inline-block py-3 font-medium underline underline-offset-4 hover:no-underline">
                {contactInfo.phone}
              </a>
            </Rise>
            <Rise>
              <p className="mt-10 max-w-[46ch] text-small">
                Sample team member for demonstration. The name, biography and portrait are placeholders, not a real
                person.
              </p>
            </Rise>
          </RiseGroup>
        </div>
      </article>

      <section aria-labelledby="others-title" className="slab bg-surface px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="others-title" className="text-h2">
              More of the team
            </h2>
            <Link href="/team" className={textLink}>
              Everyone at the firm
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {others.map((o) => (
              <li key={o.slug}>
                <Tilt max={7}>
                  <Link href={`/team/${o.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-rest">
                    <Image src={o.src} alt="" fill sizes="(min-width: 768px) 23vw, 50vw" className={`object-cover ${o.focus ?? ''}`} />
                  </Link>
                </Tilt>
                <h3 className="mt-4 text-h3">
                  <Link href={`/team/${o.slug}`} className="hover:text-accent">
                    {o.name}
                  </Link>
                </h3>
                <p className="mt-0.5 font-medium">{o.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
