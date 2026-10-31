import { Rise, RiseGroup } from './Reveal';

const seasons = [
  {
    name: 'Harvest',
    text: 'Payroll, grower payments and sales tax stay current while cash moves fast.',
  },
  {
    name: 'Crush',
    text: 'Equipment, inventory and financing get a plan before the press runs.',
  },
  {
    name: 'Quarter end',
    text: 'Estimates, filings and a clear look at where the year is heading.',
  },
];

export function Calendar() {
  return (
    <section aria-labelledby="calendar-title" className="px-5 pb-24 md:px-8 md:pb-40">
      <RiseGroup>
        <Rise>
          <h2 id="calendar-title" className="text-statement">
            What the calendar looks like
          </h2>
        </Rise>
        <ul className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-8">
          {seasons.map((s) => (
            <Rise as="li" key={s.name} className="border-t-2 border-delta pt-5">
              <h3 className="text-statement">{s.name}</h3>
              <p className="mt-3 max-w-[32ch]">{s.text}</p>
            </Rise>
          ))}
        </ul>
      </RiseGroup>
    </section>
  );
}
