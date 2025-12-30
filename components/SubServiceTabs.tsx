"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoGlobeOutline, IoCloseOutline, IoChevronForward, IoLanguage, IoCode, IoBaseball, IoTrophy, IoBriefcase, IoFlash, IoSparkles, IoRocket, IoStar, IoArrowForward, IoDesktop } from "react-icons/io5";

const subServices = [
  {
    id: "english",
    label: "英語学習",
    labelEn: "ENGLISH",
    description: "野球×英語で世界へ",
    catchphrase: "英語力で可能性を広げる",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    color: "cyan",
    gradient: "from-cyan-400 via-blue-500 to-cyan-500",
    bgGradient: "from-cyan-500/30 via-blue-600/20 to-cyan-400/30",
    borderColor: "#00F0FF",
    shadowColor: "0,240,255",
    showHot: true,
  },
  {
    id: "academy",
    label: "ITアカデミー",
    labelEn: "IT ACADEMY",
    description: "野球引退後も安心",
    catchphrase: "プログラミングで第二の人生",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoDesktop,
    color: "pink",
    gradient: "from-pink-500 via-purple-500 to-fuchsia-500",
    bgGradient: "from-pink-500/30 via-purple-600/20 to-fuchsia-500/30",
    borderColor: "#FF00AA",
    shadowColor: "255,0,170",
    showHot: true,
  },
  {
    id: "yakyu-juku",
    label: "オンライン野球塾",
    labelEn: "ONLINE BASEBALL SCHOOL",
    description: "元プロが直接指導",
    catchphrase: "技術を極める特別レッスン",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    color: "red",
    gradient: "from-red-500 via-orange-500 to-red-600",
    bgGradient: "from-red-500/30 via-orange-600/20 to-red-600/30",
    borderColor: "#FF2A44",
    shadowColor: "255,42,68",
    showHot: true,
  },
  {
    id: "scout",
    label: "高校野球スカウト",
    labelEn: "SCOUT SERVICE",
    description: "強豪校への架け橋",
    catchphrase: "あなたの実力を高校に届ける",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
    icon: IoTrophy,
    color: "yellow",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    bgGradient: "from-yellow-400/30 via-amber-500/20 to-orange-500/30",
    borderColor: "#FACC15",
    shadowColor: "250,204,21",
    showHot: false,
  },
  {
    id: "career",
    label: "キャリア支援",
    labelEn: "CAREER SUPPORT",
    description: "野球人のセカンドキャリア",
    catchphrase: "経験を活かした就職サポート",
    url: "https://agent.rookiesmart-jp.com/",
    icon: IoBriefcase,
    color: "green",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    bgGradient: "from-green-400/30 via-emerald-500/20 to-teal-500/30",
    borderColor: "#22C55E",
    shadowColor: "34,197,94",
    showHot: false,
    showFree: true,
  },
];

