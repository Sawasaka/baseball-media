"use client";

import { useState, useEffect } from "react";
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
  IoRefresh
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showAllColumnsModal, setShowAllColumnsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // フィルタリング
  const filteredArticles = articles.filter(
    (article) => selectedCategory === "all" || article.category?.id === selectedCategory
  );

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

        {/* Articles Grid */}
        {!isLoading && !error && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8"
              >
                {filteredArticles.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-white/50 font-mono">このカテゴリの記事はまだありません</p>
                  </div>
                ) : (
                  filteredArticles.slice(0, 6).map((article, index) => {
                    const style = getArticleStyle(article);
                    const colors = colorVariants[style.color] || colorVariants.pink;
                    
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedArticle(article)}
                        className={`
                          group relative cursor-pointer overflow-hidden
                          border-2 ${colors.border} ${colors.bg}
                          p-4 sm:p-6 transition-all duration-500
                          hover:shadow-[0_0_40px_rgba(255,0,170,0.3)]
                          hover:border-pink-500/70
                        `}
                  style={{ 
                          background: `linear-gradient(135deg, ${colors.solidBg}15, ${colors.solidBg}05, transparent)`,
                          boxShadow: `0 0 25px ${colors.solidBg}20, inset 0 0 30px ${colors.solidBg}05`,
                  }}
                      >
                {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: colors.solidBg }} />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: colors.solidBg }} />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: colors.solidBg }} />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: colors.solidBg }} />

                        {/* Pinned indicator */}
                        <div className="absolute top-3 right-3">
                          <BsPinAngleFill 
                            className="text-red-500 text-xl" 
                            style={{ filter: 'drop-shadow(0 0 8px rgba(255,0,0,0.8))' }} 
                          />
                  </div>
                  
                        {/* Category & Icon */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div 
                            className="p-2 sm:p-2.5 border-2"
                            style={{ 
                              borderColor: colors.solidBg,
                              background: `${colors.solidBg}20`,
                              boxShadow: `0 0 15px ${colors.solidBg}40`,
                            }}
                          >
                            <span style={{ color: colors.solidBg, filter: `drop-shadow(0 0 8px ${colors.solidBg})` }}>
                              {style.icon}
                            </span>
                          </div>
                          <span 
                            className="px-3 py-1.5 text-xs font-mono font-bold border"
                            style={{ 
                              color: colors.solidBg,
                              borderColor: `${colors.solidBg}60`,
                              background: `${colors.solidBg}15`,
                              textShadow: `0 0 10px ${colors.solidBg}`,
                            }}
                          >
                            {article.category?.name || "未分類"}
                    </span>
                  </div>
                  
                  {/* Title */}
                        <h3 
                          className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-opacity-90 transition-colors line-clamp-2"
                          style={{ textShadow: `0 0 20px ${colors.solidBg}30` }}
                        >
                          {article.title}
                  </h3>
                  
                  {/* Description */}
                        <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {extractPlainText(article.body)}
                        </p>
                  
                  {/* Footer */}
                        <div 
                          className="flex items-center justify-end pt-3 sm:pt-4 border-t-2 group-hover:border-opacity-50 transition-all"
                          style={{ borderColor: `${colors.solidBg}30` }}
                        >
                          <div 
                            className={`flex items-center gap-2 sm:gap-3 ${colors.text} font-mono text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 border ${colors.border} group-hover:gap-4 sm:group-hover:gap-5 transition-all duration-300`}
                            style={{
                              background: `linear-gradient(90deg, ${colors.solidBg}20, transparent)`,
                              boxShadow: `0 0 15px ${colors.solidBg}20`,
                            }}
                          >
                            <span>詳しく見る</span>
                            <IoArrowForward className="group-hover:translate-x-2 transition-transform text-lg" />
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div 
                          className="absolute bottom-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300"
                          style={{
                            background: `linear-gradient(90deg, transparent 0%, ${colors.solidBg} 50%, transparent 100%)`,
                            boxShadow: `0 0 20px ${colors.solidBg}`,
                          }}
                        />

                        {/* Floating particles effect on hover */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{ background: colors.solidBg }} />
              </motion.article>
            );
                  })
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
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-32 sm:pt-4 px-4 pb-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl max-h-[75vh] sm:max-h-[85vh] overflow-y-auto bg-black/95 border-2"
              style={{ 
                borderColor: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA",
                boxShadow: `0 0 50px ${colorVariants[getArticleStyle(selectedArticle).color]?.glow || "rgba(255,0,170,0.6)"}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="sm:sticky sm:top-0 z-10 p-4 border-b-2 bg-black/95"
                style={{ borderColor: `${colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA"}40` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2"
                      style={{ 
                        background: `${colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA"}20`,
                        border: `2px solid ${colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA"}`,
                      }}
        >
                      <span style={{ color: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA" }}>
                        {getArticleStyle(selectedArticle).icon}
                      </span>
                    </div>
                    <div>
                      <span 
                        className="text-xs font-mono"
                        style={{ color: colorVariants[getArticleStyle(selectedArticle).color]?.solidBg || "#FF00AA" }}
                      >
                        {selectedArticle.category?.name || "未分類"}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {selectedArticle.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/40"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
              </div>

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
                        {/* Pinned Badge */}
                        <div className="absolute top-2 right-2">
                          <BsPinAngleFill className="text-red-500 text-sm" style={{ filter: 'drop-shadow(0 0 6px rgba(255,0,0,0.8))' }} />
                        </div>

                        {/* Category & Icon */}
                        <div className="flex items-center gap-2 mb-3">
                          <span style={{ color: colors.solidBg }}>{style.icon}</span>
                          <span className="text-xs font-mono" style={{ color: colors.solidBg }}>
                            {article.category?.name || "未分類"}
                          </span>
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
