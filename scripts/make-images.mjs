// Renders the link-preview cards (Open Graph and Twitter, with alt text) into app/, where Next.js picks them up by name.
// The favicons come from assets/brand/logo-mark.svg, rendered once; see app/icon1.svg.
// The output is committed, so the Cloudflare build never needs ImageMagick. Rerun after adding a page:
//   node scripts/make-images.mjs
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
// ImageMagick reads backslashes in a font path as escapes.
const fraunces = join(root, 'assets/fonts/Fraunces-SemiBold.ttf').replaceAll('\\', '/');
const figtree = join(root, 'assets/fonts/Figtree-Medium.ttf').replaceAll('\\', '/');
const ink = '#15201B';
const paper = '#F3F5F0';
const accent = '#7A1F34';
const mark = join(root, 'assets/brand/logo-mark-light.png');

// Route folder under app/ (empty for the home page), card title, photograph under public/photos.
const cards = [
  ['', 'Steady books, every season.', 'vineyard-end.jpg'],
  ['how-it-works', 'How we work', 'meeting-couple.jpg'],
  ['team', 'The team', 'team/team-01.jpg'],
  ['faq', 'Questions we hear', 'hero-end.jpg'],
  // A card in a parent folder also covers the pages generated beneath it.
  ['services', 'Tax, books and advice for every season', 'hero-end.jpg'],
  ['industries', 'Who we serve', 'serve-business.jpg'],
  ['insights', 'Insights for Lodi farms, businesses and families', 'serve-farm.jpg'],
  ['client-center', 'Client center', 'serve-business.jpg'],
  ['contact', 'Book a consultation', 'rows-fog.jpg'],
  ['careers', 'Careers', 'meeting-advisor.jpg'],
  ['privacy', 'Privacy policy', 'serve-business.jpg'],
  ['terms', 'Terms of use', 'serve-business.jpg'],
  ['accessibility', 'Accessibility', 'serve-business.jpg'],
  ['disclaimer', 'Disclaimer', 'serve-business.jpg'],
];

const magick = (args) => execFileSync('magick', args, { stdio: 'inherit' });

for (const [route, title, photo] of cards) {
  const out = join(root, 'app', route, 'opengraph-image.png');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(join(root, 'app', route, 'opengraph-image.alt.txt'), `Ashford and Reyes CPAs: ${title}`);
  magick([
    '-size', '1200x630', `xc:${ink}`,
    '(', join(root, 'public/photos', photo), '-resize', '480x630^', '-gravity', 'center', '-extent', '480x630', ')',
    '-gravity', 'northwest', '-geometry', '+720+0', '-composite',
    '(', mark, '-resize', 'x68', ')', '-gravity', 'northwest', '-geometry', '+64+44', '-composite',
    '-font', fraunces, '-fill', paper, '-pointsize', '34', '-annotate', '+156+44', 'Ashford and Reyes',
    '-font', figtree, '-pointsize', '15', '-kerning', '5', '-annotate', '+157+90', 'CPAS', '-kerning', '0',
    '(', '-size', '600x', '-background', 'none', '-font', fraunces, '-fill', paper, '-pointsize', '76',
    '-interline-spacing', '-10', `caption:${title}`, ')',
    '-gravity', 'west', '-geometry', '+64+10', '-composite',
    '-gravity', 'northwest', '-fill', accent, '-draw', 'rectangle 64,548 80,564',
    '-font', figtree, '-fill', paper, '-pointsize', '26', '-annotate', '+96+538', 'Lodi, California',
    '-depth', '8', '-strip', out,
  ]);
  // Twitter and X read their own file name; the card is the same.
  copyFileSync(out, join(root, 'app', route, 'twitter-image.png'));
  writeFileSync(join(root, 'app', route, 'twitter-image.alt.txt'), `Ashford and Reyes CPAs: ${title}`);
  console.log('wrote', out);
}
