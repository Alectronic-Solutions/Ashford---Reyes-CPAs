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
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        // 1440px of content plus the 32px side gutters.
        page: '94rem',
      },
      fontSize: {
        display: ['clamp(3rem, 9vw, 9rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        statement: ['var(--fs-statement)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        body: ['18px', { lineHeight: '1.55' }],
        small: ['15px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};

export default config;
