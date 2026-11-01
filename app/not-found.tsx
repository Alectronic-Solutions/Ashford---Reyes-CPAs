import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonClass, textLink } from '@/components/Button';
import { contactInfo } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page is not on the books. Head back to the home page or call Ashford and Reyes CPAs in Lodi.',
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-16 text-center md:px-8 md:pb-40 md:pt-28 md:text-left">
      <h1 className="mx-auto max-w-[14ch] text-display md:mx-0">This page is not on the books.</h1>
      <div className="mt-8 grid md:mt-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 md:col-start-6">
          <p className="mx-auto max-w-[40ch] text-statement md:mx-0">
            The link may be old or mistyped. Start from the home page, or call us and we will point you the right way.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 md:justify-start gap-y-4">
            <Link href="/" className={buttonClass}>
              Back to the home page
            </Link>
            <a href={contactInfo.phoneHref} className={textLink}>
              Call {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
