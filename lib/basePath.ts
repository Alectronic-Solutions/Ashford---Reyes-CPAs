/*
  GitHub Pages serves a project site from a subpath, so the build sets NEXT_PUBLIC_BASE_PATH to it.
  Next adds the prefix to its own links and files. This helper covers the URLs it does not touch:
  video, preloads, image loader output and manifest icons. Locally and on a root domain it is empty.
*/
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBase(path: string): string {
  return path.startsWith('/') ? `${basePath}${path}` : path;
}
