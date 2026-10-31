import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { WhoWeServe } from '@/components/WhoWeServe';
import { YearAhead } from '@/components/YearAhead';
import { Engagement } from '@/components/Engagement';
import { Team } from '@/components/Team';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhoWeServe />
      <YearAhead />
      <Engagement />
      <Team />
      <Faq />
      <Contact />
    </>
  );
}
