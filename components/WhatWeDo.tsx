import { Rise, RiseGroup, RiseRow, RisePart } from './Reveal';

const services = [
  {
    name: 'Tax',
    text: 'Federal and California returns for farms, wineries, partnerships, S corporations and families. We handle quarterly estimates and plan through the year, so April holds no surprises.',
  },
  {
    name: 'Bookkeeping',
    text: 'Monthly books kept current through harvest and crush, when cash moves fast. Payroll, sales tax, bank reconciliations and the year-end close, in QuickBooks or the system you already use.',
  },
  {
    name: 'Advisory',
    text: 'Straight answers before you commit: which entity fits, how to finance a press or new acreage, what a tasting room or a second location does to your taxes, and how to budget around the season.',
  },
  {
    name: 'Estate and succession',
    text: 'Handing the farm, the winery or the shop to whoever comes next takes years of planning. We work alongside your attorney on succession, buy-sell agreements, and the tax side of gifts and transfers.',
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="mx-auto max-w-page scroll-mt-24 px-5 py-24 md:px-8 md:py-40">
      <RiseGroup>
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-5">
            <h2 className="text-h2">What we do</h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="max-w-[36ch] text-statement">
              Lodi runs on harvest, crush and quarter end. Our work follows the same calendar.
            </p>
          </Rise>
        </div>
      </RiseGroup>
      <RiseGroup as="ul" className="mt-12 grid gap-10 md:mt-20 md:gap-14">
        {services.map((s) => (
          <RiseRow key={s.name} className="grid gap-3 md:grid-cols-12 md:gap-8">
            <RisePart as="h3" className="text-statement md:col-span-5">
              {s.name}
            </RisePart>
            <RisePart as="p" className="max-w-[60ch] md:col-span-7">
              {s.text}
            </RisePart>
          </RiseRow>
        ))}
      </RiseGroup>
    </section>
  );
}
