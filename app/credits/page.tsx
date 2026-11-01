import { pageMetadata } from '@/lib/metadata';
import { credits } from '@/lib/credits';
import { PageHeader } from '@/components/PageHeader';

export const metadata = pageMetadata({
  title: 'Photo credits',
  description: 'The photographers and filmmakers whose work appears on this site.',
  path: '/credits',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Photo credits"
        lede="The photographers and filmmakers whose work appears on this site, all through Pexels."
        note="Team portraits show sample people, not real staff."
      />
      <section aria-label="Credits" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.what} className="rounded-lg border-l-4 border-accent pl-5">
              <p className="font-medium">{c.what}</p>
              <p className="mt-1">
                <a href={c.url} className="underline underline-offset-4 hover:no-underline">
                  {c.who}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
