"use client";

import Link from 'next/link';
import { IoBaseball, IoFlash, IoSparkles, IoLanguage, IoCode, IoTrophy, IoBriefcase, IoMail } from "react-icons/io5";
import { motion } from 'framer-motion';

// サブチャンネルのデータ
const subChannels = [
  {
    id: "english",
    label: "英語学習",
    shortLabel: "英語",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    color: "#00F0FF",
    shadowColor: "0,240,255",
  },
  {
    id: "academy",
    label: "ITアカデミー",
    shortLabel: "ITアカデミー",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoCode,
    color: "#FF00AA",
    shadowColor: "255,0,170",
  },
  {
    id: "yakyu-juku",
    label: "野球塾",
    shortLabel: "野球塾",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    color: "#FF6B35",
    shadowColor: "255,107,53",
  },
  {
    id: "scout",
    label: "スカウト",
    shortLabel: "スカウト",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
    icon: IoTrophy,
    color: "#FACC15",
    shadowColor: "250,204,21",
  },
  {
    id: "career",
    label: "キャリア",
    shortLabel: "キャリア",
    url: "https://agent.rookiesmart-jp.com/",
    icon: IoBriefcase,
    color: "#22C55E",
    shadowColor: "34,197,94",
  },
];

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* Top neon line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
      
      {/* Main navbar */}
      <div className="bg-black/95 backdrop-blur-xl border-b border-red-500/30">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <div className="relative">
              <IoBaseball className="text-2xl md:text-3xl text-red-500 group-hover:scale-110 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 15px rgba(255,42,68,0.8))' }} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] sm:text-sm md:text-base font-bold tracking-wide">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white" style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
                  中学硬式野球
                </span>
                <span className="text-cyan-400 mx-0.5">／</span>
                <span className="text-red-400 font-black" style={{ textShadow: '0 0 15px rgba(255,42,68,0.5)' }}>
                  チーム検索・比較
                </span>
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - サブチャンネル */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {subChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 font-mono group overflow-hidden flex items-center justify-center gap-1 xl:gap-2 transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.2), rgba(${channel.shadowColor},0.05))`,
                    border: `2px solid ${channel.color}60`,
                    boxShadow: `0 0 15px rgba(${channel.shadowColor},0.3)`,
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 25px rgba(${channel.shadowColor},0.6)`,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon 
                    className="text-sm xl:text-base"
                    style={{ 
                      color: channel.color,
                      filter: `drop-shadow(0 0 8px ${channel.color})`,
                    }} 
                  />
                  <span 
                    className="text-xs xl:text-sm font-bold"
                    style={{ 
                      color: channel.color,
                      textShadow: `0 0 10px rgba(${channel.shadowColor},0.5)`,
                    }}
                  >
                    <span className="hidden xl:inline">{channel.label}</span>
                    <span className="xl:hidden">{channel.shortLabel}</span>
                  </span>
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    style={{ 
                      background: `radial-gradient(circle at center, rgba(${channel.shadowColor},0.3), transparent)`,
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2"
                    style={{ borderColor: channel.color }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2"
                    style={{ borderColor: channel.color }}
                  />
                </motion.a>
              );
            })}
            
            {/* CTA - 無料カウンセリング */}
            <a 
              href="https://app.spirinc.com/t/mwF8lqDhdKiI4FsASBYdU/as/xl7WljzbTyGE_VyluzJKk/confirm"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 xl:ml-3 px-3 xl:px-5 py-1.5 xl:py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-xs xl:text-sm font-bold font-mono transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center gap-1 xl:gap-2 relative overflow-hidden group"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              日程調整
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>

          {/* Tablet/Mobile - 無料カウンセリングボタン */}
          <div className="lg:hidden flex items-center">
            <a 
              href="https://app.spirinc.com/t/mwF8lqDhdKiI4FsASBYdU/as/xl7WljzbTyGE_VyluzJKk/confirm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 sm:px-3 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] sm:text-xs md:text-sm font-bold font-mono flex items-center"
              style={{ boxShadow: '0 0 15px rgba(34,197,94,0.4)' }}
            >
              <span className="sm:hidden">相談</span>
              <span className="hidden sm:inline">日程調整</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
