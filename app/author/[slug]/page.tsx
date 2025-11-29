import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAuthorBySlug,
  getAllAuthorSlugs,
  getArticlesByAuthor,
  BASE_URL,
} from "@/lib/microcms";

interface Props {
  params: { slug: string };
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

// メタデータを動的に生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);

  if (!author) {
    return {
      title: "著者が見つかりません",
    };
  }

  const description =
    author.bio ||
    `${author.name}の執筆記事一覧。中学硬式野球に関する記事をお届けします。`;

  return {
    title: `${author.name} | 中学硬式野球メディア`,
    description,
    openGraph: {
      title: `${author.name} | 中学硬式野球メディア`,
      description,
      url: `${BASE_URL}/author/${author.slug}`,
      images: author.avatar
        ? [
            {
              url: author.avatar.url,
              width: 400,
              height: 400,
              alt: author.name,
            },
          ]
        : undefined,
    },
  };
}

// パンくずリスト用 JSON-LD を生成
function generateBreadcrumbJsonLd(authorName: string, authorSlug: string) {
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
        name: authorName,
        item: `${BASE_URL}/author/${authorSlug}`,
      },
    ],
  };
}

export default async function AuthorPage({ params }: Props) {
  const author = await getAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  const { contents: articles, totalCount } = await getArticlesByAuthor(
    author.id,
    { limit: 20 }
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(author.name, author.slug);

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
            <li className="text-yellow-400">{author.name}</li>
          </ol>
        </nav>

        {/* 著者プロフィール */}
        <header className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* アバター */}
            {author.avatar && (
              <div className="shrink-0">
                <img
                  src={author.avatar.url}
                  alt={author.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yellow-400/50"
                />
              </div>
            )}

            <div>
              <div className="inline-block px-4 py-2 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 text-sm font-mono mb-6">
                AUTHOR
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-white/60 max-w-2xl mb-4 whitespace-pre-wrap">
                  {author.bio}
                </p>
              )}
              <p className="text-white/40 font-mono">
                執筆記事: {totalCount} 件
              </p>
            </div>
          </div>
        </header>

        {/* 執筆記事一覧 */}
        <main className="container mx-auto px-4 pb-20">
          <h2 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">
            執筆<span className="text-yellow-400">記事</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block border border-white/20 bg-black/50 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300"
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
                  <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

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
                この著者の記事はまだありません
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

