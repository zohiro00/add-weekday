import type { AddWeekdayOptions, AddWeekdayResult } from '../types/addWeekday';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const lib = require('../../addWeekday.js') as { addWeekday: (text: string, opts?: AddWeekdayOptions) => AddWeekdayResult };

export function runAddWeekday(text: string, opts?: AddWeekdayOptions): AddWeekdayResult {
  return lib.addWeekday(text, opts);
}
