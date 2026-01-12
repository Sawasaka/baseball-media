import { NextResponse } from "next/server";
import {
  getAllArticles,
  getCategories,
  getTags,
  getAuthors,
  BASE_URL,
} from "@/lib/microcms";

// XMLエスケープ関数
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// サイトマップエントリを生成
function createUrlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: number
): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  // トップページ（チーム検索・コラム一覧）
  urls.push(createUrlEntry(BASE_URL, now, "daily", 1.0));

  // 記事ページ
  try {
    const articles = await getAllArticles();
    for (const article of articles) {
      if (article.publishedAt) {
        urls.push(
          createUrlEntry(
            `${BASE_URL}/columns/${article.slug || article.id}`,
            new Date(article.updatedAt).toISOString(),
            "weekly",
            0.8
          )
        );
      }
    }
  } catch (e) {
    console.error("Failed to fetch articles for sitemap:", e);
  }

  // カテゴリページ
  try {
    const { contents: categories } = await getCategories();
    for (const category of categories) {
      urls.push(
        createUrlEntry(
          `${BASE_URL}/category/${category.slug}`,
          new Date(category.updatedAt).toISOString(),
          "weekly",
          0.7
        )
      );
    }
  } catch (e) {
    console.error("Failed to fetch categories for sitemap:", e);
  }

  // タグページ
  try {
    const { contents: tags } = await getTags();
    for (const tag of tags) {
      urls.push(
        createUrlEntry(
          `${BASE_URL}/tag/${tag.slug}`,
          new Date(tag.updatedAt).toISOString(),
          "weekly",
          0.6
        )
      );
    }
  } catch (e) {
    console.error("Failed to fetch tags for sitemap:", e);
  }

  // 著者ページ
  try {
    const { contents: authors } = await getAuthors();
    for (const author of authors) {
      urls.push(
        createUrlEntry(
          `${BASE_URL}/author/${author.slug}`,
          new Date(author.updatedAt).toISOString(),
          "monthly",
          0.5
        )
      );
    }
  } catch (e) {
    console.error("Failed to fetch authors for sitemap:", e);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}







