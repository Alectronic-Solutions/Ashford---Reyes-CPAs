import { useId } from 'react';

/*
  The five-star rating row, drawn the way review sites draw it: a softly rounded star in warm gold
  with a light top edge, and a pale grey star behind any part that is not filled. A value such as 4.9
  fills four stars and most of the fifth. One component, so every star on the site matches.
*/
const star = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

export function Stars({
  value = 5,
  size = 20,
  tone = 'dark',
  className,
}: {
  value?: number;
  size?: number;
  /** Which ground the stars sit on, so the empty part stays visible. */
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const id = useId();
  const empty = tone === 'dark' ? 'rgba(255,255,255,0.28)' : '#D5D8D2';

  return (
    <span className={`inline-flex gap-0.5 ${className ?? ''}`} aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD24A" />
            <stop offset="0.55" stopColor="#FBBC04" />
            <stop offset="1" stopColor="#E8A000" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            <clipPath id={`${id}-clip-${i}`}>
              <rect x="0" y="0" width={24 * fill} height="24" />
            </clipPath>
            <path d={star} fill={empty} stroke={empty} strokeWidth="1.6" strokeLinejoin="round" />
            {fill > 0 && (
              <g clipPath={`url(#${id}-clip-${i})`}>
                <path
                  d={star}
                  fill={`url(#${id}-gold)`}
                  stroke={`url(#${id}-gold)`}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M12 3.6l2 4.7" fill="none" stroke="#FFF3C4" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
              </g>
            )}
          </svg>
        );
      })}
    </span>
  );
}
