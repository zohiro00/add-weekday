// Entry point for Node.js / npm / CLI consumers.
// The canonical implementation lives in docs/addWeekday.js (UMD).
const { addWeekday, WEEKDAYS_JA, WEEKDAYS_EN } = require('./docs/addWeekday.js');
module.exports = { addWeekday, WEEKDAYS_JA, WEEKDAYS_EN };
