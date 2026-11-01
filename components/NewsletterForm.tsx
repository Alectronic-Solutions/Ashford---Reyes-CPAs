'use client';

import { useRef, useState, type FormEvent } from 'react';
import { contactInfo, site } from '@/lib/site';
import { ExampleNotice, type ExampleNoticeHandle } from './ExampleNotice';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A one-field signup for the seasonal letter, sent through FormSubmit like the contact form. */
export function NewsletterForm() {
  const [error, setError] = useState('');
  const notice = useRef<ExampleNoticeHandle>(null);
  const input = useRef<HTMLInputElement>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!emailPattern.test(email)) {
      event.preventDefault();
      setError('Enter an email address like name@example.com.');
      input.current?.focus();
      return;
    }
    setError('');
    if (!site.formsLive) {
      event.preventDefault();
      form.reset();
      notice.current?.open();
    }
  }

  return (
    <>
      <form
        action={contactInfo.formAction}
        method="POST"
        noValidate
        onSubmit={onSubmit}
        className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-8"
      >
        <input type="hidden" name="_subject" value="Newsletter signup" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`${site.url}/thanks`} />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
        <div className="lg:col-span-5">
          <label htmlFor="newsletter-email" className="block font-display text-h3 font-semibold">
            The seasonal letter
          </label>
          <p id="newsletter-help" className="mt-2 max-w-[40ch] text-bg/85">
            Four short emails a year, timed to the deadlines that matter in Lodi.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:col-span-7">
          <input
            ref={input}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'newsletter-help newsletter-error' : 'newsletter-help'}
            className="min-h-14 min-w-0 flex-1 basis-56 border border-bg/60 bg-transparent px-4 py-3 text-bg placeholder:text-bg/70"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            className="min-h-14 bg-bg px-7 py-3 font-medium text-ink transition duration-200 hover:bg-surface active:translate-y-px"
          >
            Sign up
          </button>
        </div>
        {error && (
          <p id="newsletter-error" role="alert" className="font-medium lg:col-span-7 lg:col-start-6">
            {error}
          </p>
        )}
      </form>
      <ExampleNotice ref={notice} />
    </>
  );
}
