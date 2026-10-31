import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Questions we hear | Ashford and Reyes CPAs',
  description: 'Sample answers to common questions from Lodi farms, small businesses and families about working with a CPA.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Questions we hear"
        lede="Straight answers to what Lodi farms, businesses and families ask us most."
        note="Sample content for demonstration. These answers are general and are not advice for your situation."
      />
      <Faq variant="page" />
      <Contact />
    </>
  );
}
