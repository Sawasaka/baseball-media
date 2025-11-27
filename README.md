# 中学硬式野球メディア - ROOKIE SMART

サイバーパンクテイストの中学硬式野球チーム検索メディア。
Next.js 14, Tailwind CSS, Framer Motion, Three.js, Sanity CMS を使用しています。

## 🚀 すぐに公開する手順 (Cloudflare Pages)

このコードは Cloudflare Pages で即座にデプロイ可能です。

**📖 詳細な手順は [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md) を参照してください。**

### クイックスタート

1. **GitHubリポジトリ**: https://github.com/Sawasaka/baseball-media
2. **Cloudflare Pages で連携**
   - Cloudflare Dashboard > Workers & Pages > Create application > Pages > Connect to Git
   - `Sawasaka/baseball-media` を選択

3. **ビルド設定（重要）**
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Environment variables**: `NODE_VERSION` = `20`

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

## ✅ 実装済み機能

- ✅ サイバーパンクUI（ネオンカラー、アニメーション、3D背景）
- ✅ 都道府県タブ（大阪・兵庫）
- ✅ リーグフィルター（ボーイズ・シニア・ヤング）
- ✅ チームカード表示（ダミーデータ10チーム）
- ✅ **サブサービス5つのタブ（iframe埋め込み）**
  - 英語、IT起業、野球塾、高校野球スカウト、キャリア支援

## 📝 今後のタスク

1. **Sanity連携**
   - Sanityプロジェクトを作成 (`npm create sanity@latest`)
   - プロジェクトIDを環境変数 (`.env.local`) に設定
   - `lib/dummy-data.ts` を Sanity クライアントからの取得処理に置き換え

2. **サブサービス埋め込みの最適化（オプション）**
   - 各サブドメインサイトで `Content-Security-Policy: frame-ancestors ...` を設定すると、iframeが正常に表示されます
   - 現在は、iframeが表示できない場合でも「新しいタブで開く」リンクが表示されます

3. **本番ドメイン設定**
   - Cloudflare Pages の Custom Domains で独自ドメインを設定

4. **コラム・監修者ページの実装**
   - コラム一覧・詳細ページ
   - 監修者（沢坂弘樹）プロフィールページ

