'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Rise, RiseGroup } from './Reveal';
import { useDepth } from './Depth';

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
    title: 'Check in all year',
    you: 'Call before the big move: new equipment, a hire, a land purchase, a second location.',
    receive:
      'A quick answer before you sign, and a planning meeting each fall while there is still time to act on it.',
  },
];

// Each sheet's colours, so the pile reads as separate pages rather than one block.
const tones = [
  'bg-surface text-ink',
  'bg-ink text-bg',
  'bg-surface text-ink',
  'bg-ink text-bg',
  'bg-accent text-bg',
];

/** One ledger sheet. It pins near the top, and tips back and shrinks as the sheets after it land. */
function Sheet({
  step,
  index,
  progress,
  depth,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
  depth: boolean;
}) {
  const below = steps.length - 1 - index;
  const start = index / steps.length;
  const scale = useTransform(progress, [start, 1], [1, 1 - below * 0.04]);
  const rotateX = useTransform(progress, [start, 1], [0, below * 3]);
  const dark = !tones[index].startsWith('bg-surface');

  return (
    <li
      className="md:sticky md:[perspective:1600px]"
      style={{ top: `calc(var(--header-h) + 2rem + ${index * 1.75}rem)` }}
    >
      <motion.div
        className={`grid origin-top gap-6 rounded-3xl p-6 shadow-lift md:min-h-[22rem] md:gap-8 md:p-12 lg:grid-cols-12 ${tones[index]}`}
        style={depth ? { scale, rotateX } : undefined}
      >
        <h3 className="text-h2 lg:col-span-5">{step.title}</h3>
        <dl className="grid gap-6 md:grid-cols-2 md:gap-8 lg:col-span-7">
          <div>
            <dt className={`font-medium ${dark ? '' : 'text-accent'}`}>What you do</dt>
            <dd className="mt-2 max-w-[40ch]">{step.you}</dd>
          </div>
          <div>
            <dt className={`font-medium ${dark ? '' : 'text-delta'}`}>What you receive</dt>
            <dd className={`mt-2 max-w-[40ch] p-4 ${dark ? 'bg-bg/10' : 'bg-bg'}`}>{step.receive}</dd>
          </div>
        </dl>
      </motion.div>
    </li>
  );
}

export function Engagement({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const home = variant === 'home';
  const listRef = useRef<HTMLOListElement>(null);
  const { scroll } = useDepth();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section
      id="how-it-works"
      aria-labelledby={home ? 'engagement-title' : undefined}
      aria-label={home ? undefined : 'The five steps'}
      className={`mx-auto max-w-page scroll-mt-24 px-5 pb-24 md:px-8 md:pb-40 ${home ? 'pt-24 md:pt-40' : ''}`}
    >
      {home && (
        <RiseGroup>
          <div className="mb-12 grid gap-8 md:mb-20 md:grid-cols-12 md:gap-8">
            <Rise className="md:col-span-5" mask>
              <h2 id="engagement-title" className="text-h2">
                How we work
              </h2>
            </Rise>
            <Rise className="md:col-span-7 md:pt-3">
              <p className="max-w-[34ch] text-statement">Five steps. Each says what we need and what you get.</p>
            </Rise>
          </div>
        </RiseGroup>
      )}

      {/* The order is the list's own: a real ol, with no numerals. */}
      <ol ref={listRef} className="grid list-none gap-4 md:gap-10">
        {steps.map((step, i) => (
          <Sheet key={step.title} step={step} index={i} progress={scrollYProgress} depth={scroll} />
        ))}
      </ol>
    </section>
  );
}
