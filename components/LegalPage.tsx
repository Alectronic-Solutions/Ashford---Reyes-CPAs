import { PageHeader } from './PageHeader';
import { glue } from '@/lib/text';

export type LegalSection = { heading: string; body: string[] };

/** A plain reading page for policies: the shared header, then its sections at a comfortable measure. */
export function LegalPage({
  title,
  lede,
  updated,
  sections,
}: {
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader
        title={title}
        lede={lede}
        note={`Sample text for demonstration, last updated ${updated}. Have an attorney review it before launch.`}
      />
      <div className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 md:col-start-6">
            {glue(sections).map((section) => (
              <section key={section.heading} className="mt-12 first:mt-0">
                <h2 className="font-display text-h3">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-[62ch]">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
