import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getArticlesByCategory,
  getArticles,
  BASE_URL,
} from "@/lib/microcms";
import type { Article } from "@/lib/microcms/types";
import { 
  IoLogoYoutube, 
  IoBaseball,
  IoHome,
  IoArrowBack,
  IoArrowForward
} from "react-icons/io5";
import { BackButton } from "@/components/BackButton";

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
      title: "記事が見つかりません | 中学硬式野球メディア",
    };
  }

  const description =
    article.metaDescription ||
    article.body.replace(/<[^>]*>/g, "").slice(0, 160) + "...";

  const ogImage = article.thumbnail?.url || article.ogImage?.url || `${BASE_URL}/og-default.png`;
  const identifier = article.slug || article.id;

  return {
    title: `${article.title} | 中学硬式野球コラム`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `${BASE_URL}/columns/${identifier}`,
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
    alternates: {
      canonical: `${BASE_URL}/columns/${identifier}`,
    },
    robots: article.isDraft ? { index: false, follow: false } : undefined,
  };
}

// JSON-LD 構造化データを生成
function generateJsonLd(article: Article) {
  const identifier = article.slug || article.id;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description:
      article.metaDescription ||
      article.body.replace(/<[^>]*>/g, "").slice(0, 160),
    image: article.thumbnail?.url || article.ogImage?.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          url: `${BASE_URL}/author/${article.author.slug || article.author.id}`,
        }
      : {
          "@type": "Organization",
          name: "ROOKIE SMART JAPAN",
        },
    publisher: {
      "@type": "Organization",
      name: "株式会社ルーキースマートジャパン",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/columns/${identifier}`,
    },
  };
}

export default async function ColumnPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // 同じカテゴリの関連記事を取得（自分自身を除く、最大4件）
  // カテゴリに他の記事がない場合は、全記事から最新を表示
  let relatedArticles: Article[] = [];
  let isFromSameCategory = false;
  
  if (article.category?.id) {
    const response = await getArticlesByCategory(article.category.id, { limit: 5 });
    relatedArticles = response.contents
      .filter((a) => a.id !== article.id)
      .slice(0, 4);
    isFromSameCategory = relatedArticles.length > 0;
  }
  
  // 同じカテゴリに記事がない場合は、全記事から取得
  if (relatedArticles.length === 0) {
    const response = await getArticles({ limit: 5 });
    relatedArticles = response.contents
      .filter((a) => a.id !== article.id)
      .slice(0, 4);
  }

  const jsonLd = generateJsonLd(article);

  return (
    <>
      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px]" />
        </div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-pink-500/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                <IoHome className="text-lg" />
                <span>HOME</span>
              </Link>
              <Link 
                href="/#columns" 
                className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors font-mono text-sm"
              >
                <IoArrowBack />
                <span>コラム一覧へ</span>
              </Link>
            </div>
          </div>
        </nav>

        <article className="relative z-10">
          {/* Hero Section with Thumbnail - Full Image Display */}
          {article.thumbnail?.url && (
            <div className="relative w-full">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-pink-500 z-10" style={{ boxShadow: '0 0 20px rgba(255,0,170,0.5)' }} />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-400 z-10" style={{ boxShadow: '0 0 20px rgba(0,240,255,0.5)' }} />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-400 z-10" style={{ boxShadow: '0 0 20px rgba(0,240,255,0.5)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-pink-500 z-10" style={{ boxShadow: '0 0 20px rgba(255,0,170,0.5)' }} />
              
              {/* Image Container */}
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-5xl mx-auto">
                  <div 
                    className="relative border-2 border-pink-500/50 overflow-hidden"
                    style={{ boxShadow: '0 0 40px rgba(255,0,170,0.3)' }}
                  >
                    <img 
                      src={`${article.thumbnail.url}?w=1600&q=95`}
                      alt={article.title}
                      className="w-full h-auto block"
                    />
                    {/* Subtle gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <header className={`container mx-auto px-4 ${article.thumbnail?.url ? 'pt-4' : 'pt-12'}`}>
            <div className="max-w-4xl mx-auto">
              {/* Category Badge - Clickable */}
              {article.category && (
                <Link 
                  href={`/?category=${article.category.id}#columns`}
                  className="inline-block px-4 py-2 text-sm font-mono font-bold mb-4 border-2 border-pink-500 text-pink-500 bg-black/80 hover:bg-pink-500/20 transition-colors"
                  style={{ boxShadow: '0 0 15px rgba(255,0,170,0.4)' }}
                >
                  {article.category.name}
                </Link>
              )}

              {/* Title */}
              <h1 
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.2)' }}
              >
                {article.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm font-mono mb-8">
                {article.publishedAt && (
                  <time dateTime={article.publishedAt} className="flex items-center gap-2">
                    <span className="text-cyan-400">◈</span>
                    {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                )}
                {article.author && (
                  <span className="flex items-center gap-2">
                    <span className="text-pink-500">◈</span>
                    {article.author.name}
                  </span>
                )}
              </div>

              {/* YouTube Link */}
              {article.youtubeUrl && (
                <a
                  href={article.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold transition-colors mb-8"
                  style={{ boxShadow: '0 0 20px rgba(255,0,0,0.4)' }}
                >
                  <IoLogoYoutube className="text-2xl" />
                  <span>動画で解説を見る</span>
                </a>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div 
                className="relative p-6 sm:p-10 border-2 border-pink-500/30 bg-black/80"
                style={{ boxShadow: '0 0 40px rgba(255,0,170,0.15)' }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pink-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pink-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-500" />

                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-h2:text-pink-500 prose-h2:border-b prose-h2:border-pink-500/30 prose-h2:pb-2
                    prose-h3:text-cyan-400
                    prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-white/10
                    prose-li:marker:text-pink-500"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              </div>
            </div>
          </div>

          {/* 関連コラム セクション */}
          {relatedArticles.length > 0 && (
            <section className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-pink-500">◈</span>
                  <span>{isFromSameCategory ? "関連コラム" : "その他のコラム"}</span>
                  {isFromSameCategory && article.category?.name && (
                    <span className="text-xs text-white/50 font-mono ml-2">
                      # {article.category.name}
                    </span>
                  )}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/columns/${related.slug || related.id}`}
                      className="group relative p-4 border border-pink-500/30 bg-black/50 hover:border-pink-500/60 hover:bg-pink-500/10 transition-all duration-300"
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pink-500" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pink-500" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pink-500" />
                      
                      {/* Thumbnail */}
                      {related.thumbnail?.url && (
                        <div className="relative aspect-video mb-3 overflow-hidden border border-pink-500/20">
                          <img
                            src={`${related.thumbnail.url}?w=400&q=80`}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-pink-500 text-xs font-mono">
                        <span>記事を読む</span>
                        <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-4 justify-center">
                <BackButton />
                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-400/50 text-cyan-400 font-mono hover:bg-cyan-400/20 transition-colors"
                >
                  <IoBaseball />
                  <span>チーム検索へ</span>
                </Link>
              </div>
            </div>
          </footer>
        </article>

        {/* Bottom neon line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" style={{ boxShadow: '0 0 20px rgba(255,0,170,0.8)' }} />
      </div>
    </>
  );
}

