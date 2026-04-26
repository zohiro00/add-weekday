// addWeekday.test.js

const assert = require("assert");
const { addWeekday } = require("./addWeekday");

const REF = new Date(2026, 3, 21); // 2026-04-21 (火)

function test(label, input, expected, opts) {
  const { text } = addWeekday(input, { refDate: REF, ...opts });
  try {
    assert.strictEqual(text, expected);
    console.log(`✅ PASS: ${label}`);
  } catch (e) {
    console.error(`❌ FAIL: ${label}`);
    console.error(`   expected: ${expected}`);
    console.error(`   actual  : ${text}`);
  }
}

// ===== 基本動作 =====
test("単体日付",        "4/20",        "4/20(月)");
test("ゼロパディング",  "04/20",       "04/20(月)");
test("年あり",         "2024/04/20",  "2024/04/20(土)");
test("文章中",         "会議は4/20です", "会議は4/20(月)です");
test("複数日付",       "4/20と4/21",  "4/20(月)と4/21(火)");
test("不正日付",       "4/31",        "4/31");

// ===== 既存曜日スキップ =====
test("既存 (月)",      "4/20(月)",     "4/20(月)");
test("既存 （月）",    "4/20（月）",   "4/20（月）");

// ===== フォーマット エイリアス（後方互換） =====
test("paren-ja-full",  "4/20",  "4/20（月）", { format: "paren-ja-full" });
test("paren-en",       "4/20",  "4/20(Mon)", { format: "paren-en" });
test("bracket",        "4/20",  "4/20[月]",  { format: "bracket" });
test("space",          "4/20",  "4/20 月",   { format: "space" });

// ===== yearMode =====
// 4/20 は refDate(4/21) より前 → current=2026, next=2027, nearest=2026
test("yearMode current (過去日)",  "4/20", "4/20(月)", { yearMode: "current" });
test("yearMode next (過去日)",     "4/20", "4/20(火)", { yearMode: "next",    refDate: new Date(2026, 3, 21) }); // 2026/4/20 は過去 → 2027/4/20(火)
// 4/22 は refDate(4/21) より後 → next では今年のまま
test("yearMode next (未来日)",     "4/22", "4/22(水)", { yearMode: "next" });
test("yearMode nearest",           "4/20", "4/20(月)", { yearMode: "nearest" });

// ===== overwrite =====
test("overwrite=false でスキップ",          "4/20(月)",   "4/20(月)",  { overwrite: false });
test("overwrite=true で再計算",             "4/20(月)",   "4/20(月)",  { overwrite: true });
test("overwrite=true で誤曜日を修正 (半角)", "4/20(日)",   "4/20(月)",  { overwrite: true });
test("overwrite=true で誤曜日を修正 (全角)", "4/20（日）", "4/20(月)",  { overwrite: true });
test("overwrite=true でフォーマット正規化",  "4/20（月）", "4/20(月)",  { overwrite: true });

// ===== mdOnly =====
test("mdOnly: mm/dd はタグ付け",      "4/20",          "4/20(月)",          { mdOnly: true });
test("mdOnly: yyyy/mm/dd はスキップ", "2024/04/20",    "2024/04/20",        { mdOnly: true });

// ===== dateOrder =====
// DMY: 20/4 → day=20, month=4 → 2026-04-20 (月)
test("dateOrder DMY: 20/4 → 月",      "20/4",  "20/4(月)",  { dateOrder: "DMY" });
// DMY: 4/20 → day=4, month=20 → month=20 invalid → skip
test("dateOrder DMY: 4/20 は無効",    "4/20",  "4/20",      { dateOrder: "DMY" });
// MDY (default) regression
test("dateOrder MDY (default): 4/20", "4/20",  "4/20(月)",  { dateOrder: "MDY" });
// 4桁年は dateOrder 無関係で常に YMD
test("dateOrder DMY でも yyyy/mm/dd は YMD", "2026/04/20", "2026/04/20(月)", { dateOrder: "DMY" });

// ===== weekdayStyle =====
test("weekdayStyle ja (default)",   "4/20",  "4/20(月)",      { weekdayStyle: "ja" });
test("weekdayStyle ja-full",        "4/20",  "4/20（月曜日）", { format: "paren-ja-full", weekdayStyle: "ja-full" });
test("weekdayStyle en-short",       "4/20",  "4/20(Mon)",     { format: "paren-en", weekdayStyle: "en-short" });
test("weekdayStyle en-long",        "4/20",  "4/20(Monday)",  { format: "paren-en", weekdayStyle: "en-long" });

// ===== テンプレート文字列 =====
test("template {date}({weekday}) with en-short",  "4/20",  "4/20(Mon)",  { format: "{date}({weekday})", weekdayStyle: "en-short" });
test("template {weekday}, {date} — Mon前置",      "4/20",  "Mon, 4/20",  { format: "{weekday}, {date}", weekdayStyle: "en-short" });
test("template {date} — {weekday}",               "4/20",  "4/20 — 月",  { format: "{date} — {weekday}" });
test("template {weekday} {date} with en-long",    "4/20",  "Monday 4/20",{ format: "{weekday} {date}", weekdayStyle: "en-long" });

// ===== エイリアス回帰 =====
test("alias paren-en → 4/20(Mon)",  "4/20",  "4/20(Mon)",  { format: "paren-en" });
test("alias bracket  → 4/20[月]",   "4/20",  "4/20[月]",   { format: "bracket" });
test("alias space    → 4/20 月",    "4/20",  "4/20 月",    { format: "space" });

// ===== DMY + template =====
test("DMY + template前置",  "20/4",  "Mon, 20/4",  { dateOrder: "DMY", format: "{weekday}, {date}", weekdayStyle: "en-short" });
