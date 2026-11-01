import { pageMetadata } from '@/lib/metadata';
import { glue } from '@/lib/text';
import { contactInfo } from '@/lib/site';
import { PageHeader } from '@/components/PageHeader';
import { Rise, RiseGroup } from '@/components/Reveal';
import { Tilt } from '@/components/Depth';
import { buttonClass } from '@/components/Button';

export const metadata = pageMetadata({
  title: 'Careers',
  description: 'Sample openings at Ashford and Reyes CPAs in Lodi, California: tax, accounting and bookkeeping roles.',
  path: '/careers',
});

const reasons = glue([
  {
    title: 'A calendar you can plan a life around',
    text: 'Busy season is real, and we say so up front. Summers are lighter, and every hour past fifty in a week is paid back as time off.',
  },
  {
    title: 'Clients you will get to know',
    text: 'You keep the same clients year after year, so you learn the farm, the shop or the family, not just the return.',
  },
  {
    title: 'Paid for the CPA exam',
    text: 'Review course, exam fees and study days are on the firm, and passing a section comes with a raise.',
  },
  {
    title: 'A short commute',
    text: 'One office in Lodi, two days a week from home outside busy season, and an easy drive from anywhere in the county.',
  },
]);

const roles = glue([
  {
    title: 'Staff accountant',
    terms: 'Full time, in Lodi',
    text: 'Prepare individual, partnership and farm returns, help with quarterly estimates and payroll filings, and sit in on client meetings from your first season.',
    asks: ['A degree in accounting, or close to one', 'Interest in the CPA license', 'Comfort with spreadsheets and QuickBooks'],
  },
  {
    title: 'Seasonal tax preparer',
    terms: 'January to April, full or part time',
    text: 'Prepare family and small business returns through busy season, with a reviewer beside you and a clear checklist for every return.',
    asks: ['At least one season of return preparation', 'An IRS preparer tax identification number', 'Patience with a box of papers'],
  },
  {
    title: 'Bookkeeping associate',
    terms: 'Full time, in Lodi',
    text: 'Close monthly books for farm and small business clients, reconcile accounts, run payroll and help rebuild books that fell behind.',
    asks: ['Two years of bookkeeping', 'QuickBooks Online, or the will to learn it fast', 'An eye for the number that looks wrong'],
  },
]);

const apply = (role: string) =>
  `${contactInfo.emailHref}?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(
    'Please attach your resume and tell us a little about yourself.',
  )}`;

export default function Page() {
  return (
    <>
      <PageHeader
        title="Careers"
        lede="Work on the Lodi calendar, with clients you know by name."
        note="Sample openings for demonstration. These roles are not real."
        photo={{ src: '/photos/meeting-advisor.jpg', alt: 'An advisor walking a client through printed figures across a wooden desk' }}
      />

      <section aria-labelledby="why-title" className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <RiseGroup className="md:col-span-5">
            <Rise mask>
              <h2 id="why-title" className="text-h2">
                Why people stay
              </h2>
            </Rise>
          </RiseGroup>
          <RiseGroup as="ul" className="grid gap-10 md:col-span-7 lg:grid-cols-2 lg:gap-x-8">
            {reasons.map((r) => (
              <Rise as="li" key={r.title} className="rounded-lg border-l-4 border-accent pl-5">
                <h3 className="text-h3">{r.title}</h3>
                <p className="mt-3 max-w-[44ch]">{r.text}</p>
              </Rise>
            ))}
          </RiseGroup>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="slab bg-ink px-5 py-24 text-bg md:px-8 md:py-40">
        <div className="mx-auto max-w-[90rem]">
          <RiseGroup>
            <Rise mask>
              <h2 id="roles-title" className="text-h2">
                Open roles
              </h2>
            </Rise>
          </RiseGroup>
          <RiseGroup as="ul" className="mt-12 grid gap-6 md:mt-20 lg:grid-cols-3 lg:gap-8">
            {roles.map((r) => (
              <Tilt as="li" key={r.title} max={4}>
                <div className="flex h-full flex-col rounded-2xl bg-bg p-6 text-ink shadow-rest md:p-8">
                  <h3 className="text-h3">{r.title}</h3>
                  <p className="mt-1 font-medium text-accent">{r.terms}</p>
                  <p className="mt-5">{r.text}</p>
                  <ul className="mt-5 grid gap-2">
                    {r.asks.map((a) => (
                      <li key={a} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <a href={apply(r.title)} className={buttonClass}>
                      Apply for this role
                    </a>
                  </div>
                </div>
              </Tilt>
            ))}
          </RiseGroup>
          <p className="mt-12 max-w-[56ch]">
            Not quite one of these? Write to{' '}
            <a href={contactInfo.emailHref} className="font-medium underline underline-offset-4 hover:no-underline">
              {contactInfo.email}
            </a>{' '}
            and tell us what you are good at.
          </p>
        </div>
      </section>
    </>
  );
}
