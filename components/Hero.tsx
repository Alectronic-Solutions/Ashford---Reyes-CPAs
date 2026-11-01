'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { buttonClass, buttonOutlineClass } from './Button';
import { useDepth } from './Depth';
import { daysAwayText, localToday, monthName, nextDeadlines, type Ymd } from './yearAheadRules';

// `end` is the clip's last frame, so reduced-motion visitors see what everyone else is left with.
const DESKTOP = {
  video: '/video/vineyard.mp4',
  poster: '/photos/vineyard-poster.jpg',
  end: '/photos/vineyard-end.jpg',
};
const MOBILE = {
  video: '/video/vineyard-mobile.mp4',
  poster: '/photos/vineyard-poster-mobile.jpg',
  end: '/photos/vineyard-end-mobile.jpg',
};

type Status = 'playing' | 'paused' | 'ended';

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { stiffness: 90, damping: 20, mass: 0.8 };

/** The soonest federal date for a business client, counted from the visitor's own day. */
function NextDate({ buildToday }: { buildToday: Ymd }) {
  const [today, setToday] = useState(buildToday);
  useEffect(() => setToday(localToday()), []);
  const [next] = nextDeadlines('business', today, 1);
  if (!next) return null;
  return (
    <div className="bg-bg p-6 text-ink shadow-lift md:p-7">
      <p className="font-display text-h2 font-semibold">
        {monthName(next.date.m)} {next.date.d}
      </p>
      <p className="mt-3 max-w-[28ch]">
        is the next federal date. {next.label}, {daysAwayText(next.daysAway)}.
      </p>
      <Link
        href="/#year-ahead"
        className="mt-4 inline-block py-2 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
      >
        See your whole year
      </Link>
    </div>
  );
}

export function Hero({ buildToday }: { buildToday: Ymd }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const depth = useDepth();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('paused');

  // Nothing is requested until both queries have answered, so a phone never fetches the desktop clip.
  const source = isDesktop === undefined ? null : isDesktop ? DESKTOP : MOBILE;
  const showVideo = source !== null && reduced === false;

  // Depth: the vineyard sinks and swells as the page scrolls away, and drifts against the cursor.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const px = useSpring(useMotionValue(0), spring);
  const py = useSpring(useMotionValue(0), spring);
  const mediaX = useTransform(px, (v) => v * -18);
  const mediaPY = useTransform(py, (v) => v * -12);
  const cardX = useTransform(px, (v) => v * 14);
  const cardY = useTransform(py, (v) => v * 10);
  const cardRotY = useTransform(px, (v) => v * 8);
  const cardRotX = useTransform(py, (v) => v * -8);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!depth.pointer) return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.muted = true;
    el.play().catch(() => setStatus('paused'));
  }, [showVideo, source?.video]);

  const toggle = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (status === 'ended') {
      el.currentTime = 0;
      void el.play();
    } else if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, [status]);

  const label =
    status === 'playing'
      ? 'Pause background video'
      : status === 'ended'
        ? 'Replay background video'
        : 'Play background video';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-ink px-5 pb-10 pt-28 md:min-h-[calc(100svh-var(--header-h))] md:px-8 md:pb-16"
    >
      <motion.div
        className="hero-grade absolute -inset-[4%] -z-20"
        style={depth.scroll ? { scale: mediaScale, y: mediaY } : undefined}
      >
        <motion.div className="absolute inset-0" style={depth.pointer ? { x: mediaX, y: mediaPY } : undefined}>
          <Image
            src={reduced ? DESKTOP.end : DESKTOP.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          <Image
            src={reduced ? MOBILE.end : MOBILE.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />
          {showVideo && source && (
            <video
              key={source.video}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={source.video}
              poster={source.poster}
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onPlay={() => setStatus('playing')}
              onPause={() => setStatus('paused')}
              onEnded={() => setStatus('ended')}
            />
          )}
        </motion.div>
      </motion.div>
      <div className="hero-tint absolute inset-0 -z-[15]" aria-hidden="true" />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[90rem] gap-10 md:grid-cols-12 md:items-end md:gap-8">
        <motion.div
          className="text-bg md:col-span-8"
          style={depth.scroll ? { y: textY, opacity: textOpacity } : undefined}
        >
          <motion.h1
            id="hero-title"
            className="max-w-[12ch] text-display"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            Steady books, every season.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[40ch] text-statement md:mt-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
          >
            Tax, books and advice for Lodi farms, wineries, businesses and families, all year long.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.22 }}
          >
            <a href="#contact" className={buttonClass}>
              Book a consultation
            </a>
            <Link href="/services" className={buttonOutlineClass}>
              See our services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden [perspective:1000px] md:col-span-4 md:col-start-9 md:block lg:col-span-3 lg:col-start-10"
          initial={{ opacity: 0, y: 40, rotateX: -18 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
        >
          <motion.div style={depth.pointer ? { x: cardX, y: cardY, rotateX: cardRotX, rotateY: cardRotY } : undefined}>
            <NextDate buildToday={buildToday} />
          </motion.div>
        </motion.div>
      </div>

      {showVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          className={`absolute right-5 top-5 flex h-12 min-w-12 items-center justify-center gap-2 bg-ink/80 text-bg transition duration-200 hover:bg-ink md:right-8 md:top-8 ${status === 'ended' ? 'px-4' : ''}`}
        >
          {status === 'playing' ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
              <rect x="3" y="2" width="4" height="14" />
              <rect x="11" y="2" width="4" height="14" />
            </svg>
          ) : status === 'ended' ? (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 10a6 6 0 1 1-2-4.5" />
                <path d="M16 2.5v4h-4" />
              </svg>
              <span className="text-small font-medium">Replay</span>
            </>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
              <path d="M4 2l12 7-12 7z" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
