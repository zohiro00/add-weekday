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

