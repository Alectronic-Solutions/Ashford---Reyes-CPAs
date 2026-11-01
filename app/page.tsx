import { Hero } from '@/components/Hero';
import { ProofStrip, Stories, Testimonials } from '@/components/Proof';
import { WhatWeDo } from '@/components/WhatWeDo';
import { WhoWeServe } from '@/components/WhoWeServe';
import { YearAhead } from '@/components/YearAhead';
import { Engagement } from '@/components/Engagement';
import { Team } from '@/components/Team';
import { InsightsTeaser } from '@/components/InsightList';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { localToday } from '@/components/yearAheadRules';
import { stories, testimonials } from '@/lib/proof';
import { insights } from '@/lib/insights';

/*
  The page alternates whole fields of colour so it reads as chapters, not one long sheet:
  ink (hero, figures), paper (services, clients), wine (stories), green (the year), paper (steps),
  ink (quotes), paper (team), sage (insights), paper (questions), sage (booking).
*/
export default function Home() {
  return (
    <>
      <Hero buildToday={localToday()} />
      <ProofStrip />
      <WhatWeDo />
      <WhoWeServe />
      <Stories stories={stories} />
      <YearAhead />
      <Engagement />
      <Testimonials quotes={testimonials} />
      <div className="pt-24 md:pt-40">
        <Team />
      </div>
      <InsightsTeaser items={insights.slice(0, 3)} />
      <div className="pt-24 md:pt-40">
        <Faq />
      </div>
      <Contact />
    </>
  );
}
