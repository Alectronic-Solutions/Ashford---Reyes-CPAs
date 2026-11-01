'use client';

import Image from 'next/image';
import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * True only on a desktop-sized screen with a mouse and no reduced-motion preference.
 * Every 3D move on the site asks this first, so phones and reduced motion get a flat, still page.
 */
export function useDepth() {
  const desktop = useMediaQuery('(min-width: 768px)');
  const mouse = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return { scroll: desktop === true && reduced === false, pointer: desktop === true && mouse === true && reduced === false };
}

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/** Leans toward the cursor and lifts off the page while it is hovered. */
export function Tilt({
  children,
  className,
  max = 8,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** The largest lean in degrees. */
  max?: number;
  as?: 'div' | 'li';
}) {
  const { pointer } = useDepth();
  const [lifted, setLifted] = useState(false);
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const z = useSpring(useMotionValue(0), spring);

  function onMove(event: PointerEvent<HTMLElement>) {
    if (!pointer) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    ry.set(x * max * 2);
    rx.set(-y * max * 2);
  }

  function onEnter() {
    if (!pointer) return;
    setLifted(true);
    z.set(30);
  }

  function onLeave() {
    setLifted(false);
    rx.set(0);
    ry.set(0);
    z.set(0);
  }

  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag
      className={`[perspective:1100px] ${className ?? ''}`}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <motion.div
        className={`h-full rounded-2xl transition-shadow duration-300 [transform-style:preserve-3d] ${lifted ? 'shadow-lift' : ''}`}
        style={pointer ? { rotateX: rx, rotateY: ry, z } : undefined}
      >
        {children}
      </motion.div>
    </Tag>
  );
}

/** A photograph that starts tipped back like a field seen from the road and stands up as it scrolls in. */
export function DepthPhoto({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scroll } = useDepth();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const reduced = useReducedMotion();
  // Watched on the wrapper, not the picture: a picture clipped to nothing never counts as in view.
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const open = reduced || priority || inView;

  return (
    <div ref={ref} className={`[perspective:1400px] ${className ?? ''}`}>
      <motion.div
        className="relative h-full w-full origin-bottom overflow-hidden rounded-2xl shadow-rest"
        style={scroll ? { rotateX, scale } : undefined}
        // The picture also wipes open from the bottom the first time it scrolls in, on every screen size.
        initial={reduced || priority ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        data-reveal
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName ?? ''}`} />
      </motion.div>
    </div>
  );
}

/** Counts up to a figure once it scrolls into view. The real figure is in the markup from the start. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const [shown, setShown] = useState<string | null>(null);
  const { scroll } = useDepth();

  // A year reads oddly when it counts, so four-digit figures without a comma stay still.
  const counts = scroll && Number.isFinite(target) && !(match && /^\d{4}$/.test(match[2]));

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <motion.span
        aria-hidden="true"
        onViewportEnter={() => {
          if (!counts || !match) return;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / 1400);
            const eased = 1 - Math.pow(1 - t, 3);
            setShown(`${match[1]}${Math.round(target * eased).toLocaleString('en-US')}${match[3]}`);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }}
        viewport={{ once: true, amount: 0.6 }}
      >
        {shown ?? value}
      </motion.span>
    </span>
  );
}
