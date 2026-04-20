// addWeekday.js

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function getWeekday(year, month, day) {
  const date = new Date(year, month - 1, day);
  return WEEKDAYS[date.getDay()];
}

function addWeekday(text) {
  const currentYear = new Date().getFullYear();

  // シンプルにマッチ（除外はしない）
  const regex = /\b(?:(\d{4})\/)?(\d{1,2})\/(\d{1,2})\b/g;

  return text.replace(regex, (match, year, month, day, offset, fullText) => {
    // 既に曜日が付いている場合はスキップ
    const after = fullText.slice(offset + match.length);

    if (/^\s*[\(（][日月火水木金土][\)）]/.test(after)) {
      return match;
    }

    const y = year ? Number(year) : currentYear;
    const m = Number(month);
    const d = Number(day);

    const date = new Date(y, m - 1, d);

    // 不正日付チェック
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      return match;
    }

    const weekday = getWeekday(y, m, d);

    return `${match}(${weekday})`;
  });
}

module.exports = {
  addWeekday,
};