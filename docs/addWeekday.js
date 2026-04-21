// addWeekday.js — core logic (UMD: works in Node.js and browsers)
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.addWeekdayLib = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
  const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function formatWeekday(dayIndex, fmt) {
    const ja = WEEKDAYS_JA[dayIndex];
    const en = WEEKDAYS_EN[dayIndex];
    switch (fmt) {
      case "paren-ja":      return `(${ja})`;
      case "paren-ja-full": return `（${ja}）`;
      case "paren-en":      return `(${en})`;
      case "bracket":       return `[${ja}]`;
      case "space":         return ` ${ja}`;
      default:              return `(${ja})`;
    }
  }

  // Detects any existing weekday tag after a date match
  const ANY_WEEKDAY_RE = /^\s*(?:[\(\[（][日月火水木金土](?:曜日?)?[\)\]）]|\((Sun|Mon|Tue|Wed|Thu|Fri|Sat)\)|\s[日月火水木金土])/;

  /**
   * @param {string} text
   * @param {object} [opts]
   * @param {string} [opts.format="paren-ja"]   - paren-ja | paren-ja-full | paren-en | bracket | space
   * @param {string} [opts.yearMode="current"]  - current | next | nearest
   * @param {Date}   [opts.refDate=new Date()]  - reference date for year inference
   * @param {boolean}[opts.overwrite=false]     - re-tag dates that already have a weekday
   * @param {boolean}[opts.mdOnly=false]        - skip yyyy/mm/dd, only tag mm/dd
   * @returns {{ text: string, count: number }}
   */
  function addWeekday(text, opts) {
    const {
      format   = "paren-ja",
      yearMode = "current",
      refDate  = new Date(),
      overwrite = false,
      mdOnly   = false,
    } = opts || {};

    const refYear = refDate.getFullYear();
    const regex = /\b(?:(\d{4})\/)?(\d{1,2})\/(\d{1,2})\b/g;
    let matches = 0;

    const result = text.replace(regex, (match, year, month, day, offset, fullText) => {
      const after = fullText.slice(offset + match.length);

      if (mdOnly && year) return match;
      if (!overwrite && ANY_WEEKDAY_RE.test(after)) return match;

      let y;
      const m = Number(month);
      const d = Number(day);

      if (year) {
        y = Number(year);
      } else {
        const thisYear = new Date(refYear,     m - 1, d);
        const nextYear = new Date(refYear + 1, m - 1, d);
        const prevYear = new Date(refYear - 1, m - 1, d);
        if (yearMode === "next") {
          y = (thisYear >= refDate) ? refYear : refYear + 1;
        } else if (yearMode === "nearest") {
          const diffs = [
            [Math.abs(thisYear - refDate), refYear],
            [Math.abs(nextYear - refDate), refYear + 1],
            [Math.abs(prevYear - refDate), refYear - 1],
          ].sort((a, b) => a[0] - b[0]);
          y = diffs[0][1];
        } else {
          y = refYear;
        }
      }

      const date = new Date(y, m - 1, d);
      if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        return match;
      }

      matches++;
      return `${match}${formatWeekday(date.getDay(), format)}`;
    });

    return { text: result, count: matches };
  }

  return { addWeekday, WEEKDAYS_JA, WEEKDAYS_EN };
}));
