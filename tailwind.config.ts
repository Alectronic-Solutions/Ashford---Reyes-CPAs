import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F3F5F0',
        surface: '#E3E8DF',
        ink: '#15201B',
        accent: '#7A1F34',
        delta: '#2E5B52',
        // The faces of the year wheel: one step darker than the green they turn on.
        'delta-deep': '#22463F',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Only for things that are lifted off the page in 3D: a tilted card, a stacked ledger sheet, a menu.
        lift: 'inset 0 1px 0 rgb(255 255 255 / 0.4), 0 2px 4px rgb(21 32 27 / 0.12), 0 14px 28px -8px rgb(21 32 27 / 0.3), 0 40px 80px -30px rgb(21 32 27 / 0.55)',
        // Resting depth for cards, panels and photos: a lit top edge, a contact shadow and a soft ambient one.
        rest: 'inset 0 1px 0 rgb(255 255 255 / 0.35), 0 1px 2px rgb(21 32 27 / 0.14), 0 8px 16px -6px rgb(21 32 27 / 0.22), 0 22px 36px -18px rgb(21 32 27 / 0.32)',
        // Buttons: a raised key with a darker underside that sinks when pressed.
        key: 'inset 0 1px 0 rgb(255 255 255 / 0.3), inset 0 -3px 0 rgb(0 0 0 / 0.2), 0 6px 14px -4px rgb(21 32 27 / 0.45)',
        // Fields sit slightly recessed.
        well: 'inset 0 2px 4px rgb(21 32 27 / 0.14)',
      },
      maxWidth: {
        // 1440px of content plus the 32px side gutters.
        page: '94rem',
      },
      fontSize: {
        display: ['clamp(3rem, 9vw, 9rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        h3: ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        statement: ['var(--fs-statement)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        body: ['18px', { lineHeight: '1.55' }],
        small: ['15px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};

export default config;
