'use client';

import { motion, type Variants } from 'framer-motion';

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
  as?: 'h3' | 'p';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === 'h3' ? motion.h3 : motion.p;
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
  as?: 'div' | 'ul';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === 'ul' ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Tag>
  );
}

export function Rise({
  as = 'div',
  className,
  children,
}: {
  as?: 'div' | 'li';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag className={className} variants={rise} data-reveal>
      {children}
    </Tag>
  );
}
