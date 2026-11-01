// Serves the static export in out/ with range support, which video seeking needs.
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'out');
// Set BASE_PATH to preview a build made for a subpath, the way GitHub Pages serves it.
const base = (process.env.BASE_PATH ?? '').replace(/\/$/, '');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = decodeURIComponent(url.pathname);
  const inside = !base || path === base || path.startsWith(`${base}/`);
  let file = normalize(join(root, inside ? path.slice(base.length) : '/__outside__'));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  try {
    // Clean URLs, as both hosts do: /faq or /faq/ serves faq.html.
    const bare = file.replace(/[\\/]+$/, '');
    if (!extname(bare) && existsSync(`${bare}.html`)) file = `${bare}.html`;
    else if (statSync(file).isDirectory()) file = join(file, 'index.html');
    const { size } = statSync(file);
    const type = types[extname(file)] || 'application/octet-stream';
    const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Number(range[2]) : size - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': end - start + 1,
      });
      createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
      createReadStream(file).pipe(res);
    }
  } catch {
    // GitHub Pages and Cloudflare Pages answer unknown paths with the exported 404 page.
    const notFound = join(root, '404.html');
    if (existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': types['.html'] });
      createReadStream(notFound).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  }
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}${base}/`));
