# 中学硬式野球メディア - ROOKIE SMART

> **非エンジニアでも運用できる、中学硬式野球チームのSEO特化オウンドメディア**  
> 技術スタック: microCMS + Next.js + Cloudflare Pages 
> デザインコンセプト: **サイバーパンク**

サイバーパンクテイストの中学硬式野球チーム検索メディア。
Next.js 14, Tailwind CSS, Framer Motion, Three.js, microCMS を使用しています。

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

4. **環境変数（Cloudflare Pages で設定）**
   ```
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

## 🛠 開発環境のセットアップ

ローカルで編集するには Node.js (v18以上) が必要です。

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   ```bash
   cp .env.local.example .env.local
   # .env.local を編集して microCMS の情報を入力
   ```

3. **開発サーバー起動**
   ```bash
   npm run dev
   ```
   http://localhost:3000 にアクセス。

## 📂 プロジェクト構成

```
├── app/
│   ├── page.tsx           # トップページ
│   ├── articles/          # 記事一覧・詳細
│   │   ├── page.tsx       # /articles
│   │   └── [slug]/page.tsx # /articles/[slug]
│   ├── category/[slug]/   # カテゴリ別記事一覧
│   ├── tag/[slug]/        # タグ別記事一覧
│   ├── author/[slug]/     # 著者ページ
│   ├── sitemap.ts         # サイトマップ自動生成
│   └── robots.ts          # robots.txt
├── components/            # UIパーツ
├── lib/
│   ├── microcms/          # microCMS クライアント & 型定義
│   │   ├── client.ts      # API クライアント
│   │   ├── types.ts       # TypeScript 型定義
│   │   └── index.ts       # エクスポート
│   └── dummy-data.ts      # チームのダミーデータ
└── public/                # 静的ファイル
```

## 📝 microCMS スキーマ設計

microCMS で以下の API を作成してください（すべてリスト型）:

### articles（記事）
| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| title | タイトル | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| body | 本文 | リッチエディタ |
| category | カテゴリ | コンテンツ参照（categories） |
| tags | タグ | 複数コンテンツ参照（tags） |
| author | 著者 | コンテンツ参照（authors） |
| ogImage | OG画像 | 画像 |
| metaDescription | メタ説明 | テキストフィールド |

### categories（カテゴリ）
| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| name | カテゴリ名 | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| description | 説明 | テキストエリア |

### tags（タグ）
| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| name | タグ名 | テキストフィールド |
| slug | スラッグ | テキストフィールド |

### authors（著者）
| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| name | 名前 | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| bio | 自己紹介 | テキストエリア |
| avatar | アバター | 画像 |

## ✅ 実装済み機能

### フロントエンド
- ✅ サイバーパンクUI（ネオンカラー、アニメーション、3D背景）
- ✅ 都道府県タブ（大阪・兵庫）
- ✅ リーグフィルター（ボーイズ・シニア・ヤング）
- ✅ チームカード表示（ダミーデータ10チーム）
- ✅ サブチャンネル5つ（英語、IT、野球塾、スカウト、キャリア）
- ✅ 監修者セクション
- ✅ お問い合わせフォーム
- ✅ お役立ちコラム（モーダル表示）

### CMS連携 (microCMS)
- ✅ 記事一覧・詳細ページ `/articles`, `/articles/[slug]`
- ✅ カテゴリ別記事一覧 `/category/[slug]`
- ✅ タグ別記事一覧 `/tag/[slug]`
- ✅ 著者ページ `/author/[slug]`

### SEO対策
- ✅ 動的メタデータ生成（title, description, OGP, Twitter Card）
- ✅ JSON-LD 構造化データ（Article/BlogPosting, BreadcrumbList）
- ✅ 動的サイトマップ生成（全記事・カテゴリ・タグ・著者を含む）
- ✅ robots.txt
- ✅ パンくずリスト

## 📝 今後のタスク

1. **microCMS でコンテンツ作成**
   - カテゴリ・タグ・著者を先に作成
   - 記事を作成して公開

2. **本番ドメイン設定**
   - Cloudflare Pages の Custom Domains で独自ドメインを設定
   - `NEXT_PUBLIC_BASE_URL` を本番ドメインに更新

3. **チームデータの CMS 化（オプション）**
   - 現在はダミーデータを使用
   - 必要に応じて microCMS でチーム API を作成

---

© 2026 ROOKIE_SMART // ALL_RIGHTS_RESERVED  
BUILD_v2026 // SECTOR_JAPAN
