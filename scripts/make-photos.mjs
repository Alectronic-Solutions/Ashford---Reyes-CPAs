// Cuts every photograph under public/photos into WebP files at 480, 960 and 1600 px wide.
// A source narrower than the target is never enlarged. The output is committed, so the Cloudflare
// build only needs ffmpeg on this machine, not there. Rerun after adding or replacing a photo:
//   node scripts/make-photos.mjs
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'public/photos');
const widths = [480, 960, 1600]; // keep in step with lib/imageLoader.ts
const skip = /^vineyard-(poster|end)/; // preloaded by exact URL in Hero.tsx
const quality = '78';

function jpgs(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return jpgs(path);
    return name.endsWith('.jpg') && !skip.test(name) ? [path] : [];
  });
}

let before = 0;
let after = 0;
for (const file of jpgs(root)) {
  before += statSync(file).size;
  for (const w of widths) {
    const out = file.replace(/\.jpg$/, `-${w}.webp`);
    execFileSync(
      'ffmpeg',
      ['-v', 'error', '-y', '-i', file, '-vf', `scale='min(${w},iw)':-2`, '-c:v', 'libwebp', '-quality', quality, out],
      { stdio: 'inherit' },
    );
    if (w === 960) after += statSync(out).size;
  }
}
console.log(`originals ${Math.round(before / 1024)} KB, 960 px WebP set ${Math.round(after / 1024)} KB`);
