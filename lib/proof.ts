import { glue } from './text';
/*
  Sample proof for demonstration. Every figure, quote and story here is invented for this example
  site and is labeled as such wherever it appears. Replace it with real, permitted material at launch.
*/

export const sampleNote = glue('Sample figures, stories and quotes for demonstration. None describe real clients.');

export const stats = glue([
  { value: '1987', label: 'Year the Lodi office opened' },
  { value: '640+', label: 'Clients across San Joaquin County' },
  { value: '210', label: 'Farms, vineyards and wineries' },
  { value: '98%', label: 'Clients who stay with us each year' },
]);

export const rating = { score: '4.9', count: 212, source: 'client surveys' };

export const credentials = glue(
  'Licensed by the California Board of Accountancy. Members of the AICPA and the California Society of CPAs. QuickBooks ProAdvisors on staff.',
);

export type Story = {
  industry: string;
  client: string;
  title: string;
  result: string;
  resultLabel: string;
  text: string;
  photo: { src: string; alt: string };
};

export const stories: Story[] = glue([
  {
    industry: 'farms-wineries',
    client: 'A wine grape grower near Clements',
    title: 'Estimates that follow the harvest',
    result: '$60,000',
    resultLabel: 'no longer borrowed each spring to pay quarterly estimates',
    text: 'Almost all of the family’s income arrived in October and November, but they were paying equal quarterly estimates out of their operating line. More than two-thirds of their income came from farming, so we moved them to a single January payment and timed it to the grape checks.',
    photo: { src: '/photos/tractor-row.jpg', alt: 'A tractor working down a green vineyard row toward distant hills' },
  },
  {
    industry: 'small-business',
    client: 'A family restaurant on School Street',
    title: 'Fourteen months of books in six weeks',
    result: '14 months',
    resultLabel: 'of books rebuilt in time for a refinance',
    text: 'The owners had fallen behind after a bookkeeper left, and their bank wanted current statements before it would refinance the building. We rebuilt the books from bank records, filed the missing sales tax returns, and handed the lender a clean package.',
    photo: { src: '/photos/desk-receipts.jpg', alt: 'Hands sorting receipts beside a calculator and printed statements' },
  },
  {
    industry: 'farms-wineries',
    client: 'A family winery in the Mokelumne River AVA',
    title: 'A succession plan in stages',
    result: '7 years',
    resultLabel: 'to move the winery to the next generation, one step at a time',
    text: 'Two of three children wanted to run the winery. With the family’s attorney we set up a family LLC for the land, a schedule of gifts over seven years, and a fair way to treat the child who chose a different career.',
    photo: { src: '/photos/barrel-room.jpg', alt: 'Long rows of oak wine barrels stacked in a winery cellar' },
  },
]);

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = glue([
  {
    quote:
      'They are the first accountants who asked when our grapes get picked before they asked for a single document. Everything they do runs on our calendar, not theirs.',
    name: 'Gloria Ferreira',
    role: 'Third-generation wine grape grower, Acampo',
  },
  {
    quote:
      'I call Daniel before I sign anything now. Twice last year that call changed what I bought and when.',
    name: 'Sam Whitaker',
    role: 'Owner, a hardware and feed store',
  },
  {
    quote:
      'Amara explained our return line by line, in English we understood. My mother’s trust used to scare me. Now it is one meeting a year.',
    name: 'Priya Raman',
    role: 'Lodi household client',
  },
  {
    quote:
      'Crush is the worst month to think about paperwork. They kept the books current anyway, and in November we knew exactly where we stood.',
    name: 'Tom and Elise Lindqvist',
    role: 'Owners, a small family winery',
  },
]);
