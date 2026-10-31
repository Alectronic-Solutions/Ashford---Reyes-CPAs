'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buttonClass, buttonCompactClass } from './Button';
import { navLinks } from './navLinks';


const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // A new page, or a jump to a section, should never leave the menu covering it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const current = (href: string) => (href === pathname ? 'page' : undefined);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3.5 md:gap-6 md:px-8 md:py-4"
      >
        <Link
          href="/"
          className="-my-2.5 whitespace-nowrap py-2.5 font-display text-statement font-semibold leading-tight tracking-tight"
        >
          Ashford and Reyes <span className="hidden min-[400px]:inline">CPAs</span>
        </Link>
        <div className="flex shrink-0 items-center gap-3 lg:gap-4 xl:gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current(l.href)}
              className="-my-3 hidden py-3 font-medium underline-offset-8 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 lg:inline-block"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className={`${buttonCompactClass} hidden sm:inline-flex`}>
            Talk to us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-200 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-200 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-bg px-5 pb-10 pt-6 md:px-8 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease }}
          >
            <ul className="grid">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={current(l.href)}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.01em] aria-[current=page]:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#contact" onClick={() => setOpen(false)} className={`${buttonClass} mt-8`}>
              Talk to us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
