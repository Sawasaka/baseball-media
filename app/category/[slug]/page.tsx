import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IoHome, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BsPinAngleFill } from "react-icons/bs";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getArticlesByCategory,
  BASE_URL,
} from "@/lib/microcms";

export const runtime = 'edge';

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
        name: "コラム一覧",
        item: `${BASE_URL}/#columns`,
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

  const { contents: articlesRaw, totalCount } = await getArticlesByCategory(
    category.id,
    { limit: 20 }
  );

  // ピラー記事を先頭にソート
  const articles = [...articlesRaw].sort((a, b) => (b.isPillar ? 1 : 0) - (a.isPillar ? 1 : 0));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(category.name, category.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                href="/?scrollTo=columns" 
                className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors font-mono text-sm"
              >
                <IoArrowBack />
                <span>コラム一覧へ</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="relative z-10 container mx-auto px-4 py-12">
          {/* Category Badge */}
          <div 
            className="inline-block px-4 py-2 text-sm font-mono font-bold mb-6 border-2 border-pink-500 text-pink-500 bg-black/80"
            style={{ boxShadow: '0 0 15px rgba(255,0,170,0.4)' }}
          >
            カテゴリ
          </div>
          
          <h1 
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.2)' }}
          >
            {category.name}
          </h1>
          
          {category.description && (
            <p className="text-white/60 max-w-2xl mb-4">
              {category.description}
            </p>
          )}
          
          <p className="text-pink-500/80 font-mono">
            全 {totalCount} 件の記事
          </p>
        </header>

        {/* 記事一覧 */}
        <main className="relative z-10 container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/columns/${article.slug || article.id}`}
                className="group relative block border border-pink-500/30 bg-black/50 hover:border-pink-500/60 hover:bg-pink-500/10 transition-all duration-300"
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pink-500" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pink-500" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pink-500" />

                {/* サムネイル */}
                {article.thumbnail?.url && (
                  <div className="aspect-video overflow-hidden border-b border-pink-500/20">
                    <img
                      src={`${article.thumbnail.url}?w=600&q=80`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-4">
                  {/* タイトル + ピンマーク */}
                  <div className="flex items-start gap-2 mb-3">
                    {article.isPillar && (
                      <span className="text-yellow-400 flex-shrink-0 mt-0.5" title="ピラーコンテンツ">
                        <BsPinAngleFill className="text-sm" />
                      </span>
                    )}
                    <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </div>

                  {/* 読むリンク */}
                  <span className="flex items-center gap-1 text-pink-500 text-xs font-mono group-hover:text-pink-400">
                    <span>記事を読む</span>
                    <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </span>
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

        {/* Footer Navigation */}
        <footer className="relative z-10 container mx-auto px-4 pb-16">
          <div className="flex justify-center gap-4">
            <Link
              href="/?scrollTo=columns"
              className="flex items-center gap-2 px-6 py-3 border-2 border-pink-500/50 text-pink-500 font-mono hover:bg-pink-500/20 transition-colors"
            >
              <IoArrowBack />
              <span>コラム一覧へ戻る</span>
            </Link>
            <Link
              href="/#search"
              className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-400/50 text-cyan-400 font-mono hover:bg-cyan-400/20 transition-colors"
            >
              <span>チーム検索へ</span>
              <IoArrowForward />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
