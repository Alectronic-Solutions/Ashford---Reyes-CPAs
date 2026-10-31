# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Lodi-area farms, wineries, small businesses and families looking for a CPA. Owner-operators (farmers, winery owners, small-business owners) are the lead audience, deciding whether to hire a firm for tax, bookkeeping, advisory or succession work. Families are a secondary audience for tax and estate work. A second, indirect audience is the agency's prospective clients, who will view the site as a portfolio piece. They are busy during harvest, crush and quarter end, and want a firm that understands that rhythm and gives straight answers.

## Product Purpose

The website for Ashford & Reyes CPAs, a fictional CPA and tax advisory firm in Lodi, California. It is a portfolio demo for the user's web design agency, positioned as a $5K to $10K client deliverable, so it must read as a finished, professional client site. Within the fiction, the site exists to persuade owner-operators that the firm fits their working year and to get them to make contact. Success is a visitor reaching out through the contact form, and a prospective agency client judging the craft as worth that price.

## Positioning

The firm's work follows the crop calendar. Tax, bookkeeping and planning are scheduled around harvest, crush and quarter end, so a neighboring CPA that works to a generic calendar could not truthfully claim the same.

## Operating Context

- Services: tax (federal and California returns, quarterly estimates), bookkeeping (monthly books, payroll, sales tax, reconciliations, QuickBooks), advisory (entity choice, financing, tasting rooms and second locations, seasonal budgeting), and estate and succession planning (alongside the client's attorney).
- Audience context: Lodi and the Central Valley, agricultural and wine economy.
- Site is a static export deployed to Cloudflare Pages. Contact forms go through FormSubmit.

## Capabilities and Constraints

- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, static export (no server runtime).
- Forms use FormSubmit. Images use next/image only. Photography and video come from Pexels.
- Mobile parallax is disabled under 768px via useMediaQuery.
- Footer must credit and link to alectronicsolutions.com.
- Copy and code comments contain no em dashes.
- Current sections: hero and "What we do". Further sections (about, how it works, FAQ, contact) are undecided.
- Undecided product facts: partner names, address, phone, hours, fees, years in practice, credentials.

## Brand Commitments

Name: Ashford & Reyes CPAs (written "Ashford and Reyes CPAs" in the footer wordmark). Tone is trusted, calm, modern and not stuffy. Voice is plain, practical and local, using the vocabulary of the crop year (harvest, crush, quarter end). Existing confirmed copy is in components/Hero.tsx and components/WhatWeDo.tsx.

## Visual Direction

Precedence: CLAUDE.md overrides everything, then the approved choices below, then .taste-skill/direction.json. Where direction.json disagrees with CLAUDE.md or with the approved choices, ignore direction.json on that point.

- Type: Fraunces 600 for display and headings, Figtree 400 and 500 for body and interface text (app/layout.tsx).
- Palette, five colors only (tailwind.config.ts): bg #F3F5F0, surface #E3E8DF, ink #15201B, accent #7A1F34 (burgundy), delta #2E5B52 (green). No sixth color.
- No eyebrows: no small label, overline or kicker above any heading, pill or not.
- No pills: no rounded-full tags, badges or status chips.
- No icon cards: services and features are not a grid of icon-topped cards.
- No em dashes in copy or code comments.
- Photography and video from Pexels, shown with next/image (video poster and stills) and never raw img tags.
- Footer carries the alectronicsolutions.com credit; direction.json's "single quiet line" footer is allowed only if it keeps that link.

Open conflicts with direction.json (not resolved here, needs the user's call): its hero blueprint (near-black split ground, interface fragment, no navigation bar) does not match the built light hero with video and Navbar; its photo set is Unsplash architecture, which CLAUDE.md rules out; its interface-fragment imagery has no obvious equivalent for a CPA firm. Its type and palette fields are null, so it says nothing about Fraunces, Figtree or the five colors.

## Evidence on Hand

- Hero video and posters from Pexels (RDNE Stock project) in public/video and public/photos, credited in the footer.
- Service descriptions in components/WhatWeDo.tsx.
- Plausible, clearly fictional placeholder details (address, phone, partner names) are acceptable for this demo. Do not invent testimonials, named clients, awards, fee figures or credential claims that read as real third-party proof. No staff photography exists yet.

## Product Principles

- Speak in the client's calendar: harvest, crush and quarter end before accounting jargon.
- Give straight answers; plain language over professional-services boilerplate.
- Local and specific to Lodi over generic national CPA positioning.
- Never fabricate third-party proof; placeholders stay recognizably placeholder.
- Every page moves the owner-operator toward one action: contacting the firm.
