import Image from 'next/image';
import Link from 'next/link';
import { Rise, RiseGroup } from './Reveal';
import { textLink } from './Button';

/* Eight sample people. The home page shows the first four. */
const people: {
  name: string;
  title: string;
  specialty: string;
  src: string;
  alt: string;
  focus?: string;
}[] = [
  {
    name: 'Marcus Hale',
    title: 'Managing partner',
    specialty: 'Farm and winery returns, entity structure and succession plans.',
    src: '/photos/team/team-01.jpg',
    alt: 'Marcus Hale, smiling, in a blue suit and glasses in front of a bookshelf',
    focus: 'object-[40%_50%]',
  },
  {
    name: 'Eleanor Voss',
    title: 'Partner, tax',
    specialty: 'Estate and trust returns, and the October year-end planning meeting.',
    src: '/photos/team/team-02.jpg',
    alt: 'Eleanor Voss, in a gray blazer, standing in a bright restaurant-style room',
  },
  {
    name: 'Daniel Okafor',
    title: 'Senior accountant',
    specialty: 'Small business books, payroll and sales tax.',
    src: '/photos/team/team-03.jpg',
    alt: 'Daniel Okafor, in a light gray suit, smiling with his arms crossed',
  },
  {
    name: 'Amara Njoroge',
    title: 'Tax manager',
    specialty: 'Family returns, college costs and rental property questions.',
    src: '/photos/team/team-04.jpg',
    alt: 'Amara Njoroge, in a pink blazer, smiling on a covered balcony',
  },
  {
    name: 'Ruth Castellano',
    title: 'Bookkeeping lead',
    specialty: 'Monthly close, bank reconciliations and QuickBooks cleanup.',
    src: '/photos/team/team-05.jpg',
    alt: 'Ruth Castellano, with white hair and a red blazer, arms folded',
  },
  {
    name: 'Jordan Whitfield',
    title: 'Advisory associate',
    specialty: 'Second locations, tasting rooms and seasonal budgets.',
    src: '/photos/team/team-06.jpg',
    alt: 'Jordan Whitfield, smiling in a navy blazer and open collar shirt',
  },
  {
    name: 'Linh Tran',
    title: 'Staff accountant',
    specialty: 'Quarterly estimates and payroll filings.',
    src: '/photos/team/team-07.jpg',
    alt: 'Linh Tran, in a black blazer, standing in an office with her arms crossed',
  },
  {
    name: 'Henry Park',
    title: 'Client services',
    specialty: 'Intake, document requests and getting your question to the right person.',
    src: '/photos/team/team-08.jpg',
    alt: 'Henry Park, in glasses and a dark shirt, looking at the camera',
  },
];

export function Team({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const shown = variant === 'home' ? people.slice(0, 4) : people;
  return (
    <section
      id="team"
      aria-labelledby={variant === 'home' ? 'team-title' : undefined}
      aria-label={variant === 'page' ? 'Team members' : undefined}
      className={`mx-auto max-w-page scroll-mt-24 px-5 pb-24 md:px-8 md:pb-40 ${variant === 'home' ? 'pt-8 md:pt-16' : ''}`}
    >
      {variant === 'home' && (
        <RiseGroup>
          <div className="mb-14 grid gap-8 md:mb-24 md:grid-cols-12 md:gap-8">
            <Rise className="md:col-span-5">
              <h2 id="team-title" className="text-h2">
                The team
              </h2>
            </Rise>
            <Rise className="md:col-span-7 md:pt-3">
              <p className="max-w-[36ch] text-statement">
                The people you will actually talk to, each with a specialty you can ask for by name.
              </p>
              <p className="mt-4 max-w-[46ch] text-small">
                Sample team for demonstration. These names, titles and portraits are placeholders, not real staff.
              </p>
            </Rise>
          </div>
        </RiseGroup>
      )}

      {/* Every second column sits a little lower, a steady rhythm rather than a scatter. */}
      <RiseGroup as="ul" className="grid list-none grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-8 md:gap-y-20">
        {shown.map((person, i) => (
          <Rise as="li" key={person.name} className={i % 2 === 1 ? 'md:mt-16' : ''}>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={person.src}
                alt={person.alt}
                fill
                sizes="(min-width: 1504px) 340px, (min-width: 768px) 23vw, 50vw"
                className={`object-cover ${person.focus ?? ''}`}
              />
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.625rem)] font-semibold leading-tight tracking-[-0.01em]">
              {person.name}
            </h3>
            <p className="mt-0.5 font-medium">{person.title}</p>
            <p className="mt-1.5 max-w-[34ch] text-small">{person.specialty}</p>
          </Rise>
        ))}
      </RiseGroup>

      {variant === 'home' && (
        <RiseGroup>
          <Rise className="mt-14 md:mt-8">
            <Link href="/team" className={textLink}>
              Meet the whole team
            </Link>
          </Rise>
        </RiseGroup>
      )}
    </section>
  );
}
