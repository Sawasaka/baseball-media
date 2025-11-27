# 中学硬式野球メディア - ROOKIE SMART

サイバーパンクテイストの中学硬式野球チーム検索メディア。
Next.js 14, Tailwind CSS, Framer Motion, Three.js, Sanity CMS を使用しています。

## 🚀 すぐに公開する手順 (Cloudflare Pages)

このコードは Cloudflare Pages で即座にデプロイ可能です。

1. **GitHubにプッシュ**
   - このフォルダをGitHubのリポジトリにプッシュしてください。

2. **Cloudflare Pages で連携**
   - Cloudflare Dashboard > Pages > Create a project > Connect to Git
   - 作成したリポジトリを選択。

3. **ビルド設定**
   - **Framework Preset**: `Next.js`
   - **Build command**: `npm run build` (または `npx @cloudflare/next-on-pages@1`)
   - **Output directory**: `.vercel/output/static` (静的書き出しの場合) またはデフォルト

   ※ Next.js App Router を Cloudflare Pages で動かす場合、推奨設定は以下です：
   - Framework preset: **None** (or Next.js if using edge runtime)
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Output dir: `.vercel/output/static`
   - Environment Variables: `NODE_VERSION: 20`

## 🛠 開発環境のセットアップ

ローカルで編集するには Node.js (v18以上) が必要です。

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **開発サーバー起動**
   ```bash
   npm run dev
   ```
   http://localhost:3000 にアクセス。

## 📂 プロジェクト構成

- `app/`: ページ本体 (Top, Search, Column)
- `components/`: UIパーツ (Navbar, TeamCard, Scene3D)
- `lib/`: ユーティリティ、ダミーデータ
- `sanity/`: CMS設定とスキーマ定義

## 📝 今後のタスク

1. **Sanity連携**
   - Sanityプロジェクトを作成 (`npm create sanity@latest`)
   - プロジェクトIDを環境変数 (`.env.local`) に設定
   - `lib/dummy-data.ts` を Sanity クライアントからの取得処理に置き換え

2. **サブサービス埋め込み**
   - 各サブドメインサイトで `Content-Security-Policy: frame-ancestors ...` を設定
   - タブコンポーネントに `iframe` を追加

3. **本番ドメイン設定**
   - Cloudflare Pages の Custom Domains で独自ドメインを設定

