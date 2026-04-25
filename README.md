# add-weekday

## 概要

**add-weekday** は、自然文に含まれる日付に対して自動で曜日を付与するシンプルなツールです。
マークダウンなどで雑に日付をメモするビジネスマン向けに設計されています。

## 入力例

    4/20
    04/20
    2024/04/20
    4/20（月）
    4/20(月)

## 出力例

    4/20(月)
    04/20(月)
    2024/04/20(土)
    変更なし
    変更なし

## 仕様

- 正規表現ベースで日付を検出
- 年が省略された場合は**現在年を使用**（`yearMode` オプションで変更可）
- 既に曜日が付いている場合は**上書きしない**（`overwrite` オプションで変更可）
- シンプルなロジックで高速動作

## 設計の特徴

- ゼロ依存・UMD 形式（Node.js / ブラウザ / VSCode 拡張のいずれでも動作）
- シンプルな正規表現ベース
- 上書き禁止（デフォルト）
- 複数の出力フォーマット: `(月)` `（月）` `(Mon)` `[月]` ` 月`
- オプション拡張可能
  - `yearMode`: `current` / `next` / `nearest`
  - `mdOnly`: mm/dd のみ対象（yyyy/mm/dd はスキップ）
  - `overwrite`: 既存曜日を再計算

## 想定ユースケース

- マークダウンでのメモ整理
- タスク管理メモの補助
- 日付の確認ミス防止

---

## Web ツール (Cloudflare Workers)

`site/` に2ページ構成の静的サイトを配置しています。

| パス | 内容 |
|------|------|
| `/` | ランディングページ |
| `/engine` | エディタ（入力→曜日付与→コピー） |

### ローカルで確認

```bash
cd site
npx wrangler dev
```

- `http://localhost:8787/` → トップページ
- `http://localhost:8787/engine` → ツールページ
- `http://localhost:8787/addWeekday.js` → UMD ライブラリ

### Cloudflare Workers へデプロイ

`.github/workflows/deploy-workers.yml` で `site/` または `src/` への push 時に自動デプロイします。

**初回セットアップ:**

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/profile/api-tokens) で API トークンを発行
   - テンプレート: `Edit Cloudflare Workers` を使用
2. GitHub リポジトリの **Settings → Secrets → Actions** に `CLOUDFLARE_API_TOKEN` を追加
3. `main` ブランチへ push（または Actions タブから手動実行）

**カスタムドメイン設定:**

Cloudflare ダッシュボード → Workers & Pages → add-weekday → Custom Domains で設定。コードの変更は不要です。

---

## テスト

```bash
node addWeekday.test.js
```

ビルドステップ・パッケージマネージャ・リンターは不要です。

---

## 今後の拡張案

- VSCode 拡張機能
- 日本語日付（例：4月20日）対応
- 祝日付与

## ターゲットユーザー

- マークダウンで日付をメモするビジネスマン

## ライセンス

MIT
