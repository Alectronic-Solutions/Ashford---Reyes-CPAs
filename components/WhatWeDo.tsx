'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Rise, RiseGroup } from './Reveal';
import { useDepth } from './Depth';
import { services } from '@/lib/services';

const ease = [0.22, 1, 0.36, 1] as const;

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const { scroll } = useDepth();
  const current = services[active];

  return (
    <section id="what-we-do" aria-labelledby="what-title" className="mx-auto max-w-page scroll-mt-24 px-5 py-24 md:px-8 md:py-40">
      <RiseGroup>
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-5" mask>
            <h2 id="what-title" className="text-h2">
              What we do
            </h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="max-w-[36ch] text-statement">
              Lodi runs on harvest, crush and quarter end. Our work follows the same calendar.
            </p>
          </Rise>
        </div>
      </RiseGroup>

      <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-8">
        {/* The picture for whichever service is in hand turns into place like a page. Desktop only. */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-28 aspect-[4/5] [perspective:1400px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.slug}
                className="absolute inset-0 origin-left overflow-hidden rounded-3xl bg-surface shadow-lift"
                initial={scroll ? { rotateY: -70, opacity: 0, x: -40 } : { opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={scroll ? { rotateY: 40, opacity: 0, x: 40 } : { opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Image
                  src={current.photo.src}
                  alt={current.photo.alt}
                  fill
                  sizes="(min-width: 1504px) 600px, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <RiseGroup as="ul" className="grid gap-4 md:col-span-7 md:gap-2">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <Rise
                as="li"
                key={s.slug}
                className={`group relative transition-colors duration-300 rounded-2xl md:px-8 md:py-10 ${on ? 'md:bg-surface md:shadow-rest' : ''}`}
              >
                <motion.div
                  onPointerEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                  onViewportEnter={() => setActive(i)}
                  viewport={{ amount: 0.5, margin: '-30% 0px -30% 0px' }}
                  className="grid gap-4"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-rest md:hidden">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="100vw" className="object-cover" />
                  </div>
                  <span
                    aria-hidden="true"
                    className={`absolute left-3 top-6 hidden h-[calc(100%-3rem)] w-1.5 origin-top rounded-full bg-accent transition-transform duration-300 md:block ${on ? 'scale-y-100' : 'scale-y-0'}`}
                  />
                  <h3 className="text-h2">{s.name}</h3>
                  <p className="max-w-[56ch]">{s.summary}</p>
                  <Link prefetch={false}
                    href={`/services/${s.slug}`}
                    className="inline-block self-start py-2 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
                  >
                    More on {s.name.toLowerCase()}
                    <span className="sr-only"> services</span>
                  </Link>
                </motion.div>
              </Rise>
            );
          })}
        </RiseGroup>
      </div>
    </section>
  );
}
