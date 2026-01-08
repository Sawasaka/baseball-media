"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoArrowForward,
  IoClose,
  IoBaseball,
  IoSearch,
  IoGrid,
  IoSchool,
  IoTrophy,
  IoGlobe,
  IoStar,
  IoBook,
  IoBriefcase,
  IoRefresh,
  IoLogoYoutube,
  IoDocumentTextOutline,
  IoLinkOutline,
  IoOpenOutline,
  IoCheckmarkCircle
} from "react-icons/io5";
import { BsPinAngleFill } from "react-icons/bs";
import type { Article, Category } from "@/lib/microcms/types";

// カテゴリーとアイコン・色のマッピング
const categoryStyles: Record<string, { icon: React.ReactNode; color: string }> = {
  "チーム選び": { icon: <IoSearch className="text-2xl" />, color: "red" },
  "中学野球": { icon: <IoBaseball className="text-2xl" />, color: "cyan" },
  "高校野球": { icon: <IoTrophy className="text-2xl" />, color: "yellow" },
  "大学野球": { icon: <IoSchool className="text-2xl" />, color: "pink" },
  "社会人野球": { icon: <IoBriefcase className="text-2xl" />, color: "green" },
  "海外野球": { icon: <IoGlobe className="text-2xl" />, color: "orange" },
  "プロ野球": { icon: <IoStar className="text-2xl" />, color: "red" },
  "勉強": { icon: <IoBook className="text-2xl" />, color: "cyan" },
  "仕事": { icon: <IoBriefcase className="text-2xl" />, color: "yellow" },
};

// デフォルトのカテゴリータブ
const defaultCategoryTabs = [
  { key: "all", label: "すべて", color: "pink" },
  { key: "team", label: "チーム選び", color: "red" },
];

const colorVariants: Record<string, { border: string; bg: string; text: string; shadow: string; glow: string; solidBg: string }> = {
  red: {
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    text: "text-red-500",
    shadow: "shadow-[0_0_20px_rgba(255,42,68,0.3)]",
    glow: "rgba(255,42,68,0.6)",
    solidBg: "#FF2A44",
  },
  cyan: {
    border: "border-cyan-400/50",
    bg: "bg-cyan-400/10",
    text: "text-cyan-400",
    shadow: "shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    glow: "rgba(0,240,255,0.6)",
    solidBg: "#00F0FF",
  },
  yellow: {
    border: "border-yellow-400/50",
    bg: "bg-yellow-400/10",
    text: "text-yellow-400",
    shadow: "shadow-[0_0_20px_rgba(255,255,0,0.3)]",
    glow: "rgba(255,255,0,0.6)",
    solidBg: "#FACC15",
  },
  pink: {
    border: "border-pink-500/50",
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    shadow: "shadow-[0_0_20px_rgba(255,0,170,0.3)]",
    glow: "rgba(255,0,170,0.6)",
    solidBg: "#FF00AA",
  },
  green: {
    border: "border-green-400/50",
    bg: "bg-green-400/10",
    text: "text-green-400",
    shadow: "shadow-[0_0_20px_rgba(74,222,128,0.3)]",
    glow: "rgba(74,222,128,0.6)",
    solidBg: "#4ADE80",
  },
  orange: {
    border: "border-orange-400/50",
    bg: "bg-orange-400/10",
    text: "text-orange-400",
    shadow: "shadow-[0_0_20px_rgba(251,146,60,0.3)]",
    glow: "rgba(251,146,60,0.6)",
    solidBg: "#FB923C",
  },
};

