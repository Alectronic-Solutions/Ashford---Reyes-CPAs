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
        lift: '0 40px 80px -40px rgb(21 32 27 / 0.55), 0 12px 24px -12px rgb(21 32 27 / 0.25)',
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
