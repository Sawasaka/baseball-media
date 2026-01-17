"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { PrefectureTabs } from "@/components/PrefectureTabs";
import { LeagueFilter } from "@/components/LeagueFilter";
import { BranchFilter } from "@/components/BranchFilter";
import { TeamCard } from "@/components/TeamCard";
import { SubServiceTabs } from "@/components/SubServiceTabs";
import { ColumnSection } from "@/components/ColumnSection";
import { ContactForm } from "@/components/ContactForm";
import { SupervisorSection } from "@/components/SupervisorSection";
import type { Team } from "@/lib/microcms/types";
import { IoChevronDown, IoChevronForward, IoSearch, IoBaseball, IoTerminal, IoFlash, IoRocket, IoSparkles, IoLanguage, IoCode, IoTrophy, IoBriefcase, IoClose, IoApps, IoOpenOutline, IoCalendar, IoCheckmarkCircle, IoCar, IoPeople, IoNotifications, IoSettings } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

// Import 3D scene dynamically
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

// チーム楽の機能データ
const teamRakuFeatures = [
  {
    id: "schedule",
    number: "01",
    label: "予定管理",
    icon: IoCalendar,
    color: "#6366F1",
    description: "いつ・どこで・何があるか一目で",
    content: {
      title: "練習予定",
      items: [
        { date: "1/18(土)", event: "練習", location: "第一グラウンド", time: "9:00〜12:00" },
        { date: "1/19(日)", event: "練習試合", location: "○○球場", time: "13:00〜" },
        { date: "1/25(土)", event: "練習", location: "第一グラウンド", time: "9:00〜12:00" },
      ]
    }
  },
  {
    id: "duty",
    number: "02",
    label: "当番管理",
    icon: IoCheckmarkCircle,
    color: "#10B981",
    description: "「誰がやる？」がすぐ決まる",
    content: {
      title: "今週の当番",
      items: [
        { role: "グラウンド整備", name: "田中さん", status: "確定" },
        { role: "お茶当番", name: "鈴木さん", status: "確定" },
        { role: "記録係", name: "未定", status: "募集中" },
      ]
    }
  },
  {
    id: "carpool",
    number: "03",
    label: "配車管理",
    icon: IoCar,
    color: "#F97316",
    description: "送迎調整の手間をゼロに",
    content: {
      title: "配車状況",
      items: [
        { driver: "山田さん", car: "プリウス", seats: "3名乗車OK", route: "駅前経由" },
        { driver: "佐藤さん", car: "ノア", seats: "5名乗車OK", route: "直行" },
      ]
    }
  },
  {
    id: "member",
    number: "04",
    label: "メンバー管理",
    icon: IoPeople,
    color: "#8B5CF6",
    description: "連絡先も設定もまとめて管理",
    content: {
      title: "チームメンバー",
      count: "24名登録中",
      groups: ["選手: 18名", "コーチ: 3名", "保護者: 3名"]
    }
  },
  {
    id: "notification",
    number: "05",
    label: "通知機能",
    icon: IoNotifications,
    color: "#EF4444",
    description: "大事な連絡を見逃さない",
    content: {
      title: "最新のお知らせ",
      notifications: [
        { type: "予定", message: "明日の練習は雨天中止です", time: "2時間前" },
        { type: "当番", message: "記録係の募集があります", time: "1日前" },
      ]
    }
  },
];

