'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contactInfo } from '@/lib/site';

/**
 * Phones only: a slim bar with Call and Book that slides up once the visitor is past the first screen,
 * and steps aside whenever the booking form or the footer is in view, so it never covers either.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [bookHref, setBookHref] = useState('/contact');

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const form = document.getElementById('contact');
    setBookHref(form ? '#contact' : '/contact');
    const targets = [form, document.querySelector('footer')].filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const show = past && !blocked;
  const bar = useRef<HTMLElement>(null);

  // While the bar is up, tell the page how tall it really is, so scroll-padding keeps focused elements clear of it.
  useEffect(() => {
    const root = document.documentElement;
    const el = bar.current;
    if (!show || !el) {
      root.style.removeProperty('--action-bar-h');
      return;
    }
    const measure = () => root.style.setProperty('--action-bar-h', `${el.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--action-bar-h');
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          ref={bar}
          aria-label="Quick contact"
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 rounded-t-3xl bg-ink p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={contactInfo.phoneHref}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-bg/10 shadow-key font-medium text-bg active:translate-y-px"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4.5 1.5h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A13.5 13.5 0 0 1 3 3a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
            Call us
          </a>
          <Link
            href={bookHref}
            className="flex min-h-12 items-center justify-center rounded-xl bg-accent shadow-key font-medium text-bg active:translate-y-px"
          >
            Book a consultation
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
