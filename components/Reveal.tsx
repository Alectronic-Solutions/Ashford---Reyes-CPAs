'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** A headline rising out of a slot: the line is masked below its baseline and slides up into view. */
const maskRise: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', y: 40 },
  show: {
    clipPath: 'inset(-25% -5% -35% -5%)',
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    transitionEnd: { clipPath: 'none' },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const riseRow: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const riseChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** A list row that rises, then brings its own parts in one after another. */
export function RiseRow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.li className={className} variants={riseRow} data-reveal>
      {children}
    </motion.li>
  );
}

export function RisePart({
  as = 'p',
  className,
  children,
}: {
  as?: 'h3' | 'p' | 'div';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === 'h3' ? motion.h3 : as === 'div' ? motion.div : motion.p;
  return (
    <Tag className={className} variants={riseChild} data-reveal>
      {children}
    </Tag>
  );
}

/** A group whose Rise children enter one after another as the group scrolls into view. */
export function RiseGroup({
  as = 'div',
  className,
  children,
}: {
  as?: 'div' | 'ul' | 'ol';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === 'ul' ? motion.ul : as === 'ol' ? motion.ol : motion.div;
  return (
    <Tag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      // Fires as the group's top edge enters, so a tall group or a quick jump never leaves it blank.
      viewport={{ once: true, amount: 0, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </Tag>
  );
}

export function Rise({
  as = 'div',
  className,
  mask = false,
  children,
}: {
  as?: 'div' | 'li';
  className?: string;
  /** For section headlines: rise out of a masked slot instead of fading up. */
  mask?: boolean;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag className={className} variants={mask && !reduced ? maskRise : rise} data-reveal>
      {children}
    </Tag>
  );
}
