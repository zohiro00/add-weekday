// Entry point for Node.js / npm / CLI consumers.
// The canonical implementation lives in src/addWeekday.js (UMD).
const { addWeekday, WEEKDAYS_JA, WEEKDAYS_EN } = require('./src/addWeekday.js');
module.exports = { addWeekday, WEEKDAYS_JA, WEEKDAYS_EN };
