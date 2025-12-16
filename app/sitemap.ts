import { MetadataRoute } from "next";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 都道府県×リーグのページ（SEO用クエリURL）
  const prefectureLeaguePages: MetadataRoute.Sitemap = [];
  
  for (const pref of allPrefectures) {
    // 都道府県のみ（全リーグ）
    prefectureLeaguePages.push({
      url: `${BASE_URL}/?prefecture=${encodeURIComponent(pref)}&league=all`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
    
    // 都道府県×各リーグ
    for (const league of leagues.filter(l => l !== "all")) {
      prefectureLeaguePages.push({
        url: `${BASE_URL}/?prefecture=${encodeURIComponent(pref)}&league=${league}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  // 記事ページ（公開記事のみ）
  const articles = await getAllArticles();
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => article.publishedAt) // 公開済みのみ
    .map((article) => ({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // カテゴリページ
  const { contents: categories } = await getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // タグページ
  const { contents: tags } = await getTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/tag/${tag.slug}`,
    lastModified: new Date(tag.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 著者ページ
  const { contents: authors } = await getAuthors();
  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${BASE_URL}/author/${author.slug}`,
    lastModified: new Date(author.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...prefectureLeaguePages,
    ...articlePages,
    ...categoryPages,
    ...tagPages,
    ...authorPages,
  ];
}
