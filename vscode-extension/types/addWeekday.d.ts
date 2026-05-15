export interface AddWeekdayOptions {
  format?: string;
  weekdayStyle?: 'ja' | 'ja-full' | 'en-short' | 'en-long' | null;
  dateOrder?: 'MDY' | 'DMY';
  yearMode?: 'current' | 'next' | 'nearest';
  refDate?: Date;
  overwrite?: boolean;
  mdOnly?: boolean;
}

export interface AddWeekdayResult {
  text: string;
  count: number;
}

export declare function addWeekday(text: string, opts?: AddWeekdayOptions): AddWeekdayResult;
