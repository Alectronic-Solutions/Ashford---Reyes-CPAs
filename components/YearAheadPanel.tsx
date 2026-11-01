'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Rise, RiseGroup } from './Reveal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  audiences,
  daysAwayText,
  deadlineCount,
  deadlinesInMonth,
  defaultAudience,
  icsFor,
  localToday,
  monthName,
  monthNames,
  monthNotes,
  type Audience,
  type Ymd,
} from './yearAheadRules';

const iso = ({ y, m, d }: Ymd) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const STEP = 30; // degrees between neighbouring months on the wheel
const wrap = (n: number) => ((n % 12) + 12) % 12;

/** Arrow keys, Home and End over a row of radio-style buttons. Returns the index to move to, or -1. */
function arrowTarget(key: string, index: number, last: number) {
  if (key === 'ArrowRight' || key === 'ArrowDown') return index === last ? 0 : index + 1;
  if (key === 'ArrowLeft' || key === 'ArrowUp') return index === 0 ? last : index - 1;
  if (key === 'Home') return 0;
  if (key === 'End') return last;
  return -1;
}

export function YearAheadPanel({ buildToday }: { buildToday: Ymd }) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [today, setToday] = useState<Ymd>(buildToday);
  // `turns` counts steps around the wheel without wrapping, so December to January turns forward.
  const [turns, setTurns] = useState(buildToday.m - 1);
  const month = wrap(turns) + 1;
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const angle = useMotionValue(-(buildToday.m - 1) * STEP);
  // The month facing the visitor right now, mid-drag or mid-spin included. Only it and its near
  // neighbours are drawn; the rest of the ring is out of sight anyway and would only sit behind them.
  const [facing, setFacing] = useState(buildToday.m - 1);
  useMotionValueEvent(angle, 'change', (v) => setFacing(wrap(Math.round(-v / STEP))));
  const audienceRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const monthRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef<{ x: number; start: number; width: number; moved: boolean } | null>(null);
  // A drag ends with a click on whichever face is under the pointer; that click is not a choice.
  const lastDrag = useRef(0);

  // The build date is only a default. From here on the visitor's own date decides.
  useEffect(() => {
    const now = localToday();
    setToday(now);
    setTurns(now.m - 1);
    angle.set(-(now.m - 1) * STEP);
  }, [angle]);

  function turnTo(next: number) {
    setTurns(next);
    animate(angle, -next * STEP, reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 });
  }

  /** Go to a month by the shortest way round. */
  function goToMonth(m: number) {
    let delta = wrap(m - 1 - turns);
    if (delta > 6) delta -= 12;
    turnTo(turns + delta);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const face = event.currentTarget.querySelector<HTMLElement>('[data-face]');
    drag.current = { x: event.clientX, start: angle.get(), width: face?.offsetWidth ?? 200, moved: false };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 6) return;
    if (!d.moved) event.currentTarget.setPointerCapture(event.pointerId);
    d.moved = true;
    angle.set(d.start + (dx / d.width) * STEP);
  }

  function onPointerUp() {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    lastDrag.current = Date.now();
    turnTo(Math.round(-angle.get() / STEP));
  }

  function onAudienceKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = arrowTarget(event.key, index, audiences.length - 1);
    if (next < 0) return;
    event.preventDefault();
    setAudience(audiences[next].id);
    audienceRefs.current[next]?.focus();
  }

  function onMonthKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = arrowTarget(event.key, index, 11);
    if (next < 0) return;
    event.preventDefault();
    goToMonth(next + 1);
    monthRefs.current[next]?.focus();
  }

  function download() {
    const blob = new Blob([icsFor(audience, today)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ashford-reyes-${audience}-dates.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const deadlines = deadlinesInMonth(audience, today, month);
  const year = month >= today.m ? today.y : today.y + 1;
  const who = audiences.find((a) => a.id === audience)!.label.toLowerCase();

  return (
    <section
      id="year-ahead"
      aria-labelledby="year-ahead-title"
      className="scroll-mt-24 overflow-hidden bg-delta px-5 pb-20 pt-24 text-bg md:px-8 md:pb-32 md:pt-40"
    >
      <RiseGroup className="mx-auto max-w-[90rem]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-5" mask>
            <h2 id="year-ahead-title" className="text-h2">
              The year ahead
            </h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="max-w-[38ch] text-statement">
              Turn the wheel to any month and see what it asks of you, and what we do about it.
            </p>
          </Rise>
        </div>

        <Rise className="mt-10 md:mt-14">
          <div role="radiogroup" aria-label="Who the dates are for" className="flex flex-wrap gap-2">
            {audiences.map((a, i) => {
              const selected = a.id === audience;
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    audienceRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setAudience(a.id)}
                  onKeyDown={(e) => onAudienceKey(e, i)}
                  className={`min-h-12 px-5 py-3 font-medium transition-colors duration-200 active:translate-y-px ${
                    selected ? 'bg-bg text-delta' : 'bg-bg/10 text-bg hover:bg-bg/20'
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </Rise>
      </RiseGroup>

      {/* The wheel: twelve months stood around a ring. Drag it, or use the controls under it. */}
      <div
        className="relative mx-auto mt-10 h-[13rem] max-w-[110rem] cursor-grab touch-pan-y select-none [--face-w:7rem] [perspective:1100px] active:cursor-grabbing md:mt-16 md:h-[19rem] md:[--face-w:15rem] md:[perspective:1800px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
          style={{ rotateY: angle, z: 'calc(var(--face-w) * -1.866)' }}
        >
          {monthNames.map((name, i) => {
            const on = i + 1 === month;
            const count = deadlineCount(audience, i + 1);
            const away = Math.min(Math.abs(i - facing), 12 - Math.abs(i - facing));
            if (away > 2) return null;
            return (
              <div
                key={name}
                data-face
                onClick={() => Date.now() - lastDrag.current > 250 && goToMonth(i + 1)}
                className={`absolute top-[-5.5rem] ${away === 2 ? 'hidden lg:flex' : 'flex'} h-[11rem] w-[var(--face-w)] flex-col justify-between p-4 transition-[background-color,color,opacity] duration-300 [backface-visibility:hidden] md:top-[-8rem] md:h-[16rem] md:p-6 ${
                  on ? 'bg-bg text-ink shadow-lift' : 'bg-delta-deep text-bg'
                }`}
                style={{
                  left: 'calc(var(--face-w) / -2)',
                  opacity: 1 - away * 0.11,
                  transform: `rotateY(${i * STEP}deg) translateZ(calc(var(--face-w) * 1.866))`,
                }}
              >
                <span className="font-display text-h2 font-semibold">
                  {name.slice(0, 3)}
                </span>
                <span className="text-small font-medium">
                  {count === 0 ? 'No federal dates' : count === 1 ? '1 federal date' : `${count} federal dates`}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      <RiseGroup className="mx-auto max-w-[90rem]">
        <Rise className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-12">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => turnTo(turns - 1)}
              aria-label="Previous month"
              className="flex h-12 w-12 items-center justify-center bg-bg text-delta transition hover:brightness-95 active:translate-y-px"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11 3L5 9l6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => turnTo(turns + 1)}
              aria-label="Next month"
              className="flex h-12 w-12 items-center justify-center bg-bg text-delta transition hover:brightness-95 active:translate-y-px"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 3l6 6-6 6" />
              </svg>
            </button>
          </div>
          <div
            role="radiogroup"
            aria-label="Month"
            className="grid w-full grid-cols-6 gap-1 md:flex md:w-auto"
          >
            {monthNames.map((name, i) => {
              const selected = i + 1 === month;
              return (
                <button
                  key={name}
                  ref={(el) => {
                    monthRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={name}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goToMonth(i + 1)}
                  onKeyDown={(e) => onMonthKey(e, i)}
                  className={`min-h-12 min-w-12 px-2 font-medium transition-colors duration-200 ${
                    selected ? 'bg-bg text-delta' : 'text-bg hover:bg-bg/15'
                  }`}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </Rise>

        <Rise className="mt-12 md:mt-16">
          <div aria-live="polite" className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h3 className="text-h2">
                {monthNames[month - 1]} {year}
              </h3>
              <p className="mt-5 max-w-[40ch] text-statement">{monthNotes[audience][month - 1]}</p>
            </div>
            <div className="min-w-0 lg:col-span-7">
              {deadlines.length === 0 ? (
                <p className="bg-bg/10 p-6 md:p-8">
                  No federal deadlines for a {who} in {monthNames[month - 1]}. A good month to get ahead of the next one.
                </p>
              ) : (
                <ol className="grid gap-4">
                  {deadlines.map((d) => (
                    <li key={d.id} className="grid gap-4 bg-bg p-6 text-ink md:grid-cols-[9rem_1fr] md:gap-8 md:p-8">
                      <div>
                        <time dateTime={iso(d.date)} className="block font-display text-h3 font-semibold">
                          {monthName(d.date.m)} {d.date.d}
                        </time>
                        <p className="mt-1 text-small">
                          {d.weekday}, {daysAwayText(d.daysAway)}
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-h3 font-semibold">{d.label}</p>
                        <p className="mt-3 max-w-[56ch]">{d.handles}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              <button
                type="button"
                onClick={download}
                className="mt-6 inline-flex items-center gap-3 py-3 text-left font-medium underline decoration-bg/60 decoration-2 underline-offset-8 hover:decoration-bg"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2.5" y="4" width="15" height="13.5" />
                  <path d="M2.5 8h15M6.5 2v4M13.5 2v4" />
                </svg>
                Add the next twelve months to your calendar
              </button>
            </div>
          </div>
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
