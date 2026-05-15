# Changelog

## [0.1.1] - 2026-05-16

### Added
- `Add Weekday: 曜日を付与（上書き） / Overwrite Weekday` コマンドを追加 — 既存の曜日タグも再計算して上書き

### Changed
- コマンド名を `曜日を付与（上書きなし） / Add Weekday` に変更（明示的な上書きなし表記）
- デフォルトキーバインド (`Cmd+Shift+D` / `Ctrl+Shift+D`) を削除 — ユーザーが任意で設定する方式に変更

## [0.1.0] - 2026-05-15

### Added
- Initial release
- `Add Weekday: 曜日を付与` command — adds day-of-week to dates in Markdown / plain text
- Selection-aware: converts selected range only, or whole document when nothing is selected
- Settings: `format`, `weekdayStyle`, `dateOrder`, `yearMode`, `overwrite`, `mdOnly`, `targetLanguages`
- Optional `runOnSave` — auto-convert on file save (default off)
- Optional `showStatusBarItem` — status bar button (default off)
