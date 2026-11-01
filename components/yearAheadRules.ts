/*
  Sample dates for demonstration. A CPA must verify deadlines before launch.

  Every date here is a rule (a month and a day), never a year-specific date. nextDeadlines() turns the
  rules into real dates for whatever "today" it is handed, rolls into the following year, and moves a
  deadline that lands on a weekend to the next Monday. Only widely published federal dates are used:
  quarterly estimated payments, payroll filings, W-2 and 1099-NEC filing, and return and extension dates.
  No state dates are included on purpose. Federal holidays are not modelled, so a CPA should check those too.
*/

import { glue } from '@/lib/text';

export type Audience = 'farm' | 'business' | 'family';

export type Ymd = { y: number; m: number; d: number };

export type Deadline = {
  id: string;
  label: string;
  handles: string;
  date: Ymd;
  weekday: string;
  daysAway: number;
};

export const audiences: { id: Audience; label: string }[] = [
  { id: 'farm', label: 'Farm or winery' },
  { id: 'business', label: 'Small business' },
  { id: 'family', label: 'Family' },
];

export const defaultAudience: Audience = 'business';

type Entry = { label: string; handles: string };

type Rule = {
  id: string;
  month: number;
  day: number;
  /** An audience is listed only if the date applies to it. */
  for: Partial<Record<Audience, Entry>>;
};

const rules: Rule[] = glue([
  {
    id: 'jan-15',
    month: 1,
    day: 15,
    for: {
      farm: {
        label: 'Fourth-quarter estimated tax',
        handles:
          'We total the year from your books, work out the last payment and schedule it. A farm that earns most of its income from farming can skip this date by filing and paying by March 1, and we tell you which way is cheaper.',
      },
      business: {
        label: 'Fourth-quarter estimated tax',
        handles:
          'We set each owner’s payment from year-to-date profit, then send the amount and the payment instructions.',
      },
      family: {
        label: 'Fourth-quarter estimated tax',
        handles:
          'If you have side income, rental income or investment gains, we work out what you owe so the last payment matches it.',
      },
    },
  },
  {
    id: 'jan-31',
    month: 1,
    day: 31,
    for: {
      farm: {
        label: 'Farm payroll return, W-2s and 1099-NECs',
        handles:
          'We prepare the annual farm payroll return, the W-2s for your crew and the 1099-NECs for contractors, and file them with the IRS and the Social Security Administration.',
      },
      business: {
        label: 'Fourth-quarter payroll return, W-2s and 1099-NECs',
        handles:
          'We close out the quarter’s payroll return, prepare W-2s and 1099-NECs from your books and file them, so your people and contractors get theirs on time.',
      },
      family: {
        label: 'W-2 for a household employee',
        handles:
          'If you pay a nanny, caregiver or other household worker, we prepare and file their W-2 and fold the payroll tax into your return.',
      },
    },
  },
  {
    id: 'mar-01',
    month: 3,
    day: 1,
    for: {
      farm: {
        label: 'Early filing option for farmers',
        handles:
          'For farms that earn most of their income from farming, filing and paying by this date replaces the January estimate. We run both paths and pick the one that fits your cash.',
      },
    },
  },
  {
    id: 'mar-15',
    month: 3,
    day: 15,
    for: {
      farm: {
        label: 'Partnership and S corporation returns',
        handles:
          'Farms and wineries held as partnerships or S corporations file here. We prepare the return and your owners’ K-1s, or file an extension if the books need more time.',
      },
      business: {
        label: 'Partnership and S corporation returns',
        handles:
          'We prepare the entity return and each owner’s K-1, or file the extension that moves it to September.',
      },
    },
  },
  {
    id: 'apr-15',
    month: 4,
    day: 15,
    for: {
      farm: {
        label: 'Individual returns and first-quarter estimate',
        handles:
          'We file your return or an extension, and set the first estimated payment for the new year at the same time.',
      },
      business: {
        label: 'Business and owner returns, first-quarter estimate',
        handles:
          'We file corporation and owner returns, or the extension, and set the first estimated payment for the new year.',
      },
      family: {
        label: 'Federal return and first-quarter estimate',
        handles:
          'We prepare and file your return, or an extension, and set the first estimated payment if you need one.',
      },
    },
  },
  {
    id: 'apr-30',
    month: 4,
    day: 30,
    for: {
      business: {
        label: 'First-quarter payroll return',
        handles: 'We prepare and file the quarterly payroll return from your payroll records.',
      },
    },
  },
  {
    id: 'jun-15',
    month: 6,
    day: 15,
    for: {
      farm: {
        label: 'Second-quarter estimated tax',
        handles:
          'We check the year so far against your plan and set a payment that matches how the season is going.',
      },
      business: {
        label: 'Second-quarter estimated tax',
        handles: 'We update the projection with the latest books and set each owner’s payment.',
      },
      family: {
        label: 'Second-quarter estimated tax',
        handles: 'We recheck your income for the year and set the payment, or tell you none is needed.',
      },
    },
  },
  {
    id: 'jul-31',
    month: 7,
    day: 31,
    for: {
      business: {
        label: 'Second-quarter payroll return',
        handles: 'We prepare and file the quarterly payroll return and reconcile it to your books.',
      },
    },
  },
  {
    id: 'sep-15',
    month: 9,
    day: 15,
    for: {
      farm: {
        label: 'Third-quarter estimated tax, extended entity returns',
        handles:
          'We set the third payment, and file the extended partnership and S corporation returns if they were put on extension in March.',
      },
      business: {
        label: 'Third-quarter estimated tax, extended entity returns',
        handles:
          'We set the third payment and file extended partnership and S corporation returns, with K-1s to your owners.',
      },
      family: {
        label: 'Third-quarter estimated tax',
        handles: 'We update your numbers and set the payment, ahead of any year-end planning.',
      },
    },
  },
  {
    id: 'oct-15',
    month: 10,
    day: 15,
    for: {
      farm: {
        label: 'Extended individual returns',
        handles:
          'If your return was on extension, we file it here with the full year of harvest and crush figures in hand.',
      },
      business: {
        label: 'Extended individual and corporation returns',
        handles: 'If your return was on extension, we file it with the final numbers.',
      },
      family: {
        label: 'Extended individual returns',
        handles: 'If your return was on extension, we file it with everything in hand.',
      },
    },
  },
  {
    id: 'oct-31',
    month: 10,
    day: 31,
    for: {
      business: {
        label: 'Third-quarter payroll return',
        handles: 'We prepare and file the quarterly payroll return and check it against your payroll records.',
      },
    },
  },
]);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const monthName = (m: number) => months[m - 1];

