# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`add-weekday` is a zero-dependency JavaScript utility that automatically appends Japanese day-of-week characters (月/火/水/木/金/土/日) to dates found in plain text or markdown. Primary use case: businesspeople taking markdown notes with dates like `4/20` that become `4/20(月)`.

## Commands

Run tests:
```bash
node addWeekday.test.js
```

There is no build step, package manager, or linter configured.

## Git Workflow

- **Never work directly on `main`**. Always pull `main` and create a new branch before making changes.
- Branch naming: `fix/<topic>`, `feature/<topic>`, `docs/<topic>` etc.
- Open a PR and merge via GitHub — do not push commits directly to `main`.

## src/addWeekday.js と site/public/addWeekday.js の同期ルール

- **`src/addWeekday.js` が唯一の編集対象**。`site/public/addWeekday.js` は直接編集禁止。
- git commit 時に `.githooks/pre-commit` が自動でコピーする。
- CI (`check-sync.yml`) が 2 ファイルの一致を検証する。
- clone 後は一度だけ `bash scripts/setup-hooks.sh` を実行して hook を有効にすること。

