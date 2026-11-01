/**
 * Joins the last two words of every sentence-length string with a non-breaking space, so no line of
 * copy ever ends on a single word, whatever the screen width and whatever the browser supports.
 * Applied once to each content file's data. Strings of three words or fewer, slugs and paths are left alone.
 */
export function glue<T>(value: T): T {
  if (typeof value === 'string') {
    const words = value.trim().split(' ');
    if (words.length < 4 || value.includes('/')) return value;
    const i = value.lastIndexOf(' ');
    return (value.slice(0, i) + ' ' + value.slice(i + 1)) as T;
  }
  if (Array.isArray(value)) return value.map(glue) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, glue(v)])) as T;
  }
  return value;
}
