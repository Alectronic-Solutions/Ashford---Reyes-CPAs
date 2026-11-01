import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { contactInfo } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Accessibility',
  description: 'Our commitment to making the Ashford and Reyes CPAs website usable for everyone.',
  path: '/accessibility',
});

export default function Page() {
  return (
    <LegalPage
      title="Accessibility"
      lede="Everyone should be able to read this site and reach us, however they browse."
      updated="October 31, 2026"
      sections={[
        {
          heading: 'Our goal',
          body: [
            'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The site is built to work with a keyboard alone, with screen readers, with text enlarged to 200 percent, and with reduced motion turned on in your device settings.',
          ],
        },
        {
          heading: 'What we have done',
          body: [
            'Text and controls meet contrast requirements. Every page has a skip link, a logical heading order and labelled form fields. The background video can be paused, and it does not play at all when your device asks for reduced motion.',
          ],
        },
        {
          heading: 'Tell us what is not working',
          body: [
            `If anything on this site is hard to use, we want to know. Call ${contactInfo.phone} or email ${contactInfo.email} and tell us the page and the problem. We will fix it, and in the meantime we will get you the information another way.`,
          ],
        },
        {
          heading: 'At the office',
          body: [
            'Our Lodi office is on the ground floor with step-free entry and an accessible restroom. If you would rather not travel, we are glad to meet by phone or video.',
          ],
        },
      ]}
    />
  );
}
