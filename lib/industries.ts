import { glue } from './text';
export type Industry = {
  slug: string;
  name: string;
  lede: string;
  blurb: string;
  photo: { src: string; alt: string };
  intro: string[];
  /** Four turns of the client's year and what we do at each. */
  year: { when: string; you: string; we: string }[];
  help: { name: string; text: string }[];
  services: string[];
  contact: string;
  /** A strip of pictures from the client's world, shown between the calendar and the services. */
  gallery?: { src: string; alt: string }[];
};

export const industries: Industry[] = glue([
  {
    slug: 'farms-wineries',
    name: 'Farms and wineries',
    lede: 'Accounting that follows bloom, harvest and crush, because your cash does.',
    blurb: 'Growers, vineyards, wineries and packers.',
    photo: {
      src: '/photos/vines-dormant.jpg',
      alt: 'Rows of old head-trained grapevines, bare after harvest, in low evening light',
    },
    intro: [
      'Wine grapes, cherries, almonds and walnuts each keep their own calendar, and most of the year’s money arrives in a few months. A tax plan built for a salaried household does not fit that shape, and neither does a bookkeeper who only shows up in March.',
      'Farm and winery clients are the largest part of our practice. We know Schedule F, crop insurance proceeds, cost-share payments, the single estimated payment that qualifying farmers can make, and the places where California departs from federal depreciation rules.',
    ],
    year: [
      {
        when: 'January to March',
        you: 'Close the books on last year, gather crop insurance and co‑op statements.',
        we: 'Make the January estimate or file by March 1, and prepare farm, partnership and family returns.',
      },
      {
        when: 'April to June',
        you: 'Bloom, spraying and the first big input bills. Lenders want statements.',
        we: 'Prepare lender packages, review equipment financing, and set a cash forecast for the season.',
      },
      {
        when: 'July to October',
        you: 'Harvest and crush. Seasonal crews, fuel and very little time.',
        we: 'Keep the books weekly, run seasonal payroll, and stay out of your way until you call.',
      },
      {
        when: 'October to December',
        you: 'Checks from packers and wineries start arriving.',
        we: 'Hold the planning meeting, time equipment purchases and payments, and decide what lands in which year.',
      },
    ],
    help: [
      {
        name: 'Farm and partnership returns',
        text: 'Schedule F, family partnerships and S corporations, plus the California returns and K‑1s for every family member.',
      },
      {
        name: 'Equipment and land decisions',
        text: 'Whether to buy before or after December 31, how federal and California depreciation differ, and what the purchase does to cash next season.',
      },
      {
        name: 'Seasonal payroll',
        text: 'Crews that grow and shrink with harvest, farm labor contractors, and the payroll filings that follow them.',
      },
      {
        name: 'Tasting rooms and direct sales',
        text: 'Sales tax, inventory and the separate set of books a retail operation needs alongside the vineyard.',
      },
      {
        name: 'Succession',
        text: 'Moving land and the operation to the next generation in stages, with the family’s attorney.',
      },
    ],
    services: ['tax', 'bookkeeping', 'advisory', 'estate-succession'],
    contact: 'Marcus Ashford',
    gallery: [
      { src: '/photos/rows-fog.jpg', alt: 'Bare vineyard rows disappearing into winter fog' },
      { src: '/photos/harvest-hands.jpg', alt: 'Hands lifting a bunch of dark wine grapes from a harvest tub' },
      { src: '/photos/barrel-cellar.jpg', alt: 'Oak barrels stacked in a dim winery cellar' },
      { src: '/photos/row-path.jpg', alt: 'A grassy path between two green rows of vines under a blue sky' },
    ],
  },
  {
    slug: 'small-business',
    name: 'Small businesses',
    lede: 'One accountant who knows your books, picks up the phone, and answers before you sign.',
    blurb: 'Shops, contractors, restaurants and clinics.',
    photo: {
      src: '/photos/serve-business.jpg',
      alt: 'Two shop owners in aprons standing outside their storefront, one holding a Yes We’re Open sign',
    },
    intro: [
      'Shops, contractors, restaurants, clinics and the people who work in them. Most owners we meet are good at what they do and tired of guessing what their numbers mean.',
      'We keep the books current, file payroll and sales tax on time, and make sure you hear about the tax effect of a new hire, a truck or a second location before you commit to it.',
    ],
    year: [
      {
        when: 'January to April',
        you: 'W-2s, 1099s and the annual return.',
        we: 'File year-end payroll forms, close the books and prepare the business and owner returns together.',
      },
      {
        when: 'Every month',
        you: 'Run the business. Snap receipts and keep the bank feeds connected.',
        we: 'Reconcile every account, file sales tax and payroll, and send a one-page report.',
      },
      {
        when: 'Every quarter',
        you: 'Read the report and ask what does not look right.',
        we: 'Check estimated payments against actual profit and adjust before they fall short.',
      },
      {
        when: 'October to December',
        you: 'Think about next year: hires, equipment, prices.',
        we: 'Hold the planning meeting and settle owner pay, retirement contributions and purchases before year end.',
      },
    ],
    help: [
      {
        name: 'Monthly books and payroll',
        text: 'A clean set of books every month and payroll that runs without you thinking about it.',
      },
      {
        name: 'Sales tax',
        text: 'California sales and use tax returns, matched to the books so an audit is a short conversation.',
      },
      {
        name: 'Entity and owner pay',
        text: 'Whether an S corporation makes sense, and a reasonable salary that holds up if anyone asks.',
      },
      {
        name: 'Growth decisions',
        text: 'A second location, new equipment or a bigger lease, modeled before you sign.',
      },
      {
        name: 'Catch-up work',
        text: 'Books or returns that fell behind, rebuilt and filed so you can stop worrying about the letter that has not arrived yet.',
      },
    ],
    services: ['bookkeeping', 'tax', 'advisory'],
    contact: 'Daniel Okafor',
  },
  {
    slug: 'families',
    name: 'Families',
    lede: 'Your household’s returns, prepared with care and explained in plain words.',
    blurb: 'Households, retirees and family trusts.',
    photo: {
      src: '/photos/serve-family.jpg',
      alt: 'Family and friends reaching across a wooden dinner table to raise their glasses',
    },
    intro: [
      'Wages, a rental, a side business, a child heading to college, a parent who needs help. Family returns get complicated one life event at a time.',
      'We prepare your federal and California returns, plan around the big events, and explain the numbers so you know why the refund or the balance due is what it is. If a family business or farm is part of the picture, we look at the household and the business together.',
    ],
    year: [
      {
        when: 'January to April',
        you: 'Send your forms through secure upload as they arrive.',
        we: 'Prepare your returns, walk you through them, and file once you are happy.',
      },
      {
        when: 'Spring',
        you: 'Tell us about anything big coming: a sale, a move, a new job.',
        we: 'Adjust withholding or estimates so next April holds no surprises.',
      },
      {
        when: 'Summer',
        you: 'College forms, a parent’s affairs, a rental that needs a repair.',
        we: 'Answer the questions as they come up, usually with a short call.',
      },
      {
        when: 'Fall',
        you: 'Think about gifts, charitable giving and retirement contributions.',
        we: 'Review the year and settle what has to happen before December 31.',
      },
    ],
    help: [
      {
        name: 'Federal and California returns',
        text: 'Prepared by the same person each year, who remembers what happened last year.',
      },
      {
        name: 'Rentals',
        text: 'Depreciation, repairs and improvements, and what happens to the tax when you sell.',
      },
      {
        name: 'College',
        text: 'Education credits, 529 plans and the forms financial aid offices ask for.',
      },
      {
        name: 'Helping a parent',
        text: 'Their returns, a trust you now look after, or the final return when the time comes.',
      },
      {
        name: 'Gifts and inheritance',
        text: 'What a gift or an inheritance means for tax, and the returns that may come with it.',
      },
    ],
    services: ['tax', 'estate-succession'],
    contact: 'Amara Njoroge',
  },
]);

export const industry = (slug: string) => industries.find((i) => i.slug === slug);
