import { NextResponse } from "next/server";
import {
  getAllArticles,
  getCategories,
  getTags,
  getAuthors,
  BASE_URL,
} from "@/lib/microcms";

// 全47都道府県
const allPrefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

// リーグ
const leagues = ["all", "boys", "senior", "young"];

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

  // 静的ページ
  urls.push(createUrlEntry(BASE_URL, now, "daily", 1.0));
  urls.push(createUrlEntry(`${BASE_URL}/articles`, now, "daily", 0.9));

  // 都道府県×リーグのページ
  for (const pref of allPrefectures) {
    // 都道府県のみ（全リーグ）
    urls.push(
      createUrlEntry(
        `${BASE_URL}/?prefecture=${encodeURIComponent(pref)}&league=all`,
        now,
        "weekly",
        0.8
      )
    );

    // 都道府県×各リーグ
    for (const league of leagues.filter((l) => l !== "all")) {
      urls.push(
        createUrlEntry(
          `${BASE_URL}/?prefecture=${encodeURIComponent(pref)}&league=${league}`,
          now,
          "weekly",
          0.7
        )
      );
    }
  }

  // 記事ページ
  try {
    const articles = await getAllArticles();
    for (const article of articles) {
      if (article.publishedAt) {
        urls.push(
          createUrlEntry(
            `${BASE_URL}/articles/${article.slug}`,
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

