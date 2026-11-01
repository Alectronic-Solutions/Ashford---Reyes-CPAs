const base =
  'inline-flex items-center justify-center bg-accent font-medium text-bg rounded-xl shadow-key transition duration-200 hover:-translate-y-0.5 hover:brightness-125 active:translate-y-px active:shadow-none';

export const buttonClass = `${base} px-7 py-4`;

/** The quieter second choice, outlined in whatever color the text around it is. */
export const buttonOutlineClass =
  'inline-flex items-center justify-center rounded-xl border border-current px-7 py-4 font-medium shadow-rest transition duration-200 hover:-translate-y-0.5 hover:bg-bg hover:text-ink active:translate-y-px';

/** Header size: tighter on phones so the wordmark and the button share one row. */
export const buttonCompactClass = `${base} px-4 py-3 md:px-7`;

/** An underlined link to a fuller page, for the trimmed sections on the home page. */
export const textLink =
  'inline-block py-3 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink';
