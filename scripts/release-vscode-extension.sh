#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -p "require('./vscode-extension/package.json').version")
TAG="vscode-extension-v${VERSION}"

echo "Tagging ${TAG} ..."
git tag "${TAG}"
git push origin "${TAG}"
echo "Done. GitHub Actions will publish to Marketplace automatically."
