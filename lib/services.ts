import { glue } from './text';
export type Service = {
  slug: string;
  name: string;
  /** The paragraph on the home page. */
  summary: string;
  /** The one sentence under the h1 on the service's own page. */
  lede: string;
  /** Short description for menus and link previews. */
  blurb: string;
  photo: { src: string; alt: string };
  included: { name: string; text: string }[];
  contact: string;
  questions: { q: string; a: string }[];
  insight?: string;
};

export const services: Service[] = glue([
  {
    slug: 'tax',
    name: 'Tax',
    summary:
      'Federal and California returns for farms, wineries, partnerships, S corporations and families. We handle quarterly estimates and plan through the year, so April holds no surprises.',
    lede: 'Federal and California returns, planned through the year so April holds no surprises.',
    blurb: 'Returns, estimates and year-round planning.',
    photo: { src: '/photos/desk-tax.jpg', alt: 'Overhead view of an accountant working through a tax form with a calculator, between folders and a laptop' },
    included: [
      {
        name: 'Business returns',
        text: 'Partnerships, S corporations, C corporations and Schedule F farm returns, with the California returns that go with them.',
      },
      {
        name: 'Individual and family returns',
        text: 'Wages, rentals, a side business, K‑1s from the family operation, and the credits and deductions that come with children and college.',
      },
      {
        name: 'Estimated payments',
        text: 'Federal and California estimates set around when your money actually arrives, including the single-payment option for qualifying farmers.',
      },
      {
        name: 'The fall planning meeting',
        text: 'Every client with a business or farm gets a meeting each October or November, while there is still time to act before December 31.',
      },
      {
        name: 'Trust and estate returns',
        text: 'Fiduciary returns for family trusts and estates, prepared alongside your attorney and explained to every beneficiary who asks.',
      },
      {
        name: 'Notices and letters',
        text: 'Send us any letter from the IRS or the Franchise Tax Board. We read it, check it against your records and handle the reply.',
      },
    ],
    contact: 'Eleanor Reyes',
    questions: [
      {
        q: 'When should we start on this year?',
        a: 'In the fall, before the year closes. Most of what lowers a tax bill has to happen by December 31, so the planning meeting matters more than the April appointment.',
      },
      {
        q: 'Do you prepare both federal and California returns?',
        a: 'Yes. California departs from federal rules in several places, depreciation among them, so we prepare both together and show you where they differ.',
      },
      {
        q: 'Can you speak to the IRS for me?',
        a: 'Yes. As CPAs we can represent you before the IRS and the Franchise Tax Board once you sign an authorization, so the calls and letters come to us.',
      },
    ],
    insight: '2026-year-end-tax-planning',
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    summary:
      'Monthly books kept current through harvest and crush, when cash moves fast. Payroll, sales tax, bank reconciliations and the year-end close, in QuickBooks or the system you already use.',
    lede: 'Books kept current every month, including the months when you have no time to look at them.',
    blurb: 'Monthly books, payroll and sales tax.',
    photo: { src: '/photos/desk-receipts.jpg', alt: 'Hands sorting orange receipts beside a red calculator and printed statements' },
    included: [
      {
        name: 'Monthly close',
        text: 'Every bank, card and loan account reconciled each month, with transactions in the right categories and a short report you can read in five minutes.',
      },
      {
        name: 'Payroll',
        text: 'Pay runs, quarterly payroll returns, W-2s and 1099s, including seasonal and farm labor that comes and goes with harvest.',
      },
      {
        name: 'Sales and use tax',
        text: 'California sales tax returns for shops, restaurants and tasting rooms, filed on time and matched to the books.',
      },
      {
        name: 'Catch-up and cleanup',
        text: 'Months or years behind? We rebuild the books from bank statements so the returns can be filed and the lender gets what it asked for.',
      },
      {
        name: 'Software setup',
        text: 'QuickBooks Online set up for your kind of operation, connected to your bank, and a short training session for whoever enters the receipts.',
      },
      {
        name: 'Year-end close',
        text: 'Inventory, accruals and depreciation booked so the year ends clean and the tax return starts from numbers we trust.',
      },
    ],
    contact: 'Ruth Castellano',
    questions: [
      {
        q: 'Do we have to switch software?',
        a: 'Usually not. We work in QuickBooks Online and Desktop, Xero, and most farm accounting packages. If your system is the problem, we will say so and help you move.',
      },
      {
        q: 'How do we send you receipts and statements?',
        a: 'Most clients connect their bank feeds and snap receipts with their phone. Paper still works too: drop a folder off when we meet.',
      },
      {
        q: 'What does it cost?',
        a: 'A flat monthly fee based on the number of accounts and how many transactions you run, agreed in writing before we start. No surprise bills for questions.',
      },
    ],
    insight: 'farm-estimated-tax-payments',
  },
  {
    slug: 'advisory',
    name: 'Advisory',
    summary:
      'Straight answers before you commit: which entity fits, how to finance a press or new acreage, what a tasting room or a second location does to your taxes, and how to budget around the season.',
    lede: 'Straight answers before you sign, buy, hire or expand.',
    blurb: 'Entity choice, budgets and big decisions.',
    photo: { src: '/photos/meeting-advisor.jpg', alt: 'An advisor in a suit walking a client through printed figures across a wooden desk' },
    included: [
      {
        name: 'Entity choice',
        text: 'Sole proprietor, partnership, LLC or S corporation, compared with your own numbers, and how the owners should pay themselves.',
      },
      {
        name: 'Equipment and land',
        text: 'Buy, lease or finance, and how the timing of the purchase changes this year’s tax and next year’s cash.',
      },
      {
        name: 'Seasonal budgets',
        text: 'A twelve-month cash forecast built around harvest, crush or your busy season, so the slow months are planned for and not just endured.',
      },
      {
        name: 'Expansion',
        text: 'A second location, a tasting room, a packing shed or a new crop. We model what it does to profit, payroll and taxes before you commit.',
      },
      {
        name: 'Lender packages',
        text: 'Financial statements and projections put together the way your bank or Farm Credit lender wants to see them.',
      },
      {
        name: 'Buying or selling a business',
        text: 'The tax side of a purchase or sale, how the price is allocated, and what you actually keep after closing.',
      },
    ],
    contact: 'Jordan Whitfield',
    questions: [
      {
        q: 'Is advisory only for larger businesses?',
        a: 'No. Many of our advisory calls are a single question from a small owner: should I buy this truck in December or January? Those calls are part of the relationship.',
      },
      {
        q: 'Do you work with our banker and attorney?',
        a: 'Yes, and we prefer to. Decisions go better when the CPA, the lender and the attorney are looking at the same numbers.',
      },
      {
        q: 'How often do we meet?',
        a: 'At least once in the fall for planning, and whenever a decision comes up. Some clients prefer a short quarterly review of the numbers.',
      },
    ],
  },
  {
    slug: 'estate-succession',
    name: 'Estate and succession',
    summary:
      'Handing the farm, the winery or the shop to whoever comes next takes years of planning. We work alongside your attorney on succession, buy-sell agreements, and the tax side of gifts and transfers.',
    lede: 'A plan for handing on the farm, the winery or the shop, years before anyone needs it.',
    blurb: 'Succession, gifts and family transfers.',
    photo: { src: '/photos/farm-aerial.jpg', alt: 'A farmhouse among autumn trees, seen from above with vineyard rows on every side' },
    included: [
      {
        name: 'Succession plans',
        text: 'Who takes over, when, and how ownership moves in stages, written down so every family member hears the same plan.',
      },
      {
        name: 'Buy-sell agreements',
        text: 'The numbers behind the agreement your attorney drafts: valuation methods, funding and what happens when a partner leaves.',
      },
      {
        name: 'Gift and estate returns',
        text: 'Federal gift tax returns for transfers above the annual exclusion, and the estate return when a parent passes.',
      },
      {
        name: 'Family entities',
        text: 'Partnerships and LLCs that hold land and equipment, set up so the next generation can step in without starting over.',
      },
      {
        name: 'Trusts',
        text: 'Annual trust returns and the accounting a trustee owes the beneficiaries, prepared so the trustee can sleep at night.',
      },
      {
        name: 'Valuations',
        text: 'We coordinate land and business appraisals so the values used for gifts and estates hold up later.',
      },
    ],
    contact: 'Marcus Ashford',
    questions: [
      {
        q: 'When should we start a succession plan?',
        a: 'Earlier than feels necessary. A plan that moves ownership in stages over five to ten years has far more options than one made in a hurry.',
      },
      {
        q: 'Does California have an estate tax?',
        a: 'No, California has no estate or inheritance tax of its own. The federal estate tax and income tax on later sales are what we plan around.',
      },
      {
        q: 'What if only one child wants to farm?',
        a: 'That is the most common case we see. There are fair ways to divide land, equipment and other assets so the farm stays whole, and we help the family find one.',
      },
    ],
    insight: 'handing-down-the-family-farm',
  },
]);

export const service = (slug: string) => services.find((s) => s.slug === slug);
