import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { Calendar } from '@/components/Calendar';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Calendar />
      <Contact />
    </>
  );
}
