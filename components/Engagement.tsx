import Image from 'next/image';
import { Rise, RiseGroup } from './Reveal';

const steps = [
  {
    title: 'A first conversation',
    you: 'Tell us how your operation is set up, who owns it, what keeps you up at night, and where harvest, crush or quarter end land on your calendar.',
    receive:
      'An honest answer on whether we are the right fit, a short list of what we would need from you, and the scope and fee in writing before any work starts.',
  },
  {
    title: 'Gather your records',
    you: 'Send last year’s returns plus current bank, loan and payroll statements through our secure upload, or drop a folder at the Lodi office. We schedule this around your busy weeks, not ours.',
    receive:
      'A checklist written for your kind of operation, a date that works for you, and one named person to call when you are not sure what a paper is.',
  },
  {
    title: 'We prepare and review',
    you: 'Answer the few questions we send. Most clients need one short call and nothing more.',
    receive:
      'A draft with notes on anything unusual, and a plain explanation of what changed from last year and why.',
  },
  {
    title: 'Sign and file',
    you: 'Read it over, ask whatever is on your mind, then sign electronically or in person.',
    receive:
      'Your federal and California returns filed, a copy for your records, and a dated list of any payments coming due.',
  },
  {
    title: 'Check in through the year',
    you: 'Call before the big move: new equipment, a hire, a land purchase, a second location.',
    receive:
      'A quick answer before you sign, and a planning meeting each fall while there is still time to act on it.',
  },
];

export function Engagement({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const home = variant === 'home';
  return (
    <section
      id="how-it-works"
      aria-labelledby={home ? 'engagement-title' : undefined}
      aria-label={home ? undefined : 'The five steps'}
      className={`mx-auto max-w-page scroll-mt-24 px-5 pb-24 md:px-8 md:pb-40 ${home ? 'pt-8 md:pt-16' : ''}`}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <RiseGroup className="md:col-span-5">
          <div className="md:sticky md:top-28">
            {home ? (
              <>
                <Rise>
                  <h2 id="engagement-title" className="text-h2">
                    How an engagement works
                  </h2>
                </Rise>
                <Rise>
                  <p className="mt-6 max-w-[34ch] text-statement">
                    Five steps. Each says what we need and what you get.
                  </p>
                </Rise>
              </>
            ) : (
              <Rise className="relative aspect-[4/3] md:aspect-[4/5]">
                <Image
                  src="/photos/serve-family.jpg"
                  alt="People gathered around a wooden kitchen table, raising their glasses"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </Rise>
            )}
          </div>
        </RiseGroup>

        {/* The order is the list's own: a real ol, spaced apart, with no numerals. */}
        <RiseGroup as="ol" className="list-none md:col-span-7">
          {steps.map((step, i) => (
            <Rise
              as="li"
              key={step.title}
              className={`${i === steps.length - 1 ? '' : 'mb-14 md:mb-20'} ${i === 0 ? 'md:mt-3' : ''}`}
            >
              <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {step.title}
              </h3>
              <dl className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-8">
                <div>
                  <dt className="font-medium text-accent">What you do</dt>
                  <dd className="mt-1.5 max-w-[40ch]">{step.you}</dd>
                </div>
                <div>
                  <dt className="font-medium text-delta">What you receive</dt>
                  <dd className="mt-1.5 max-w-[40ch] bg-surface px-4 py-3.5">{step.receive}</dd>
                </div>
              </dl>
            </Rise>
          ))}
        </RiseGroup>
      </div>
    </section>
  );
}
