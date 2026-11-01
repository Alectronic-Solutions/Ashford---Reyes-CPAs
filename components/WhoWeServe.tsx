import Image from 'next/image';
import Link from 'next/link';
import { Rise, RiseGroup } from './Reveal';
import { ParallaxPhoto } from './ParallaxPhoto';
import { textLink } from './Button';
import { DepthPhoto } from './Depth';

const subhead = 'font-display text-h2 font-semibold';

const businessNeeds = [
  'Monthly bookkeeping and payroll',
  'Sales tax and quarterly filings',
  'Entity choice and how owners get paid',
  'Year-end planning in the fall, not in March',
];

export function WhoWeServe() {
  return (
    <section id="who-we-serve" aria-labelledby="serve-title" className="mx-auto max-w-page scroll-mt-24 pb-24 md:pb-40">
      <RiseGroup>
        <div className="grid gap-8 px-5 text-center md:grid-cols-12 md:gap-8 md:px-8 md:text-left">
          <Rise className="md:col-span-5" mask>
            <h2 id="serve-title" className="text-h2">
              Who we serve
            </h2>
          </Rise>
          <Rise className="md:col-span-7 md:pt-3">
            <p className="mx-auto max-w-[36ch] text-statement md:mx-0">
              Three kinds of clients, three different years. We learn yours before we give advice.
            </p>
          </Rise>
        </div>
      </RiseGroup>

      {/* Farms and wineries: a full-bleed photograph with the copy set on a flat panel across its lower edge. */}
      <div className="mt-14 md:mt-24">
        <ParallaxPhoto
          src="/photos/rows-aerial.jpg"
          alt="Long rows of grapevines seen from the air, split by a line of trees"
          sizes="100vw"
          className="h-[52svh] md:h-[72svh]"
        />
        <RiseGroup>
          <div className="relative -mt-20 rounded-3xl bg-delta p-6 text-center text-bg shadow-lift md:-mt-48 md:text-left md:ml-[8.3333%] md:w-7/12 md:p-12">
            <Rise>
              <h3 className={subhead}>Farms and wineries</h3>
            </Rise>
            <Rise>
              <p className="mx-auto mt-6 max-w-[52ch] md:mx-0">
                Grapes, cherries, almonds and walnuts each keep their own calendar, and the cash arrives in a few big
                months. We keep your books through harvest and crush, plan equipment and land purchases before they
                happen, and set estimated payments around when you get paid.
              </p>
            </Rise>
            <Rise>
              <p className="mx-auto mt-4 max-w-[52ch] md:mx-0">
                Many Lodi growers also run a tasting room, a packing shed or a family partnership. We handle the
                entity returns and the succession paperwork alongside your attorney.
              </p>
            </Rise>
            <Rise>
              <Link prefetch={false}
                href="/industries/farms-wineries"
                className="mt-4 inline-block py-3 font-medium underline decoration-bg/60 decoration-2 underline-offset-8 hover:decoration-bg"
              >
                How we work with farms and wineries
              </Link>
            </Rise>
          </div>
        </RiseGroup>
      </div>

      {/* Small businesses: copy and a plain list on one side, a tall photograph on the other. */}
      <RiseGroup>
        <div className="mt-20 grid gap-10 px-5 md:mt-40 md:grid-cols-12 md:items-center md:gap-8 md:px-8">
          <Rise className="md:order-2 md:col-span-5 md:col-start-7">
            <DepthPhoto
              src="/photos/serve-business.jpg"
              alt="Two shop owners in aprons standing outside their storefront, one holding a Yes We’re Open sign"
              sizes="(min-width: 768px) 41vw, 100vw"
              className="aspect-[4/3] md:aspect-[4/5]"
              imageClassName="object-[47%_50%]"
            />
          </Rise>
          <div className="text-center md:order-1 md:col-span-5 md:col-start-2 md:text-left">
            <Rise>
              <h3 className={subhead}>Small businesses</h3>
            </Rise>
            <Rise>
              <p className="mx-auto mt-6 max-w-[48ch] md:mx-0">
                Shops, contractors, restaurants, clinics and the people who work in them. You want one accountant who
                knows your books, picks up the phone, and tells you what a new hire or a second location will do to
                your taxes before you sign anything.
              </p>
            </Rise>
            <Rise>
              <ul className="mx-auto mt-8 grid w-fit max-w-[48ch] gap-3 text-left md:mx-0 md:w-auto">
                {businessNeeds.map((need) => (
                  <li key={need} className="flex items-baseline gap-4 font-medium">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full bg-accent" />
                    {need}
                  </li>
                ))}
              </ul>
            </Rise>
            <Rise>
              <Link prefetch={false} href="/industries/small-business" className={`${textLink} mt-6`}>
                How we work with small businesses
              </Link>
            </Rise>
          </div>
        </div>
      </RiseGroup>

      {/* Families: a smaller, quieter row, since a household does not need a campaign. */}
      <RiseGroup>
        <div className="mx-5 mt-20 md:mx-8 md:mt-40">
          <Rise className="rounded-3xl bg-surface p-6 shadow-rest md:p-10">
           <div className="mx-auto grid max-w-[76rem] items-center gap-6 md:grid-cols-12 md:gap-10">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl md:col-span-4 lg:col-span-3">
              <Image
                src="/photos/serve-family.jpg"
                alt="Family and friends reaching across a wooden dinner table to raise their glasses"
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="text-center md:col-span-8 md:pr-10 md:text-left lg:col-span-9">
              <h3 className="text-statement">Families</h3>
              <p className="mx-auto mt-3 max-w-[62ch] md:mx-0">
                Wages, a rental, a side business, a child heading to college, a parent who needs help. We prepare your
                federal and California returns, plan around the big events, and explain the numbers in plain words. If a
                family business or farm is part of the picture, we look at the household and the business together.
              </p>
              <Link prefetch={false} href="/industries/families" className={`${textLink} mt-2`}>
                How we work with families
              </Link>
            </div>
           </div>
          </Rise>
        </div>
      </RiseGroup>
    </section>
  );
}
