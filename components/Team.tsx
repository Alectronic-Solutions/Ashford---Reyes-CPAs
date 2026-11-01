import Image from 'next/image';
import Link from 'next/link';
import { Rise, RiseGroup } from './Reveal';
import { textLink } from './Button';
import { askHref, firstName, people } from '@/lib/people';
import { Tilt } from './Depth';

export function Team({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const shown = variant === 'home' ? people.slice(0, 4) : people;
  // On the team page the names follow the page's h1 directly, so they are h2; on the home page they sit under "The team".
  const Name = variant === 'home' ? 'h3' : 'h2';
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
            <Rise className="md:col-span-5" mask>
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
            <Tilt max={7}>
              <Link prefetch={false} href={`/team/${person.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-rest">
                <Image
                  src={person.src}
                  alt=""
                  fill
                  sizes="(min-width: 1504px) 340px, (min-width: 768px) 23vw, 50vw"
                  className={`object-cover transition-transform duration-500 hover:scale-105 ${person.focus ?? ''}`}
                />
              </Link>
            </Tilt>
            <Name className="mt-5 font-display text-h3 font-semibold">
              <Link prefetch={false} href={`/team/${person.slug}`} className="hover:text-accent">
                {person.name}
              </Link>
            </Name>
            <p className="mt-0.5 font-medium">{person.title}</p>
            <p className="mt-1.5 max-w-[34ch] text-small">{person.specialty}</p>
            <a
              href={askHref(person)}
              className="mt-1 inline-block py-2 text-small font-medium underline decoration-accent underline-offset-4 hover:decoration-ink"
            >
              Email {firstName(person)}
            </a>
          </Rise>
        ))}
      </RiseGroup>

      {variant === 'home' && (
        <RiseGroup>
          <Rise className="mt-14 md:mt-8">
            <Link prefetch={false} href="/team" className={textLink}>
              Meet the whole team
            </Link>
          </Rise>
        </RiseGroup>
      )}
    </section>
  );
}
