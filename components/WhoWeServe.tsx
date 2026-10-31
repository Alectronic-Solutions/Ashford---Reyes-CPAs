import Image from 'next/image';
import { Rise, RiseGroup } from './Reveal';
import { ParallaxPhoto } from './ParallaxPhoto';

const subhead = 'font-display text-[clamp(1.875rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]';

const businessNeeds = [
  'Monthly bookkeeping and payroll',
  'Sales tax and quarterly filings',
  'Entity choice and how owners get paid',
  'Year-end planning in the fall, not in March',
];

export function WhoWeServe() {
  return (
    <section id="who-we-serve" aria-labelledby="serve-title" className="scroll-mt-4 pb-24 md:pb-40">
      <RiseGroup>
        <div className="grid gap-8 px-5 md:grid-cols-12 md:gap-8 md:px-8">
          <Rise className="md:col-span-5">
            <h2 id="serve-title" className="text-h2">
              Who we serve
            </h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="max-w-[36ch] text-statement">
              Three kinds of clients, three different years. We learn yours before we give advice.
            </p>
          </Rise>
        </div>
      </RiseGroup>

      {/* Farms and wineries: a full-bleed photograph with the copy set on a flat panel across its lower edge. */}
      <div className="mt-14 md:mt-24">
        <ParallaxPhoto
          src="/photos/serve-farm.jpg"
          alt="Late sun over open farmland with a lone tree, a small farmhouse and cattle grazing in the distance"
          sizes="100vw"
          className="h-[52svh] md:h-[72svh]"
        />
        <RiseGroup>
          <div className="relative -mt-20 bg-surface p-6 md:-mt-40 md:ml-[8.3333%] md:w-7/12 md:p-12">
            <Rise>
              <h3 className={subhead}>Farms and wineries</h3>
            </Rise>
            <Rise>
              <p className="mt-6 max-w-[52ch]">
                Grapes, cherries, almonds and walnuts each keep their own calendar, and the cash arrives in a few big
                months. We keep your books through harvest and crush, plan equipment and land purchases before they
                happen, and set estimated payments around when you actually get paid.
              </p>
            </Rise>
            <Rise>
              <p className="mt-4 max-w-[52ch]">
                Many Lodi growers also run a tasting room, a packing shed or a family partnership. We handle the
                entity returns and the succession paperwork alongside your attorney.
              </p>
            </Rise>
          </div>
        </RiseGroup>
      </div>

      {/* Small businesses: copy and a plain list on one side, a tall photograph on the other. */}
      <RiseGroup>
        <div className="mt-20 grid gap-10 px-5 md:mt-40 md:grid-cols-12 md:items-center md:gap-8 md:px-8">
          <Rise className="relative aspect-[4/3] md:order-2 md:col-span-5 md:col-start-8 md:aspect-[4/5]">
            <Image
              src="/photos/serve-business.jpg"
              alt="A row of brick storefronts on a small-town main street in low evening light"
              fill
              sizes="(min-width: 768px) 41vw, 100vw"
              className="object-cover object-[62%_50%]"
            />
          </Rise>
          <div className="md:order-1 md:col-span-6">
            <Rise>
              <h3 className={subhead}>Small businesses</h3>
            </Rise>
            <Rise>
              <p className="mt-6 max-w-[48ch]">
                Shops, contractors, restaurants, clinics and the people who work in them. You want one accountant who
                knows your books, picks up the phone, and tells you what a new hire or a second location will do to
                your taxes before you sign anything.
              </p>
            </Rise>
            <Rise>
              <ul className="mt-8 grid max-w-[48ch] gap-1.5">
                {businessNeeds.map((need) => (
                  <li key={need} className="bg-surface px-4 py-3.5 font-medium">
                    {need}
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </RiseGroup>

      {/* Families: a smaller, quieter row, since a household does not need a campaign. */}
      <RiseGroup>
        <div className="mx-5 mt-20 md:mx-8 md:mt-40">
          <Rise className="grid items-center gap-6 bg-surface p-6 md:grid-cols-12 md:gap-10 md:p-10">
            <div className="relative aspect-[3/2] md:col-span-4 lg:col-span-3">
              <Image
                src="/photos/serve-family.jpg"
                alt="Family and friends reaching across a wooden dinner table to raise their glasses"
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-8 md:pr-10 lg:col-span-9">
              <h3 className="text-statement">Families</h3>
              <p className="mt-3 max-w-[62ch]">
                Wages, a rental, a side business, a child heading to college, a parent who needs help. We prepare your
                federal and California returns, plan around the big events, and explain the numbers in plain words. If a
                family business or farm is part of the picture, we look at the household and the business together.
              </p>
            </div>
          </Rise>
        </div>
      </RiseGroup>
    </section>
  );
}
