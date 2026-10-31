'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { buttonClass } from './Button';

// `end` is the clip's last frame, so reduced-motion visitors see what everyone else is left with.
const DESKTOP = {
  video: '/video/hero.mp4',
  poster: '/photos/hero-poster.jpg',
  end: '/photos/hero-end.jpg',
};
const MOBILE = {
  video: '/video/hero-mobile.mp4',
  poster: '/photos/hero-poster-mobile.jpg',
  end: '/photos/hero-end-mobile.jpg',
};

type Status = 'playing' | 'paused' | 'ended';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('paused');

  // Nothing is requested until both queries have answered, so a phone never fetches the desktop clip.
  const source = isDesktop === undefined ? null : isDesktop ? DESKTOP : MOBILE;
  const showVideo = source !== null && reduced === false;

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
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[65svh] items-end overflow-hidden bg-ink px-5 pb-10 pt-24 md:min-h-[85svh] md:px-8 md:pb-14"
    >
      <div className="absolute inset-0 -z-20">
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
      </div>
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="max-w-[46rem] text-bg">
        <motion.h1
          id="hero-title"
          className="text-h2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Steady books <br className="hidden md:block" />
          through every season.
        </motion.h1>
        <motion.p
          className="mt-8 max-w-[36ch] md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          Tax, bookkeeping and advisory for Lodi farms, wineries, small businesses and families, all
          year and not just in April.
        </motion.p>
        <motion.div
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          <a href="#contact" className={buttonClass}>
            Talk to us
          </a>
        </motion.div>
      </div>

      {showVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          className={`absolute bottom-10 right-5 flex h-12 min-w-12 items-center justify-center gap-2 bg-ink text-bg transition duration-200 hover:brightness-150 md:bottom-14 md:right-8 ${status === 'ended' ? 'px-4' : ''}`}
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
