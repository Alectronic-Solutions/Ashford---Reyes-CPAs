import Image from 'next/image';
import Link from 'next/link';
import { askHref, firstName, type Person } from '@/lib/people';
import { contactInfo } from '@/lib/site';

/** The named person to ask, with a portrait and two ways to reach them. */
export function PersonCard({ person, heading = 'Your contact' }: { person: Person; heading?: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-5 bg-surface p-5 md:grid-cols-[9rem_1fr] md:gap-8 md:p-8">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={person.src}
          alt={person.alt}
          fill
          sizes="(min-width: 768px) 144px, 112px"
          className={`object-cover ${person.focus ?? ''}`}
        />
      </div>
      <div>
        <p className="font-display text-h3 font-semibold">
          <Link href={`/team/${person.slug}`} className="hover:text-accent">
            {person.name}
          </Link>
        </p>
        <p className="font-medium">{person.title}</p>
        <p className="text-small font-medium text-accent">{heading}</p>
        <p className="mt-2 max-w-[40ch] text-small">{person.specialty}</p>
        <p className="mt-3 flex flex-wrap gap-x-5 text-small">
          <a href={askHref(person)} className="inline-block py-2 font-medium underline underline-offset-4 hover:no-underline">
            Email {firstName(person)}
          </a>
          <a href={contactInfo.phoneHref} className="inline-block py-2 underline underline-offset-4 hover:no-underline">
            {contactInfo.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
