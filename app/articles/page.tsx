import { Metadata } from "next";
import Link from "next/link";
import { getArticles, BASE_URL } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "記事一覧 | 中学硬式野球メディア",
  description:
    "中学硬式野球に関する最新記事・コラムをお届けします。チーム選び、トレーニング、進路など役立つ情報が満載。",
  openGraph: {
    title: "記事一覧 | 中学硬式野球メディア",
    description:
      "中学硬式野球に関する最新記事・コラムをお届けします。チーム選び、トレーニング、進路など役立つ情報が満載。",
    url: `${BASE_URL}/articles`,
  },
};

// パンくずリスト用 JSON-LD
const breadcrumbJsonLd = {
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
  ],
};

export default async function ArticlesPage() {
  const { contents: articles, totalCount } = await getArticles({ limit: 20 });

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
            <li className="text-cyan-400">ARTICLES</li>
          </ol>
        </nav>

        {/* ヘッダー */}
        <header className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            記事<span className="text-cyan-400">一覧</span>
          </h1>
          <p className="text-white/60 font-mono">
            全 {totalCount} 件の記事
          </p>
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
                  {/* カテゴリ */}
                  {article.category && (
                    <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                      {article.category.name}
                    </span>
                  )}

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
              <p className="text-white/50 font-mono">記事がまだありません</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

