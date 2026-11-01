import Image from 'next/image';
import Link from 'next/link';
import { Rise, RiseGroup } from './Reveal';
import { CountUp, Tilt } from './Depth';
import { credentials, rating, sampleNote, stats, type Story, type Testimonial } from '@/lib/proof';
import { industry } from '@/lib/industries';

function Stars({ className }: { className?: string }) {
  return (
    <span className={`flex gap-1 ${className ?? ''}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

/** The firm in four figures, set large on ink straight after the hero. */
export function ProofStrip() {
  return (
    <section aria-labelledby="proof-title" className="bg-ink px-5 py-20 text-bg md:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <h2 id="proof-title" className="sr-only">
          The firm in numbers
        </h2>
        <RiseGroup as="ul" className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {stats.map((s) => (
            <Rise as="li" key={s.label}>
              <CountUp
                value={s.value}
                className="block font-display text-h2 font-semibold xl:text-display"
              />
              <p className="mt-4 max-w-[20ch]">{s.label}</p>
            </Rise>
          ))}
        </RiseGroup>
        <RiseGroup>
          <Rise className="mt-16 grid gap-8 bg-bg/10 p-6 md:mt-24 md:grid-cols-12 md:items-center md:gap-8 md:p-8">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5 md:col-span-4">
              <span className="font-display text-h2 font-semibold">{rating.score}</span>
              <span>
                <Stars className="text-bg" />
                <span className="mt-1 block text-small">
                  Average from {rating.count} {rating.source}
                </span>
              </span>
            </div>
            <p className="font-medium md:col-span-5">{credentials}</p>
            <p className="text-small md:col-span-3">{sampleNote}</p>
          </Rise>
        </RiseGroup>
      </div>
    </section>
  );
}

/** Before, what we did, and the result. The first story is set large; the rest sit beside it. */
export function Stories({
  stories,
  title = 'Client stories',
  lede = 'Three clients, three problems, and what changed once we fixed them.',
  linkOut = true,
}: {
  stories: Story[];
  title?: string;
  lede?: string;
  /** Off on an industry page, where the link would lead back to the same page. */
  linkOut?: boolean;
}) {
  const [lead, ...rest] = stories;

  return (
    <section aria-labelledby="stories-title" className="bg-accent px-5 py-24 text-bg md:px-8 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <RiseGroup>
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <Rise className="md:col-span-5" mask>
              <h2 id="stories-title" className="text-h2">
                {title}
              </h2>
            </Rise>
            <Rise className="md:col-span-7 md:pt-3">
              <p className="max-w-[36ch] text-statement">{lede}</p>
              <p className="mt-4 max-w-[46ch] text-small">{sampleNote}</p>
            </Rise>
          </div>
        </RiseGroup>

        <RiseGroup className="mt-12 grid gap-12 md:mt-20 md:gap-8 lg:grid-cols-12">
          <Tilt max={4} className={rest.length ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <Rise className="grid h-full bg-bg text-ink md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[32rem]">
                <Image
                  src={lead.photo.src}
                  alt={lead.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-6 md:p-10">
                <CountUp
                  value={lead.result}
                  className="block font-display text-h2 font-semibold text-accent"
                />
                <p className="mt-3 max-w-[28ch] font-medium">{lead.resultLabel}</p>
                <h3 className="mt-10 text-h3">{lead.title}</h3>
                <p className="mt-1 text-small">{lead.client}</p>
                <p className="mt-4 max-w-[52ch]">{lead.text}</p>
                {linkOut && (
                  <Link
                    href={`/industries/${lead.industry}`}
                    className="mt-auto inline-block self-start pt-6 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
                  >
                    More on {industry(lead.industry)?.name.toLowerCase()}
                  </Link>
                )}
              </div>
            </Rise>
          </Tilt>
          {rest.length > 0 && (
            <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:col-span-5 lg:grid-cols-1">
              {rest.map((s) => (
                <Tilt key={s.title} max={5}>
                  <Rise className="flex h-full flex-col bg-ink p-6 text-bg md:p-8">
                    <CountUp value={s.result} className="block font-display text-h2 font-semibold" />
                    <p className="mt-2 max-w-[30ch] font-medium">{s.resultLabel}</p>
                    <h3 className="mt-6 text-h3">{s.title}</h3>
                    <p className="mt-1 text-small">{s.client}</p>
                    <p className="mt-3 max-w-[52ch]">{s.text}</p>
                    {linkOut && (
                      <Link
                        href={`/industries/${s.industry}`}
                        className="mt-auto inline-block self-start pt-5 font-medium underline decoration-bg/60 decoration-2 underline-offset-8 hover:decoration-bg"
                      >
                        More on {industry(s.industry)?.name.toLowerCase()}
                      </Link>
                    )}
                  </Rise>
                </Tilt>
              ))}
            </div>
          )}
        </RiseGroup>
      </div>
    </section>
  );
}

/** One quote set large on ink, the rest in a row beneath it. */
export function Testimonials({ quotes }: { quotes: Testimonial[] }) {
  const [lead, ...rest] = quotes;
  return (
    <section aria-labelledby="quotes-title" className="bg-ink px-5 py-24 text-bg md:px-8 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <RiseGroup>
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <Rise className="md:col-span-5" mask>
              <h2 id="quotes-title" className="text-h2">
                In their words
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <Stars className="text-bg" />
                <span>
                  {rating.score} from {rating.count} {rating.source}
                </span>
              </div>
              <p className="mt-4 max-w-[40ch] text-small">
                Sample quotes and rating for demonstration. These people are not real clients.
              </p>
            </Rise>
            <Rise className="md:col-span-7">
              <figure>
                <blockquote className="max-w-[30ch] font-display text-h3 font-semibold">
                  <p>“{lead.quote}”</p>
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-medium">{lead.name}</span>
                  <span className="block text-small">{lead.role}</span>
                </figcaption>
              </figure>
            </Rise>
          </div>
        </RiseGroup>
        {rest.length > 0 && (
          <RiseGroup as="ul" className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3 md:gap-8">
            {rest.map((t) => (
              <Tilt as="li" key={t.name} max={5}>
                <figure className="flex h-full flex-col bg-bg/10 p-6 md:p-8">
                  <Stars className="text-bg" />
                  <blockquote className="mt-5 max-w-[40ch]">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-auto pt-6">
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-small">{t.role}</span>
                  </figcaption>
                </figure>
              </Tilt>
            ))}
          </RiseGroup>
        )}
      </div>
    </section>
  );
}
