'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contactInfo } from '@/lib/site';
import { buttonClass, buttonCompactClass } from './Button';
import { Logo } from './Logo';
import { navGroups, navLinks, utilityLinks, type NavGroup } from './navLinks';

const ease = [0.22, 1, 0.36, 1] as const;

const topLink =
  '-my-3 py-3 font-medium underline-offset-8 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2';

/** A thin strip above the header with the details existing clients come looking for. Desktop only. */
function UtilityBar() {
  return (
    <aside aria-label="Firm details" className="mx-5 hidden rounded-b-2xl bg-ink text-small text-bg xl:block">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-8 py-1.5">
        <p>
          Serving {contactInfo.area}. {contactInfo.hours}
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a href={contactInfo.phoneHref} className="inline-block py-1.5 font-medium hover:underline">
              {contactInfo.phone}
            </a>
          </li>
          {utilityLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-1.5 hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MenuPanel({ group, id }: { group: NavGroup; id: string }) {
  const box = useRef<HTMLDivElement>(null);
  // Opening the panel moves focus into it, so the keyboard lands on its first link.
  useEffect(() => {
    box.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.nav
      ref={box}
      id={id}
      aria-label={`${group.label} menu`}
      className="absolute inset-x-0 top-full rounded-b-3xl bg-bg shadow-lift"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease }}
    >
      <div className="mx-auto grid max-w-page grid-cols-12 gap-8 px-8 pb-12 pt-10">
        <div className="col-span-4">
          <p className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.02em]">{group.label}</p>
          <Link
            href={group.href}
            className="mt-6 inline-block py-2 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
          >
            {group.all}
          </Link>
        </div>
        <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-2">
          {group.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group block py-3">
                <span className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] group-hover:text-accent">
                  {l.label}
                </span>
                <span className="mt-1 block text-small">{l.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelButtons = useRef<Record<string, HTMLButtonElement | null>>({});

  // A new page, or a jump to a section, should never leave a menu covering it.
  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    // Tabbing out of the header would otherwise leave the menu open over the page the focus moved into.
    const onFocus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
      document.body.style.overflow = '';
    };
  }, [open]);

  // On desktop the bar tightens once the page moves, to give the content more room.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A desktop panel closes on Escape, on a click anywhere else, or when focus leaves the header.
  useEffect(() => {
    if (!panel) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setPanel(null);
      panelButtons.current[panel]?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    const onFocus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
    };
  }, [panel]);

  const current = (href: string) => (href === pathname ? 'page' : undefined);
  const activeGroup = navGroups.find((g) => g.label === panel);

  return (
    <>
      <UtilityBar />
      <header ref={headerRef} className="sticky top-0 z-40 rounded-b-3xl bg-bg shadow-rest">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3.5 transition-[padding] duration-300 md:gap-6 md:px-8 md:py-4 ${scrolled ? 'xl:py-2.5' : 'xl:py-5'}`}
        >
          <Link href="/" aria-label="Ashford and Reyes CPAs, home" className="-my-2.5 whitespace-nowrap py-2.5">
            <Logo />
          </Link>
          <div className="flex shrink-0 items-center gap-3 xl:gap-6 2xl:gap-8">
            {navGroups.map((g) => {
              const id = `menu-${g.href.slice(1)}`;
              const expanded = panel === g.label;
              const inside = pathname.startsWith(g.href);
              return (
                <button
                  key={g.label}
                  ref={(el) => {
                    panelButtons.current[g.label] = el;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={id}
                  onClick={() => setPanel(expanded ? null : g.label)}
                  className={`-my-3 hidden items-center gap-1.5 py-3 font-medium underline-offset-8 hover:underline xl:inline-flex ${inside ? 'underline decoration-accent decoration-2' : ''}`}
                >
                  {g.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 4.5l4 4 4-4" />
                  </svg>
                </button>
              );
            })}
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current(l.href)}
                className={`${topLink} hidden xl:inline-block`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className={`${buttonCompactClass} hidden sm:inline-flex`}>
              Book a consultation
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex h-12 w-12 items-center justify-center xl:hidden"
            >
              <span aria-hidden="true" className="relative block h-3.5 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-transform duration-200 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-transform duration-200 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {activeGroup && (
            <MenuPanel key={activeGroup.label} group={activeGroup} id={`menu-${activeGroup.href.slice(1)}`} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Site menu"
              className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto rounded-b-3xl bg-bg px-5 pb-10 pt-6 md:px-8 xl:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-x-8">
                {navGroups.map((g) => (
                  <div key={g.label}>
                    <Link
                      href={g.href}
                      aria-current={current(g.href)}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-medium text-accent"
                    >
                      {g.label}
                    </Link>
                    <ul className="grid">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={current(l.href)}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] aria-[current=page]:text-accent"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <ul className="mt-10 grid">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={current(l.href)}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] aria-[current=page]:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-x-6 rounded-xl bg-surface px-4 py-2">
                <li>
                  <a href={contactInfo.phoneHref} className="inline-block py-3 font-medium underline underline-offset-4">
                    {contactInfo.phone}
                  </a>
                </li>
                {utilityLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="inline-block py-3 underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" onClick={() => setOpen(false)} className={`${buttonClass} mt-6`}>
                Book a consultation
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
