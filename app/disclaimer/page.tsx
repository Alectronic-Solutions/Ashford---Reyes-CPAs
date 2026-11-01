import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Disclaimer',
  description: 'The information on this site is general and is not tax, legal or financial advice for your situation.',
  path: '/disclaimer',
});

export default function Page() {
  return (
    <LegalPage
      title="Disclaimer"
      lede="General information, not advice for your situation."
      updated="October 31, 2026"
      sections={[
        {
          heading: 'General information only',
          body: [
            'Everything on this site, including the tax calendar, the answers to common questions and our articles, is general information. It is not tax, legal, accounting or financial advice, and it may not fit your circumstances.',
            'Tax rules and deadlines change. Before you act on anything you read here, talk with a qualified professional who knows your situation.',
          ],
        },
        {
          heading: 'Dates and figures',
          body: [
            'Deadlines shown on this site are federal dates for demonstration. They do not cover every state, local or industry-specific requirement, and a CPA must verify them before launch. Disaster relief and other notices can move a deadline for some taxpayers.',
          ],
        },
        {
          heading: 'Example site',
          body: [
            'Ashford and Reyes CPAs is a fictional firm. The people, testimonials and contact details on this site are placeholders for demonstration, and forms do not send messages.',
          ],
        },
      ]}
    />
  );
}
