import { contactInfo } from '@/lib/site';
import { Tilt } from './Depth';

/*
  A drawn road map of the area the firm serves, laid out from real positions at about 28px to a
  mile. It reads like a plain road map: pale land, a few farmland areas, county roads, the
  Mokelumne River and Lodi Lake, towns as grey built-up areas, and Interstate 5 and Highways 99 and
  12 in amber. It shows no office: the firm meets clients across the county. Drawn rather than
  embedded, so the page loads nothing from a map service and tracks no one.
*/
const river = 'M600 226 C540 232 500 236 450 244 S400 256 360 260 S290 268 250 271 S198 270 170 266 S130 278 110 292 S70 318 40 336 S15 352 0 362';

const urban = {
  Lodi: 'M166 290 C180 284 200 283 224 284 C246 285 258 292 264 308 C268 326 262 344 248 352 C228 358 200 356 182 348 C168 340 160 322 160 308 C160 300 162 294 166 290 Z',
  Galt: 'M148 66 L180 64 L184 90 L152 94 Z',
  Acampo: 'M226 184 L246 184 L246 200 L226 200 Z',
  Woodbridge: 'M154 246 L178 244 L180 261 L156 263 Z',
  Victor: 'M351 270 L373 268 L374 288 L352 289 Z',
  Lockeford: 'M386 226 L409 224 L410 243 L387 244 Z',
  Clements: 'M486 184 L505 183 L506 201 L487 202 Z',
};

const places: { name: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' }[] = [
  { name: 'Galt', x: 196, y: 84 },
  { name: 'Acampo', x: 254, y: 196 },
  { name: 'Woodbridge', x: 167, y: 236, anchor: 'middle' },
  { name: 'Victor', x: 362, y: 310, anchor: 'middle' },
  { name: 'Lockeford', x: 398, y: 214, anchor: 'middle' },
  { name: 'Clements', x: 496, y: 174, anchor: 'middle' },
];

const highways = [
  'M96 0 C100 90 104 150 112 220 S124 340 142 440',
  'M168 0 C176 56 200 130 238 192 S226 262 214 306 S192 392 184 440',
  'M0 346 C60 322 110 320 150 312 L214 306 C270 302 310 300 362 282 S440 232 495 198 S560 186 600 184',
];

const font = 'var(--font-figtree), system-ui, sans-serif';
const halo = { paintOrder: 'stroke' as const, stroke: '#F4F5EE', strokeWidth: 3.5, strokeLinejoin: 'round' as const };

/** County roads on a two-mile grid, the way a road map shows farm country. */
const gridX = Array.from({ length: 11 }, (_, i) => 28 + i * 56);
const gridY = Array.from({ length: 8 }, (_, i) => 20 + i * 56);
const grid = [...gridX.map((x) => `M${x} 0V440`), ...gridY.map((y) => `M0 ${y}H600`)].join('');

function Shield({ x, y, label, interstate = false }: { x: number; y: number; label: string; interstate?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-11" y="-10" width="22" height="20" rx={interstate ? 8 : 3} fill={interstate ? '#2B5AA6' : '#FFFFFF'} stroke={interstate ? '#FFFFFF' : '#15201B'} strokeWidth="1.6" />
      {interstate && <path d="M-9.5 -5 Q0 -12 9.5 -5 L9.5 -6 Q0 -13 -9.5 -6 Z" fill="#C8302F" />}
      <text y="4.5" textAnchor="middle" fill={interstate ? '#FFFFFF' : '#15201B'} fontFamily={font} fontWeight="700" fontSize="12">
        {label}
      </text>
    </g>
  );
}

