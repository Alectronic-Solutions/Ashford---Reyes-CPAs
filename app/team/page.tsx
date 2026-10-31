import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Team } from '@/components/Team';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'The team | Ashford and Reyes CPAs',
  description: 'Sample team for demonstration: the people at Ashford and Reyes CPAs and what each one specializes in.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="The team"
        lede="The people you will actually talk to, each with a specialty you can ask for by name."
        note="Sample team for demonstration. These names, titles and portraits are placeholders, not real staff."
      />
      <Team variant="page" />
      <Contact />
    </>
  );
}
