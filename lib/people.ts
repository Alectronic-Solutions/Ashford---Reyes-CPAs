import { contactInfo } from './site';
import { glue } from './text';

export type Person = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  src: string;
  alt: string;
  focus?: string;
  bio: string[];
  background: string[];
  outside: string;
};

/* Eight sample people, with sample biographies. The home page shows the first four. */
export const people: Person[] = glue([
  {
    slug: 'marcus-ashford',
    name: 'Marcus Ashford',
    title: 'Managing partner',
    specialty: 'Farm and winery returns, entity structure and succession plans.',
    src: '/photos/team/team-01.jpg',
    alt: 'Marcus Ashford, smiling, in a blue suit and glasses in front of a bookshelf',
    focus: 'object-[40%_50%]',
    bio: [
      'Marcus has worked with Lodi growers and wineries for more than twenty years. He started in the firm’s back room preparing Schedule F returns during harvest, and now leads the farm and winery practice.',
      'Most of his time goes to the long conversations: which entity should hold the land, how the next generation buys in, and what a family can afford to pay the parents who step back.',
    ],
    background: ['California CPA', 'B.S. Accounting, University of the Pacific', 'Member, AICPA and California Society of CPAs'],
    outside: 'Coaches youth soccer and keeps a small block of old-vine zinfandel that he insists is a hobby.',
  },
  {
    slug: 'eleanor-reyes',
    name: 'Eleanor Reyes',
    title: 'Partner, tax',
    specialty: 'Estate and trust returns, and the October year-end planning meeting.',
    src: '/photos/team/team-02.jpg',
    alt: 'Eleanor Reyes, in a gray blazer, standing in a bright restaurant-style room',
    bio: [
      'Eleanor runs the firm’s tax practice and the fall planning season, when every business and farm client sits down before December 31.',
      'She prepares trust and estate returns and works closely with estate attorneys in Lodi and Stockton.',
    ],
    background: ['California CPA', 'Master of Taxation, Golden Gate University', 'Enrolled to practice before the IRS'],
    outside: 'Sings in a community choir and is slowly restoring a 1920s bungalow near Hutchins Street.',
  },
  {
    slug: 'daniel-okafor',
    name: 'Daniel Okafor',
    title: 'Senior accountant',
    specialty: 'Small business books, payroll and sales tax.',
    src: '/photos/team/team-03.jpg',
    alt: 'Daniel Okafor, in a light gray suit, smiling with his arms crossed',
    bio: [
      'Daniel looks after the firm’s small business clients: shops, contractors, restaurants and clinics. He reviews their books each month and is usually the first call before an owner signs anything.',
    ],
    background: ['California CPA', 'B.S. Business Administration, CSU Stanislaus', 'QuickBooks ProAdvisor'],
    outside: 'Runs the Lodi Lake loop most mornings and cooks for anyone who will sit still.',
  },
  {
    slug: 'amara-njoroge',
    name: 'Amara Njoroge',
    title: 'Tax manager',
    specialty: 'Family returns, college costs and rental property questions.',
    src: '/photos/team/team-04.jpg',
    alt: 'Amara Njoroge, in a pink blazer, smiling on a covered balcony',
    bio: [
      'Amara manages family returns from first meeting to filing. She is known for walking clients through their return line by line until it makes sense.',
      'She also handles rentals, education credits and the returns that come with caring for a parent.',
    ],
    background: ['California CPA', 'B.A. Economics, UC Davis', 'Member, California Society of CPAs'],
    outside: 'Volunteers with a free tax help program each spring and grows far too many tomatoes.',
  },
  {
    slug: 'ruth-castellano',
    name: 'Ruth Castellano',
    title: 'Bookkeeping lead',
    specialty: 'Monthly close, bank reconciliations and QuickBooks cleanup.',
    src: '/photos/team/team-05.jpg',
    alt: 'Ruth Castellano, with white hair and a red blazer, arms folded',
    bio: [
      'Ruth leads the bookkeeping team and has closed more months of books than anyone at the firm. When a client is a year behind, she is the one who rebuilds it.',
    ],
    background: ['Certified bookkeeper', 'QuickBooks ProAdvisor, Advanced', 'Thirty years in farm and small business books'],
    outside: 'Plays piano at her church and keeps a very orderly garden.',
  },
  {
    slug: 'jordan-whitfield',
    name: 'Jordan Whitfield',
    title: 'Advisory associate',
    specialty: 'Second locations, tasting rooms and seasonal budgets.',
    src: '/photos/team/team-06.jpg',
    alt: 'Jordan Whitfield, smiling in a navy blazer and open collar shirt',
    bio: [
      'Jordan builds the cash forecasts and expansion models behind the firm’s advisory work. If you are thinking about a tasting room, a second shop or a new crop, Jordan runs the numbers first.',
    ],
    background: ['B.S. Finance, Sacramento State', 'Working toward the CPA license'],
    outside: 'Plays in a weekend softball league and is always looking for a better taco truck.',
  },
  {
    slug: 'linh-tran',
    name: 'Linh Tran',
    title: 'Staff accountant',
    specialty: 'Quarterly estimates and payroll filings.',
    src: '/photos/team/team-07.jpg',
    alt: 'Linh Tran, in a black blazer, standing in an office with her arms crossed',
    bio: [
      'Linh keeps the firm’s calendar of estimated payments and payroll filings, and makes sure every client hears about a payment before it is due rather than after.',
    ],
    background: ['B.S. Accounting, University of the Pacific', 'Working toward the CPA license'],
    outside: 'Bakes for every birthday in the office, whether or not anyone asks.',
  },
  {
    slug: 'henry-park',
    name: 'Henry Park',
    title: 'Client services',
    specialty: 'Intake, document requests and getting your question to the right person.',
    src: '/photos/team/team-08.jpg',
    alt: 'Henry Park, in glasses and a dark shirt, looking at the camera',
    bio: [
      'Henry answers the phone, runs the client portal and makes sure nothing you send us goes missing. If you are not sure who to ask, ask Henry.',
    ],
    background: ['Twelve years in client service', 'Portal and e-signature administrator'],
    outside: 'Restores old bicycles and rides one to the office most days.',
  },
]);

export function person(name: string): Person {
  const found = people.find((p) => p.name === name);
  if (!found) throw new Error(`No team member named ${name}`);
  return found;
}

export const personBySlug = (slug: string) => people.find((p) => p.slug === slug);

export const firstName = (p: Person) => p.name.split(' ')[0];

/** A prefilled email to the office, so Henry can route it to the right desk. */
export const askHref = (p: Person) =>
  `${contactInfo.emailHref}?subject=${encodeURIComponent(`A question for ${p.name}`)}`;
