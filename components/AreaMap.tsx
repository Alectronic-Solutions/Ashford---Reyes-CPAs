import { contactInfo } from '@/lib/site';

/*
  A drawn plan of the area the firm serves, roughly to scale (about 15px to a mile across and 12px
  down), in the site's own colours. It shows towns, the river and the highways, and no office: the
  firm meets clients across the county. Drawn rather than embedded, so the page loads nothing from a
  map service and tracks no one.
*/
const towns: { name: string; x: number; y: number; lx: number; ly: number; anchor?: 'start' | 'middle' | 'end' }[] = [
  { name: 'Galt', x: 155, y: 36, lx: 165, ly: 40 },
  { name: 'Acampo', x: 192, y: 112, lx: 202, ly: 116 },
  { name: 'Woodbridge', x: 162, y: 158, lx: 154, ly: 144, anchor: 'end' },
  { name: 'Victor', x: 262, y: 186, lx: 272, ly: 202 },
  { name: 'Lockeford', x: 322, y: 154, lx: 322, ly: 134, anchor: 'middle' },
  { name: 'Clements', x: 412, y: 140, lx: 412, ly: 120, anchor: 'middle' },
  { name: 'Stockton', x: 182, y: 324, lx: 168, ly: 328, anchor: 'end' },
];

export function AreaMap({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const ground = tone === 'light' ? '#E3E8DF' : '#22463F';
  const region = tone === 'light' ? '#F3F5F0' : '#2E5B52';
  const ink = tone === 'light' ? '#15201B' : '#F3F5F0';
  const water = '#2E5B52';

  return (
    <figure>
      <svg viewBox="0 0 480 360" role="img" aria-labelledby="area-title area-desc" className="block h-auto w-full">
        <title id="area-title">The area we serve</title>
        <desc id="area-desc">
          A map of the Lodi area: Lodi in the middle, Galt and Acampo to the north, Woodbridge to the northwest,
          Victor, Lockeford and Clements to the east, and Stockton to the south, with the Mokelumne River, Interstate
          5 and Highway 99.
        </desc>
        <rect width="480" height="360" fill={ground} />
        {/* The Lodi wine region, as a lighter field around the towns. */}
        <path d="M96 70 L250 44 L438 76 L452 176 L330 236 L196 246 L84 206 L74 126 Z" fill={region} />
        {/* The Mokelumne River, flowing west toward the delta. */}
        <path
          d="M480 118 C432 130 380 140 324 146 S246 166 204 162 S142 150 92 160 S24 170 0 174"
          fill="none"
          stroke={water}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Highways: Interstate 5 to the west, Highway 99 through Lodi, Highway 12 across. */}
        <g fill="none" stroke={ink} strokeOpacity="0.4" strokeLinecap="round">
          <path d="M95 0 L95 360" strokeWidth="4" />
          <path d="M150 0 L188 110 L214 182 L206 260 L196 360" strokeWidth="4" />
          <path d="M95 184 L214 182 L322 168 L480 150" strokeWidth="2.5" />
        </g>
        <g fill={ink} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="600" className="text-[11px] max-md:text-[14px]">
          <text x="101" y="350">I-5</text>
          <text x="210" y="300">99</text>
          <text x="440" y="164">12</text>
        </g>
        <text
          x="10"
          y="198"
          fill={water}
          fontFamily="var(--font-figtree), system-ui, sans-serif"
          fontWeight="600"
          className="text-[10px] max-md:text-[12px]"
        >
          Mokelumne River
        </text>
        {/* Towns. Lodi is the accent dot in the middle. */}
        {/* Labels are set larger on phones, where the whole map is drawn at about two-thirds size. */}
        <g fill={ink} fontFamily="var(--font-figtree), system-ui, sans-serif" fontWeight="500" className="text-[13px] max-md:text-[17px]">
          {towns.map((t) => (
            <g key={t.name}>
              <circle cx={t.x} cy={t.y} r="4.5" />
              <text x={t.lx} y={t.ly} textAnchor={t.anchor ?? 'start'}>
                {t.name}
              </text>
            </g>
          ))}
        </g>
        <circle cx="212" cy="182" r="11" fill="#7A1F34" />
        <text
          x="200"
          y="214"
          textAnchor="end"
          fill={ink}
          fontFamily="var(--font-fraunces), Georgia, serif"
          fontWeight="600"
          className="text-[20px] max-md:text-[26px]"
        >
          Lodi
        </text>
      </svg>
      <figcaption className="mt-3 max-w-[52ch] text-small">
        We serve {contactInfo.area}.
      </figcaption>
    </figure>
  );
}
