import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Terms of use',
  description: 'The terms that apply when you use the Ashford and Reyes CPAs website, including what the site is and is not for.',
  path: '/terms',
});

export default function Page() {
  return (
    <LegalPage
      title="Terms of use"
      lede="The ground rules for using this website."
      updated="October 31, 2026"
      sections={[
        {
          heading: 'Using this site',
          body: [
            'This website gives general information about Ashford and Reyes CPAs and our services. By using it you agree to these terms. If you do not agree, please do not use the site.',
          ],
        },
        {
          heading: 'No client relationship',
          body: [
            'Reading this site or sending us a message does not make you our client. A client relationship begins only when we both sign an engagement letter that sets out the work and the fee.',
            'Please do not send tax documents, account numbers or other sensitive details through the contact form. We will give you a secure way to share them.',
          ],
        },
        {
          heading: 'Content and ownership',
          body: [
            'The text, design and photographs on this site belong to us or to the people who license them to us. You may share links to our pages and print pages for your own use, but you may not copy the site for commercial purposes without permission.',
          ],
        },
        {
          heading: 'Links to other sites',
          body: [
            'We link to tax agencies and other outside sites for convenience. We do not control those sites and are not responsible for what they publish.',
          ],
        },
        {
          heading: 'Changes',
          body: [
            'We may update these terms from time to time. The date at the top of this page shows when they last changed. These terms are governed by the laws of the State of California.',
          ],
        },
      ]}
    />
  );
}
