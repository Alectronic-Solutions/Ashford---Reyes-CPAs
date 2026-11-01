/*
  The static export has no image optimizer, so scripts/make-photos.mjs cuts each photograph into
  WebP files ahead of time. This loader points next/image at the smallest file that still covers
  the width it asks for. Keep the widths in step with that script and with images.deviceSizes.
*/
const WIDTHS = [480, 960, 1600];

// The hero stills are preloaded by their exact URL, so they stay as the original files.
const KEEP_AS_IS = /\/vineyard-(poster|end)/;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  if (!src.startsWith('/photos/') || !src.endsWith('.jpg') || KEEP_AS_IS.test(src)) return src;
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${src.slice(0, -'.jpg'.length)}-${size}.webp`;
}
