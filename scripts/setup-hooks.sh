#!/bin/bash
# Clone 後に一度だけ実行して git hooks を有効にする
set -e
git config core.hooksPath .githooks
echo "✅ git hooks を .githooks/ に設定しました"
