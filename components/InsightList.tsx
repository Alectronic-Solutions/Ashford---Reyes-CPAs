import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type Insight } from '@/lib/insights';
import { Rise, RiseGroup } from './Reveal';
import { Tilt } from './Depth';
import { textLink } from './Button';

/** Articles as a row: a photograph that leans toward the cursor, then the topic, title, summary and date. */
export function InsightCards({ items }: { items: Insight[] }) {
  return (
    <RiseGroup as="ul" className={`grid gap-x-8 gap-y-14 ${items.length > 1 ? 'md:grid-cols-3' : ''}`}>
      {items.map((a) => (
        <Rise as="li" key={a.slug}>
          <Tilt max={6}>
            <Link
              href={`/insights/${a.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="relative block aspect-[3/2] overflow-hidden bg-surface"
            >
              <Image
                src={a.photo.src}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </Link>
          </Tilt>
          <h3 className="mt-6 text-h3">
            <Link
              href={`/insights/${a.slug}`}
              className="hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
            >
              {a.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-[46ch]">{a.summary}</p>
          <p className="mt-4 text-small">
            <span className="font-medium text-accent">{a.topic}</span>. <time dateTime={a.date}>{formatDate(a.date)}</time>,{' '}
            {a.minutes} minute read
          </p>
        </Rise>
      ))}
    </RiseGroup>
  );
}

/** The home page's look at the latest three articles, on a step of tone. */
export function InsightsTeaser({ items }: { items: Insight[] }) {
  return (
    <section id="insights" aria-labelledby="insights-title" className="scroll-mt-24 bg-surface px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <RiseGroup>
          <div className="mb-12 grid gap-8 md:mb-20 md:grid-cols-12 md:gap-8">
            <Rise className="md:col-span-5" mask>
              <h2 id="insights-title" className="text-h2">
                Insights
              </h2>
            </Rise>
            <Rise className="md:col-span-7 md:pt-3">
              <p className="max-w-[36ch] text-statement">Short pieces on what to do this season, written for Lodi.</p>
              <Link href="/insights" className={`${textLink} mt-4`}>
                All insights
              </Link>
            </Rise>
          </div>
        </RiseGroup>
        <InsightCards items={items} />
      </div>
    </section>
  );
}
