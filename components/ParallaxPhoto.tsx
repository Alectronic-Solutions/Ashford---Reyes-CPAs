'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** A photo that drifts slowly against the scroll. Still on phones and for reduced motion. */
export function ParallaxPhoto({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const drifting = isDesktop === true && reduced === false;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      {/* Taller than its frame, so the drift never uncovers an edge. */}
      <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={drifting ? { y } : undefined}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
