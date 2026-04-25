#!/bin/bash
# Block git commit/push when on main or master branch.
input=$(cat)
cmd=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

if echo "$cmd" | grep -qE 'git[[:space:]]+(commit|push)'; then
  branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
    echo "⚠️  main ブランチへの直接 commit/push は禁止されています。" >&2
    echo "   git checkout -b <branch-name> で新しいブランチを作成してください。" >&2
    exit 2
  fi
fi
