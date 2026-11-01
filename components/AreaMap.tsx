import { contactInfo } from '@/lib/site';
import { Tilt } from './Depth';
import { mapPaths as m, mapPlaces as at } from './areaMapData';

/*
  A road map of the area the firm serves, drawn from OpenStreetMap data (see areaMapData.ts) at
  about 28px to a mile, so the towns, highways, river and built-up areas sit where they really are.
  It shows no office: the firm meets clients across the county. Drawn rather than embedded, so the
  page loads nothing from a map service and tracks no one.
*/
const places: { name: keyof typeof at; dx: number; dy: number; anchor?: 'start' | 'middle' | 'end' }[] = [
  { name: 'Galt', dx: -9, dy: 4, anchor: 'end' },
  { name: 'Acampo', dx: 9, dy: 4 },
  { name: 'Woodbridge', dx: -9, dy: 4, anchor: 'end' },
  { name: 'Victor', dx: 0, dy: 22, anchor: 'middle' },
  { name: 'Lockeford', dx: 10, dy: 22 },
  { name: 'Clements', dx: 0, dy: -11, anchor: 'middle' },
];

const font = 'var(--font-figtree), system-ui, sans-serif';
const halo = { paintOrder: 'stroke' as const, stroke: '#F4F5EE', strokeWidth: 3.5, strokeLinejoin: 'round' as const };
const water = '#93C3D0';

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
  const lodi = at.Lodi;

  return (
    <figure>
      <Tilt max={3}>
        <div className="overflow-hidden rounded-3xl border border-ink/40 bg-bg shadow-lift">
          <svg viewBox="0 0 600 440" role="img" aria-labelledby="area-title area-desc" className="block h-auto w-full">
            <title id="area-title">The area we serve</title>
            <desc id="area-desc">
              A map of the Lodi area: Lodi in the middle, Acampo and Galt to the north, Woodbridge to the northwest,
              Victor, Lockeford and Clements to the east, and Stockton twelve miles to the south, with the Mokelumne
              River, Interstate 5 and Highways 99, 12 and 88.
            </desc>
            <defs>
              <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
                <stop offset="0.65" stopColor="#15201B" stopOpacity="0" />
                <stop offset="1" stopColor="#15201B" stopOpacity="0.12" />
              </radialGradient>
            </defs>

            <rect width="600" height="440" fill="#F1F0E7" />
            <path d={m.orchard} fill="#E4ECD2" />
            <path d={m.vineyard} fill="#D8E5C3" />

            {/* Water. */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke={water}>
              <path d={m.cosumnes} strokeWidth="4" />
              <path d={m.creek} strokeWidth="2" />
              <path d={m.slough} strokeWidth="3" />
              <path d={m.river} strokeWidth="4.5" />
            </g>
            <path d={m.riverArea} fill={water} stroke={water} strokeWidth="1" />
            <path d={m.lake} fill={water} stroke={water} strokeWidth="1" />

            {/* Built-up areas. */}
            <path d={m.urban} fill="#E2DED1" stroke="#CBC4B1" strokeWidth="0.8" strokeLinejoin="round" />

            {/* Streets and county roads. */}
            <path d={m.streets} fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d={m.roads} fill="none" stroke="#D3CFBF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d={m.roads} fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

            {/* State routes in amber over a darker casing. */}
            <path d={m.minor} fill="none" stroke="#CFCCBC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d={m.minor} fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {[m.h88, m.h12, m.h99, m.i5].map((d, i) => (
                <g key={i}>
                  <path d={d} stroke="#B07F25" strokeWidth="6.4" />
                  <path d={d} stroke="#F8C957" strokeWidth="4" />
                </g>
              ))}
            </g>
            <Shield x={50} y={378} label="5" interstate />
            <Shield x={190} y={76} label="99" />
            <Shield x={233} y={410} label="99" />
            <Shield x={36} y={321} label="12" />
            <Shield x={553} y={160} label="12" />
            <Shield x={520} y={147} label="88" />

            {/* Towns and labels. */}
            <g fontFamily={font} fontWeight="600" fill="#15201B" className={labelClass} {...halo}>
              {places.map((p) => (
                <g key={p.name}>
                  <circle cx={at[p.name][0]} cy={at[p.name][1]} r="3.6" fill="#15201B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x={at[p.name][0] + p.dx} y={at[p.name][1] + p.dy} textAnchor={p.anchor ?? 'start'}>
                    {p.name}
                  </text>
                </g>
              ))}
            </g>
            <text x="305" y="246" textAnchor="middle" transform="rotate(-4 305 246)" fontFamily={font} fontWeight="600" fontStyle="italic" fill="#3B7585" className="text-[12px] max-md:text-[15px]" {...halo}>
              Mokelumne River
            </text>
            <text x="350" y="338" textAnchor="middle" fontFamily={font} fontWeight="600" fill="#5C7A44" letterSpacing="2.5" className="text-[11px] max-md:text-[14px]" {...halo}>
              LODI WINE COUNTRY
            </text>

            {/* Lodi: the accent pin. */}
            <ellipse cx={lodi[0]} cy={lodi[1] + 8} rx="11" ry="3.5" fill="#15201B" opacity="0.22" />
            <circle cx={lodi[0]} cy={lodi[1]} r="11" fill="#7A1F34" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx={lodi[0]} cy={lodi[1]} r="3.6" fill="#FFFFFF" />
            <text x={lodi[0] - 16} y={lodi[1] + 28} textAnchor="end" fill="#15201B" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="700" className="text-[22px] max-md:text-[28px]" {...halo}>
              Lodi
            </text>

            {/* The way south. */}
            <text x="248" y="430" fontFamily={font} fontWeight="600" fill="#15201B" className="text-[12px] max-md:text-[15px]" {...halo}>
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
      <figcaption className="mt-4 max-w-[52ch] text-small">
        We serve {contactInfo.area}. Map data from OpenStreetMap contributors.
      </figcaption>
    </figure>
  );
}