export function ColumnSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showAllColumnsModal, setShowAllColumnsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // URLパラメータからカテゴリを読み取る
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // scrollTo=columnsパラメータがある場合、このセクションにスクロール（初回のみ）
  const [hasScrolledToColumns, setHasScrolledToColumns] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasScrolledToColumns) {
      const urlParams = new URLSearchParams(window.location.search);
      const scrollTo = urlParams.get("scrollTo");
      
      if (scrollTo === "columns") {
        setHasScrolledToColumns(true);
        
        // URLからパラメータを削除
        urlParams.delete("scrollTo");
        const newUrl = urlParams.toString() ? `/?${urlParams.toString()}` : "/";
        window.history.replaceState({}, '', newUrl);
        
        // このセクション（id="columns"）にスクロール
        const scrollToThis = () => {
          const element = document.getElementById('columns');
          if (element) {
            // スムーズスクロールを無効化して即座にスクロール
            document.documentElement.style.scrollBehavior = 'auto';
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo(0, rect.top + scrollTop - 20);
            document.documentElement.style.scrollBehavior = '';
          }
        };
        
        // 複数回試行（より長い遅延も含む）
        const delays = [0, 50, 100, 200, 300, 500, 800, 1000, 1500, 2000];
        const timers = delays.map(delay => setTimeout(scrollToThis, delay));
        
        return () => timers.forEach(timer => clearTimeout(timer));
      }
    }
  }, [hasScrolledToColumns]);

  // モーダルが開いている時は背景のスクロールを完全に無効化
  useEffect(() => {
    if (selectedArticle || showAllColumnsModal) {
      // 現在のスクロール位置を保存
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // スクロール位置を復元
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [selectedArticle, showAllColumnsModal]);

  // 記事URLを生成（slugがない場合はidを使用）
  const getArticleUrl = (article: Article) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const identifier = article.slug || article.id;
    return `${baseUrl}/columns/${identifier}`;
  };

  // URLをクリップボードにコピー
  const handleCopyUrl = async (article: Article) => {
    const url = getArticleUrl(article);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // 別タブで開く
  const handleOpenInNewTab = (article: Article) => {
    const url = getArticleUrl(article);
    window.open(url, '_blank');
  };

  // カテゴリ一覧に移動
  const handleGoToCategory = (categoryId: string) => {
    setSelectedArticle(null); // モーダルを閉じる
    setSelectedCategory(categoryId); // カテゴリをフィルター
  };

  // microCMS からデータを取得
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/columns");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setArticles(data.articles || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching columns:", err);
        setError("記事の読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 記事が存在するカテゴリIDを取得
  const categoriesWithArticles = new Set(
    articles.map(article => article.category?.id).filter(Boolean)
  );

  // カテゴリータブを作成（記事があるカテゴリのみ表示）
  const categoryTabs = categories.length > 0
    ? [
        { key: "all", label: "すべて", color: "pink" },
        ...categories
          .filter(cat => categoriesWithArticles.has(cat.id)) // 記事があるカテゴリのみ
          .map((cat) => ({
            key: cat.id,
            label: cat.name,
            color: categoryStyles[cat.name]?.color || "pink",
          })),
      ]
    : defaultCategoryTabs;

  // フィルタリング & ピラー記事を先頭にソート
  const filteredArticles = articles
    .filter((article) => selectedCategory === "all" || article.category?.id === selectedCategory)
    .sort((a, b) => {
      // ピラー記事を先頭に
      if (a.isPillar && !b.isPillar) return -1;
      if (!a.isPillar && b.isPillar) return 1;
      return 0;
    });

  // 記事のスタイルを取得
  const getArticleStyle = (article: Article) => {
    const categoryName = article.category?.name || "";
    const style = categoryStyles[categoryName] || { icon: <IoBaseball className="text-2xl" />, color: "pink" };
    return style;
  };

  // 本文からプレーンテキストを抽出（HTMLタグを除去）
  const extractPlainText = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  };

  return (
    <section className="py-16 sm:py-28 px-3 sm:px-4 relative" id="columns">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_20px_rgba(255,0,170,0.8)]" />
      
      {/* Side decorations */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-pink-500/40 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent" />
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            お役立ち<span className="text-pink-500" style={{ textShadow: '0 0 30px rgba(255,0,170,0.8)' }}>コラム</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto font-mono text-sm sm:text-base mb-6 sm:mb-10">
            <span className="text-yellow-400">&gt;</span> 選手と保護者のための情報メディア<span className="animate-pulse text-pink-500">_</span>
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {categoryTabs.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const colors = colorVariants[cat.color] || colorVariants.pink;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`
                    px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono border-2 transition-all duration-300
                    ${isActive 
                      ? `${colors.border} ${colors.text} ${colors.bg} ${colors.shadow}`
                      : 'border-white/20 text-white/50 hover:border-pink-500/50 hover:text-pink-500 hover:bg-pink-500/10'
                    }
                  `}
                  style={isActive ? {
                    borderColor: colors.solidBg,
                    boxShadow: `0 0 20px ${colors.glow}`,
                  } : {}}
                >
                  # {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <IoRefresh className="text-4xl text-pink-500 animate-spin mb-4" />
            <p className="text-white/50 font-mono">記事を読み込み中...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-red-500 font-mono mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/20 font-mono transition-all"
            >
              再読み込み
            </button>
          </div>
        )}

        {/* Articles - Featured Layout */}
        {!isLoading && !error && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/50 font-mono">このカテゴリの記事はまだありません</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredArticles.slice(0, 6).map((article, index) => {
                    const style = getArticleStyle(article);
                    const colors = colorVariants[style.color] || colorVariants.pink;
                    
                    return (
                      <motion.article
                        key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedArticle(article)}
                          className="group relative cursor-pointer bg-black border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300"
                          style={{ boxShadow: '0 0 25px rgba(255,0,170,0.15)' }}
                      >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pink-500" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-pink-500" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-pink-500" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-pink-500" />

                          {/* Thumbnail */}
                          <div className="relative aspect-video overflow-hidden">
                            {article.thumbnail?.url ? (
                              <div 
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url(${article.thumbnail.url}?w=400&q=80)` }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-pink-500/10 to-black flex items-center justify-center">
                                <IoBaseball className="text-4xl text-pink-500/30" />
                              </div>
                            )}
                          </div>
                  
                          {/* Content */}
                          <div className="p-4">
                            {/* Category badge & Pillar pin - below image */}
                            <div className="flex items-center gap-2 mb-3">
                              <span 
                                className="inline-block px-2 py-1 text-[10px] font-mono font-bold bg-black border"
                                style={{ color: colors.solidBg, borderColor: colors.solidBg }}
                              >
                                {article.category?.name || "コラム"}
                              </span>
                              {/* ピラーコンテンツのピンマーク */}
                              {article.isPillar && (
                                <span className="p-1 bg-yellow-500 text-black">
                                  <BsPinAngleFill className="text-sm" />
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-white mb-4 line-clamp-2 group-hover:text-pink-300 transition-colors">
                          {article.title}
                  </h3>
                  
                  {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-pink-500/20">
                              {/* YouTube button */}
                              {article.youtubeUrl ? (
                                <a
                                  href={article.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 text-red-500 text-xs font-mono font-bold hover:text-red-400 transition-colors"
                                >
                                  <IoLogoYoutube className="text-base" />
                                  <span>動画解説</span>
                                </a>
                              ) : (
                                <span className="text-[10px] text-white/40 font-mono">COLUMN</span>
                              )}
                              {/* Article button */}
                              <div className="flex items-center gap-1.5 text-pink-500 text-xs font-mono font-bold group-hover:gap-2 transition-all">
                                <IoDocumentTextOutline className="text-base" />
                                <span>記事を見る</span>
                                <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                              </div>
                  </div>
                </div>
                
                          {/* Hover glow */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_30px_rgba(255,0,170,0.1)]" />
              </motion.article>
            );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-16"
        >
              <button 
                onClick={() => setShowAllColumnsModal(true)}
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 border-2 border-pink-500/50 text-pink-500 hover:bg-pink-500/20 font-bold text-sm sm:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,170,0.4)]"
          >
                <IoGrid className="text-lg sm:text-xl" />
            <span className="font-mono">すべてのコラムを見る</span>
            <IoArrowForward className="group-hover:translate-x-2 transition-transform" />
              </button>
        </motion.div>
          </>
        )}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-20 sm:pt-24 px-4 pb-4 bg-black/95 backdrop-blur-lg overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden bg-black/95 border-2"
              style={{ 
                borderColor: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA",
                boxShadow: `0 0 50px ${colorVariants[getArticleStyle(selectedArticle).color]?.glow || "rgba(255,0,170,0.6)"}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Toolbar at top */}
              <div 
                className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-black border-b-2"
                style={{ borderColor: `${colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA"}50` }}
              >
                {/* Left: Category & Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button 
                    onClick={() => selectedArticle.category?.id && handleGoToCategory(selectedArticle.category.id)}
                    className="px-2 py-1 text-xs font-mono font-bold border shrink-0 hover:bg-white/10 transition-colors cursor-pointer"
                      style={{ 
                      color: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA",
                      borderColor: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA",
                      }}
                    title="このカテゴリの記事一覧を見る"
                  >
                    {selectedArticle.category?.name || "コラム"}
                  </button>
                  <span className="text-white text-sm font-mono line-clamp-2">
                    {selectedArticle.title}
                      </span>
                    </div>
                
                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {/* Copy URL button */}
                  <button
                    onClick={() => handleCopyUrl(selectedArticle)}
                    className="p-2 text-white/70 hover:text-cyan-400 transition-colors border border-white/30 hover:border-cyan-400 bg-black/50 group relative"
                    title="URLをコピー"
                  >
                    {copied ? (
                      <IoCheckmarkCircle size={20} className="text-green-400" />
                    ) : (
                      <IoLinkOutline size={20} />
                    )}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 z-30">
                      {copied ? 'コピー完了！' : 'リンクをコピー'}
                    </span>
                  </button>
                  {/* Open in new tab button */}
                  <button
                    onClick={() => handleOpenInNewTab(selectedArticle)}
                    className="p-2 text-white/70 hover:text-pink-400 transition-colors border border-white/30 hover:border-pink-400 bg-black/50 group relative"
                    title="別タブで開く"
                  >
                    <IoOpenOutline size={20} />
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 z-30">
                      別タブで開く
                      </span>
                  </button>
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 text-white/70 hover:text-white transition-colors border border-white/30 hover:border-white/60 bg-black/50"
                    title="閉じる"
                  >
                    <IoClose size={22} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-60px)] sm:max-h-[calc(90vh-60px)]">
              {/* Thumbnail Image */}
              {selectedArticle.thumbnail?.url && (
                <div className="relative w-full overflow-hidden">
                  <div 
                    className="w-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${selectedArticle.thumbnail.url}?w=1200&q=95)`,
                      aspectRatio: '16/9',
                    }}
                  />
                </div>
              )}


              {/* Content */}
              <div className="p-4 sm:p-6">
                <div 
                  className="text-white/80 font-mono text-sm leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
                />
              </div>

              {/* Bottom accent */}
              <div 
                className="h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA"}, transparent)` }}
              />
              </div>{/* End scrollable content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Columns Modal */}
      <AnimatePresence>
        {showAllColumnsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-24 sm:pt-4 px-4 pb-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllColumnsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl max-h-[80vh] sm:max-h-[90vh] overflow-hidden bg-black/95 border-2 border-pink-500/50"
              style={{ boxShadow: '0 0 80px rgba(255,0,170,0.3)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-3 sm:p-4 md:p-6 border-b-2 border-pink-500/30 bg-black/95">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-pink-500/20 border-2 border-pink-500">
                      <IoGrid className="text-xl sm:text-2xl text-pink-500" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono">
                        ALL<span className="text-pink-500">_</span>COLUMNS
                      </h2>
                      <p className="text-xs text-white/50 font-mono mt-1">
                        {filteredArticles.length} ARTICLES AVAILABLE
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAllColumnsModal(false)}
                    className="p-3 text-white/50 hover:text-white transition-colors border-2 border-white/20 hover:border-pink-500 hover:bg-pink-500/10"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Category Filter in Modal */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {categoryTabs.map((cat) => {
                    const colors = colorVariants[cat.color] || colorVariants.pink;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-3 py-1.5 text-xs font-mono font-bold transition-all duration-300 border ${
                          selectedCategory === cat.key
                            ? `${colors.bg} ${colors.border} ${colors.text}`
                            : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                        }`}
                        style={selectedCategory === cat.key ? {
                          background: `${colors.solidBg}20`,
                          borderColor: colors.solidBg,
                          color: colors.solidBg,
                        } : {}}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredArticles.map((article) => {
                    const style = getArticleStyle(article);
                    const colors = colorVariants[style.color] || colorVariants.pink;
                    return (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative p-4 border-2 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          borderColor: `${colors.solidBg}40`,
                          background: `linear-gradient(135deg, ${colors.solidBg}10, transparent)`,
                        }}
                        onClick={() => {
                          setShowAllColumnsModal(false);
                          setSelectedArticle(article);
                        }}
                        whileHover={{
                          boxShadow: `0 0 30px ${colors.glow}`,
                        }}
                      >
                        {/* Thumbnail Image */}
                        {article.thumbnail?.url && (
                          <div className="relative -mx-4 -mt-4 mb-3 overflow-hidden">
                            <div 
                              className="aspect-video w-full bg-cover bg-center"
                              style={{ 
                                backgroundImage: `url(${article.thumbnail.url}?w=400&q=80)`,
                              }}
                            />
                            <div 
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)`,
                              }}
                            />
                          </div>
                        )}

                        {/* Category & Icon & Pillar */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span style={{ color: colors.solidBg }}>{style.icon}</span>
                          <span className="text-xs font-mono" style={{ color: colors.solidBg }}>
                            {article.category?.name || "未分類"}
                          </span>
                          {/* ピラーコンテンツのピンマーク */}
                          {article.isPillar && (
                            <span className="p-1 bg-yellow-500 text-black">
                              <BsPinAngleFill className="text-sm" />
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-white/90">
                          {article.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/50 text-xs line-clamp-2 mb-3">
                          {extractPlainText(article.body)}
                        </p>

                        {/* Read More */}
                        <div 
                          className="flex items-center gap-2 text-xs font-mono group-hover:gap-3 transition-all"
                          style={{ color: colors.solidBg }}
                        >
                          <span>詳しく見る</span>
                          <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
          </div>

                        {/* Bottom accent */}
                        <div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity"
                          style={{ background: colors.solidBg }}
                        />
        </motion.div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-white/50 font-mono">このカテゴリの記事はまだありません</p>
                  </div>
                )}
      </div>

              {/* Bottom accent */}
              <div className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
