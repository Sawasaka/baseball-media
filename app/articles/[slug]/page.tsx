import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  BASE_URL,
  Article,
} from "@/lib/microcms";

export const runtime = 'edge';

interface Props {
  params: { slug: string };
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// メタデータを動的に生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  // descriptionがなければbodyの冒頭から自動生成
  const description =
    article.metaDescription ||
    article.body.replace(/<[^>]*>/g, "").slice(0, 160) + "...";

  const ogImage = article.ogImage?.url || `${BASE_URL}/og-default.png`;

  return {
    title: `${article.title} | 中学硬式野球メディア`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `${BASE_URL}/articles/${article.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [ogImage],
    },
    // 非公開記事は noindex
    robots: article.isDraft ? { index: false, follow: false } : undefined,
  };
}

// JSON-LD 構造化データを生成
function generateJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description:
      article.metaDescription ||
      article.body.replace(/<[^>]*>/g, "").slice(0, 160),
    image: article.ogImage?.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          url: `${BASE_URL}/author/${article.author.slug}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "ROOKIE SMART",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = generateJsonLd(article);

  return (
    <>
      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-black text-white">
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
            {article.category && (
              <>
                <li className="text-white/30">/</li>
                <li>
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {article.category.name}
                  </Link>
                </li>
              </>
            )}
            <li className="text-white/30">/</li>
            <li className="text-cyan-400 truncate max-w-[200px]">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* ヘッダー */}
        <header className="container mx-auto px-4 py-12">
          {/* カテゴリ */}
          {article.category && (
            <Link
              href={`/category/${article.category.slug}`}
              className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-mono mb-6 hover:bg-cyan-500/30 transition-colors"
            >
              {article.category.name}
            </Link>
          )}

          {/* タイトル */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm font-mono">
            {/* 公開日 */}
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            )}

            {/* 著者 */}
            {article.author && (
              <Link
                href={`/author/${article.author.slug}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                {article.author.avatar && (
                  <img
                    src={article.author.avatar.url}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span>{article.author.name}</span>
              </Link>
            )}
          </div>

          {/* タグ */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="px-3 py-1 bg-white/10 border border-white/20 text-white/70 text-xs font-mono hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* OG画像 */}
        {article.ogImage && (
          <div className="container mx-auto px-4 mb-12">
            <img
              src={article.ogImage.url}
              alt={article.title}
              className="w-full max-w-4xl mx-auto rounded-lg"
            />
          </div>
        )}

        {/* 本文 */}
        <div className="container mx-auto px-4 pb-20">
          <div
            className="prose prose-invert prose-lg max-w-4xl mx-auto
              prose-headings:text-white prose-headings:font-bold
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>

        {/* 関連リンク */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/articles"
              className="px-6 py-3 bg-white/10 border border-white/20 text-white font-mono hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
            >
              ← 記事一覧へ戻る
            </Link>
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-mono hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
              >
                {article.category.name}の記事一覧
              </Link>
            )}
          </div>
        </footer>
      </article>
    </>
  );
}

