"use client";

import { useState } from "react";
import Link from 'next/link';
import { IoBaseball, IoLanguage, IoCode, IoTrophy, IoBriefcase, IoCloseOutline, IoRocket, IoGlobeOutline, IoChevronForward, IoMail } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

// サブチャンネルのデータ
const subChannels = [
  {
    id: "english",
    label: "英語学習",
    shortLabel: "英語",
    description: "野球×英語で世界へ",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    color: "#00F0FF",
    shadowColor: "0,240,255",
  },
  {
    id: "academy",
    label: "ITアカデミー",
    shortLabel: "ITアカデミー",
    description: "野球引退後も安心",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoCode,
    color: "#FF00AA",
    shadowColor: "255,0,170",
  },
  {
    id: "yakyu-juku",
    label: "オンライン野球塾",
    shortLabel: "野球塾",
    description: "元プロが直接指導",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    color: "#FF2A44",
    shadowColor: "255,42,68",
  },
  {
    id: "scout",
    label: "スカウト",
    shortLabel: "スカウト",
    description: "強豪校への架け橋",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
    icon: IoTrophy,
    color: "#FACC15",
    shadowColor: "250,204,21",
  },
  {
    id: "career",
    label: "キャリア",
    shortLabel: "キャリア",
    description: "野球人のセカンドキャリア",
    url: "https://agent.rookiesmart-jp.com/",
    icon: IoBriefcase,
    color: "#22C55E",
    shadowColor: "34,197,94",
  },
];

export const Navbar = () => {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState<string | null>(null);

  const handleChannelClick = (channelId: string) => {
    setActiveChannel(channelId);
    setIframeError(null);
  };

  const activeService = subChannels.find((s) => s.id === activeChannel);

  return (
    <>
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
                  <motion.button
                    key={channel.id}
                    onClick={() => handleChannelClick(channel.id)}
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
                  </motion.button>
                );
              })}
              
              {/* チーム楽 */}
              <motion.a
                href="#team-raku"
                className="relative px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 font-mono group overflow-hidden flex items-center justify-center gap-1 xl:gap-2 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))',
                  border: '2px solid rgba(168,85,247,0.6)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.3)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(168,85,247,0.6)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span 
                  className="text-base xl:text-lg font-bold"
                  style={{ 
                    color: '#A855F7',
                    filter: 'drop-shadow(0 0 8px #A855F7)',
                  }}
                >
                  楽
                </span>
                <span 
                  className="text-xs xl:text-sm font-bold"
                  style={{ 
                    color: '#A855F7',
                    textShadow: '0 0 10px rgba(168,85,247,0.8)',
                  }}
                >
                  チーム楽
                </span>
              </motion.a>

              {/* CTA - お問い合わせ */}
              <a 
                href="#contact"
                className="ml-2 xl:ml-3 px-3 xl:px-5 py-1.5 xl:py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-xs xl:text-sm font-bold font-mono transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center gap-1 xl:gap-2 relative overflow-hidden group"
              >
                <IoMail className="text-sm" />
                お問い合わせ
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>

            {/* Tablet/Mobile - お問い合わせボタン */}
            <div className="lg:hidden flex items-center">
              <a 
                href="#contact"
                className="px-2 py-1.5 sm:px-3 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] sm:text-xs md:text-sm font-bold font-mono flex items-center"
                style={{ boxShadow: '0 0 15px rgba(34,197,94,0.4)' }}
              >
                <span className="sm:hidden">問合せ</span>
                <span className="hidden sm:inline">お問い合わせ</span>
              </a>
            </div>
          </div>
        </div>
        
      </nav>

      {/* Modal for Channel Preview */}
      <AnimatePresence>
        {activeChannel && activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center pt-20 sm:pt-4 px-3 sm:px-4 pb-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveChannel(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden bg-black/95"
              style={{ 
                boxShadow: `0 0 60px rgba(${activeService.shadowColor},0.5)`,
                border: `3px solid ${activeService.color}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-5 border-b-2 bg-black/95 gap-3"
                style={{
                  background: `linear-gradient(90deg, rgba(${activeService.shadowColor},0.3), transparent)`,
                  borderColor: `${activeService.color}60`,
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="p-2 sm:p-3"
                    style={{ 
                      background: `${activeService.color}30`,
                      border: `2px solid ${activeService.color}`,
                      boxShadow: `0 0 20px ${activeService.color}40`,
                    }}
                  >
                    <activeService.icon 
                      className="text-xl sm:text-2xl"
                      style={{ 
                        color: activeService.color,
                        filter: `drop-shadow(0 0 10px ${activeService.color})`,
                      }} 
                    />
                  </div>
                  <div>
                    <span 
                      className="font-mono text-base sm:text-xl font-black block"
                      style={{ 
                        color: activeService.color,
                        textShadow: `0 0 20px ${activeService.color}`,
                      }}
                    >
                      {activeService.label}
                    </span>
                    <span className="text-xs sm:text-sm text-white/60 font-mono">{activeService.description}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <a
                    href={activeService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-black transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${activeService.color}, ${activeService.color}aa)`,
                      color: activeService.id === 'scout' ? '#000' : '#fff',
                      boxShadow: `0 0 30px ${activeService.color}60`,
                    }}
                  >
                    <IoRocket className="mr-2" />
                    サイトを開く
                  </a>
                  <button
                    onClick={() => setActiveChannel(null)}
                    className="p-2 sm:p-2.5 text-white/50 hover:text-white transition-all duration-300"
                    style={{
                      border: `2px solid ${activeService.color}40`,
                      background: `${activeService.color}10`,
                    }}
                  >
                    <IoCloseOutline className="text-xl sm:text-2xl" />
                  </button>
                </div>
              </div>

              {/* Iframe */}
              <div className="relative h-[60vh] sm:h-[70vh]">
                {iframeError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 bg-black/70">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <IoGlobeOutline 
                        className="text-5xl sm:text-7xl mb-4 sm:mb-6" 
                        style={{ 
                          color: activeService.color,
                          filter: `drop-shadow(0 0 20px ${activeService.color})`,
                        }} 
                      />
                    </motion.div>
                    <p className="text-white/60 mb-4 sm:mb-6 text-center font-mono text-sm sm:text-lg">
                      {iframeError}
                    </p>
                    <a
                      href={activeService.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 sm:px-10 py-3 sm:py-5 font-black text-sm sm:text-lg transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${activeService.color}, ${activeService.color}aa)`,
                        color: activeService.id === 'scout' ? '#000' : '#fff',
                        boxShadow: `0 0 40px ${activeService.color}60`,
                      }}
                    >
                      <IoRocket className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                      サイトを開く
                      <IoChevronForward className="ml-2" />
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={activeService.url}
                    className="w-full h-full border-0"
                    onError={() => setIframeError("このサイトは埋め込み表示に対応していません。")}
                    title={activeService.label}
                  />
                )}
              </div>
              
              {/* Bottom accent */}
              <div 
                className="h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${activeService.color}, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
