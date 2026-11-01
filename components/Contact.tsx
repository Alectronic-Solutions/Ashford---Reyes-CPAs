'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Rise, RiseGroup } from './Reveal';
import { buttonClass } from './Button';
import { AreaMap } from './AreaMap';
import { useDepth } from './Depth';
import { contactInfo, site } from '@/lib/site';
import { services } from '@/lib/services';
import { ExampleNotice, type ExampleNoticeHandle } from './ExampleNotice';

const clientTypes = ['Farm or winery', 'Small business', 'Family', 'Something else'];
const needOptions = [...services.map((s) => s.name), 'Not sure yet'];
const timings = ['This week', 'This month', 'Before the year ends', 'Just exploring'];
const reaches = ['Phone call', 'Email', 'Video call', 'In person at the office'];

const stepNames = ['Who you are', 'What you need', 'When and how', 'Your details'];

type Errors = Partial<Record<'type' | 'needs' | 'timing' | 'reach' | 'name' | 'email' | 'phone', string>>;

const field =
  'mt-2 block w-full border border-ink/60 bg-bg px-4 py-3.5 text-body text-ink placeholder:text-ink/70';
const label = 'block text-small font-medium';
const errorText = 'mt-2 text-small font-medium text-accent';
const contactLink = 'inline-block py-2.5 underline underline-offset-4 hover:no-underline';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A large tappable choice: a real radio or checkbox inside a label, styled as a tile. */
function Choice({
  type,
  name,
  value,
  checked,
  onChange,
}: {
  type: 'radio' | 'checkbox';
  name?: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-14 cursor-pointer items-center gap-3 px-4 py-3 font-medium transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        checked ? 'bg-ink text-bg' : 'bg-surface hover:bg-ink/15'
      }`}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="h-5 w-5 accent-accent" />
      {value}
    </label>
  );
}

function Group({ legend, error, id, children }: { legend: string; error?: string; id: string; children: ReactNode }) {
  return (
    <fieldset id={id} aria-labelledby={`${id}-title`} aria-describedby={error ? `${id}-error` : undefined}>
      <h3 id={`${id}-title`} className="text-h3">
        {legend}
      </h3>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className={errorText}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Contact() {
  const notice = useRef<ExampleNoticeHandle>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { scroll } = useDepth();
  // Before the script runs every step shows at once, so the form still works as one plain page.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [step, setStep] = useState(0);
  const [type, setType] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [timing, setTiming] = useState('');
  const [reach, setReach] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  // The first invalid field after a failed Continue or Send; the effect below focuses it once the right step is drawn.
  const focusAfter = useRef<keyof Errors | null>(null);

  function fail(found: Errors) {
    setErrors(found);
    focusAfter.current = (Object.keys(found)[0] as keyof Errors | undefined) ?? null;
  }

  useEffect(() => {
    const key = focusAfter.current;
    if (!key) return;
    focusAfter.current = null;
    const el = document.getElementById(`contact-${key}`);
    (el instanceof HTMLFieldSetElement ? el.querySelector<HTMLElement>('input') : el)?.focus();
  }, [errors, step]);

  // Field names only exist on the visible text inputs and checkboxes before the script runs; afterwards hidden inputs carry them.
  // Radios always keep their name so each set is a real radio group (arrow keys move between choices).
  const n = (fieldName: string) => (mounted ? undefined : fieldName);

  function check(which: number): Errors {
    const found: Errors = {};
    if (which === 0 && !type) found.type = 'Choose the one that fits best.';
    if (which === 1 && needs.length === 0) found.needs = 'Choose at least one, or Not sure yet.';
    if (which === 2) {
      if (!timing) found.timing = 'Choose a time frame.';
      if (!reach) found.reach = 'Choose how we should reach you.';
    }
    if (which === 3) {
      if (!name.trim()) found.name = 'Enter your name.';
      if (!emailPattern.test(email.trim())) found.email = 'Enter an email address like name@example.com.';
      if (reach === 'Phone call' && phone.trim().length < 7) found.phone = 'Enter a phone number so we can call you.';
    }
    return found;
  }

  function go(next: number) {
    if (next > step) {
      const found = check(step);
      if (Object.keys(found).length) {
        fail(found);
        return;
      }
      setErrors(found);
    } else {
      setErrors({});
    }
    setStep(next);
    // Move focus to the new step's question, so keyboard and screen reader users land in the right place.
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('input, textarea')?.focus());
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (mounted) {
      for (const s of [0, 1, 2, 3]) {
        const found = check(s);
        if (Object.keys(found).length) {
          event.preventDefault();
          fail(found);
          setStep(s);
          return;
        }
      }
    }
    if (!site.formsLive) {
      event.preventDefault();
      event.currentTarget.reset();
      setType('');
      setNeeds([]);
      setTiming('');
      setReach('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStep(0);
      notice.current?.open();
    }
  }

  const toggleNeed = (value: string) =>
    setNeeds((now) => (now.includes(value) ? now.filter((v) => v !== value) : [...now, value]));

  const steps = [
    <Group key="type" id="contact-type" legend="Who is this for?" error={errors.type}>
      {clientTypes.map((v) => (
        <Choice key={v} type="radio" name="client_type" value={v} checked={type === v} onChange={() => setType(v)} />
      ))}
    </Group>,
    <Group key="needs" id="contact-needs" legend="What do you need help with?" error={errors.needs}>
      {needOptions.map((v) => (
        <Choice
          key={v}
          type="checkbox"
          name={n('needs')}
          value={v}
          checked={needs.includes(v)}
          onChange={() => toggleNeed(v)}
        />
      ))}
    </Group>,
    <div key="when" className="grid gap-10">
      <Group id="contact-timing" legend="When would you like to start?" error={errors.timing}>
        {timings.map((v) => (
          <Choice key={v} type="radio" name="timing" value={v} checked={timing === v} onChange={() => setTiming(v)} />
        ))}
      </Group>
      <Group id="contact-reach" legend="How should we reach you?" error={errors.reach}>
        {reaches.map((v) => (
          <Choice key={v} type="radio" name="reach" value={v} checked={reach === v} onChange={() => setReach(v)} />
        ))}
      </Group>
    </div>,
    <fieldset key="details" aria-labelledby="contact-details-title" className="grid gap-6">
      <h3 id="contact-details-title" className="text-h3">
        Your details
      </h3>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            Your name
          </label>
          <input
            id="contact-name"
            name={n('name')}
            type="text"
            autoComplete="name"
            aria-required="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={field}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className={errorText}>
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
            name={n('email')}
            type="email"
            autoComplete="email"
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={field}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className={errorText}>
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>
          Phone {reach === 'Phone call' ? '' : '(optional)'}
        </label>
        <input
          id="contact-phone"
          name={n('phone')}
          type="tel"
          autoComplete="tel"
          aria-required={reach === 'Phone call' ? true : undefined}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={field}
        />
        {errors.phone && (
          <p id="contact-phone-error" role="alert" className={errorText}>
            {errors.phone}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>
          Anything else we should know? (optional)
        </label>
        <textarea
          id="contact-message"
          name={n('message')}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="For example: a family vineyard planning for the next owner, or books that fell behind during harvest."
          className={field}
        />
      </div>
    </fieldset>,
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-surface px-5 py-24 md:px-8 md:py-40"
    >
      <RiseGroup className="mx-auto grid max-w-[90rem] gap-12 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-12">
        <Rise className="md:col-span-5 md:col-start-1 md:row-start-1" mask>
          <h2 id="contact-title" className="text-h2">
            Book a consultation
          </h2>
          <p className="mt-6 max-w-[38ch] text-statement">
            Your first conversation is free, and we reply within one business day.
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
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
                <a href={contactInfo.emailHref} className={`${contactLink} break-all`}>
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium">Where we meet</dt>
              <dd>
                {contactInfo.meetings} {contactInfo.hours}
              </dd>
            </div>
          </dl>
        </Rise>

        <Rise className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:sticky md:top-28 md:self-start">
          <form
            action={contactInfo.formAction}
            method="POST"
            noValidate
            onSubmit={onSubmit}
            className="bg-bg p-6 shadow-lift md:p-10"
          >
            <input type="hidden" name="_subject" value="New consultation request" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`${site.url}/thanks`} />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
            {mounted && (
              <>
                <input type="hidden" name="client_type" value={type} />
                <input type="hidden" name="needs" value={needs.join(', ')} />
                <input type="hidden" name="timing" value={timing} />
                <input type="hidden" name="reach" value={reach} />
                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />
                <input type="hidden" name="message" value={message} />
              </>
            )}

            {mounted ? (
              <>
                {/* Progress: a filled bar and the four step names, the current one in full ink. */}
                <div aria-hidden="true">
                  <div className="h-1.5 bg-surface">
                    <div
                      className="h-full bg-accent transition-[width] duration-500"
                      style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="sr-only" aria-live="polite">
                  {stepNames[step]}, part {step + 1} of {steps.length}
                </p>
                <div ref={panel} className="mt-8 [perspective:1400px] md:mt-10">
                  <motion.div
                    key={step}
                    initial={scroll ? { opacity: 0, rotateY: -18, x: 40 } : { opacity: 0 }}
                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="origin-left"
                  >
                    {steps[step]}
                  </motion.div>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => go(step - 1)}
                      className="inline-flex items-center px-5 py-4 font-medium underline underline-offset-4 hover:no-underline"
                    >
                      Back
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button key="continue" type="button" onClick={() => go(step + 1)} className={buttonClass}>
                      Continue
                    </button>
                  ) : (
                    <button key="send" type="submit" className={buttonClass}>
                      Send request
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="grid gap-12">
                {steps}
                <div>
                  <button type="submit" className={buttonClass}>
                    Send request
                  </button>
                </div>
              </div>
            )}
          </form>
          <ExampleNotice
            ref={notice}
            onClose={() => panel.current?.querySelector<HTMLElement>('input, textarea')?.focus()}
          />
        </Rise>
        <Rise className="md:col-span-5 md:col-start-1 md:row-start-2 md:self-start">
          <AreaMap />
        </Rise>
      </RiseGroup>
    </section>
  );
}
