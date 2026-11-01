import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonClass, textLink } from '@/components/Button';
import { contactInfo } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-16 md:px-8 md:pb-40 md:pt-28">
      <h1 className="max-w-[14ch] text-display">This page is not on the books.</h1>
      <div className="mt-8 grid md:mt-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 md:col-start-6">
          <p className="max-w-[40ch] text-statement">
            The link may be old or mistyped. Start from the home page, or call us and we will point you the right way.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
