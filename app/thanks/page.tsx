import Link from 'next/link';
import { buttonClass } from '@/components/Button';
import { pageMetadata } from '@/lib/metadata';
import { contactInfo } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Message received',
  description: 'Thank you for writing to Ashford and Reyes CPAs.',
  path: '/thanks',
  index: false,
});

// FormSubmit sends visitors here once a message is delivered. Unused while site.formsLive is false.
export default function Page() {
  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-16 text-center md:px-8 md:pb-40 md:pt-28 md:text-left">
      <h1 className="mx-auto max-w-[14ch] text-display md:mx-0">Thank you. It is on its way.</h1>
      <div className="mt-8 grid md:mt-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 md:col-start-6">
          <p className="mx-auto max-w-[40ch] text-statement md:mx-0">
            We read every message and reply within one business day.
          </p>
          <p className="mx-auto mt-6 max-w-[48ch] md:mx-0">
            We will answer by phone or email, whichever you gave us. Something urgent, like a notice with a deadline this week? Call{' '}
            <a href={contactInfo.phoneHref} className="underline underline-offset-4 hover:no-underline">
              {contactInfo.phone}
            </a>
            .
          </p>
          <Link href="/" className={`${buttonClass} mt-10`}>
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
