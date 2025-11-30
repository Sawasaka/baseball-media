/**
 * microCMS 共通の型定義
 */

// microCMS の共通フィールド
export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

// microCMS 画像フィールド
export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

// microCMS リストレスポンス
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * カテゴリ
 */
export interface Category extends MicroCMSBase {
  name: string;
  slug: string;
  description?: string;
}

/**
 * タグ
 */
export interface Tag extends MicroCMSBase {
  name: string;
  slug: string;
}

/**
 * 著者
 */
export interface Author extends MicroCMSBase {
  name: string;
  slug: string;
  bio?: string;
  avatar?: MicroCMSImage;
}

/**
 * 記事
 */
export interface Article extends MicroCMSBase {
  title: string;
  slug: string;
  body: string; // リッチテキスト or Markdown
  category?: Category;
  tags?: Tag[];
  author?: Author;
  // published フィールド（手動指定の公開日、任意）
  // ※ システムの publishedAt（MicroCMSBase）も自動で入るので、どちらを使ってもOK
  published?: string;
  ogImage?: MicroCMSImage;
  metaDescription?: string;
  // 公開状態（microCMS の draftKey で判定）
  isDraft?: boolean;
}

/**
 * 記事一覧取得用のクエリパラメータ
 */
export interface ArticleListQuery {
  limit?: number;
  offset?: number;
  filters?: string;
  orders?: string;
  fields?: string;
}

/**
 * SEO用メタデータ
 */
export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * チーム（teams API）
 * microCMS のフィールドID に合わせた定義
 * ※ microCMS のセレクトフィールドは配列で返ってくる
 */
export interface Team extends MicroCMSBase {
  name: string;                    // チーム名
  league: string[];                // リーグ（選択フィールド - 配列で返る）
  prefecture: string[];            // 都道府県（選択フィールド - 配列で返る）
  branch?: string;                 // 所属支部
  area?: string;                   // 地域（エリア名）
  feature1?: string;               // 特徴タグ1
  feature2?: string;               // 特徴タグ2
  feature3?: string;               // 特徴タグ3
  catchcopy?: string;              // キャッチコピー1行
  officialurl?: string;            // 公式サイトURL
}

/**
 * チーム一覧取得用のクエリパラメータ
 */
export interface TeamListQuery {
  limit?: number;
  offset?: number;
  filters?: string;
  orders?: string;
  fields?: string;
}

