'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Rise, RiseGroup } from './Reveal';
import {
  audiences,
  daysAwayText,
  defaultAudience,
  localToday,
  monthName,
  nextDeadlines,
  type Audience,
  type Ymd,
} from './yearAheadRules';

const iso = ({ y, m, d }: Ymd) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export function YearAheadPanel({ buildToday }: { buildToday: Ymd }) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [today, setToday] = useState<Ymd>(buildToday);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  // The build date is only a default. From here on the visitor's own date decides.
  useEffect(() => {
    setToday(localToday());
  }, []);

  const deadlines = nextDeadlines(audience, today);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = audiences.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next < 0) return;
    event.preventDefault();
    setAudience(audiences[next].id);
    radios.current[next]?.focus();
  }

  return (
    <section
      id="year-ahead"
      aria-labelledby="year-ahead-title"
      className="scroll-mt-4 bg-delta px-5 py-24 text-bg md:px-8 md:py-40"
    >
      <RiseGroup>
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-5">
            <h2 id="year-ahead-title" className="text-h2">
              The year ahead
            </h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="max-w-[36ch] text-statement">
              Choose what sounds like you. Here are your next three federal dates and what we do at each.
            </p>
          </Rise>
        </div>

        <Rise className="mt-10 md:mt-16">
          <div role="radiogroup" aria-label="Who the dates are for" className="flex flex-wrap gap-2">
            {audiences.map((a, i) => {
              const selected = a.id === audience;
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    radios.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setAudience(a.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`min-h-12 border-2 border-bg px-5 py-3 text-body font-medium transition-colors duration-200 ${
                    selected ? 'bg-bg text-delta' : 'text-bg hover:bg-bg/15'
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </Rise>

        <Rise className="mt-12 md:mt-20">
          <ol
            aria-live="polite"
            className="grid gap-14 md:grid-cols-3 md:gap-8 md:border-t-2 md:border-bg"
          >
            {deadlines.map((d) => (
              <li
                key={d.id}
                className="relative md:pt-10"
              >
                <span aria-hidden="true" className="absolute -top-[7px] left-0 hidden h-3 w-3 bg-bg md:block" />
                <time dateTime={iso(d.date)} className="block font-display text-h2 font-semibold">
                  {monthName(d.date.m)} {d.date.d}
                </time>
                <p className="mt-2 text-small">
                  {d.weekday}, {daysAwayText(d.daysAway)}
                </p>
                <h3 className="mt-6 max-w-[24ch] text-statement">{d.label}</h3>
                <p className="mt-5 text-small font-medium">What we handle</p>
                <p className="mt-1 max-w-[40ch]">{d.handles}</p>
              </li>
            ))}
          </ol>
        </Rise>

        <Rise className="mt-14 md:mt-20">
          <p className="max-w-[60ch] text-small">
            Sample dates for demonstration. A CPA must verify deadlines before launch. Federal dates only, and a date
            that falls on a weekend moves to the next Monday.
          </p>
        </Rise>
      </RiseGroup>
    </section>
  );
}
