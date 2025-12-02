"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { PrefectureTabs } from "@/components/PrefectureTabs";
import { LeagueFilter } from "@/components/LeagueFilter";
import { TeamCard } from "@/components/TeamCard";
import { SubServiceTabs } from "@/components/SubServiceTabs";
import { ColumnSection } from "@/components/ColumnSection";
import { ContactForm } from "@/components/ContactForm";
import { SupervisorSection } from "@/components/SupervisorSection";
import type { Team } from "@/lib/microcms/types";
import { IoChevronDown, IoSearch, IoBaseball, IoTerminal, IoFlash, IoRocket, IoSparkles } from "react-icons/io5";

// Import 3D scene dynamically
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

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

export default function Home() {
  const [prefecture, setPrefecture] = useState("大阪府");
  const [league, setLeague] = useState("boys");
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const typedText = useTypewriter("NEXT STAGE", 100);

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

  const filteredTeams = teams.filter(
    (team) => {
      const teamPrefecture = team.prefecture?.[0] || '';
      const teamLeagueId = getLeagueIdFromName(team.league?.[0] || '');
      return teamPrefecture === prefecture && (league === "all" || teamLeagueId === league);
    }
  );

  return (
    <div className="w-full max-w-full bg-cyber-bg overflow-x-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Navigation */}
      <Navbar />
      
      <main className="relative z-10 pt-44 sm:pt-48 lg:pt-24 w-full overflow-x-hidden">
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

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-28 left-8 hidden lg:block"
          >
            <div className="font-mono text-xs space-y-2 p-4 border border-cyan-400/30 bg-black/80 backdrop-blur-md rounded">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-cyan-400">SYSTEM_ONLINE</span>
              </div>
              <div className="text-pink-500">VER_2026</div>
              <div className="text-yellow-400">SECTOR_JAPAN</div>
              <div className="text-white/50">UPLINK: <span className="text-green-400">ACTIVE</span></div>
            </div>
          </motion.div>

          {/* Right side data stream */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-28 right-12 hidden lg:block"
          >
            <div className="font-mono text-xs space-y-2 p-4 border border-pink-500/30 bg-black/80 backdrop-blur-md rounded">
              <div className="text-pink-500 animate-pulse">◈ SCANNING...</div>
              <div className="text-cyan-400">TEAMS: <span className="text-white">1400+</span></div>
              <div className="text-yellow-400">LEAGUES: <span className="text-white">03</span></div>
              <div className="text-red-500">AREAS: <span className="text-white">47</span></div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="w-full max-w-7xl mx-auto px-4 text-center relative z-20">
            {/* Terminal-style badge - モバイルでサブチャンネルと被らないよう上マージン追加 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border-2 border-cyan-400/50 bg-black/90 backdrop-blur-md mb-6 sm:mb-10 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
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
              className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-10 tracking-tight"
              aria-hidden="true"
            >
              <span className="block text-white/90 mb-1 sm:mb-2 text-3xl sm:text-5xl md:text-6xl font-medium tracking-wide">
                FIND YOUR
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
                  <span className="text-white animate-pulse">|</span>
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
              <span className="text-cyan-400">&gt;</span> 全国の中学硬式野球チームの<br className="hidden sm:block" />
              <span className="text-pink-500">検索</span>・<span className="text-yellow-400">比較</span>プラットフォーム<span className="animate-pulse text-red-500">_</span>
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
              <div className="inline-block mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 border-2 border-red-500/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(255,42,68,0.4)]">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-mono text-red-500 tracking-widest">◈ TEAM_SEARCH ◈</span>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
                チームを<span className="text-red-500" style={{ textShadow: '0 0 30px rgba(255,42,68,0.8)' }}>探す</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto font-mono text-sm sm:text-base px-2">
                <span className="text-cyan-400">&gt;</span> エリアとリーグを選択して最適なチームを見つけよう<span className="animate-pulse text-pink-500">_</span>
              </p>
            </motion.div>

            {/* Filters */}
            <PrefectureTabs currentPrefecture={prefecture} onSelect={setPrefecture} />
            <LeagueFilter currentLeague={league} onSelect={setLeague} />

            {/* Results Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-10 px-2 py-3 sm:py-4 border-y-2 border-red-500/20">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm sm:text-base text-white/70 font-mono">
                    FOUND: <span className="text-red-500 text-lg sm:text-xl font-bold">{filteredTeams.length}</span> TEAMS
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-cyan-400 font-mono px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-400/30 bg-cyan-400/5">
                {prefecture}/{league === 'boys' ? 'ボーイズ' : league === 'senior' ? 'シニア' : league === 'young' ? 'ヤング' : '全て'}
              </span>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
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
                className="text-center py-24 border-2 border-red-500/30 bg-black/50"
              >
                <IoSearch className="text-5xl text-red-500/40 mx-auto mb-6 animate-pulse" />
                <p className="text-white/50 font-mono text-lg">
                  <span className="text-red-500">&gt;</span> ERROR: NO_DATA_FOUND<span className="animate-pulse">_</span>
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
              <div className="inline-block mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 border-2 border-cyan-400/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <span className="text-xs sm:text-sm font-mono text-cyan-400 tracking-widest">◈ SUB_CHANNEL ◈</span>
                </div>
              </div>
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
                <div>
                  <span className="font-mono text-lg sm:text-2xl font-black text-white block">ROOKIE<span className="text-red-500">_</span>SMART</span>
                  <span className="text-[8px] sm:text-[10px] text-cyan-400 font-mono tracking-[0.2em] sm:tracking-[0.3em]">BASEBALL_MEDIA</span>
                </div>
              </div>
              <p className="text-white/50 text-xs sm:text-sm font-mono leading-relaxed">
                <span className="text-red-500">&gt;</span> 中学硬式野球チームの<br />
                <span className="text-cyan-400">&gt;</span> 検索・比較プラットフォーム<span className="animate-pulse">_</span>
              </p>
            </div>
            
            {/* Free Interview CTA */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-yellow-400 mb-4 sm:mb-6 font-mono text-center sm:text-left">// FREE_INTERVIEW</h4>
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
            
              <div className="mt-3 sm:mt-4 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[8px] sm:text-[10px] text-green-400/70 font-mono">ACCEPTING_REQUESTS</span>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t-2 border-red-500/20 pt-6 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-white/30 text-[10px] sm:text-xs font-mono text-center md:text-left">
              © 2026 <span className="text-red-500">ROOKIE_SMART</span> // ALL_RIGHTS_RESERVED
            </p>
            <div className="text-[10px] sm:text-xs text-white/30 font-mono flex items-center gap-2 sm:gap-4">
              <span className="text-cyan-400">BUILD_v2026</span>
              <span className="text-pink-500">//</span>
              <span className="text-yellow-400">SECTOR_JAPAN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
