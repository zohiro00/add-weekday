// addWeekday.test.js

const assert = require("assert");
const { addWeekday } = require("./addWeekday");

// 年は固定しないとテスト不安定になるので注意
const CURRENT_YEAR = new Date().getFullYear();

// ヘルパー
function test(input, expected) {
  const result = addWeekday(input);
  try {
    assert.strictEqual(result, expected);
    console.log(`✅ PASS: ${input}`);
  } catch (e) {
    console.error(`❌ FAIL: ${input}`);
    console.error(`   expected: ${expected}`);
    console.error(`   actual  : ${result}`);
  }
}

// ===== テストケース =====

// 単体日付
test("4/20", `4/20(${getWeekday(CURRENT_YEAR, 4, 20)})`);
test("04/20", `04/20(${getWeekday(CURRENT_YEAR, 4, 20)})`);

// 年あり
test("2024/04/20", "2024/04/20(土)");

// 既に曜日あり
test("4/20(月)", "4/20(月)");
test("4/20（月）", "4/20（月）");

// 文章中
test(
  "会議は4/20です",
  `会議は4/20(${getWeekday(CURRENT_YEAR, 4, 20)})です`
);

// 複数日付
test(
  "4/20と4/21",
  `4/20(${getWeekday(CURRENT_YEAR, 4, 20)})と4/21(${getWeekday(
    CURRENT_YEAR,
    4,
    21
  )})`
);

// 不正日付
test("4/31", "4/31");

// ===== 内部関数（テスト用にコピー）=====
function getWeekday(year, month, day) {
  const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date(year, month - 1, day);
  return WEEKDAYS[date.getDay()];
}