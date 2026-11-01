const base =
  'inline-flex items-center justify-center bg-accent font-medium text-bg transition duration-200 hover:brightness-125 active:translate-y-px';

export const buttonClass = `${base} px-7 py-4`;

/** The quieter second choice, outlined in whatever color the text around it is. */
export const buttonOutlineClass =
  'inline-flex items-center justify-center border border-current px-7 py-4 font-medium transition duration-200 hover:bg-bg hover:text-ink active:translate-y-px';

/** Header size: tighter on phones so the wordmark and the button share one row. */
export const buttonCompactClass = `${base} px-4 py-3 md:px-7`;

/** An underlined link to a fuller page, for the trimmed sections on the home page. */
export const textLink =
  'inline-block py-3 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink';
