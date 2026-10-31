import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Engagement } from '@/components/Engagement';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'How an engagement works | Ashford and Reyes CPAs',
  description: 'What you do and what you receive at each step of working with Ashford and Reyes CPAs in Lodi, California.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="How an engagement works"
        lede="Five steps. Each says what we need from you and what you get back."
      />
      <Engagement variant="page" />
      <Contact />
    </>
  );
}
