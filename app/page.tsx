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
import { dummyTeams } from "@/lib/dummy-data";
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
  const [prefecture, setPrefecture] = useState("osaka");
  const [league, setLeague] = useState("boys");
  const typedText = useTypewriter("NEXT STAGE", 100);

  const filteredTeams = dummyTeams.filter(
    (team) =>
      team.prefecture === prefecture &&
      (league === "all" || team.league === league)
  );

  return (
    <div className="min-h-screen bg-cyber-bg">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Navigation */}
      <Navbar />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-[100vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
          {/* Animated background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Cyber decorations */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner HUD elements */}
            <div className="absolute top-24 left-8 w-40 h-40 border-l-4 border-t-4 border-red-500 shadow-[0_0_15px_rgba(255,42,68,0.6)] animate-pulse" />
            <div className="absolute top-24 right-8 w-40 h-40 border-r-4 border-t-4 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)] animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-24 left-8 w-40 h-40 border-l-4 border-b-4 border-pink-500 shadow-[0_0_15px_rgba(255,0,170,0.6)] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-24 right-8 w-40 h-40 border-r-4 border-b-4 border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse" style={{ animationDelay: '1.5s' }} />
            
            {/* Vertical neon lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
            <div className="absolute right-1/4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            
            {/* Horizontal scan lines */}
            <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
            <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
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
            className="absolute top-28 right-8 hidden lg:block"
          >
            <div className="font-mono text-xs space-y-2 p-4 border border-pink-500/30 bg-black/80 backdrop-blur-md rounded">
              <div className="text-pink-500 animate-pulse">◈ SCANNING...</div>
              <div className="text-cyan-400">TEAMS: <span className="text-white">1400+</span></div>
              <div className="text-yellow-400">LEAGUES: <span className="text-white">03</span></div>
              <div className="text-red-500">AREAS: <span className="text-white">47</span></div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="text-center max-w-5xl mx-auto relative z-20">
            {/* Terminal-style badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 border-2 border-cyan-400/50 bg-black/90 backdrop-blur-md mb-10 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            >
              <IoTerminal className="text-cyan-400 text-xl animate-pulse" />
              <span className="font-mono text-sm text-cyan-400 tracking-wider">
                &gt; 中学硬式野球チーム検索システム<span className="animate-pulse">_</span>
              </span>
              <IoSparkles className="text-yellow-400 text-lg animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black mb-10 tracking-tight"
            >
              <span className="block text-white/90 mb-2 text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide">
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
            </motion.h1>

            {/* League badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center gap-5 mb-8 flex-wrap"
            >
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="px-5 py-2 text-xs font-mono tracking-wider border-2 border-red-500/60 text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(255,42,68,0.4)] flex items-center gap-2"
              >
                <span className="text-[10px] animate-pulse">◆</span>
                ボーイズリーグ
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="px-5 py-2 text-xs font-mono tracking-wider border-2 border-cyan-400/60 text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2"
              >
                <span className="text-[10px] animate-pulse">◆</span>
                シニアリーグ
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="px-5 py-2 text-xs font-mono tracking-wider border-2 border-yellow-400/60 text-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(255,255,0,0.4)] flex items-center gap-2"
              >
                <span className="text-[10px] animate-pulse">◆</span>
                ヤングリーグ
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white/70 max-w-xl mx-auto text-lg md:text-xl leading-relaxed mb-12 font-mono"
            >
              <span className="text-cyan-400">&gt;</span> 全国の中学硬式野球チームの<br className="hidden sm:block" />
              <span className="text-pink-500">検索</span>・<span className="text-yellow-400">比較</span>プラットフォーム<span className="animate-pulse text-red-500">_</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-5 mb-12"
            >
              <a 
                href="#search"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_40px_rgba(255,42,68,0.6)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <IoRocket className="text-xl group-hover:animate-bounce" />
                  チームを探す
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a 
                href="#services"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/20 font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
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
            >
              <div className="flex items-center justify-center gap-8 sm:gap-10 px-6 sm:px-10 py-4 border-2 border-red-500/40 bg-black/80 backdrop-blur-md">
                <div className="text-center">
                  <div className="text-xs text-red-500 font-mono mb-1 animate-pulse">▣</div>
                  <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono">1400+</div>
                  <div className="text-[10px] text-white/50 font-mono tracking-widest mt-1">チーム数</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-cyan-400 font-mono mb-1 animate-pulse">◎</div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">47</div>
                  <div className="text-[10px] text-white/50 font-mono tracking-widest mt-1">都道府県</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-yellow-400 font-mono mb-1 animate-pulse">◈</div>
                  <div className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono">03</div>
                  <div className="text-[10px] text-white/50 font-mono tracking-widest mt-1">リーグ数</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
        <section className="py-28 px-4 relative" id="search">
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
              className="text-center mb-20"
            >
              <div className="inline-block mb-6">
                <div className="flex items-center gap-4 px-6 py-3 border-2 border-red-500/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(255,42,68,0.4)]">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-red-500 tracking-widest">◈ TEAM_SEARCH ◈</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                チームを<span className="text-red-500" style={{ textShadow: '0 0 30px rgba(255,42,68,0.8)' }}>探す</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto font-mono text-base">
                <span className="text-cyan-400">&gt;</span> エリアとリーグを選択して最適なチームを見つけよう<span className="animate-pulse text-pink-500">_</span>
              </p>
            </motion.div>

            {/* Filters */}
            <PrefectureTabs currentPrefecture={prefecture} onSelect={setPrefecture} />
            <LeagueFilter currentLeague={league} onSelect={setLeague} />

            {/* Results Info */}
            <div className="flex items-center justify-between mb-10 px-2 py-4 border-y-2 border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-base text-white/70 font-mono">
                    FOUND: <span className="text-red-500 text-xl font-bold">{filteredTeams.length}</span> TEAMS
                  </span>
                </div>
              </div>
              <span className="text-sm text-cyan-400 font-mono px-4 py-2 border border-cyan-400/30 bg-cyan-400/5">
                {prefecture.toUpperCase()}/{league.toUpperCase()}
              </span>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="py-28 px-4 bg-black/30 relative" id="services">
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
              className="text-center mb-20"
            >
              <div className="inline-block mb-6">
                <div className="flex items-center gap-4 px-6 py-3 border-2 border-cyan-400/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <span className="text-sm font-mono text-cyan-400 tracking-widest">◈ SUB_CHANNEL ◈</span>
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                サブ<span className="text-cyan-400" style={{ textShadow: '0 0 30px rgba(0,240,255,0.8)' }}>チャンネル</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto font-mono text-base">
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
      <footer className="relative z-10 border-t-2 border-red-500/30 bg-black py-20">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <IoBaseball className="text-4xl text-red-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 15px #FF2A44)' }} />
                <div>
                  <span className="font-mono text-2xl font-black text-white block">ROOKIE<span className="text-red-500">_</span>SMART</span>
                  <span className="text-[10px] text-cyan-400 font-mono tracking-[0.3em]">BASEBALL_MEDIA</span>
                </div>
              </div>
              <p className="text-white/50 text-sm font-mono leading-relaxed">
                <span className="text-red-500">&gt;</span> 中学硬式野球チームの<br />
                <span className="text-cyan-400">&gt;</span> 検索・比較プラットフォーム<span className="animate-pulse">_</span>
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h4 className="text-base font-bold text-pink-500 mb-6 font-mono">// NAVIGATION</h4>
              <ul className="space-y-3">
                {["チーム検索", "コラム", "運営情報", "お問い合わせ"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/50 text-sm hover:text-cyan-400 transition-all duration-300 font-mono flex items-center gap-3 group">
                      <span className="text-red-500 group-hover:text-cyan-400 transition-colors">&gt;</span>
                      <span className="group-hover:translate-x-2 transition-transform">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-base font-bold text-yellow-400 mb-6 font-mono">// CONTACT</h4>
              <a 
                href="mailto:info@rookiesmart-jp.com" 
                className="text-cyan-400 hover:text-white transition-all duration-300 text-sm font-mono"
              >
                info@rookiesmart-jp.com
              </a>
              <div className="mt-6 flex items-center gap-3 p-3 border border-green-500/30 bg-green-500/5 inline-block">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-mono">SYSTEM_ONLINE</span>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t-2 border-red-500/20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-xs font-mono">
              © 2024 <span className="text-red-500">ROOKIE_SMART</span> // ALL_RIGHTS_RESERVED
            </p>
            <div className="text-xs text-white/30 font-mono flex items-center gap-4">
              <span className="text-cyan-400">BUILD_v2.0.24</span>
              <span className="text-pink-500">//</span>
              <span className="text-yellow-400">KANSAI_SECTOR</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
