# VSCode 拡張機能 リリース手順

## 前提

- GitHub リポジトリの **Settings → Secrets → Actions** に `VSCE_PAT`（Marketplace の Personal Access Token）が登録済みであること

## 手順

1. `vscode-extension/package.json` の `version` を上げる（例: `0.1.1` → `0.1.2`）
2. `vscode-extension/CHANGELOG.md` に変更内容を追記する
3. PR を作成してマージ
4. タグを push する

```bash
git tag vscode-extension-v<version>
git push origin vscode-extension-v<version>
```

タグを push すると `.github/workflows/release-vscode-extension.yml` が起動し、ビルド → VSIX を GitHub Release にアップロード → Marketplace 公開まで自動で行う。

## 注意

- タグのバージョンと `package.json` の `version` が一致しないとワークフローの `Validate version` ステップで失敗する
- ワークフローは `workflow_dispatch` でも手動実行可能（その場合は Validate version はスキップされる）
