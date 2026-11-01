import Image from 'next/image';
import Link from 'next/link';
import { Rise, RiseGroup } from './Reveal';
import { textLink } from './Button';

const questions = [
  {
    q: 'What should I bring to a first meeting?',
    a: 'Your last two years of returns, recent bank and loan statements, payroll reports if you have employees, and a list of questions. If you are unsure, bring what you have. We would rather sort a box of papers than have you leave something out.',
  },
  {
    q: 'My income arrives in a few big months. How do you plan around that?',
    a: 'We keep your books monthly through the busy season so the numbers are current when the money comes in, then look at tax payments and large purchases against your actual cash calendar. The rules for timing payments depend on your situation, so we confirm them with you each year.',
  },
  {
    q: 'Is bookkeeping software enough, or do I need a CPA?',
    a: 'Software records what happened. It does not tell you whether a transaction is in the right category or what it means for your taxes. Many owners use both: the software day to day, and us reviewing it monthly or quarterly.',
  },
  {
    q: 'What if I am behind on filing or on my books?',
    a: 'It is common and it is fixable. We start with whatever records exist, rebuild missing months from bank statements, and then work out what needs to be filed. Sooner is better, because penalties and interest generally grow with time.',
  },
  {
    q: 'I got a letter from a tax agency. What now?',
    a: 'Do not ignore it, and do not panic. Notices usually print a response deadline, so send us a copy right away. We read what is being asked, check it against your records, and tell you whether it needs a reply, a payment or nothing at all.',
  },
  {
    q: 'How do I choose between a sole proprietorship, partnership, LLC or corporation?',
    a: 'It depends on liability, how many owners there are, how you pay yourself and what you want to hand down. The rules differ by type and change over time, so we compare the options using your numbers, usually alongside your attorney, who handles the legal filings.',
  },
  {
    q: 'How long should I keep my records?',
    a: 'Many people keep returns and their supporting papers for several years. Records tied to property, equipment or a business sale are often kept longer. Ask us for a list specific to your operation and we will write it down.',
  },
  {
    q: 'Can we work together if I cannot come in during harvest?',
    a: 'Yes. Documents go through secure upload, and we can talk by phone or video at an hour that suits your day. When it helps, we meet in person, at the office or at your own kitchen table.',
  },
];

export function Faq({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const home = variant === 'home';
  const shown = home ? questions.slice(0, 4) : questions;
  return (
    <section
      id="faq"
      aria-labelledby={home ? 'faq-title' : undefined}
      aria-label={home ? undefined : 'Questions and answers'}
      className={`mx-auto max-w-page scroll-mt-24 px-5 pb-24 md:px-8 md:pb-40 ${home ? 'pt-8 md:pt-16' : ''}`}
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <RiseGroup className={home ? 'md:col-span-4' : 'md:col-span-4 lg:col-span-5'}>
          <div className="md:sticky md:top-28">
            {home ? (
              <>
                <Rise mask>
                  <h2 id="faq-title" className="text-h2">
                    Questions we hear
                  </h2>
                </Rise>
                <Rise>
                  <p className="mt-6 max-w-[30ch] text-small">
                    Sample content for demonstration. These answers are general and are not advice for your situation.
                  </p>
                </Rise>
              </>
            ) : (
              <Rise className="relative aspect-[4/3] md:aspect-[4/5]">
                <Image
                  src="/photos/hero-end.jpg"
                  alt="A W-9 and a 1040 form lying on a desk"
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover object-[30%_50%]"
                />
              </Rise>
            )}
          </div>
        </RiseGroup>

        <RiseGroup className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          <Rise>
            <div className="grid gap-1.5">
              {shown.map((item) => (
                <details key={item.q} className="group bg-surface">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 font-display text-h3 font-semibold [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="relative mt-2 h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-accent" />
                      <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-accent group-open:hidden" />
                    </span>
                  </summary>
                  <p className="max-w-[56ch] px-5 pb-7 pr-10">{item.a}</p>
                </details>
              ))}
            </div>
          </Rise>
          {home && (
            <Rise className="mt-6">
              <Link href="/faq" className={textLink}>
                All {questions.length} questions
              </Link>
            </Rise>
          )}
        </RiseGroup>
      </div>
    </section>
  );
}
