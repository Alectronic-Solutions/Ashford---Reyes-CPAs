/*
  Every firm-wide detail lives here, so launch day is a matter of editing this one file.
  The .example domain and the 555 number are reserved, so none of this can reach a real person.
*/
export const site = {
  name: 'Ashford and Reyes CPAs',
  shortName: 'Ashford and Reyes',
  description:
    'Tax, bookkeeping, advisory and succession planning for Lodi farms, wineries, small businesses and families.',
  // Set NEXT_PUBLIC_SITE_URL in the Cloudflare Pages build settings once the domain is live.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ashfordreyes.example').replace(/\/$/, ''),
  locale: 'en_US',
  // While false, forms stop at a notice and nothing is sent. Flip to true at launch.
  formsLive: false,
};

export const contactInfo = {
  phone: '(209) 555-0142',
  phoneHref: 'tel:+12095550142',
  email: 'office@ashfordreyes.example',
  emailHref: 'mailto:office@ashfordreyes.example',
  // No street address is published: the firm is presented as serving the whole Lodi area.
  city: 'Lodi',
  region: 'CA',
  place: 'Lodi, California',
  area: 'Lodi and San Joaquin County',
  towns: ['Lodi', 'Woodbridge', 'Acampo', 'Lockeford', 'Victor', 'Clements', 'Galt', 'Stockton'],
  meetings: 'Meetings by appointment, at our Lodi office or at your farm, shop or kitchen table.',
  hours: 'Monday to Friday, 8 a.m. to 5 p.m.',
  // FormSubmit posts each form to this address. Swap for the real inbox before launch.
  formAction: 'https://formsubmit.co/office@ashfordreyes.example',
  // Links to the firm's own portal and payment providers. While empty, the client center says so.
  portalUrl: '',
  paymentUrl: '',
};
