import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { contactInfo } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy policy',
  description: 'How Ashford and Reyes CPAs collects, uses and protects the information you share with us.',
  path: '/privacy',
});

export default function Page() {
  return (
    <LegalPage
      title="Privacy policy"
      lede="What we collect, why we collect it, and how we keep it safe."
      updated="October 31, 2026"
      sections={[
        {
          heading: 'What we collect',
          body: [
            'When you use the contact form we receive your name, email address, phone number if you give one, and your message. When you become a client we also receive the financial records needed to do the work you hire us for.',
            'This website does not use advertising cookies or tracking pixels. Our hosting provider keeps standard server logs, such as IP address and browser type, for security and to keep the site running.',
          ],
        },
        {
          heading: 'How we use it',
          body: [
            'We use your details to reply to you, to prepare your returns and books, and to send reminders about deadlines that affect you. We do not sell or rent your information, and we do not use it for marketing by anyone else.',
          ],
        },
        {
          heading: 'Who we share it with',
          body: [
            'We share client information only as the work requires: with tax agencies when we file for you, with software providers who process data on our behalf under confidentiality terms, and with your attorney or lender when you ask us to. We disclose information when the law requires it.',
            'As CPAs we are bound by professional rules on client confidentiality, and federal law limits how tax preparers may use or disclose tax return information.',
          ],
        },
        {
          heading: 'How we protect it',
          body: [
            'Documents travel through an encrypted upload portal rather than email. Access to client files is limited to the people working on them, and paper records are kept in locked storage at the Lodi office and shredded when no longer needed.',
          ],
        },
        {
          heading: 'Your choices',
          body: [
            'You can ask to see, correct or delete the personal information we hold about you, subject to the record-keeping rules that apply to tax work. California residents have additional rights under state privacy law.',
            `To make a request, email ${contactInfo.email} or call ${contactInfo.phone}.`,
          ],
        },
      ]}
    />
  );
}
