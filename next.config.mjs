/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Empty locally and on a root domain. The GitHub Pages workflow sets it to the repository subpath.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  // No optimizer in a static export: lib/imageLoader.ts points at the WebP files made by scripts/make-photos.mjs.
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [480, 960, 1600],
    imageSizes: [96, 192, 384],
  },
};

export default nextConfig;
