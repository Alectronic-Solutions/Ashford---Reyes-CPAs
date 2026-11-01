import { pageMetadata } from '@/lib/metadata';
import { insightNote, insights } from '@/lib/insights';
import { PageHeader } from '@/components/PageHeader';
import { InsightCards } from '@/components/InsightList';

export const metadata = pageMetadata({
  title: 'Insights',
  description: 'Short articles on tax planning, estimated payments and succession for Lodi farms, businesses and families.',
  path: '/insights',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Insights"
        lede="Short pieces on what to do this season, written for Lodi farms, businesses and families."
        note={insightNote}
        photo={{ src: '/photos/harvest-hands.jpg', alt: 'Hands lifting a bunch of dark wine grapes from a harvest tub' }}
      />
      <section aria-label="Articles" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <InsightCards items={insights} heading="h2" />
      </section>
    </>
  );
}
