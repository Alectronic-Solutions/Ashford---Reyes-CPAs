const base =
  'inline-flex items-center justify-center bg-accent font-medium text-bg transition duration-200 hover:brightness-125 active:translate-y-px';

export const buttonClass = `${base} px-7 py-4`;

/** Header size: tighter on phones so the wordmark and the button share one row. */
export const buttonCompactClass = `${base} px-4 py-3 md:px-7`;
