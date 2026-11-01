// Renders the link-preview cards and the favicons into app/, where Next.js picks them up by name.
// The output is committed, so the Cloudflare build never needs ImageMagick. Rerun after adding a page:
//   node scripts/make-images.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
// ImageMagick reads backslashes in a font path as escapes.
const fraunces = join(root, 'assets/fonts/Fraunces-SemiBold.ttf').replaceAll('\\', '/');
const figtree = join(root, 'assets/fonts/Figtree-Medium.ttf').replaceAll('\\', '/');
const ink = '#15201B';
const paper = '#F3F5F0';
const accent = '#7A1F34';

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
  magick([
    '-size', '1200x630', `xc:${ink}`,
    '(', join(root, 'public/photos', photo), '-resize', '480x630^', '-gravity', 'center', '-extent', '480x630', ')',
    '-gravity', 'northwest', '-geometry', '+720+0', '-composite',
    '-font', fraunces, '-fill', paper, '-pointsize', '34', '-annotate', '+64+56', 'Ashford and Reyes CPAs',
    '(', '-size', '600x', '-background', 'none', '-font', fraunces, '-fill', paper, '-pointsize', '76',
    '-interline-spacing', '-10', `caption:${title}`, ')',
    '-gravity', 'west', '-geometry', '+64+10', '-composite',
    '-gravity', 'northwest', '-fill', accent, '-draw', 'rectangle 64,548 80,564',
    '-font', figtree, '-fill', paper, '-pointsize', '26', '-annotate', '+96+538', 'Lodi, California',
    '-strip', out,
  ]);
  console.log('wrote', out);
}

// The monogram: a paper A on ink, with the accent square at its foot.
const monogram = ['-size', '512x512', `xc:${ink}`,
  '-font', fraunces, '-fill', paper, '-pointsize', '400', '-gravity', 'center', '-annotate', '+0+10', 'A',
  '-fill', accent, '-draw', 'rectangle 380,380 436,436'];
magick([...monogram, '-resize', '32x32', '-strip', join(root, 'app/icon.png')]);
magick([...monogram, '-resize', '180x180', '-strip', join(root, 'app/apple-icon.png')]);
console.log('wrote app/icon.png and app/apple-icon.png');