export const SubServiceTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState<string | null>(null);

  const handleTabClick = (serviceId: string) => {
    setActiveTab(activeTab === serviceId ? null : serviceId);
    setIframeError(null);
  };

  const activeService = subServices.find((s) => s.id === activeTab);

  return (
    <div className="w-full">
      {/* Pricing Banner - 料金プラン */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-12"
      >
        <div className="relative overflow-hidden border-2 border-yellow-400/60 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-orange-500/5 animate-pulse" />
          
          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,204,21,0.1) 2px, rgba(250,204,21,0.1) 4px)',
          }} />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-yellow-400" />
          <div className="absolute top-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 border-yellow-400" />
          <div className="absolute bottom-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 border-yellow-400" />
          <div className="absolute bottom-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-yellow-400" />
          
          <div className="relative z-10 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Left: Price info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <IoSparkles className="text-yellow-400 text-xl sm:text-2xl animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-mono text-yellow-400/80 tracking-wider">全チャンネル利用プラン</span>
                </div>
                <div className="flex items-baseline justify-center lg:justify-start gap-1 sm:gap-2">
                  <span className="text-white/60 text-xs sm:text-sm font-mono">月額</span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400" style={{ textShadow: '0 0 40px rgba(250,204,21,0.5)' }}>
                    ¥19,800
                  </span>
                  <span className="text-white/60 text-[10px] sm:text-sm font-mono">(税込)</span>
                </div>
                <p className="text-white/70 text-xs sm:text-sm mt-2 sm:mt-3 font-mono">
                  <span className="text-cyan-400">▸</span> 全5つのサブチャンネルが<span className="text-yellow-400 font-bold">使い放題</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1">
                  <p className="text-white/60 text-[10px] sm:text-xs font-mono">
                    <span className="text-pink-400">▸</span> 2人シェア → <span className="text-green-400 font-bold">¥9,800/人</span>
                  </p>
                </div>
                <p className="text-white/50 text-[10px] sm:text-xs mt-1 font-mono">
                  🤝 家族・兄弟・友達とシェアOK！
                </p>
              </div>
              
              {/* Center: Features */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3">
                {[
                  { label: '英語', color: '#00F0FF' },
                  { label: 'IT', color: '#FF00AA' },
                  { label: '野球塾', color: '#FF2A44' },
                  { label: 'スカウト', color: '#FACC15' },
                  { label: 'キャリア', color: '#22C55E' },
                ].map((item) => (
                  <span 
                    key={item.label}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono border bg-black/30"
                    style={{ 
                      borderColor: `${item.color}60`,
                      color: item.color,
                      textShadow: `0 0 10px ${item.color}40`,
                    }}
                  >
                    ✓ {item.label}
                  </span>
                ))}
              </div>
              
              {/* Right: Limited badge */}
              <div className="text-center">
                <div className="relative inline-block">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-red-500 bg-gradient-to-br from-red-500/30 to-red-600/20 relative overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(239,68,68,0.4)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse" />
                    <div className="relative z-10">
                      <div className="text-red-400 text-[10px] sm:text-xs font-mono mb-1">⚠ LIMITED</div>
                      <div className="text-white font-black text-xl sm:text-2xl">10名</div>
                      <div className="text-white/70 text-[10px] sm:text-xs font-mono">限定枠</div>
                    </div>
                  </motion.div>
                </div>
                <p className="text-white/50 text-[8px] sm:text-[10px] font-mono mt-1 sm:mt-2">
                  ※ 定員以降は<span className="text-red-400">紹介制</span>となります
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" style={{ boxShadow: '0 0 15px rgba(250,204,21,0.8)' }} />
        </div>
      </motion.div>

      {/* Service Grid - 超目立つカードデザイン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 mb-8 sm:mb-10">
        {subServices.map((service, index) => {
          const Icon = service.icon;
          const isActive = activeTab === service.id;
          
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTabClick(service.id)}
              className="relative group text-left overflow-hidden"
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, rgba(${service.shadowColor},0.3), rgba(0,0,0,0.9))`
                  : `linear-gradient(135deg, rgba(${service.shadowColor},0.15), rgba(0,0,0,0.95))`,
                border: `3px solid ${isActive ? service.borderColor : `rgba(${service.shadowColor},0.4)`}`,
                boxShadow: isActive 
                  ? `0 0 50px rgba(${service.shadowColor},0.5), inset 0 0 30px rgba(${service.shadowColor},0.2)`
                  : `0 0 25px rgba(${service.shadowColor},0.2)`,
              }}
            >
              {/* Animated gradient background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              {/* Scan line effect */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(${service.shadowColor},0.1) 2px, rgba(${service.shadowColor},0.1) 4px)`,
                }}
              />

              {/* Glowing top border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.borderColor}, transparent)`,
                  boxShadow: `0 0 20px ${service.borderColor}`,
                }}
              />

              {/* Corner decorations - より派手に */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div 
                  className="absolute top-0 left-0 w-full h-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
                <div 
                  className="absolute top-0 left-0 h-full w-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8">
                <div 
                  className="absolute top-0 right-0 w-full h-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
                <div 
                  className="absolute top-0 right-0 h-full w-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8">
                <div 
                  className="absolute bottom-0 left-0 w-full h-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
                <div 
                  className="absolute bottom-0 left-0 h-full w-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <div 
                  className="absolute bottom-0 right-0 w-full h-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
                <div 
                  className="absolute bottom-0 right-0 h-full w-[3px]"
                  style={{ background: service.borderColor, boxShadow: `0 0 10px ${service.borderColor}` }}
                />
                  </div>

              {/* HOT badge */}
              {service.showHot && (
                <div className="absolute -top-0 -right-0 z-20">
                  <motion.div 
                    className="px-3 py-1.5 text-[11px] font-mono font-black tracking-wider flex items-center gap-1"
                    style={{
                      background: `linear-gradient(135deg, ${service.borderColor}, ${service.borderColor}aa)`,
                      color: service.color === 'yellow' ? '#000' : '#fff',
                      boxShadow: `0 0 20px ${service.borderColor}`,
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IoStar className="text-xs" />
                    HOT
                  </motion.div>
                </div>
              )}

              {/* 卒業生無料 badge */}
              {service.showFree && (
                <div className="absolute -top-0 -right-0 z-20">
                  <motion.div 
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[11px] font-mono font-black tracking-wider flex items-center gap-1"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(16,185,129,0.6)',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎓 卒業生無料
                  </motion.div>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-3 sm:p-5">
                {/* Icon - 大きく派手に */}
                <motion.div 
                  className="mb-2 sm:mb-4 relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${service.borderColor}30, transparent)`,
                      border: `2px solid ${service.borderColor}`,
                      boxShadow: `0 0 30px ${service.borderColor}60, inset 0 0 20px ${service.borderColor}20`,
                    }}
                  >
                    <Icon 
                      className="text-xl sm:text-3xl"
                      style={{ 
                        color: service.borderColor,
                        filter: `drop-shadow(0 0 15px ${service.borderColor})`,
                      }} 
                    />
                  </div>
                  {/* Pulsing ring */}
                  <motion.div 
                    className="absolute inset-0 w-10 h-10 sm:w-16 sm:h-16"
                    style={{ border: `2px solid ${service.borderColor}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              
              {/* Labels */}
                <div className="mb-2 sm:mb-3">
                  <span 
                    className="block text-sm sm:text-xl font-black text-white"
                    style={{ textShadow: `0 0 20px rgba(${service.shadowColor},0.5)` }}
                  >
                  {service.label}
                </span>
              </div>
              
                {/* Description */}
                <p 
                  className="text-[10px] sm:text-sm font-bold mb-0.5 sm:mb-1"
                  style={{ color: service.borderColor }}
                >
                  {service.description}
                </p>
                <p className="text-[9px] sm:text-[11px] text-white/50 font-mono leading-relaxed mb-2 sm:mb-4 hidden sm:block">
                  {service.catchphrase}
                </p>
                
                {/* CTA Button */}
                <div 
                  className="flex items-center justify-between pt-2 sm:pt-3 border-t"
                  style={{ borderColor: `${service.borderColor}40` }}
                >
                  <span 
                    className="text-[9px] sm:text-xs font-mono font-bold"
                    style={{ color: service.borderColor }}
                  >
                    {isActive ? '▶ 表示中' : '▶ 詳細を見る'}
                  </span>
                  <motion.div
                    className="flex items-center gap-1"
                    style={{ color: service.borderColor }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IoArrowForward className="text-sm sm:text-base" />
                  </motion.div>
                </div>
              </div>

              {/* Hover overlay glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(${service.shadowColor},0.3), transparent 70%)`,
                }}
              />

              {/* Active sparkles */}
              {isActive && (
                <>
                  <motion.div 
                    className="absolute top-6 left-6"
                    animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <IoSparkles size={16} style={{ color: service.borderColor, filter: `drop-shadow(0 0 10px ${service.borderColor})` }} />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-16 right-6"
                    animate={{ scale: [0, 1.5, 0], rotate: [0, -180, -360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <IoSparkles size={16} style={{ color: service.borderColor, filter: `drop-shadow(0 0 10px ${service.borderColor})` }} />
                  </motion.div>
                <motion.div 
                    className="absolute top-1/2 left-3"
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  >
                    <IoFlash size={12} style={{ color: service.borderColor }} />
                </motion.div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Content Modal - コラムと同じモーダル表示 */}
      <AnimatePresence>
        {activeTab && activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-20 sm:pt-4 px-3 sm:px-4 pb-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden bg-black/95"
              style={{ 
                boxShadow: `0 0 60px rgba(${activeService.shadowColor},0.5)`,
                border: `3px solid ${activeService.borderColor}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-5 border-b-2 bg-black/95 gap-3"
                style={{
                  background: `linear-gradient(90deg, rgba(${activeService.shadowColor},0.3), transparent)`,
                  borderColor: `${activeService.borderColor}60`,
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="p-2 sm:p-3"
                    style={{ 
                      background: `${activeService.borderColor}30`,
                      border: `2px solid ${activeService.borderColor}`,
                      boxShadow: `0 0 20px ${activeService.borderColor}40`,
                    }}
                  >
                    <activeService.icon 
                      className="text-xl sm:text-2xl"
                      style={{ 
                        color: activeService.borderColor,
                        filter: `drop-shadow(0 0 10px ${activeService.borderColor})`,
                      }} 
                    />
                  </div>
                  <div>
                    <span 
                      className="font-mono text-base sm:text-xl font-black block"
                      style={{ 
                        color: activeService.borderColor,
                        textShadow: `0 0 20px ${activeService.borderColor}`,
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
                      background: `linear-gradient(135deg, ${activeService.borderColor}, ${activeService.borderColor}aa)`,
                      color: activeService.color === 'yellow' ? '#000' : '#fff',
                      boxShadow: `0 0 30px ${activeService.borderColor}60`,
                    }}
                  >
                    <IoRocket className="mr-2" />
                    サイトを開く
                  </a>
                  <button
                    onClick={() => setActiveTab(null)}
                    className="p-2 sm:p-2.5 text-white/50 hover:text-white transition-all duration-300"
                    style={{
                      border: `2px solid ${activeService.borderColor}40`,
                      background: `${activeService.borderColor}10`,
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
                          color: activeService.borderColor,
                          filter: `drop-shadow(0 0 20px ${activeService.borderColor})`,
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
                        background: `linear-gradient(135deg, ${activeService.borderColor}, ${activeService.borderColor}aa)`,
                        color: activeService.color === 'yellow' ? '#000' : '#fff',
                        boxShadow: `0 0 40px ${activeService.borderColor}60`,
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
                style={{ background: `linear-gradient(90deg, transparent, ${activeService.borderColor}, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free Counseling Button - コンテンツパネルの下に配置 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 sm:mt-10"
      >
        <a
          href="https://app.spirinc.com/t/mwF8lqDhdKiI4FsASBYdU/as/xl7WljzbTyGE_VyluzJKk/confirm"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-md mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden border-2 border-green-400 bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-green-400/20 p-5 text-center group cursor-pointer"
            style={{ boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-green-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-green-400" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                  style={{ boxShadow: '0 0 15px rgba(34,197,94,0.8)' }}
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                  style={{ boxShadow: '0 0 15px rgba(34,197,94,0.8)' }}
                />
              </div>
              <p className="text-white text-lg font-bold mb-1">
                🎯 無料カウンセリング予約
              </p>
              <p className="text-white/60 text-xs font-mono">
                サブチャンネルについてお気軽にご相談ください
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-green-400 text-sm font-mono font-bold">
                <span>日程を予約する</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </div>
            
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};
