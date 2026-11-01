import { pageMetadata } from '@/lib/metadata';
import { contactInfo } from '@/lib/site';
import { person } from '@/lib/people';
import { PageHeader } from '@/components/PageHeader';
import { PersonCard } from '@/components/PersonCard';
import { Rise, RiseGroup } from '@/components/Reveal';
import { buttonClass } from '@/components/Button';

export const metadata = pageMetadata({
  title: 'Client center',
  description: 'Upload documents, sign returns and pay an invoice with Ashford and Reyes CPAs.',
  path: '/client-center',
});

const tasks = [
  {
    id: 'upload',
    title: 'Send us documents',
    text: 'Upload statements, tax forms and receipts through the secure portal. Please do not send Social Security numbers or account numbers by ordinary email.',
    href: contactInfo.portalUrl,
    action: 'Open the secure portal',
  },
  {
    id: 'sign',
    title: 'Sign your return',
    text: 'When your return is ready, we send a link to review and sign it electronically. The same portal holds copies of every return we have filed for you.',
    href: contactInfo.portalUrl,
    action: 'Review and sign',
  },
  {
    id: 'pay',
    title: 'Pay an invoice',
    text: 'Pay by card or bank transfer. Your invoice number is at the top right of the invoice we emailed you.',
    href: contactInfo.paymentUrl,
    action: 'Pay an invoice',
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="Client center"
        lede="Send documents, sign returns and pay invoices, all in one place."
        note="Example site: the portal and payment buttons are switched off until the firm’s own providers are connected."
      />
      <section aria-label="Client tasks" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-32">
        <RiseGroup as="ul" className="grid gap-4 md:grid-cols-3 md:gap-8">
          {tasks.map((t) => (
            <Rise as="li" key={t.id} className="flex flex-col bg-surface p-6 md:p-8">
              <h2 id={t.id} className="scroll-mt-28 text-h3">
                {t.title}
              </h2>
              <p className="mt-4 max-w-[44ch]">{t.text}</p>
              <div className="mt-auto pt-8">
                {t.href ? (
                  <a href={t.href} className={buttonClass}>
                    {t.action}
                  </a>
                ) : (
                  <p className="text-small font-medium">Available at launch. Until then, call or email the office.</p>
                )}
              </div>
            </Rise>
          ))}
        </RiseGroup>
      </section>
      <section aria-labelledby="help-title" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <Rise mask>
              <h2 id="help-title" className="text-h2">
                Stuck?
              </h2>
              <p className="mt-6 max-w-[36ch] text-statement">
                Call {contactInfo.phone} or write to us. Henry will get you sorted.
              </p>
            </Rise>
          </RiseGroup>
          <RiseGroup className="md:col-span-7">
            <Rise>
              <PersonCard person={person('Henry Park')} heading="Client services" />
            </Rise>
          </RiseGroup>
        </div>
      </section>
    </>
  );
}