const toUtc = ({ y, m, d }: Ymd) => Date.UTC(y, m - 1, d);

const fromUtc = (ms: number): Ymd => {
  const dt = new Date(ms);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
};

const DAY = 86_400_000;

/** The calendar date of a Date as the visitor's own clock reads it. */
export function localToday(now: Date = new Date()): Ymd {
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

/** A deadline on a Saturday or Sunday moves to the next Monday. */
function rollWeekend(date: Ymd): Ymd {
  const dow = new Date(toUtc(date)).getUTCDay();
  if (dow === 6) return fromUtc(toUtc(date) + 2 * DAY);
  if (dow === 0) return fromUtc(toUtc(date) + DAY);
  return date;
}

/** The next `count` deadlines for an audience, counting today, in date order. */
export function nextDeadlines(audience: Audience, today: Ymd, count = 3): Deadline[] {
  const from = toUtc(today);
  const found: Deadline[] = [];

  // This year and next cover the roll from December into January.
  for (const y of [today.y, today.y + 1]) {
    for (const rule of rules) {
      const entry = rule.for[audience];
      if (!entry) continue;
      const date = rollWeekend({ y, m: rule.month, d: rule.day });
      const ms = toUtc(date);
      if (ms < from) continue;
      found.push({
        id: `${rule.id}-${y}`,
        label: entry.label,
        handles: entry.handles,
        date,
        weekday: weekdays[new Date(ms).getUTCDay()],
        daysAway: Math.round((ms - from) / DAY),
      });
    }
  }

  return found.sort((a, b) => toUtc(a.date) - toUtc(b.date)).slice(0, count);
}

export function daysAwayText(days: number): string {
  if (days < 0) return days === -1 ? 'yesterday' : `${-days} days ago`;
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return `in ${days} days`;
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** What each month looks like for each kind of client, and what we do about it. Sample copy. */
export const monthNotes: Record<Audience, string[]> = glue({
  farm: [
    'Pruning starts in the vineyards. We close last year’s books and settle the January estimate or the March filing path.',
    'Pruning and equipment repair. We gather co‑op, crop insurance and 1099 statements for your returns.',
    'Bud break is close. Partnership and S corporation returns are due, and we file or extend them.',
    'Frost watch. We file family returns and look at equipment financing before the season starts.',
    'Bloom and the first big input bills. We prepare lender packages and a cash forecast for the season.',
    'Canopy work and irrigation. We check the year against the plan and set the June estimate.',
    'Veraison is near. We set up seasonal payroll and labor contractor records before the crews arrive.',
    'Harvest opens with the early whites. We keep the books weekly and stay out of your way.',
    'Harvest and crush in full swing. We file extended entity returns and keep payroll moving.',
    'The last picks come in and the checks start to arrive. We book your fall planning meeting.',
    'The vines turn gold, then bare. We hold the planning meeting and time purchases and payments.',
    'Year end. We settle what lands in this year and what waits for the next.',
  ],
  business: [
    'W-2s and 1099s go out. We close the year’s books and file the fourth-quarter payroll return.',
    'Books closed, returns started. Each owner gets a checklist for their personal return.',
    'Partnership and S corporation returns are due. We file them or extend them to September.',
    'Owner returns and the first estimate. We also file the first-quarter payroll return.',
    'A quieter month, and a good time for the quarterly review of profit against plan.',
    'Second estimate due. We update the projection with the latest books.',
    'Second-quarter payroll return. We reconcile payroll to the books.',
    'Slower weeks for many shops. We review pricing and cash ahead of the fall.',
    'Third estimate and extended entity returns. Last call for anything on extension.',
    'Third-quarter payroll return. We book your fall planning meeting.',
    'The planning meeting: owner pay, retirement plans and purchases before year end.',
    'Year-end payroll, bonuses and inventory counts, so January starts clean.',
  ],
  family: [
    'Forms start arriving. Send them through the portal as they come and we keep the list.',
    'Most forms are in. We prepare your return and walk you through it.',
    'Returns in progress. If something is missing, we chase it so you do not have to.',
    'Returns due. We file, or extend if a late form is holding things up.',
    'Tell us about anything big this year: a sale, a move, a new job.',
    'Second estimate, if you pay them. We recheck the year so far.',
    'Summer questions: a rental repair, a college form, a parent’s paperwork.',
    'College bills arrive. We check which education credits apply to you.',
    'Third estimate, if you pay them, and a first look at year end.',
    'Extended returns are due, and so are benefits choices at work.',
    'Year-end review: gifts, charitable giving and retirement contributions.',
    'Last chance for anything that has to happen before December 31.',
  ],
});

/**
 * The deadlines in one month for an audience, in the next occurrence of that month counting this one.
 * Dates earlier this month are kept, with a negative daysAway, so the current month reads complete.
 */
export function deadlinesInMonth(audience: Audience, today: Ymd, month: number): Deadline[] {
  const y = month >= today.m ? today.y : today.y + 1;
  const from = toUtc(today);
  return rules
    .filter((rule) => rule.month === month && rule.for[audience])
    .map((rule) => {
      const entry = rule.for[audience]!;
      const date = rollWeekend({ y, m: rule.month, d: rule.day });
      const ms = toUtc(date);
      return {
        id: `${rule.id}-${y}`,
        label: entry.label,
        handles: entry.handles,
        date,
        weekday: weekdays[new Date(ms).getUTCDay()],
        daysAway: Math.round((ms - from) / DAY),
      };
    })
    .sort((a, b) => toUtc(a.date) - toUtc(b.date));
}

export const deadlineCount = (audience: Audience, month: number) =>
  rules.filter((rule) => rule.month === month && rule.for[audience]).length;

/** Every date in the coming twelve months as an iCalendar file, one all-day event each. */
export function icsFor(audience: Audience, today: Ymd): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = (d: Ymd) => `${d.y}${pad(d.m)}${pad(d.d)}`;
  const next = (d: Ymd) => fromUtc(toUtc(d) + DAY);
  // iCalendar text escapes backslashes, commas and semicolons with a backslash.
  const escape = (text: string) => text.replace(/[\\,;]/g, (c) => '\\' + c);
  const events = nextDeadlines(audience, today, 40)
    .filter((d) => d.daysAway <= 366)
    .map((d) =>
      [
        'BEGIN:VEVENT',
        `UID:${d.id}-${audience}@ashfordreyes.example`,
        `DTSTAMP:${stamp(today)}T000000Z`,
        `DTSTART;VALUE=DATE:${stamp(d.date)}`,
        `DTEND;VALUE=DATE:${stamp(next(d.date))}`,
        `SUMMARY:${escape(d.label)}`,
        `DESCRIPTION:${escape(`${d.handles} Sample date from Ashford and Reyes CPAs. Confirm with your CPA.`)}`,
        'END:VEVENT',
      ].join('\r\n'),
    );
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ashford and Reyes CPAs//Year ahead//EN', ...events, 'END:VCALENDAR', ''].join('\r\n');
}
