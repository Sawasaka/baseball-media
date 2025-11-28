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
    shortLabel: "IT",
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
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top neon line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
      
      {/* Main navbar */}
      <div className="bg-black/95 backdrop-blur-xl border-b border-red-500/30">
        <div className="container mx-auto px-3 md:px-4 flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
            <div className="relative">
              <IoBaseball className="text-2xl md:text-4xl text-red-500 group-hover:scale-125 transition-all duration-300 group-hover:rotate-180" style={{ filter: 'drop-shadow(0 0 20px rgba(255,42,68,0.8))' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm md:text-xl font-black text-white tracking-wider">
                ROOKIE<span className="text-red-500 animate-pulse">_</span>SMART
              </span>
              <span className="text-[8px] md:text-[10px] text-cyan-400 tracking-[0.2em] md:tracking-[0.3em] font-mono">
                BASEBALL_MEDIA
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - サブチャンネル */}
          <div className="hidden lg:flex items-center gap-2">
            {subChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-2 font-mono group overflow-hidden flex items-center gap-2 transition-all duration-300"
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
                    size={18} 
                    style={{ 
                      color: channel.color,
                      filter: `drop-shadow(0 0 8px ${channel.color})`,
                    }} 
                  />
                  <span 
                    className="text-sm font-bold"
                    style={{ 
                      color: channel.color,
                      textShadow: `0 0 10px rgba(${channel.shadowColor},0.5)`,
                    }}
                  >
                    {channel.label}
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
            
            {/* CTA - CONTACT */}
            <a 
              href="#contact" 
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold font-mono transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,42,68,0.6)] flex items-center gap-2 relative overflow-hidden group"
            >
              <IoFlash className="text-sm group-hover:animate-bounce" />
              CONTACT
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>

          {/* Tablet/Mobile - CONTACTボタンのみ */}
          <div className="lg:hidden flex items-center">
            <a 
              href="#contact" 
              className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs md:text-sm font-bold font-mono flex items-center gap-1"
              style={{ boxShadow: '0 0 15px rgba(255,42,68,0.4)' }}
            >
              <IoMail className="text-sm" />
              <span className="hidden sm:inline">CONTACT</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet サブチャンネルタブ - 常時表示 */}
      <div className="lg:hidden bg-black/90 backdrop-blur-md border-b border-cyan-400/20">
        <div className="relative">
          {/* グラデーションフェード（左右） */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* スクロール可能なタブ */}
          <div className="flex overflow-x-auto scrollbar-hide py-2 px-2 gap-2">
            {/* SUB CHラベル */}
            <div className="shrink-0 flex items-center px-2">
              <span className="text-[10px] text-cyan-400/70 font-mono whitespace-nowrap flex items-center gap-1">
                <IoSparkles className="text-[8px]" />
                SUB
              </span>
            </div>
            
            {subChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 font-mono transition-all duration-300 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, rgba(${channel.shadowColor},0.25), rgba(${channel.shadowColor},0.1))`,
                    border: `1.5px solid ${channel.color}`,
                    boxShadow: `0 0 12px rgba(${channel.shadowColor},0.4)`,
                    borderRadius: '2px',
                  }}
                >
                  <Icon 
                    size={14} 
                    style={{ 
                      color: channel.color,
                      filter: `drop-shadow(0 0 6px ${channel.color})`,
                    }} 
                  />
                  <span 
                    className="text-[11px] font-bold whitespace-nowrap"
                    style={{ 
                      color: channel.color,
                      textShadow: `0 0 8px rgba(${channel.shadowColor},0.6)`,
                    }}
                  >
                    {channel.shortLabel}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
