"use client";

import { motion } from "framer-motion";
import { 
  IoSchool, 
  IoFitness, 
  IoNutrition, 
  IoFlash, 
  IoPeople, 
  IoCheckmarkCircle,
  IoArrowForward,
  IoTime,
  IoBookmark
} from "react-icons/io5";

interface Column {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  readTime: string;
  color: string;
  tags: string[];
}

const columns: Column[] = [
  {
    id: "1",
    title: "中学硬式野球の進路選択ガイド",
    description: "ボーイズ・シニア・ヤングの違いと、お子さんに合ったリーグ選びのポイントを徹底解説。高校野球への道筋も紹介。",
    category: "進路・チーム選び",
    icon: <IoSchool className="text-2xl" />,
    readTime: "8分",
    color: "red",
    tags: ["進路", "リーグ比較", "高校野球"],
  },
  {
    id: "2",
    title: "成長期のトレーニング方法",
    description: "中学生の身体に合った効果的なトレーニングメニュー。怪我を防ぎながらパフォーマンスを向上させる秘訣。",
    category: "トレーニング",
    icon: <IoFitness className="text-2xl" />,
    readTime: "10分",
    color: "cyan",
    tags: ["筋トレ", "ストレッチ", "怪我防止"],
  },
  {
    id: "3",
    title: "野球少年の栄養管理完全版",
    description: "成長期に必要な栄養素と理想的な食事メニュー。試合前後の食事タイミングや補食のコツも紹介。",
    category: "食事・栄養",
    icon: <IoNutrition className="text-2xl" />,
    readTime: "7分",
    color: "yellow",
    tags: ["食事", "プロテイン", "体重管理"],
  },
  {
    id: "4",
    title: "試合で実力を発揮するメンタル術",
    description: "プレッシャーに負けない心の作り方。緊張をコントロールし、ここ一番で力を出すためのメンタルトレーニング。",
    category: "メンタル強化",
    icon: <IoFlash className="text-2xl" />,
    readTime: "6分",
    color: "pink",
    tags: ["メンタル", "集中力", "本番力"],
  },
  {
    id: "5",
    title: "保護者のサポート術",
    description: "子どもの夢を応援する親の役割とは？適切な距離感の保ち方から、送迎・当番の心構えまで。",
    category: "保護者向け",
    icon: <IoPeople className="text-2xl" />,
    readTime: "5分",
    color: "green",
    tags: ["サポート", "コミュニケーション", "マナー"],
  },
  {
    id: "6",
    title: "体験入部でチェックすべき10項目",
    description: "チーム選びで失敗しないために。指導方針、練習環境、費用など、体験入部で必ず確認すべきポイントを解説。",
    category: "チーム選び",
    icon: <IoCheckmarkCircle className="text-2xl" />,
    readTime: "9分",
    color: "orange",
    tags: ["体験", "チェックリスト", "比較"],
  },
];

const colorVariants: Record<string, { border: string; bg: string; text: string; shadow: string; glow: string }> = {
  red: {
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    text: "text-red-500",
    shadow: "shadow-[0_0_20px_rgba(255,42,68,0.3)]",
    glow: "rgba(255,42,68,0.6)",
  },
  cyan: {
    border: "border-cyan-400/50",
    bg: "bg-cyan-400/10",
    text: "text-cyan-400",
    shadow: "shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    glow: "rgba(0,240,255,0.6)",
  },
  yellow: {
    border: "border-yellow-400/50",
    bg: "bg-yellow-400/10",
    text: "text-yellow-400",
    shadow: "shadow-[0_0_20px_rgba(255,255,0,0.3)]",
    glow: "rgba(255,255,0,0.6)",
  },
  pink: {
    border: "border-pink-500/50",
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    shadow: "shadow-[0_0_20px_rgba(255,0,170,0.3)]",
    glow: "rgba(255,0,170,0.6)",
  },
  green: {
    border: "border-green-400/50",
    bg: "bg-green-400/10",
    text: "text-green-400",
    shadow: "shadow-[0_0_20px_rgba(74,222,128,0.3)]",
    glow: "rgba(74,222,128,0.6)",
  },
  orange: {
    border: "border-orange-400/50",
    bg: "bg-orange-400/10",
    text: "text-orange-400",
    shadow: "shadow-[0_0_20px_rgba(251,146,60,0.3)]",
    glow: "rgba(251,146,60,0.6)",
  },
};

export function ColumnSection() {
  return (
    <section className="py-28 px-4 relative" id="columns">
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
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 px-6 py-3 border-2 border-pink-500/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,170,0.4)]">
              <span className="text-sm font-mono text-pink-500 tracking-widest">◈ COLUMN_DATABASE ◈</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            お役立ち<span className="text-pink-500" style={{ textShadow: '0 0 30px rgba(255,0,170,0.8)' }}>コラム</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto font-mono text-base">
            <span className="text-yellow-400">&gt;</span> 中学野球を頑張る選手と保護者のための情報メディア<span className="animate-pulse text-pink-500">_</span>
          </p>
        </motion.div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((column, index) => {
            const colors = colorVariants[column.color];
            return (
              <motion.article
                key={column.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative border-2 ${colors.border} bg-black/80 backdrop-blur-md hover:${colors.shadow} transition-all duration-500 cursor-pointer overflow-hidden`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)` 
                  }}
                />
                
                {/* Corner accents */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 ${colors.border}`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 ${colors.border}`} />
                
                <div className="p-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${colors.bg} ${colors.border} border`}>
                      <span className={colors.text}>{column.icon}</span>
                    </div>
                    <button className="p-2 text-white/30 hover:text-yellow-400 transition-colors">
                      <IoBookmark className="text-xl" />
                    </button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${colors.bg} ${colors.border} border mb-4`}>
                    <span className={`text-xs font-mono ${colors.text} tracking-wider`}>
                      {column.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                    {column.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3 font-mono">
                    {column.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {column.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-white/40 border border-white/20 bg-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40">
                      <IoTime className="text-sm" />
                      <span className="text-xs font-mono">{column.readTime}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${colors.text} font-mono text-sm group-hover:gap-4 transition-all duration-300`}>
                      <span>READ</span>
                      <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.text.replace('text-', 'via-')} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}
                />
              </motion.article>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="#"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-pink-500/50 text-pink-500 hover:bg-pink-500/20 font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,170,0.4)]"
          >
            <span className="font-mono">すべてのコラムを見る</span>
            <IoArrowForward className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-6 border-2 border-white/10 bg-black/50 backdrop-blur-md"
        >
          <h4 className="text-base font-bold text-cyan-400 mb-6 font-mono flex items-center gap-3">
            <span className="text-yellow-400">◈</span>
            POPULAR_CATEGORIES
          </h4>
          <div className="flex flex-wrap gap-3">
            {["進路選択", "トレーニング", "栄養管理", "メンタル", "保護者向け", "チーム選び", "怪我予防", "練習方法", "高校野球"].map((cat, i) => (
              <a
                key={cat}
                href="#"
                className="px-4 py-2 text-sm font-mono border border-white/20 text-white/50 hover:border-pink-500/50 hover:text-pink-500 hover:bg-pink-500/10 transition-all duration-300"
              >
                <span className="text-white/30 mr-2">#</span>{cat}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

