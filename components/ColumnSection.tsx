"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSchool, 
  IoFitness, 
  IoNutrition, 
  IoFlash, 
  IoPeople, 
  IoCheckmarkCircle,
  IoArrowForward,
  IoTime,
  IoBookmark,
  IoStar,
  IoClose
} from "react-icons/io5";

interface Column {
  id: string;
  title: string;
  description: string;
  fullContent: string; // 詳細コンテンツ
  category: string;
  categoryKey: string;
  icon: React.ReactNode;
  readTime: string;
  color: string;
  tags: string[];
  isPinned?: boolean;
}

// カテゴリー定義
const categories = [
  { key: "all", label: "すべて", color: "pink" },
  { key: "shinro", label: "進路選択", color: "red" },
  { key: "training", label: "トレーニング", color: "cyan" },
  { key: "nutrition", label: "栄養管理", color: "yellow" },
  { key: "mental", label: "メンタル", color: "pink" },
  { key: "parents", label: "保護者向け", color: "green" },
  { key: "team", label: "チーム選び", color: "orange" },
];

const columns: Column[] = [
  {
    id: "1",
    title: "中学硬式野球の進路選択ガイド",
    description: "ボーイズ・シニア・ヤングの違いと、お子さんに合ったリーグ選びのポイントを徹底解説。高校野球への道筋も紹介。",
    fullContent: `【ボーイズリーグ】
全国約500チーム以上が加盟する最大規模のリーグ。技術指導に定評があり、甲子園出場選手も多数輩出。

【シニアリーグ】
全国約400チームが加盟。礼儀作法や人間形成を重視する傾向があり、チームワークを大切にする指導が特徴。

【ヤングリーグ】
比較的新しいリーグで、選手の自主性を重んじる指導方針。のびのびとプレーできる環境が魅力。

【選び方のポイント】
・通いやすさ（練習場所・頻度）
・指導方針（技術重視 or 人間形成重視）
・費用（月謝・遠征費・用具代）
・高校への進路実績
・チームの雰囲気

まずは複数チームの体験入部に参加し、お子さん自身が「ここでやりたい」と思えるチームを選ぶことが大切です。`,
    category: "進路・チーム選び",
    categoryKey: "shinro",
    icon: <IoSchool className="text-2xl" />,
    readTime: "8分",
    color: "red",
    tags: ["進路", "リーグ比較", "高校野球"],
    isPinned: true,
  },
  {
    id: "2",
    title: "成長期のトレーニング方法",
    description: "中学生の身体に合った効果的なトレーニングメニュー。怪我を防ぎながらパフォーマンスを向上させる秘訣。",
    fullContent: `【成長期に適したトレーニング】
中学生は骨や関節がまだ発達途中。過度な負荷は避け、自重トレーニングを中心に行いましょう。

【おすすめメニュー】
・体幹トレーニング（プランク、サイドプランク）
・スクワット（自重のみ）
・ランジ
・腕立て伏せ
・懸垂

【ストレッチの重要性】
練習前後のストレッチは必須。特に肩周り、股関節、ハムストリングスは入念に。

【避けるべきこと】
・重いウェイトを使ったトレーニング
・過度な投げ込み
・痛みを我慢してのプレー

【休養も大切】
週に1〜2日は完全休養日を設け、身体を回復させましょう。睡眠は8時間以上を目標に。`,
    category: "トレーニング",
    categoryKey: "training",
    icon: <IoFitness className="text-2xl" />,
    readTime: "10分",
    color: "cyan",
    tags: ["筋トレ", "ストレッチ", "怪我防止"],
    isPinned: true,
  },
  {
    id: "3",
    title: "野球少年の栄養管理完全版",
    description: "成長期に必要な栄養素と理想的な食事メニュー。試合前後の食事タイミングや補食のコツも紹介。",
    fullContent: `【成長期に必要な栄養素】
・タンパク質：筋肉・骨の成長に必須（肉、魚、卵、大豆製品）
・カルシウム：骨を強くする（牛乳、小魚、海藻）
・鉄分：持久力アップ（レバー、ほうれん草、赤身肉）
・炭水化物：エネルギー源（ご飯、パン、麺類）

【1日の食事例】
朝：ご飯、味噌汁、焼き魚、卵焼き
昼：おにぎり2個、唐揚げ、サラダ
夕：ご飯大盛り、ハンバーグ、野菜炒め、牛乳

【試合前の食事】
・3時間前：消化の良い炭水化物中心
・1時間前：バナナやゼリー飲料など軽めに

【試合後の食事】
・30分以内：おにぎりやプロテインで素早く補給
・その後：バランスの良い食事でしっかり回復

【補食のコツ】
練習前後におにぎり、バナナ、100%オレンジジュースなどを活用。`,
    category: "食事・栄養",
    categoryKey: "nutrition",
    icon: <IoNutrition className="text-2xl" />,
    readTime: "7分",
    color: "yellow",
    tags: ["食事", "プロテイン", "体重管理"],
    isPinned: true,
  },
  {
    id: "4",
    title: "試合で実力を発揮するメンタル術",
    description: "プレッシャーに負けない心の作り方。緊張をコントロールし、ここ一番で力を出すためのメンタルトレーニング。",
    fullContent: `【緊張は悪いことではない】
適度な緊張は集中力を高めます。「緊張している＝準備ができている」と捉えましょう。

【呼吸法でリラックス】
・4秒かけて鼻から吸う
・7秒間息を止める
・8秒かけて口から吐く
これを3回繰り返すと心が落ち着きます。

【ルーティンを作る】
打席に入る前、投球前など、毎回同じ動作をすることで平常心を保てます。

【ポジティブセルフトーク】
「絶対打てる」「俺ならできる」と自分に言い聞かせる。ネガティブな言葉は禁止。

【イメージトレーニング】
試合前夜や当日朝に、成功するイメージを具体的に思い描く。

【失敗を引きずらない】
エラーや三振は誰にでもある。次のプレーに集中することが大切。「切り替え」を口癖に。`,
    category: "メンタル強化",
    categoryKey: "mental",
    icon: <IoFlash className="text-2xl" />,
    readTime: "6分",
    color: "pink",
    tags: ["メンタル", "集中力", "本番力"],
    isPinned: true,
  },
  {
    id: "5",
    title: "保護者のサポート術",
    description: "子どもの夢を応援する親の役割とは？適切な距離感の保ち方から、送迎・当番の心構えまで。",
    fullContent: `【親の役割は「サポーター」】
監督やコーチではなく、最大の応援者であることを忘れずに。

【やってはいけないこと】
・試合中に指示を出す
・他の選手と比較する
・結果だけを褒める/叱る
・子どもの前で指導者の悪口を言う

【やるべきこと】
・努力の過程を認める
・話を聞いてあげる
・体調管理をサポート
・送迎や当番を笑顔でこなす

【子どもとの会話】
「今日どうだった？」ではなく「今日楽しかった？」と聞く。結果より気持ちを大切に。

【他の保護者との付き合い】
チームの方針に従い、協力し合う姿勢が大切。派閥を作らない。

【燃え尽き症候群を防ぐ】
野球以外の時間も大切に。家族での楽しい時間が、野球へのモチベーションにもつながります。`,
    category: "保護者向け",
    categoryKey: "parents",
    icon: <IoPeople className="text-2xl" />,
    readTime: "5分",
    color: "green",
    tags: ["サポート", "コミュニケーション", "マナー"],
    isPinned: true,
  },
  {
    id: "6",
    title: "体験入部でチェックすべき10項目",
    description: "チーム選びで失敗しないために。指導方針、練習環境、費用など、体験入部で必ず確認すべきポイントを解説。",
    fullContent: `【チェックリスト10項目】

1. 指導者の声かけ
→ 怒鳴る指導？褒める指導？選手への接し方を観察

2. 練習の雰囲気
→ 選手たちは楽しそう？緊張感は適度？

3. 練習内容
→ 基礎練習と実戦練習のバランスは？

4. 施設・設備
→ グラウンドの状態、室内練習場の有無

5. 練習頻度・時間
→ 週何回？何時から何時まで？

6. 費用
→ 月謝、入会金、遠征費、用具代の目安

7. 保護者の負担
→ 当番、送迎、お茶当番などの頻度

8. 高校への進路実績
→ どんな高校に進学しているか

9. チームの成績
→ 勝利至上主義？育成重視？

10. 通いやすさ
→ 自宅からの距離、交通手段

【最後に】
複数チームを比較し、お子さん自身が「ここでやりたい」と思えるチームを選びましょう。`,
    category: "チーム選び",
    categoryKey: "team",
    icon: <IoCheckmarkCircle className="text-2xl" />,
    readTime: "9分",
    color: "orange",
    tags: ["体験", "チェックリスト", "比較"],
    isPinned: true,
  },
  {
    id: "7",
    title: "投手の肩・肘を守るトレーニング",
    description: "成長期の投手に多い肩・肘の故障を防ぐための正しいトレーニング方法と、日々のケアについて解説。",
    fullContent: `【投手の故障を防ぐために】
中学生投手の肩・肘の故障が増えています。正しい知識で大切な身体を守りましょう。

【投球数の目安】
・1日：70球以内
・1週間：300球以内
・連投は避ける

【インナーマッスルトレーニング】
・チューブを使った外旋・内旋運動
・ペットボトルを使った肩周りの強化
・毎日5分でOK

【アイシングの重要性】
投球後は必ず15〜20分のアイシング。炎症を抑え、回復を早めます。

【ストレッチ】
・肩甲骨周りのストレッチ
・胸郭のストレッチ
・前腕のストレッチ

【危険サイン】
・投げると痛い
・腫れがある
・可動域が狭くなった
→ すぐに練習を中止し、専門医へ`,
    category: "トレーニング",
    categoryKey: "training",
    icon: <IoFitness className="text-2xl" />,
    readTime: "12分",
    color: "cyan",
    tags: ["投手", "故障予防", "ケア"],
  },
  {
    id: "8",
    title: "試合前日・当日の食事メニュー",
    description: "パフォーマンスを最大限に発揮するための試合前の食事。何をいつ食べるべきか具体的に紹介。",
    fullContent: `【試合前日の食事】
炭水化物をしっかり摂り、エネルギーを蓄えましょう。

おすすめメニュー：
・夕食：ご飯大盛り、うどん、パスタなど
・脂っこいものは避ける
・生ものは避ける（食中毒予防）

【試合当日の朝食】
試合3〜4時間前に済ませる。

おすすめメニュー：
・おにぎり2〜3個
・味噌汁
・バナナ
・オレンジジュース

【試合直前（1時間前）】
消化の良いものを少量。
・バナナ
・ゼリー飲料
・カステラ

【試合中の補給】
・こまめな水分補給
・イニング間にバナナやゼリー

【試合後】
30分以内に炭水化物とタンパク質を補給。
・おにぎり＋プロテイン
・肉まん
・サンドイッチ`,
    category: "食事・栄養",
    categoryKey: "nutrition",
    icon: <IoNutrition className="text-2xl" />,
    readTime: "6分",
    color: "yellow",
    tags: ["試合前", "エネルギー", "消化"],
  },
  {
    id: "9",
    title: "緊張をほぐすルーティンの作り方",
    description: "大事な場面で力を発揮するための、自分だけのルーティンの見つけ方と実践方法。",
    fullContent: `【ルーティンとは？】
毎回同じ動作を繰り返すことで、心を落ち着かせ、集中力を高める方法です。

【プロ野球選手のルーティン例】
・イチロー：打席でバットを立てる動作
・前田健太：マエケン体操
・大谷翔平：打席での一連の動作

【自分のルーティンを作る】
1. リラックスできる動作を見つける
2. 毎回同じ順番で行う
3. 練習から本番まで続ける

【打席でのルーティン例】
1. 深呼吸を1回
2. バットを回す
3. 足場を固める
4. ピッチャーを見る
5. 構える

【守備でのルーティン例】
1. グローブを叩く
2. 膝を軽く曲げる
3. 「来い！」と声を出す

【大切なこと】
・シンプルであること
・毎回必ず行うこと
・自分がリラックスできること`,
    category: "メンタル強化",
    categoryKey: "mental",
    icon: <IoFlash className="text-2xl" />,
    readTime: "5分",
    color: "pink",
    tags: ["ルーティン", "緊張", "集中"],
  },
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const filteredColumns = columns
    .filter(col => selectedCategory === "all" || col.categoryKey === selectedCategory)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

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
          className="text-center mb-10"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 px-6 py-3 border-2 border-pink-500/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,170,0.4)]">
              <span className="text-sm font-mono text-pink-500 tracking-widest">◈ COLUMN_DATABASE ◈</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            お役立ち<span className="text-pink-500" style={{ textShadow: '0 0 30px rgba(255,0,170,0.8)' }}>コラム</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto font-mono text-base mb-10">
            <span className="text-yellow-400">&gt;</span> 中学野球を頑張る選手と保護者のための情報メディア<span className="animate-pulse text-pink-500">_</span>
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm">◈</span>
            <span className="text-sm font-mono text-cyan-400 tracking-wider">POPULAR_CATEGORIES</span>
            <span className="text-yellow-400 text-sm">◈</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`
                    px-5 py-2.5 text-sm font-mono border-2 transition-all duration-300
                    ${isActive 
                      ? `border-${cat.color}-500 text-${cat.color === 'pink' ? 'pink-500' : cat.color === 'cyan' ? 'cyan-400' : cat.color === 'yellow' ? 'yellow-400' : cat.color === 'green' ? 'green-400' : cat.color === 'orange' ? 'orange-400' : 'red-500'} bg-${cat.color}-500/20 shadow-[0_0_20px_rgba(255,0,170,0.4)]`
                      : 'border-white/20 text-white/50 hover:border-pink-500/50 hover:text-pink-500 hover:bg-pink-500/10'
                    }
                  `}
                  style={isActive ? {
                    borderColor: cat.color === 'pink' ? '#ec4899' : cat.color === 'cyan' ? '#22d3ee' : cat.color === 'yellow' ? '#facc15' : cat.color === 'green' ? '#4ade80' : cat.color === 'orange' ? '#fb923c' : '#ef4444',
                    color: cat.color === 'pink' ? '#ec4899' : cat.color === 'cyan' ? '#22d3ee' : cat.color === 'yellow' ? '#facc15' : cat.color === 'green' ? '#4ade80' : cat.color === 'orange' ? '#fb923c' : '#ef4444',
                    backgroundColor: cat.color === 'pink' ? 'rgba(236,72,153,0.2)' : cat.color === 'cyan' ? 'rgba(34,211,238,0.2)' : cat.color === 'yellow' ? 'rgba(250,204,21,0.2)' : cat.color === 'green' ? 'rgba(74,222,128,0.2)' : cat.color === 'orange' ? 'rgba(251,146,60,0.2)' : 'rgba(239,68,68,0.2)',
                  } : {}}
                >
                  <span className="text-white/30 mr-2">#</span>{cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Column Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredColumns.map((column, index) => {
              const colors = colorVariants[column.color];
              return (
                <motion.article
                  key={column.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedColumn(column)}
                  className={`group relative border-2 ${colors.border} bg-black/80 backdrop-blur-md hover:${colors.shadow} transition-all duration-500 cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Pinned badge */}
                  {column.isPinned && (
                    <div className="absolute top-3 right-3 z-20">
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400">
                        <IoStar className="text-xs" />
                        <span className="text-[10px] font-mono">PINNED</span>
                      </div>
                    </div>
                  )}

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
                      <button 
                        className="p-2 text-white/30 hover:text-yellow-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                        <span>TAP TO READ</span>
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
          </motion.div>
        </AnimatePresence>

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
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedColumn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedColumn(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-black/95 border-2"
              style={{ 
                borderColor: colorVariants[selectedColumn.color].solidBg,
                boxShadow: `0 0 50px ${colorVariants[selectedColumn.color].glow}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="sticky top-0 z-10 p-4 border-b-2 bg-black/95"
                style={{ borderColor: `${colorVariants[selectedColumn.color].solidBg}40` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2"
                      style={{ 
                        background: `${colorVariants[selectedColumn.color].solidBg}20`,
                        border: `2px solid ${colorVariants[selectedColumn.color].solidBg}`,
                      }}
                    >
                      <span style={{ color: colorVariants[selectedColumn.color].solidBg }}>
                        {selectedColumn.icon}
                      </span>
                    </div>
                    <div>
                      <span 
                        className="text-xs font-mono"
                        style={{ color: colorVariants[selectedColumn.color].solidBg }}
                      >
                        {selectedColumn.category}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {selectedColumn.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedColumn(null)}
                    className="p-2 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/40"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-white/40 text-xs font-mono">
                    <IoTime />
                    {selectedColumn.readTime}
                  </div>
                  <div className="flex gap-2">
                    {selectedColumn.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono border"
                        style={{ 
                          color: colorVariants[selectedColumn.color].solidBg,
                          borderColor: `${colorVariants[selectedColumn.color].solidBg}50`,
                          background: `${colorVariants[selectedColumn.color].solidBg}10`,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                <div className="text-white/80 font-mono text-sm leading-relaxed whitespace-pre-line">
                  {selectedColumn.fullContent}
                </div>
              </div>

              {/* Bottom accent */}
              <div 
                className="h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${colorVariants[selectedColumn.color].solidBg}, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
