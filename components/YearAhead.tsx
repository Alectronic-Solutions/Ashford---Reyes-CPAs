import { localToday } from './yearAheadRules';
import { YearAheadPanel } from './YearAheadPanel';

/**
 * The server pass uses the build date, so the section reads sensibly with no JavaScript.
 * The panel replaces it with the visitor's own date once it runs in the browser.
 */
export function YearAhead() {
  return <YearAheadPanel buildToday={localToday()} />;
}