// チーム楽セクションコンポーネント
const TeamRakuSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % teamRakuFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const feature = teamRakuFeatures[activeFeature];
  const Icon = feature.icon;

  return (
    <section id="team-raku" className="py-16 sm:py-28 px-3 sm:px-4 bg-gradient-to-b from-black/50 to-purple-950/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
            チーム運営者の方へ
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            お当番管理を<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" style={{ textShadow: '0 0 40px rgba(168,85,247,0.5)' }}>
              もっと楽に。
            </span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto text-sm sm:text-base">
            予定管理、当番割り当て、配車手配をひとつのアプリで。<br />
            チーム運営の悩みをスッキリ解決します。
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <IoCheckmarkCircle className="text-green-400 text-sm" />
                </div>
                <span className="text-white/80">無料で使える</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <IoCheckmarkCircle className="text-green-400 text-sm" />
                </div>
                <span className="text-white/80">かんたん設定</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <IoCheckmarkCircle className="text-green-400 text-sm" />
                </div>
                <span className="text-white/80">直感的に使える</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-300 text-xs font-bold animate-pulse">
                  3ヶ月無料
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-white/40 line-through text-lg">¥15,800</span>
                <span className="text-3xl sm:text-4xl font-black text-white">¥9,800</span>
                <span className="text-white/60">/月</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://team-raku.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              無料で始める
              <IoChevronForward className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Interactive App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-purple-500/20 overflow-hidden max-w-md mx-auto">
              {/* App Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    楽
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">チーム楽</div>
                    <div className="text-xs text-slate-500">お当番管理アプリ</div>
                  </div>
                </div>
              </div>

              {/* Feature Tabs */}
              <div className="flex border-b border-slate-200">
                {teamRakuFeatures.slice(0, 4).map((f, idx) => {
                  const TabIcon = f.icon;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFeature(idx)}
                      className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all duration-300 ${
                        activeFeature === idx
                          ? "bg-slate-50 border-b-2"
                          : "text-slate-400 hover:bg-slate-50"
                      }`}
                      style={{
                        borderColor: activeFeature === idx ? f.color : "transparent",
                        color: activeFeature === idx ? f.color : undefined,
                      }}
                    >
                      <TabIcon className="text-lg" />
                      <span className="text-xs font-medium">{f.label.slice(0, 2)}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setActiveFeature(4)}
                  className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeFeature === 4
                      ? "bg-slate-50 border-b-2"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                  style={{
                    borderColor: activeFeature === 4 ? teamRakuFeatures[4].color : "transparent",
                    color: activeFeature === 4 ? teamRakuFeatures[4].color : undefined,
                  }}
                >
                  <IoSettings className="text-lg" />
                  <span className="text-xs font-medium">設定</span>
                </button>
              </div>

              {/* Feature Content */}
              <div className="h-[280px] overflow-hidden relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 absolute inset-0"
                  >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <Icon className="text-xl" style={{ color: feature.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{feature.label}</div>
                      <div className="text-xs text-slate-500">{feature.description}</div>
                    </div>
                  </div>

                  {/* Dynamic Content based on feature */}
                  {feature.id === "schedule" && (
                    <div className="space-y-3">
                      {feature.content.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="text-center">
                            <div className="text-xs text-slate-500">{item.date}</div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-700 text-sm">{item.event}</div>
                            <div className="text-xs text-slate-500">{item.location} {item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.id === "duty" && (
                    <div className="space-y-3">
                      {feature.content.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-700 text-sm">{item.role}</div>
                            <div className="text-xs text-slate-500">{item.name}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "確定" 
                              ? "bg-green-100 text-green-600" 
                              : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.id === "carpool" && (
                    <div className="space-y-3">
                      {feature.content.items.map((item, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <IoCar className="text-orange-500" />
                            <span className="font-medium text-slate-700 text-sm">{item.driver}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{item.car}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{item.seats}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.id === "member" && (
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-slate-800">{feature.content.count}</div>
                      </div>
                      <div className="space-y-2">
                        {feature.content.groups.map((group, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="text-sm text-slate-600">{group}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {feature.id === "notification" && (
                    <div className="space-y-3">
                      {feature.content.notifications.map((notif, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded text-xs font-medium">
                              {notif.type}
                            </span>
                            <span className="text-xs text-slate-400">{notif.time}</span>
                          </div>
                          <div className="text-sm text-slate-700">{notif.message}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Feature Indicator Dots */}
              <div className="flex justify-center gap-2 pb-4">
                {teamRakuFeatures.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeFeature === idx
                        ? "w-6 bg-purple-500"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// サブチャンネルのデータ（モバイル表示用）
const mobileSubChannels = [
  {
    id: "english",
    label: "英語学習",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    color: "#00F0FF",
    shadowColor: "0,240,255",
  },
  {
    id: "academy",
    label: "ITアカデミー",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoCode,
    color: "#FF00AA",
    shadowColor: "255,0,170",
  },
  {
    id: "yakyu-juku",
    label: "オンライン野球塾",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    color: "#FF2A44",
    shadowColor: "255,42,68",
  },
  {
    id: "scout",
    label: "スカウト",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
    icon: IoTrophy,
    color: "#FACC15",
    shadowColor: "250,204,21",
  },
  {
    id: "career",
    label: "キャリア",
    url: "https://agent.rookiesmart-jp.com/",
    icon: IoBriefcase,
    color: "#22C55E",
    shadowColor: "34,197,94",
  },
  {
    id: "team-raku",
    label: "チーム楽",
    url: "#team-raku",
    icon: IoApps,
    color: "#A855F7",
    shadowColor: "168,85,247",
    isInternalLink: true,
  },
];

// リーグの表示順序（ボーイズ → シニア → ヤング）
const leagueOrder: Record<string, number> = {
  'boys': 1,
  'senior': 2,
  'young': 3,
};

// Typing effect hook
function useTypewriter(text: string, speed: number = 80) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayText;
}

// JSON-LD構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://rookiesmart-jp.com/#website",
      "url": "https://rookiesmart-jp.com",
      "name": "ROOKIE SMART",
      "description": "全国の中学硬式野球チーム（ボーイズリーグ・シニアリーグ・ヤングリーグ）を都道府県・リーグ・支部から検索・比較できるプラットフォーム",
      "publisher": {
        "@type": "Organization",
        "name": "ROOKIE SMART",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rookiesmart-jp.com/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://rookiesmart-jp.com/?prefecture={prefecture}&league={league}"
        },
        "query-input": "required name=prefecture,league"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://rookiesmart-jp.com/#organization",
      "name": "ROOKIE SMART",
      "url": "https://rookiesmart-jp.com",
      "description": "中学硬式野球チームの検索・比較プラットフォーム。ボーイズリーグ・シニアリーグ・ヤングリーグ対応。"
    },
    {
      "@type": "WebPage",
      "@id": "https://rookiesmart-jp.com/#webpage",
      "url": "https://rookiesmart-jp.com",
      "name": "全国の中学硬式野球チーム検索・比較サイト｜ボーイズ・シニア・ヤング対応｜ROOKIE SMART",
      "description": "北海道から沖縄まで、全国47都道府県の中学硬式野球チーム（ボーイズリーグ・シニアリーグ・ヤングリーグ）を検索。大阪・兵庫・東京・神奈川・愛知・福岡など、各地域のチーム情報を網羅。",
      "isPartOf": { "@id": "https://rookiesmart-jp.com/#website" },
      "about": { "@id": "https://rookiesmart-jp.com/#organization" },
      "mainEntity": {
        "@type": "ItemList",
        "name": "中学硬式野球チーム一覧",
        "description": "全国のボーイズリーグ・シニアリーグ・ヤングリーグのチーム一覧",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "大阪府の中学硬式野球チーム" },
          { "@type": "ListItem", "position": 2, "name": "兵庫県の中学硬式野球チーム" },
          { "@type": "ListItem", "position": 3, "name": "東京都の中学硬式野球チーム" },
          { "@type": "ListItem", "position": 4, "name": "神奈川県の中学硬式野球チーム" },
          { "@type": "ListItem", "position": 5, "name": "愛知県の中学硬式野球チーム" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ボーイズリーグとシニアリーグの違いは？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ボーイズリーグは日本少年野球連盟が運営し全国最大規模。シニアリーグは日本リトルシニア中学硬式野球協会が運営し関東を中心に展開。どちらも中学生の硬式野球リーグで、甲子園球児やプロ野球選手を多数輩出しています。"
          }
        },
        {
          "@type": "Question",
          "name": "中学硬式野球チームの選び方は？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "お住まいの地域、通いやすさ、チームの方針（勝利志向・育成志向）、進学実績、費用などを総合的に比較することが大切です。体験会に参加して雰囲気を確認することをおすすめします。"
          }
        },
        {
          "@type": "Question",
          "name": "ヤングリーグとは？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ヤングリーグは全日本少年硬式野球連盟が運営する中学硬式野球リーグです。関西を中心に活動し、野球を通じた青少年育成に注力。アットホームな雰囲気のチームが多いのが特徴です。"
          }
        }
      ]
    }
  ]
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [prefecture, setPrefecture] = useState("大阪府");
  const [league, setLeague] = useState("boys");
  const [branch, setBranch] = useState("all");
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedSubChannel, setSelectedSubChannel] = useState<typeof mobileSubChannels[0] | null>(null);
  const [iframeError, setIframeError] = useState(false);
  const typedText = useTypewriter("チームを探せ", 120);

  // ブラウザのスクロール復元を無効化 & リフレッシュ時はトップへ
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ブラウザのスクロール復元を無効化
      window.history.scrollRestoration = 'manual';
      
      // scrollTo=columnsパラメータがない場合のみトップへスクロール
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.get("scrollTo")) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // 初回ロード時にURLパラメータから状態を復元
  useEffect(() => {
    const prefParam = searchParams.get("prefecture");
    const leagueParam = searchParams.get("league");
    const branchParam = searchParams.get("branch");

    if (prefParam) setPrefecture(prefParam);
    if (leagueParam) setLeague(leagueParam);
    if (branchParam) setBranch(branchParam);
    
    setIsInitialized(true);
  }, [searchParams]);

  // フィルタ変更時にURLを更新（履歴は追加しない）
  useEffect(() => {
    if (!isInitialized) return;
    
    // scrollToパラメータがある場合はスキップ（ColumnSectionで処理）
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("scrollTo")) return;
    
    const params = new URLSearchParams();
    params.set("prefecture", prefecture);
    params.set("league", league);
    if (branch !== "all") params.set("branch", branch);

    const newUrl = `/?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [prefecture, league, branch, isInitialized, router]);

  // 都道府県が変わったら支部をリセット
  const handlePrefectureChange = (newPrefecture: string) => {
    setPrefecture(newPrefecture);
    setBranch("all");
  };

  // リーグが「全て」になったら支部をリセット
  const handleLeagueChange = (newLeague: string) => {
    setLeague(newLeague);
    if (newLeague === "all") {
      setBranch("all");
    }
  };

  // microCMS からチームデータを取得
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/teams");
        if (res.ok) {
          const data = await res.json();
          setTeams(data.teams || []);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // リーグ名からIDへの変換
  const getLeagueIdFromName = (leagueName: string): string => {
    if (leagueName === 'ボーイズ') return 'boys';
    if (leagueName === 'シニア') return 'senior';
    if (leagueName === 'ヤング') return 'young';
    return 'boys';
  };

  // 地域別都道府県リスト
  const kansaiPrefectures = ["大阪府", "兵庫県", "京都府", "滋賀県", "奈良県", "和歌山県"];
  const kantoPrefectures = ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"];
  const otherPrefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  // 都道府県ごとのチーム数を計算
  const teamCountsByPrefecture = (() => {
    const counts: Record<string, number> = {};
    let otherTotal = 0;
    teams.forEach(team => {
      const pref = team.prefecture?.[0] || '';
      if (pref) {
        counts[pref] = (counts[pref] || 0) + 1;
        // 関西・関東以外の都道府県の合計
        if (otherPrefectures.includes(pref)) {
          otherTotal++;
        }
      }
    });
    // 「全国」オプション用の合計
    counts["全国"] = otherTotal;
    return counts;
  })();

  // 現在の都道府県・リーグに対応する支部一覧を計算
  const availableBranches = (() => {
    const branchMap = new Map<string, { name: string; count: number }>();
    
    teams.forEach(team => {
      const teamPrefecture = team.prefecture?.[0] || '';
      const teamLeagueId = getLeagueIdFromName(team.league?.[0] || '');
      const teamBranch = team.branch || '';
      
      // 都道府県とリーグでフィルタ（「全国」の場合はotherPrefecturesでフィルタ）
      const prefectureMatch = prefecture === "全国" 
        ? otherPrefectures.includes(teamPrefecture)
        : teamPrefecture === prefecture;
      
      if (prefectureMatch && (league === "all" || teamLeagueId === league) && teamBranch) {
        const existing = branchMap.get(teamBranch);
        if (existing) {
          existing.count++;
        } else {
          branchMap.set(teamBranch, { name: teamBranch, count: 1 });
        }
      }
    });

    return Array.from(branchMap.entries())
      .map(([id, data]) => ({ id, name: data.name, count: data.count }))
      .sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  })();

  const filteredTeams = teams
    .filter((team) => {
      const teamPrefecture = team.prefecture?.[0] || '';
      const teamLeagueId = getLeagueIdFromName(team.league?.[0] || '');
      const teamBranch = team.branch || '';
      
      // 「全国」が選択された場合は関西・関東以外の全都道府県を表示
      const prefectureMatch = prefecture === "全国" 
        ? otherPrefectures.includes(teamPrefecture)
        : teamPrefecture === prefecture;
      const leagueMatch = league === "all" || teamLeagueId === league;
      const branchMatch = branch === "all" || teamBranch === branch;
      
      return prefectureMatch && leagueMatch && branchMatch;
    })
    .sort((a, b) => {
      // リーグ順でソート（ボーイズ → シニア → ヤング）
      const aLeagueId = getLeagueIdFromName(a.league?.[0] || '');
      const bLeagueId = getLeagueIdFromName(b.league?.[0] || '');
      return (leagueOrder[aLeagueId] || 99) - (leagueOrder[bLeagueId] || 99);
    });

  return (
    <>
      {/* JSON-LD 構造化データ */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      
      <div className="w-full max-w-full bg-cyber-bg overflow-x-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Navigation */}
      <Navbar />
      
      <main className="relative z-10 pt-14 sm:pt-16 lg:pt-24 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="w-full flex flex-col lg:min-h-[100vh] lg:justify-center relative pb-6 sm:pb-10 lg:pb-0 overflow-hidden">
          {/* Animated background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Cyber decorations - hidden on mobile */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            {/* Corner HUD elements */}
            <div className="absolute top-24 left-8 w-20 sm:w-40 h-20 sm:h-40 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-red-500 shadow-[0_0_15px_rgba(255,42,68,0.6)] animate-pulse" />
            <div className="absolute top-24 right-8 w-20 sm:w-40 h-20 sm:h-40 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)] animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-24 left-8 w-20 sm:w-40 h-20 sm:h-40 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-pink-500 shadow-[0_0_15px_rgba(255,0,170,0.6)] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-24 right-8 w-20 sm:w-40 h-20 sm:h-40 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse" style={{ animationDelay: '1.5s' }} />
            
            {/* Vertical neon lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
            <div className="absolute right-1/4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            
            {/* Horizontal scan lines */}
            <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
            <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

            {/* Floating particles - fewer on mobile */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${i > 5 ? 'hidden sm:block' : ''}`}
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  background: i % 3 === 0 ? '#FF2A44' : i % 3 === 1 ? '#00F0FF' : '#FF00AA',
                  boxShadow: i % 3 === 0 ? '0 0 15px #FF2A44' : i % 3 === 1 ? '0 0 15px #00F0FF' : '0 0 15px #FF00AA',
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="w-full max-w-7xl mx-auto px-4 text-center relative z-20">
            {/* Mobile/Tablet サブチャンネル - クリックでiframeモーダル表示 */}
          <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden mb-4 mt-4 px-2"
          >
              {/* 上段3つ */}
              <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                {mobileSubChannels.slice(0, 3).map((channel) => {
                  const Icon = channel.icon;
                  const isInternal = 'isInternalLink' in channel && channel.isInternalLink;
                  return isInternal ? (
                    <a
                      key={channel.id}
                      href={channel.url}
                      className="flex items-center justify-center gap-1 py-2 font-mono transition-all duration-300 active:scale-95 rounded"
                      style={{
                        background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.2), rgba(${channel.shadowColor},0.05))`,
                        border: `1.5px solid ${channel.color}`,
                        boxShadow: `0 0 10px rgba(${channel.shadowColor},0.3)`,
                      }}
                    >
                      <Icon 
                        size={14} 
                        style={{ 
                          color: channel.color,
                          filter: `drop-shadow(0 0 4px ${channel.color})`,
                        }} 
                      />
                      <span 
                        className="text-[10px] font-bold whitespace-nowrap"
                        style={{ 
                          color: channel.color,
                          textShadow: `0 0 6px rgba(${channel.shadowColor},0.5)`,
                        }}
                      >
                        {channel.label}
                      </span>
                    </a>
                  ) : (
                    <button
                      key={channel.id}
                      onClick={() => {
                        setSelectedSubChannel(channel);
                        setIframeError(false);
                      }}
                      className="flex items-center justify-center gap-1 py-2 font-mono transition-all duration-300 active:scale-95 rounded"
                      style={{
                        background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.2), rgba(${channel.shadowColor},0.05))`,
                        border: `1.5px solid ${channel.color}`,
                        boxShadow: `0 0 10px rgba(${channel.shadowColor},0.3)`,
                      }}
                    >
                      <Icon 
                        size={14} 
                        style={{ 
                          color: channel.color,
                          filter: `drop-shadow(0 0 4px ${channel.color})`,
                        }} 
                      />
                      <span 
                        className="text-[10px] font-bold whitespace-nowrap"
                        style={{ 
                          color: channel.color,
                          textShadow: `0 0 6px rgba(${channel.shadowColor},0.5)`,
                        }}
                      >
                        {channel.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* 下段3つ */}
              <div className="grid grid-cols-3 gap-1.5">
                {mobileSubChannels.slice(3, 6).map((channel) => {
                  const Icon = channel.icon;
                  const isInternal = 'isInternalLink' in channel && channel.isInternalLink;
                  return isInternal ? (
                    <a
                      key={channel.id}
                      href={channel.url}
                      className="flex items-center justify-center gap-1 py-2 font-mono transition-all duration-300 active:scale-95 rounded"
                      style={{
                        background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.2), rgba(${channel.shadowColor},0.05))`,
                        border: `1.5px solid ${channel.color}`,
                        boxShadow: `0 0 10px rgba(${channel.shadowColor},0.3)`,
                      }}
                    >
                      <Icon 
                        size={14} 
                        style={{ 
                          color: channel.color,
                          filter: `drop-shadow(0 0 4px ${channel.color})`,
                        }} 
                      />
                      <span 
                        className="text-[10px] font-bold whitespace-nowrap"
                        style={{ 
                          color: channel.color,
                          textShadow: `0 0 6px rgba(${channel.shadowColor},0.5)`,
                        }}
                      >
                        {channel.label}
                      </span>
                    </a>
                  ) : (
                    <button
                      key={channel.id}
                      onClick={() => {
                        setSelectedSubChannel(channel);
                        setIframeError(false);
                      }}
                      className="flex items-center justify-center gap-1 py-2 font-mono transition-all duration-300 active:scale-95 rounded"
                      style={{
                        background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.2), rgba(${channel.shadowColor},0.05))`,
                        border: `1.5px solid ${channel.color}`,
                        boxShadow: `0 0 10px rgba(${channel.shadowColor},0.3)`,
                      }}
                    >
                      <Icon 
                        size={14} 
                        style={{ 
                          color: channel.color,
                          filter: `drop-shadow(0 0 4px ${channel.color})`,
                        }} 
                      />
                      <span 
                        className="text-[10px] font-bold whitespace-nowrap"
                        style={{ 
                          color: channel.color,
                          textShadow: `0 0 6px rgba(${channel.shadowColor},0.5)`,
                        }}
                      >
                        {channel.label}
                      </span>
                    </button>
                  );
                })}
              </div>
          </motion.div>

            {/* サブチャンネル iframeモーダル（PC表示と同じ） */}
            <AnimatePresence>
              {selectedSubChannel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 z-[9998] flex items-start justify-center pt-16 px-3 pb-4 bg-black/90 backdrop-blur-md overflow-y-auto"
                  onClick={() => setSelectedSubChannel(null)}
                >
          <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative w-full max-w-lg overflow-hidden bg-black/95"
                    style={{ 
                      boxShadow: `0 0 60px rgba(${selectedSubChannel.shadowColor},0.5)`,
                      border: `3px solid ${selectedSubChannel.color}`,
                    }}
                    onClick={(e) => e.stopPropagation()}
          >
                    {/* Header */}
                    <div 
                      className="sticky top-0 z-10 flex items-center justify-between p-3 border-b-2 bg-black/95"
                      style={{
                        background: `linear-gradient(90deg, rgba(${selectedSubChannel.shadowColor},0.3), transparent)`,
                        borderColor: `${selectedSubChannel.color}60`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2"
                          style={{ 
                            background: `${selectedSubChannel.color}30`,
                            border: `2px solid ${selectedSubChannel.color}`,
                            boxShadow: `0 0 20px ${selectedSubChannel.color}40`,
                          }}
                        >
                          {(() => {
                            const Icon = selectedSubChannel.icon;
                            return (
                              <Icon 
                                className="text-xl"
                                style={{ 
                                  color: selectedSubChannel.color,
                                  filter: `drop-shadow(0 0 10px ${selectedSubChannel.color})`,
                                }} 
                              />
                            );
                          })()}
                        </div>
                        <span 
                          className="font-mono text-base font-black"
                          style={{ 
                            color: selectedSubChannel.color,
                            textShadow: `0 0 20px ${selectedSubChannel.color}`,
                          }}
                        >
                          {selectedSubChannel.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <a
                          href={selectedSubChannel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-1.5 text-xs font-black transition-all duration-300 active:scale-95"
                          style={{
                            background: `linear-gradient(135deg, ${selectedSubChannel.color}, ${selectedSubChannel.color}aa)`,
                            color: '#fff',
                            boxShadow: `0 0 20px ${selectedSubChannel.color}60`,
                          }}
                        >
                          <IoRocket className="mr-1" />
                          開く
                        </a>
                        <button
                          onClick={() => setSelectedSubChannel(null)}
                          className="p-1.5 text-white/50 hover:text-white transition-all duration-300"
                          style={{
                            border: `2px solid ${selectedSubChannel.color}40`,
                            background: `${selectedSubChannel.color}10`,
                          }}
                        >
                          <IoClose className="text-xl" />
                        </button>
                      </div>
            </div>

                    {/* Iframe */}
                    <div className="relative h-[70vh]">
                      {iframeError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/70">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {(() => {
                              const Icon = selectedSubChannel.icon;
                              return (
                                <Icon 
                                  className="text-5xl mb-4" 
                                  style={{ 
                                    color: selectedSubChannel.color,
                                    filter: `drop-shadow(0 0 20px ${selectedSubChannel.color})`,
                                  }} 
                                />
                              );
                            })()}
          </motion.div>
                          <p className="text-white/60 mb-4 text-center font-mono text-sm">
                            このサイトは埋め込み表示に<br/>対応していません
                          </p>
                          <a
                            href={selectedSubChannel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 font-black text-sm transition-all duration-300 active:scale-95"
                            style={{
                              background: `linear-gradient(135deg, ${selectedSubChannel.color}, ${selectedSubChannel.color}aa)`,
                              color: '#fff',
                              boxShadow: `0 0 30px ${selectedSubChannel.color}60`,
                            }}
                          >
                            <IoRocket className="mr-2" />
                            サイトを開く
                            <IoChevronForward className="ml-1" />
                          </a>
                        </div>
                      ) : (
                        <iframe
                          src={selectedSubChannel.url}
                          className="w-full h-full border-0"
                          onError={() => setIframeError(true)}
                          title={selectedSubChannel.label}
                        />
                      )}
                    </div>
                    
                    {/* Bottom accent */}
                    <div 
                      className="h-1"
                      style={{ background: `linear-gradient(90deg, transparent, ${selectedSubChannel.color}, transparent)` }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terminal-style badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border-2 border-cyan-400/50 bg-black/90 backdrop-blur-md mb-6 sm:mb-10 lg:mt-0 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            >
              <IoTerminal className="text-cyan-400 text-lg sm:text-xl animate-pulse shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-cyan-400 tracking-wider">
                &gt; 中学硬式野球チーム検索システム<span className="animate-pulse">_</span>
              </span>
              <IoSparkles className="text-yellow-400 text-base sm:text-lg animate-pulse shrink-0" />
            </motion.div>

            {/* Main Title - SEO用H1は視覚的に隠し、デザイン用タイトルは別途表示 */}
            <h1 className="sr-only">
              全国の中学硬式野球チーム検索・比較サイト｜ボーイズリーグ・シニアリーグ・ヤングリーグ対応
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-10 tracking-tight"
              aria-hidden="true"
            >
              <span 
                className="block mt-1 sm:mt-2 mb-1 sm:mb-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300"
                style={{
                  textShadow: '0 0 30px rgba(0,240,255,0.5)',
                  WebkitBackgroundClip: 'text',
                }}
              >
                中学硬式野球
              </span>
              <span className="relative inline-block">
                {/* Main gradient text */}
                <span 
                  className="relative block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {typedText}
                </span>
                {/* Underline accent */}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 origin-left"
                />
              </span>
            </motion.div>

            {/* League badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="px-2 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-wider border-2 border-red-500/60 text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(255,42,68,0.4)] flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-[8px] sm:text-[10px] animate-pulse">◆</span>
                ボーイズ
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="px-2 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-wider border-2 border-cyan-400/60 text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-[8px] sm:text-[10px] animate-pulse">◆</span>
                シニア
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="px-2 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-wider border-2 border-yellow-400/60 text-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(255,255,0,0.4)] flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-[8px] sm:text-[10px] animate-pulse">◆</span>
                ヤング
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white/70 max-w-md mx-auto text-sm sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 font-mono"
            >
              <span className="text-cyan-400">&gt;</span> 全国の中学硬式野球チームを<span className="text-pink-500">検索</span>・<span className="text-yellow-400">比較</span><span className="animate-pulse text-red-500">_</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-8 sm:mb-12"
            >
              <a 
                href="#search"
                className="group relative flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-base sm:text-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_40px_rgba(255,42,68,0.6)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <IoRocket className="text-lg sm:text-xl group-hover:animate-bounce" />
                  チームを探す
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a 
                href="#services"
                className="flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 border-2 border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/20 font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                <IoSparkles className="mr-2" />
                サブチャンネル
              </a>
            </motion.div>

            {/* Stats bar - ボタンの下に配置 */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="inline-block"
          >
              <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 py-3 sm:py-4 border-2 border-red-500/40 bg-black/80 backdrop-blur-md">
              <div className="text-center">
                  <div className="text-[10px] sm:text-xs text-red-500 font-mono mb-0.5 sm:mb-1 animate-pulse">▣</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-red-500 font-mono">1400+</div>
                  <div className="text-[8px] sm:text-[10px] text-white/50 font-mono tracking-widest mt-0.5 sm:mt-1">チーム数</div>
              </div>
              <div className="text-center">
                  <div className="text-[10px] sm:text-xs text-cyan-400 font-mono mb-0.5 sm:mb-1 animate-pulse">◎</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-400 font-mono">47</div>
                  <div className="text-[8px] sm:text-[10px] text-white/50 font-mono tracking-widest mt-0.5 sm:mt-1">都道府県</div>
              </div>
              <div className="text-center">
                  <div className="text-[10px] sm:text-xs text-yellow-400 font-mono mb-0.5 sm:mb-1 animate-pulse">◈</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-400 font-mono">03</div>
                  <div className="text-[8px] sm:text-[10px] text-white/50 font-mono tracking-widest mt-0.5 sm:mt-1">リーグ数</div>
                </div>
              </div>
            </motion.div>
            </div>

          {/* Scroll indicator - デスクトップのみ表示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest animate-pulse">SCROLL</span>
              <IoChevronDown className="text-cyan-400 text-2xl" style={{ filter: 'drop-shadow(0 0 10px #00F0FF)' }} />
            </motion.div>
          </motion.div>
        </section>

        {/* Supervisor Section */}
        <SupervisorSection />

        {/* Search Section */}
        <section className="py-16 sm:py-28 px-3 sm:px-4 relative" id="search">
          {/* Section decoration */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500/40 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
          
          {/* Top neon line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
          
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
                チームを<span className="text-red-500" style={{ textShadow: '0 0 30px rgba(255,42,68,0.8)' }}>探す</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto font-mono text-sm sm:text-base px-2">
                <span className="text-cyan-400">&gt;</span> エリア・リーグで絞り込み検索<span className="animate-pulse text-pink-500">_</span>
              </p>
            </motion.div>

            {/* Filters */}
            <PrefectureTabs 
              currentPrefecture={prefecture} 
              onSelect={handlePrefectureChange} 
              teamCounts={teamCountsByPrefecture}
            />
            <LeagueFilter currentLeague={league} onSelect={handleLeagueChange} />
            <BranchFilter 
              currentBranch={branch} 
              currentPrefecture={prefecture}
              branches={availableBranches} 
              onSelect={setBranch} 
            />

            {/* Results Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-10 px-2 py-3 sm:py-4 border-y-2 border-red-500/20">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm sm:text-base text-white/70 font-mono">
                    検索結果: <span className="text-red-500 text-lg sm:text-xl font-bold">{filteredTeams.length}</span> チーム
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-cyan-400 font-mono px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-400/30 bg-cyan-400/5">
                {prefecture}/{league === 'boys' ? 'ボーイズ' : league === 'senior' ? 'シニア' : league === 'young' ? 'ヤング' : '全て'}
                {branch !== 'all' && <span className="text-pink-500">/{branch}</span>}
                {branch === 'all' && availableBranches.length === 1 && <span className="text-pink-500">/{availableBranches[0].name}</span>}
              </span>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.3,
                    delay: Math.min(index * 0.03, 0.15)
                  }}
                >
                  <TeamCard team={team} />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTeams.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 border-2 border-cyan-500/30 bg-black/50"
              >
                <IoSearch className="text-5xl text-cyan-500/40 mx-auto mb-6" />
                <p className="text-white/60 font-mono text-lg">
                  該当するチームは現在登録されていません
                </p>
                <p className="text-white/40 font-mono text-sm mt-2">
                  他のリーグや都道府県をお試しください
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 sm:py-28 px-3 sm:px-4 bg-black/30 relative" id="services">
          {/* Neon line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.8)]" />
          
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
                サブ<span className="text-cyan-400" style={{ textShadow: '0 0 30px rgba(0,240,255,0.8)' }}>チャンネル</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto font-mono text-sm sm:text-base">
                <span className="text-pink-500">&gt;</span> 野球少年の未来を広げる関連サービス<span className="animate-pulse text-cyan-400">_</span>
              </p>
            </motion.div>
            
            <SubServiceTabs />
          </div>
        </section>

        {/* チーム楽 Promotion Section */}
        <TeamRakuSection />

        {/* Column Section */}
        <ColumnSection />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-red-500/30 bg-black py-12 sm:py-20">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
        
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mb-10 sm:mb-16">
            {/* Brand */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <IoBaseball className="text-3xl sm:text-4xl text-red-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 15px #FF2A44)' }} />
                <div className="flex flex-col justify-center">
                  <span className="text-xs md:text-base font-bold tracking-wide">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white" style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
                      中学硬式野球
                    </span>
                    <span className="text-cyan-400 mx-0.5">／</span>
                    <span className="text-red-400 font-black" style={{ textShadow: '0 0 15px rgba(255,42,68,0.5)' }}>
                      チーム検索・比較
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-white/50 text-xs sm:text-sm font-mono leading-relaxed">
                <span className="text-red-500">&gt;</span> 中学硬式野球チームの<br />
                <span className="text-cyan-400">&gt;</span> 検索・比較プラットフォーム<span className="animate-pulse">_</span>
              </p>
            </div>
            
            {/* Free Interview CTA */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-yellow-400 mb-4 sm:mb-6 font-mono text-center sm:text-left">// 無料インタビュー</h4>
              <div className="p-3 sm:p-4 border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 relative overflow-hidden group hover:border-cyan-400 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-r-2 border-b-2 border-pink-500" />
                
                <div className="relative z-10 text-center sm:text-left">
                  <p className="text-white text-xs sm:text-sm font-bold mb-2">
                    📣 チーム特集インタビュー
                  </p>
                  <p className="text-white/60 text-[10px] sm:text-xs mb-3 sm:mb-4 leading-relaxed">
                    中学硬式野球チームの魅力を<br className="hidden sm:block" />
                    <span className="text-cyan-400 font-bold">無料</span>で記事にしてお届けします！
                  </p>
                  <a 
                    href="#contact-name"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('contact-name');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => el.focus(), 500);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 group/btn cursor-pointer"
                  >
                    <span>お気軽にご依頼ください</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
            
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="border-t-2 border-red-500/20 pt-6 sm:pt-8 mb-6">
            <div className="flex justify-center">
              <a 
                href="/tokushoho"
                className="text-white/50 hover:text-cyan-400 text-[10px] sm:text-xs font-mono transition-colors"
              >
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-white/30 text-[10px] sm:text-xs font-mono text-center md:text-left">
              © <span className="text-red-500">株式会社ルーキースマートジャパン</span> // ALL_RIGHTS_RESERVED
            </p>
            <div className="text-[10px] sm:text-xs text-white/30 font-mono flex items-center gap-2 sm:gap-4">
              <a 
                href="https://portfolio.rookiesmart-jp.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-1.5"
              >
                <IoOpenOutline 
                  className="text-sm" 
                  style={{ filter: 'drop-shadow(0 0 4px rgba(0,240,255,0.8))' }}
                />
                株式会社ルーキースマートジャパン
              </a>
              <span className="text-pink-500">//</span>
              <span className="text-yellow-400">代表取締役：沢坂弘樹</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

// useSearchParamsをSuspenseでラップ
export default function Home() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-center">
          <IoBaseball className="text-5xl text-red-500 animate-pulse mx-auto mb-4" />
          <p className="text-white/50 font-mono">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
