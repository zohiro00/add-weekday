# Add Weekday — VSCode Extension

Automatically append Japanese (or English) day-of-week characters to dates in Markdown and plain text files.

**Before:**
```
ミーティング: 4/22
レビュー: 4/28
リリース: 2026/6/30
```

**After:**
```
ミーティング: 4/22(火)
レビュー: 4/28(月)
リリース: 2026/6/30(火)
```

---

## Usage

1. Open a Markdown or plain text file
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run **Add Weekday: 曜日を付与**

- If text is **selected**, only the selection is converted
- If nothing is selected, the **entire document** is converted

---

## Settings

| Setting | Default | Description |
|---|---|---|
| `addWeekday.format` | `paren-ja` | Output format: `paren-ja` → `4/20(月)`, `paren-en` → `4/20(Mon)`, etc. |
| `addWeekday.weekdayStyle` | `null` | Override weekday style (`ja` / `ja-full` / `en-short` / `en-long`) |
| `addWeekday.dateOrder` | `MDY` | How to read ambiguous dates: `MDY` (month/day) or `DMY` (day/month) |
| `addWeekday.yearMode` | `current` | Year inference: `current` / `next` / `nearest` |
| `addWeekday.overwrite` | `false` | Re-tag dates that already have a weekday |
| `addWeekday.mdOnly` | `false` | Skip `yyyy/mm/dd`; only tag `mm/dd` |
| `addWeekday.targetLanguages` | `["markdown","plaintext"]` | File types to activate for |
| `addWeekday.runOnSave` | `false` | Auto-convert on save |
| `addWeekday.showStatusBarItem` | `false` | Show a status bar button |

---

## Manual Install (VSIX)

If you prefer not to install from the Marketplace:

1. Download the latest `.vsix` from [GitHub Releases](https://github.com/zohiro00/add-weekday/releases)
2. In VSCode: `Extensions` → `...` → `Install from VSIX...`

---

## License

MIT © zohiro00
