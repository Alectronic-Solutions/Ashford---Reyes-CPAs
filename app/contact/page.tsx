import { pageMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/PageHeader';
import { Contact } from '@/components/Contact';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Book a free first consultation with Ashford and Reyes CPAs, or call or email. Serving Lodi and San Joaquin County.',
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Contact"
        lede="Call, write or stop by, or answer four quick questions below."
        photo={{ src: '/photos/rows-fog.jpg', alt: 'Bare vineyard rows disappearing into winter fog', position: 'object-[50%_60%]' }}
      />
      <Contact />
    </>
  );
}
