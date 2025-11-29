import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getArticlesByCategory,
  BASE_URL,
} from "@/lib/microcms";

interface Props {
  params: { slug: string };
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

// メタデータを動的に生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "カテゴリが見つかりません",
    };
  }

  const description =
    category.description ||
    `${category.name}に関する記事一覧。中学硬式野球の${category.name}について詳しく解説します。`;

  return {
    title: `${category.name} | 中学硬式野球メディア`,
    description,
    openGraph: {
      title: `${category.name} | 中学硬式野球メディア`,
      description,
      url: `${BASE_URL}/category/${category.slug}`,
    },
  };
}

// パンくずリスト用 JSON-LD を生成
function generateBreadcrumbJsonLd(categoryName: string, categorySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "HOME",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "記事一覧",
        item: `${BASE_URL}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${BASE_URL}/category/${categorySlug}`,
      },
    ],
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const { contents: articles, totalCount } = await getArticlesByCategory(
    category.id,
    { limit: 20 }
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(category.name, category.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-black text-white">
        {/* パンくずリスト */}
        <nav className="container mx-auto px-4 py-4">
          <ol className="flex items-center gap-2 text-sm text-white/60 font-mono">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                HOME
              </Link>
            </li>
            <li className="text-white/30">/</li>
            <li>
              <Link
                href="/articles"
                className="hover:text-cyan-400 transition-colors"
              >
                ARTICLES
              </Link>
            </li>
            <li className="text-white/30">/</li>
            <li className="text-cyan-400">{category.name}</li>
          </ol>
        </nav>

        {/* ヘッダー */}
        <header className="container mx-auto px-4 py-12">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-mono mb-6">
            CATEGORY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/60 max-w-2xl mb-4">
              {category.description}
            </p>
          )}
          <p className="text-white/40 font-mono">全 {totalCount} 件の記事</p>
        </header>

        {/* 記事一覧 */}
        <main className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block border border-white/20 bg-black/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                {/* サムネイル */}
                {article.ogImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.ogImage.url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-5">
                  {/* タイトル */}
                  <h2 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* 説明 */}
                  <p className="text-white/50 text-sm line-clamp-2 mb-3">
                    {article.metaDescription ||
                      article.body.replace(/<[^>]*>/g, "").slice(0, 100)}
                  </p>

                  {/* 日付 */}
                  {article.publishedAt && (
                    <time
                      dateTime={article.publishedAt}
                      className="text-white/40 text-xs font-mono"
                    >
                      {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* 記事がない場合 */}
          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 font-mono">
                このカテゴリの記事はまだありません
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

