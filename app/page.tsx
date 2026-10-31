import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { WhoWeServe } from '@/components/WhoWeServe';
import { YearAhead } from '@/components/YearAhead';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhoWeServe />
      <YearAhead />
      <Contact />
    </>
  );
}
