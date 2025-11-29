import { MetadataRoute } from "next";
import {
  getAllArticles,
  getCategories,
  getTags,
  getAuthors,
  BASE_URL,
} from "@/lib/microcms";

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
    ...articlePages,
    ...categoryPages,
    ...tagPages,
    ...authorPages,
  ];
}
