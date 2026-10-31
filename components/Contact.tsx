'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Rise, RiseGroup } from './Reveal';
import { buttonClass } from './Button';
import { contactInfo, siteUrl } from './contactInfo';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const field =
  'mt-2 block w-full border border-ink/60 bg-surface px-4 py-3.5 text-body text-ink placeholder:text-ink/75';
const label = 'block text-small font-medium';
const error = 'mt-2 text-small text-accent';
const contactLink = 'inline-block py-2.5 underline underline-offset-4 hover:no-underline';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
  if (!emailPattern.test(String(data.get('email') ?? '').trim())) {
    errors.email = 'Enter an email address like name@example.com.';
  }
  if (String(data.get('message') ?? '').trim().length < 10) {
    errors.message = 'Tell us a little more, at least a sentence.';
  }
  return errors;
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // FormSubmit sends visitors back with ?sent=1 once their message is delivered.
  useEffect(() => {
    setSent(new URLSearchParams(window.location.search).get('sent') === '1');
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validate(new FormData(event.currentTarget));
    setErrors(found);
    const first = (['name', 'email', 'message'] as const).find((key) => found[key]);
    if (first) {
      event.preventDefault();
      document.getElementById(`contact-${first}`)?.focus();
    }
  }

  function sendAnother() {
    window.history.replaceState(null, '', `${window.location.pathname}#contact`);
    setSent(false);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-4 px-5 pb-24 pt-8 md:px-8 md:pb-40 md:pt-12"
    >
      <RiseGroup>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-5">
            <h2 id="contact-title" className="text-h2">
              Tell us about your season
            </h2>
            <p className="mt-6 max-w-[36ch]">
              Send a few lines about your farm, winery, business or household. We read every
              message and reply by phone or email, whichever you prefer.
            </p>
            <dl className="mt-8 space-y-4 text-body">
              <div>
                <dt className="font-medium">Phone</dt>
                <dd>
                  <a href={contactInfo.phoneHref} className={contactLink}>
                    {contactInfo.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Email</dt>
                <dd>
                  <a href={contactInfo.emailHref} className={contactLink}>
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Office</dt>
                <dd>
                  {contactInfo.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{contactInfo.hours}</span>
                </dd>
              </div>
            </dl>
          </Rise>

          <Rise className="md:col-span-7">
            {sent ? (
              <div role="status" className="bg-surface p-6 md:p-10">
                <h3 className="text-statement">Thank you. Your message is on its way.</h3>
                <p className="mt-4 max-w-[48ch]">
                  We read every message and will reply by phone or email, whichever you gave us.
                </p>
                <button type="button" onClick={sendAnother} className="mt-6 py-2.5 underline underline-offset-4 hover:no-underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form
                action={contactInfo.formAction}
                method="POST"
                noValidate
                onSubmit={onSubmit}
                className="grid gap-6"
              >
                <input type="hidden" name="_subject" value="New website enquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={`${siteUrl}/?sent=1#contact`} />
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={label}>
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={field}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className={error}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={label}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={field}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className={error}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className={label}>
                    Phone (optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className={label}>
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="For example: a family vineyard planning for the next owner, or books that fell behind during harvest."
                    className={field}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className={error}>
                      {errors.message}
                    </p>
                  )}
                </div>
                <div>
                  <button type="submit" className={buttonClass}>
                    Send message
                  </button>
                </div>
              </form>
            )}
          </Rise>
        </div>
      </RiseGroup>
    </section>
  );
}
