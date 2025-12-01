import { createClient } from "microcms-js-sdk";
import type {
  Article,
  Category,
  Tag,
  Author,
  Team,
  MicroCMSListResponse,
  ArticleListQuery,
  TeamListQuery,
} from "./types";

// microCMS クライアント作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// ベースURL（サイトマップ・OGP用）
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * =====================
 * 記事 (Article) 関連
 * =====================
 */

// 記事一覧を取得（公開記事のみ）
export async function getArticles(
  query: ArticleListQuery = {}
): Promise<MicroCMSListResponse<Article>> {
  const { limit = 10, offset = 0, filters, orders = "-publishedAt", fields } = query;

  try {
    return await client.get<MicroCMSListResponse<Article>>({
      endpoint: "articles",
      queries: {
        limit,
        offset,
        filters,
        orders,
        fields,
      },
    });
  } catch {
    // APIが未設定の場合は空配列を返す
    return { contents: [], totalCount: 0, offset: 0, limit };
  }
}

// 全記事を取得（サイトマップ用）
export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await getArticles({ limit, offset });
    articles.push(...response.contents);
    
    if (articles.length >= response.totalCount) {
      break;
    }
    offset += limit;
  }

  return articles;
}

// 記事をスラッグで取得
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await client.get<MicroCMSListResponse<Article>>({
      endpoint: "articles",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    return null;
  }
}

// 全記事のスラッグを取得（静的生成用）
export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map((article) => article.slug);
}

// カテゴリ別の記事一覧を取得
export async function getArticlesByCategory(
  categoryId: string,
  query: ArticleListQuery = {}
): Promise<MicroCMSListResponse<Article>> {
  return getArticles({
    ...query,
    filters: `category[equals]${categoryId}`,
  });
}

// タグ別の記事一覧を取得
export async function getArticlesByTag(
  tagId: string,
  query: ArticleListQuery = {}
): Promise<MicroCMSListResponse<Article>> {
  return getArticles({
    ...query,
    filters: `tags[contains]${tagId}`,
  });
}

// 著者別の記事一覧を取得
export async function getArticlesByAuthor(
  authorId: string,
  query: ArticleListQuery = {}
): Promise<MicroCMSListResponse<Article>> {
  return getArticles({
    ...query,
    filters: `author[equals]${authorId}`,
  });
}

/**
 * =====================
 * カテゴリ (Category) 関連
 * =====================
 */

// カテゴリ一覧を取得（作成日時の古い順＝最初に登録したものが先）
export async function getCategories(): Promise<MicroCMSListResponse<Category>> {
  try {
    return await client.get<MicroCMSListResponse<Category>>({
      endpoint: "categories",
      queries: {
        limit: 100,
        orders: "createdAt", // 古い順（昇順）
      },
    });
  } catch {
    // APIが未設定の場合は空配列を返す
    return { contents: [], totalCount: 0, offset: 0, limit: 100 };
  }
}

// カテゴリをスラッグで取得
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await client.get<MicroCMSListResponse<Category>>({
      endpoint: "categories",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    return null;
  }
}

// 全カテゴリのスラッグを取得
export async function getAllCategorySlugs(): Promise<string[]> {
  const response = await getCategories();
  return response.contents.map((category) => category.slug);
}

/**
 * =====================
 * タグ (Tag) 関連
 * =====================
 */

// タグ一覧を取得
export async function getTags(): Promise<MicroCMSListResponse<Tag>> {
  try {
    return await client.get<MicroCMSListResponse<Tag>>({
      endpoint: "tags",
      queries: {
        limit: 100,
      },
    });
  } catch {
    // APIが未設定の場合は空配列を返す
    return { contents: [], totalCount: 0, offset: 0, limit: 100 };
  }
}

// タグをスラッグで取得
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await client.get<MicroCMSListResponse<Tag>>({
      endpoint: "tags",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    return null;
  }
}

// 全タグのスラッグを取得
export async function getAllTagSlugs(): Promise<string[]> {
  const response = await getTags();
  return response.contents.map((tag) => tag.slug);
}

/**
 * =====================
 * 著者 (Author) 関連
 * =====================
 */

// 著者一覧を取得
export async function getAuthors(): Promise<MicroCMSListResponse<Author>> {
  try {
    return await client.get<MicroCMSListResponse<Author>>({
      endpoint: "authors",
      queries: {
        limit: 100,
      },
    });
  } catch {
    // APIが未設定の場合は空配列を返す
    return { contents: [], totalCount: 0, offset: 0, limit: 100 };
  }
}

// 著者をスラッグで取得
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await client.get<MicroCMSListResponse<Author>>({
      endpoint: "authors",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    return null;
  }
}

// 全著者のスラッグを取得
export async function getAllAuthorSlugs(): Promise<string[]> {
  const response = await getAuthors();
  return response.contents.map((author) => author.slug);
}

/**
 * =====================
 * チーム (Team) 関連
 * =====================
 */

// チーム一覧を取得
export async function getTeams(
  query: TeamListQuery = {}
): Promise<MicroCMSListResponse<Team>> {
  const { limit = 50, offset = 0, filters, orders = "createdAt", fields } = query;

  try {
    return await client.get<MicroCMSListResponse<Team>>({
      endpoint: "teams",
      queries: {
        limit,
        offset,
        filters,
        orders,
        fields,
      },
    });
  } catch {
    // APIが未設定の場合は空配列を返す
    return { contents: [], totalCount: 0, offset: 0, limit };
  }
}

// 全チームを取得
export async function getAllTeams(): Promise<Team[]> {
  const teams: Team[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await getTeams({ limit, offset });
    teams.push(...response.contents);
    
    if (teams.length >= response.totalCount) {
      break;
    }
    offset += limit;
  }

  return teams;
}

// チームをIDで取得
export async function getTeamById(id: string): Promise<Team | null> {
  try {
    return client.get<Team>({
      endpoint: "teams",
      contentId: id,
    });
  } catch {
    return null;
  }
}

// リーグ別のチーム一覧を取得
export async function getTeamsByLeague(
  league: 'boys' | 'senior' | 'young',
  query: TeamListQuery = {}
): Promise<MicroCMSListResponse<Team>> {
  return getTeams({
    ...query,
    filters: `league[equals]${league}`,
  });
}

// 都道府県別のチーム一覧を取得
export async function getTeamsByPrefecture(
  prefecture: string,
  query: TeamListQuery = {}
): Promise<MicroCMSListResponse<Team>> {
  return getTeams({
    ...query,
    filters: `prefecture[equals]${prefecture}`,
  });
}

// リーグ＋都道府県でチーム一覧を取得
export async function getTeamsByLeagueAndPrefecture(
  league: 'boys' | 'senior' | 'young',
  prefecture: string,
  query: TeamListQuery = {}
): Promise<MicroCMSListResponse<Team>> {
  return getTeams({
    ...query,
    filters: `league[equals]${league}[and]prefecture[equals]${prefecture}`,
  });
}

