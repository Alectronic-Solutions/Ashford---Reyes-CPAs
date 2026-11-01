const diagonal = 'M0 112 L58 8 V43.9 L20 112Z';
const bowl =
  'M74 8H96C116 8 124 22 124 37C124 52 116 66 96 66H74ZM74 24H94C102 24 106 30 106 37C106 44 102 50 94 50H74Z';
const leg = 'M88 64H108L132 112H112Z';

const palettes = {
  // On the cream page.
  dark: {
    litFacet: '#5C9A8A',
    shadedFacet: '#2E5B52',
    stemLit: '#2E5B52',
    stemShaded: '#22463F',
    bar: '#1B3A34',
    bowl: '#7A1F34',
    leg: '#5E1727',
    shadow: '#15201B',
    shadowOpacity: 0.28,
  },
  // On the ink footer, where the greens step up so the A stays readable.
  light: {
    litFacet: '#A9D0C5',
    shadedFacet: '#6FA899',
    stemLit: '#6FA899',
    stemShaded: '#4F8A7C',
    bar: '#2E5B52',
    bowl: '#B0364F',
    leg: '#8A2A3E',
    shadow: '#000000',
    shadowOpacity: 0.4,
  },
};

/** The A and R monogram: the A's right leg is the R's stem, so the R grows out of the A. */
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  const c = palettes[light ? 'light' : 'dark'];
  return (
    <svg viewBox="0 0 140 124" aria-hidden="true" focusable="false" className={className}>
      <g fill={c.shadow} opacity={c.shadowOpacity} transform="translate(4 5)">
        <path d={diagonal} />
        <rect x="58" y="8" width="16" height="104" />
        <path fillRule="evenodd" d={bowl} />
        <path d={leg} />
      </g>
      <path d="M0 112 L58 8 V26 L10 112Z" fill={c.litFacet} />
      <path d="M10 112 L58 26 V43.9 L20 112Z" fill={c.shadedFacet} />
      <rect x="58" y="8" width="8" height="104" fill={c.stemLit} />
      <rect x="66" y="8" width="8" height="104" fill={c.stemShaded} />
      <path d="M13.4 88 L19 78 H58 V88Z" fill={c.bar} />
      <path fillRule="evenodd" d={bowl} fill={c.bowl} />
      <path d="M74 8H96C104 8 110 10 114 14H74Z" fill="#fff" opacity="0.22" />
      <path d={leg} fill={c.leg} />
    </svg>
  );
}

/** The mark beside the firm name. The name is the link's accessible text; the mark is decoration. */
export function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'md' | 'lg' }) {
  const mark = size === 'lg' ? 'h-14 w-16' : 'h-10 w-11 md:h-11 md:w-12';
  const name = size === 'lg' ? 'text-h3' : 'text-statement';
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark light={light} className={`${mark} shrink-0`} />
      <span className="flex flex-col">
        <span className={`font-display ${name} font-semibold leading-tight tracking-tight`}>Ashford and Reyes</span>
        <span className="text-[0.6875rem] font-medium uppercase leading-none tracking-[0.28em] opacity-80">CPAs</span>
      </span>
    </span>
  );
}
