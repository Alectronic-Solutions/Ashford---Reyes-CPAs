import { glue } from './text';
export type Insight = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  minutes: number;
  author: string;
  photo: { src: string; alt: string };
  sections: { heading: string; body: string[] }[];
};

export const insightNote =
  'Sample article for demonstration. It summarizes general rules, which change; it is not advice for your situation.';

// Newest first. The home page shows the first three.
export const insights: Insight[] = glue([
  {
    slug: '2026-year-end-tax-planning',
    title: 'Before December 31: a year-end checklist',
    summary:
      'Equipment purchases, owner pay, retirement contributions and gifts all have to happen inside the year. Here is the list we work through with clients each fall.',
    topic: 'Tax planning',
    date: '2026-10-14',
    minutes: 6,
    author: 'Eleanor Reyes',
    photo: { src: '/photos/desk-tax.jpg', alt: 'An accountant working through a tax form with a calculator' },
    sections: [
      {
        heading: 'Why the fall meeting matters more than April',
        body: [
          'By the time a return is prepared, the year is over and almost every choice that shaped it has already been made. The planning meeting in October or November is where the tax bill actually gets decided.',
          'Bring a rough idea of this year’s income so far, what you expect for the rest of the year, and any big purchases or changes you are considering. We will bring last year’s return and the questions below.',
        ],
      },
      {
        heading: 'Equipment and vehicles',
        body: [
          'Federal law now allows full first-year depreciation on most qualifying equipment, so a tractor, a press or a delivery truck placed in service before December 31 can usually be deducted this year. Placed in service means delivered and ready to use, not just ordered.',
          'California does not follow the federal bonus depreciation rules and allows a much smaller first-year deduction. A purchase that wipes out federal income may still leave California tax to pay, so we run both before you buy.',
          'The bigger question is whether you need the equipment at all. A deduction saves a fraction of the price. It is never a reason to buy something the operation does not need.',
        ],
      },
      {
        heading: 'How owners get paid',
        body: [
          'If your business is an S corporation, check that owner salaries for the year are reasonable for the work done and that payroll has actually been run. A distribution taken in place of a salary is one of the most common problems we fix.',
          'For partnerships and sole proprietors, look at guaranteed payments and draws against the cash the business really has, so the January estimate is not a surprise.',
        ],
      },
      {
        heading: 'Retirement contributions',
        body: [
          'Some plans, such as a 401(k) with salary deferrals, generally need to be in place and funded through payroll during the year. Others, such as a SEP, can often be opened and funded up to the filing deadline. Knowing which you have decides what can still be done.',
        ],
      },
      {
        heading: 'Gifts and charitable giving',
        body: [
          'Gifts to family that stay under the annual exclusion need no gift tax return. Larger gifts, or gifts of an interest in the farm or business, usually do. If a succession plan calls for a gift this year, the paperwork and any appraisal need to be done before the year ends.',
          'For charitable giving, bunching two years of donations into one, or giving appreciated stock instead of cash, can make a gift go further.',
        ],
      },
      {
        heading: 'A short checklist',
        body: [
          'Estimate this year’s income for each business and the household. List purchases planned for the next six months. Confirm owner payroll is up to date. Check which retirement plan you have. Note any gifts planned. Then book the meeting while there is still time to act.',
        ],
      },
    ],
  },
  {
    slug: 'farm-estimated-tax-payments',
    title: 'Estimated taxes when income comes at harvest',
    summary:
      'Equal quarterly payments make little sense when most of your money comes in October. Qualifying farmers have a better option, and California has its own schedule.',
    topic: 'Farms and wineries',
    date: '2026-09-22',
    minutes: 5,
    author: 'Linh Tran',
    photo: { src: '/photos/harvest-hands.jpg', alt: 'Hands lifting a bunch of dark wine grapes from a harvest tub' },
    sections: [
      {
        heading: 'The problem with four equal payments',
        body: [
          'The standard estimated tax schedule assumes income arrives evenly through the year. For a grower paid at harvest, that means paying tax in April and June on money that has not come in yet, often by drawing on an operating line.',
        ],
      },
      {
        heading: 'The farmer rule',
        body: [
          'If at least two-thirds of your gross income comes from farming, in either this year or last year, federal rules let you skip the quarterly schedule. You can make one estimated payment by January 15 of the following year, or file your return and pay everything due by March 1 and owe no estimated tax penalty.',
          'The two-thirds test uses gross income, not profit, and it counts the income of both spouses on a joint return. Wages, rental income and gains from selling land all count against you. We check the test each year, because one large sale can push a family below it.',
        ],
      },
      {
        heading: 'California',
        body: [
          'California has a similar rule for qualifying farmers. For everyone else, California’s schedule is uneven: thirty percent of the year’s estimate is due in April, forty percent in June, nothing in September, and the last thirty percent in January.',
          'That front-loading can be hard on seasonal businesses that do not qualify as farms, such as a tasting room or a packing operation. We plan those payments against your cash forecast rather than the calendar.',
        ],
      },
      {
        heading: 'If you do not qualify',
        body: [
          'You can usually avoid a penalty by paying in, through estimates and withholding, an amount based on last year’s tax, even if this year turns out bigger. Another method computes the requirement period by period from income as it was actually earned, which can help when most of it arrives late in the year.',
          'Either way, the fix is the same: decide on the method in the spring, not at filing time.',
        ],
      },
    ],
  },
  {
    slug: 'handing-down-the-family-farm',
    title: 'Handing down the family farm',
    summary:
      'Most succession plans fail because they start too late. Here are the first conversations to have, and the order we usually have them in.',
    topic: 'Succession',
    date: '2026-08-18',
    minutes: 7,
    author: 'Marcus Ashford',
    photo: { src: '/photos/vines-dormant.jpg', alt: 'Old head-trained grapevines in low evening light after harvest' },
    sections: [
      {
        heading: 'Start with people, not tax',
        body: [
          'Before anyone talks about trusts or gifts, the family needs answers to plain questions. Who wants to run the operation? Who wants to own part of it without working in it? What do the parents need to live on once they step back?',
          'These conversations are hard and they take time. Having them early, while everyone is healthy, gives the family far more choices than having them in a hospital waiting room.',
        ],
      },
      {
        heading: 'Separate the land from the operation',
        body: [
          'Many families hold the land in one entity and run the farming or winemaking in another. The child who farms can take on the operating business, while ownership of the land is shared more widely and leased back at a fair rent.',
          'This also makes it easier to move ownership in small steps over several years, rather than all at once.',
        ],
      },
      {
        heading: 'The federal estate tax, today',
        body: [
          'Federal law now sets the estate and gift tax exemption at fifteen million dollars per person for 2026, adjusted for inflation after that. A married couple can generally pass twice that amount before federal estate tax applies. California has no estate or inheritance tax of its own.',
          'For many families that means income tax matters more than estate tax. Land that passes at death usually takes a new value for tax purposes, while land given during life keeps the parents’ original cost. The choice between giving now and leaving later can be worth more than any estate tax saving.',
        ],
      },
      {
        heading: 'Treating children fairly, not equally',
        body: [
          'When only one child farms, splitting everything equally can force a sale. Fair plans often give the farming child the operation and a path to buy land over time, and balance it with other assets, life insurance or a share of the land rent for the others.',
        ],
      },
      {
        heading: 'Who should be in the room',
        body: [
          'An estate planning attorney drafts the documents. We bring the numbers: what each option costs in tax, what the operation can afford to pay the parents, and how the plan fits the books. Your lender and your insurance agent usually need a seat too.',
          'Start with one meeting. The first step is just writing down what the family wants.',
        ],
      },
    ],
  },
]);

export const insight = (slug: string) => insights.find((i) => i.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
