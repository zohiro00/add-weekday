// 編集は src/addWeekday.js のみ。site/public/addWeekday.js はコミット時に自動同期。
// addWeekday.js — core logic (UMD: works in Node.js and browsers)
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.addWeekdayLib = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const WEEKDAYS_JA      = ["日", "月", "火", "水", "木", "金", "土"];
  const WEEKDAYS_JA_FULL = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  const WEEKDAYS_EN      = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const WEEKDAYS_EN_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Backward-compat aliases: map legacy format names to template + weekdayStyle
  const FORMAT_ALIASES = {
    'paren-ja':      { template: '{date}({weekday})',  weekdayStyle: 'ja' },
    'paren-ja-full': { template: '{date}（{weekday}）', weekdayStyle: 'ja' },
    'paren-en':      { template: '{date}({weekday})',  weekdayStyle: 'en-short' },
    'bracket':       { template: '{date}[{weekday}]',  weekdayStyle: 'ja' },
    'space':         { template: '{date} {weekday}',   weekdayStyle: 'ja' },
  };

  function getWeekdayStr(dayIndex, style) {
    switch (style) {
      case 'ja':       return WEEKDAYS_JA[dayIndex];
      case 'ja-full':  return WEEKDAYS_JA_FULL[dayIndex];
      case 'en-short': return WEEKDAYS_EN[dayIndex];
      case 'en-long':  return WEEKDAYS_EN_LONG[dayIndex];
      default:         return WEEKDAYS_JA[dayIndex];
    }
  }

  /**
   * @param {string} text
   * @param {object} [opts]
   * @param {string} [opts.format="paren-ja"]   - paren-ja | paren-ja-full | paren-en | bracket | space | template with {date}/{weekday}
   * @param {string} [opts.weekdayStyle]        - ja | ja-full | en-short | en-long (overrides alias default)
   * @param {string} [opts.dateOrder="MDY"]     - MDY | DMY (4-digit-year dates always use YMD)
   * @param {string} [opts.yearMode="current"]  - current | next | nearest
   * @param {Date}   [opts.refDate=new Date()]  - reference date for year inference
   * @param {boolean}[opts.overwrite=false]     - re-tag dates that already have a weekday
   * @param {boolean}[opts.mdOnly=false]        - skip yyyy/mm/dd, only tag mm/dd
   * @returns {{ text: string, count: number }}
   */
  function addWeekday(text, opts) {
    const {
      format      = "paren-ja",
      dateOrder   = "MDY",
      yearMode    = "current",
      refDate     = new Date(),
      overwrite   = false,
      mdOnly      = false,
    } = opts || {};

    // Resolve format string to { template, resolvedStyle }
    let template, resolvedStyle;
    const alias = FORMAT_ALIASES[format];
    if (alias) {
      template      = alias.template;
      resolvedStyle = (opts && opts.weekdayStyle) ? opts.weekdayStyle : alias.weekdayStyle;
    } else if (typeof format === 'string' && (format.includes('{date}') || format.includes('{weekday}'))) {
      template      = format;
      resolvedStyle = (opts && opts.weekdayStyle) || 'ja';
    } else {
      template      = '{date}({weekday})';
      resolvedStyle = 'ja';
    }

    const refYear = refDate.getFullYear();
    const regex = /\b(?:(\d{4})\/)?(\d{1,2})\/(\d{1,2})\b([\(\[（][日月火水木金土](?:曜日?)?[\)\]）]|\((?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\)| [日月火水木金土])?/g;
    let matches = 0;

    const result = text.replace(regex, (match, year, g2, g3, existingTag) => {
      if (mdOnly && year) return match;
      if (existingTag && !overwrite) return match;

      // 4-digit year → always YMD; no-year → apply dateOrder
      let m, d;
      if (year) {
        m = Number(g2);
        d = Number(g3);
      } else if (dateOrder === 'DMY') {
        d = Number(g2);
        m = Number(g3);
      } else {
        m = Number(g2);
        d = Number(g3);
      }

      if (m < 1 || m > 12 || d < 1 || d > 31) return match;

      let y;
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
      const weekdayStr = getWeekdayStr(date.getDay(), resolvedStyle);
      const datePart   = existingTag ? match.slice(0, match.length - existingTag.length) : match;
      return template.replace('{date}', datePart).replace('{weekday}', weekdayStr);
    });

    return { text: result, count: matches };
  }

  return { addWeekday, FORMAT_ALIASES, WEEKDAYS_JA, WEEKDAYS_JA_FULL, WEEKDAYS_EN, WEEKDAYS_EN_LONG };
}));
