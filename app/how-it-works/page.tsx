import { pageMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/PageHeader';
import { Engagement } from '@/components/Engagement';
import { Contact } from '@/components/Contact';

export const metadata = pageMetadata({
  title: 'How we work',
  description: 'What you do and what you receive at each step of working with Ashford and Reyes CPAs in Lodi, California.',
  path: '/how-it-works',
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="How we work"
        lede="Five steps. Each says what we need from you and what you get back."
        photo={{ src: '/photos/meeting-couple.jpg', alt: 'A couple reviewing papers with an adviser across a white desk' }}
      />
      <Engagement variant="page" />
      <Contact />
    </>
  );
}
