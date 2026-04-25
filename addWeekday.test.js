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

// ===== フォーマット =====
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
