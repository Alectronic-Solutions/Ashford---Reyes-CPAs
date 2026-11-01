import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, insight, insightNote, insights } from '@/lib/insights';
import { person } from '@/lib/people';
import { site } from '@/lib/site';
import { PersonCard } from '@/components/PersonCard';
import { InsightCards } from '@/components/InsightList';
import { Rise, RiseGroup } from '@/components/Reveal';
import { DepthPhoto } from '@/components/Depth';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props) {
  const a = insight(params.slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.summary, path: `/insights/${a.slug}` });
}

export default function Page({ params }: Props) {
  const a = insight(params.slug);
  if (!a) notFound();
  const author = person(a.author);
  const more = insights.filter((other) => other.slug !== a.slug);

  // Lets search engines show the date and author alongside the result.
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    author: { '@type': 'Person', name: author.name, jobTitle: author.title },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      <article>
        <header className="mx-auto max-w-page px-5 pb-12 pt-16 md:px-8 md:pb-20 md:pt-28">
          <RiseGroup>
            <Rise mask>
              <h1 className="max-w-[24ch] text-h3 md:text-h2">{a.title}</h1>
            </Rise>
            <Rise className="mt-8 md:mt-10">
              <p className="text-small">
                <span className="font-medium text-accent">{a.topic}</span>. By {author.name},{' '}
                {author.title.toLowerCase()}. <time dateTime={a.date}>{formatDate(a.date)}</time>.{' '}
                {a.minutes} minute read.
              </p>
            </Rise>
          </RiseGroup>
          <DepthPhoto
            src={a.photo.src}
            alt={a.photo.alt}
            sizes="(min-width: 1504px) 1440px, 100vw"
            priority
            className="mt-12 h-[40svh] md:mt-16 md:h-[60svh]"
          />
        </header>

        <div className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-[40ch] text-statement">{a.summary}</p>
              <p className="mt-6 max-w-[60ch] border-l-2 border-accent pl-4 text-small">{insightNote}</p>
              {a.sections.map((section) => (
                <section key={section.heading} className="mt-14">
                  <h2 className="font-display text-h3">
                    {section.heading}
                  </h2>
                  {section.body.map((p) => (
                    <p key={p} className="mt-4 max-w-[64ch]">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
            <aside aria-label="About the author" className="md:col-span-4 md:col-start-1 md:row-start-1">
              <div className="md:sticky md:top-28">
                <PersonCard person={author} heading="Written by" />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
          <h2 id="more-title" className="mb-10 text-h3">
            More insights
          </h2>
          <InsightCards items={more} />
        </section>
      )}

    </>
  );
}