export function AreaMap() {
  const labelClass = 'text-[13px] max-md:text-[16px]';

  return (
    <figure>
      <Tilt max={3}>
        <div className="overflow-hidden border border-ink/40 bg-bg shadow-lift">
          <svg viewBox="0 0 600 440" role="img" aria-labelledby="area-title area-desc" className="block h-auto w-full">
            <title id="area-title">The area we serve</title>
            <desc id="area-desc">
              A map of the Lodi area: Lodi in the middle, Galt and Acampo to the north, Woodbridge to the northwest,
              Victor, Lockeford and Clements to the east, and Stockton twelve miles to the south, with the Mokelumne
              River, Interstate 5 and Highways 99 and 12.
            </desc>
            <defs>
              <pattern id="vines" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M0 2.5H5" stroke="#B7CC9C" strokeWidth="1.1" />
              </pattern>
              <pattern id="streets" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M0 0H6M0 0V6" stroke="#D2CCBB" strokeWidth="0.9" />
              </pattern>
              <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
                <stop offset="0.65" stopColor="#15201B" stopOpacity="0" />
                <stop offset="1" stopColor="#15201B" stopOpacity="0.12" />
              </radialGradient>
              <path id="river-label" d="M256 262 C290 260 330 254 370 248" />
            </defs>

            <rect width="600" height="440" fill="#F1F0E7" />

            {/* Farmland: the Lodi vineyards, and orchard country to the north. */}
            <path d="M120 236 C200 214 330 206 450 236 C510 252 540 300 500 352 C440 410 300 414 210 400 C140 388 100 330 120 236 Z" fill="#E2EAD2" />
            <path d="M120 236 C200 214 330 206 450 236 C510 252 540 300 500 352 C440 410 300 414 210 400 C140 388 100 330 120 236 Z" fill="url(#vines)" />
            <path d="M120 20 C220 8 340 24 380 70 C400 110 340 150 250 150 C170 150 110 110 120 20 Z" fill="#E6EDD8" />
            <path d="M440 70 C500 56 570 72 580 110 C586 150 520 160 470 148 C430 136 420 90 440 70 Z" fill="#E6EDD8" />

            {/* County roads. */}
            <path d={grid} stroke="#CFCCBC" strokeWidth="3.4" fill="none" />
            <path d={grid} stroke="#FFFFFF" strokeWidth="2" fill="none" />

            {/* The Mokelumne River with a side channel, and Lodi Lake. */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M78 312 C54 324 28 318 0 322" stroke="#9CC7D3" strokeWidth="4" />
              <path d={river} stroke="#9CC7D3" strokeWidth="6.5" />
            </g>
            <path
              d="M188 273 C192 266 204 264 216 266 C226 268 228 276 220 281 C210 285 194 284 188 273 Z"
              fill="#9CC7D3"
            />

            {/* Towns. */}
            {Object.entries(urban).map(([name, d]) => (
              <g key={name}>
                <path d={d} fill="#E3DFD2" stroke="#CBC4B1" strokeWidth="1.5" strokeLinejoin="round" />
                <path d={d} fill="url(#streets)" />
              </g>
            ))}

            {/* Highways: a dark casing under an amber line, as road maps draw them. */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {highways.map((d) => (
                <g key={d}>
                  <path d={d} stroke="#B07F25" strokeWidth="7" />
                  <path d={d} stroke="#F8C957" strokeWidth="4.6" />
                </g>
              ))}
            </g>
            <Shield x={100} y={50} label="5" interstate />
            <Shield x={130} y={372} label="5" interstate />
            <Shield x={184} y={118} label="99" />
            <Shield x={204} y={392} label="99" />
            <Shield x={440} y={226} label="12" />
            <Shield x={62} y={334} label="12" />

            {/* Labels. */}
            <g fontFamily={font} fontWeight="600" fill="#15201B" className={labelClass} {...halo}>
              {places.map((p) => (
                <text key={p.name} x={p.x} y={p.y} textAnchor={p.anchor ?? 'start'}>
                  {p.name}
                </text>
              ))}
            </g>
            <text fontFamily={font} fontWeight="600" fontStyle="italic" fill="#3B7585" className="text-[12px] max-md:text-[15px]" {...halo}>
              <textPath href="#river-label">Mokelumne River</textPath>
            </text>
            <text x="184" y="288" textAnchor="end" fontFamily={font} fontWeight="600" fontStyle="italic" fill="#3B7585" className="text-[10px] max-md:text-[13px]" {...halo}>
              Lodi Lake
            </text>
            <text x="352" y="372" textAnchor="middle" fontFamily={font} fontWeight="600" fill="#5C7A44" letterSpacing="2.5" className="text-[11px] max-md:text-[14px]" {...halo}>
              LODI WINE COUNTRY
            </text>

            {/* Lodi: the accent pin. */}
            <ellipse cx="212" cy="334" rx="11" ry="3.5" fill="#15201B" opacity="0.22" />
            <circle cx="212" cy="326" r="11" fill="#7A1F34" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="212" cy="326" r="3.6" fill="#FFFFFF" />
            <text x="230" y="336" fill="#15201B" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="700" className="text-[22px] max-md:text-[28px]" {...halo}>
              Lodi
            </text>

            {/* The way south. */}
            <text x="226" y="428" fontFamily={font} fontWeight="600" fill="#15201B" className="text-[12px] max-md:text-[15px]" {...halo}>
              South to Stockton, 12 mi
            </text>

            {/* Compass and scale. */}
            <g transform="translate(560 44)">
              <circle r="21" fill="#FFFFFF" fillOpacity="0.9" stroke="#15201B" strokeOpacity="0.4" />
              <path d="M0 -15 L5 3 L0 0 L-5 3 Z" fill="#7A1F34" />
              <path d="M0 15 L5 -3 L0 0 L-5 -3 Z" fill="#15201B" fillOpacity="0.55" />
              <text y="-25" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="11" fill="#15201B" {...halo}>
                N
              </text>
            </g>
            <g transform="translate(500 408)" fontFamily={font} fontWeight="600" fontSize="11" fill="#15201B">
              <rect x="-8" y="-12" width="94" height="34" fill="#FFFFFF" fillOpacity="0.85" />
              <path d="M0 0H56M0 -4V4M28 -4V4M56 -4V4" stroke="#15201B" strokeWidth="2" fill="none" />
              <text x="0" y="16">0</text>
              <text x="28" y="16" textAnchor="middle">1</text>
              <text x="56" y="16" textAnchor="middle">2 mi</text>
            </g>
            <rect width="600" height="440" fill="url(#vignette)" pointerEvents="none" />
          </svg>
        </div>
      </Tilt>
      <figcaption className="mt-4 max-w-[52ch] text-small">We serve {contactInfo.area}.</figcaption>
    </figure>
  );
}
