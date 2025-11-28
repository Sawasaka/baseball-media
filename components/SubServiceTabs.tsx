"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoGlobeOutline, IoCloseOutline, IoChevronForward, IoLanguage, IoCode, IoBaseball, IoTrophy, IoBriefcase, IoFlash, IoSparkles, IoRocket, IoStar, IoArrowForward } from "react-icons/io5";

const subServices = [
  {
    id: "english",
    label: "英語学習",
    labelEn: "ENGLISH",
    description: "野球×英語で世界へ",
    catchphrase: "MLB挑戦も夢じゃない",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    color: "cyan",
    gradient: "from-cyan-400 via-blue-500 to-cyan-500",
    bgGradient: "from-cyan-500/30 via-blue-600/20 to-cyan-400/30",
    borderColor: "#00F0FF",
    shadowColor: "0,240,255",
  },
  {
    id: "academy",
    label: "ITアカデミー",
    labelEn: "IT ACADEMY",
    description: "野球引退後も安心",
    catchphrase: "プログラミングで第二の人生",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoCode,
    color: "pink",
    gradient: "from-pink-500 via-purple-500 to-fuchsia-500",
    bgGradient: "from-pink-500/30 via-purple-600/20 to-fuchsia-500/30",
    borderColor: "#FF00AA",
    shadowColor: "255,0,170",
  },
  {
    id: "yakyu-juku",
    label: "野球塾",
    labelEn: "BASEBALL SCHOOL",
    description: "元プロが直接指導",
    catchphrase: "技術を極める特別レッスン",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    color: "red",
    gradient: "from-red-500 via-orange-500 to-red-600",
    bgGradient: "from-red-500/30 via-orange-600/20 to-red-600/30",
    borderColor: "#FF2A44",
    shadowColor: "255,42,68",
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
      {/* Service Grid - 超目立つカードデザイン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
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

              {/* Content */}
              <div className="relative z-10 p-5">
                {/* Icon - 大きく派手に */}
                <motion.div 
                  className="mb-4 relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${service.borderColor}30, transparent)`,
                      border: `2px solid ${service.borderColor}`,
                      boxShadow: `0 0 30px ${service.borderColor}60, inset 0 0 20px ${service.borderColor}20`,
                    }}
                  >
                    <Icon 
                      size={32} 
                      style={{ 
                        color: service.borderColor,
                        filter: `drop-shadow(0 0 15px ${service.borderColor})`,
                      }} 
                    />
                  </div>
                  {/* Pulsing ring */}
                  <motion.div 
                    className="absolute inset-0 w-16 h-16"
                    style={{ border: `2px solid ${service.borderColor}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Labels */}
                <div className="mb-3">
                  <span 
                    className="block text-[10px] font-mono mb-1 tracking-[0.2em]"
                    style={{ 
                      color: service.borderColor,
                      textShadow: `0 0 10px ${service.borderColor}`,
                    }}
                  >
                    {service.labelEn}
                  </span>
                  <span 
                    className="block text-xl font-black text-white"
                    style={{ textShadow: `0 0 20px rgba(${service.shadowColor},0.5)` }}
                  >
                    {service.label}
                  </span>
                </div>

                {/* Description */}
                <p 
                  className="text-sm font-bold mb-1"
                  style={{ color: service.borderColor }}
                >
                  {service.description}
                </p>
                <p className="text-[11px] text-white/50 font-mono leading-relaxed mb-4">
                  {service.catchphrase}
                </p>
                
                {/* CTA Button */}
                <div 
                  className="flex items-center justify-between pt-3 border-t"
                  style={{ borderColor: `${service.borderColor}40` }}
                >
                  <span 
                    className="text-xs font-mono font-bold"
                    style={{ color: service.borderColor }}
                  >
                    {isActive ? '▶ VIEWING' : '▶ CHECK IT'}
                  </span>
                  <motion.div
                    className="flex items-center gap-1"
                    style={{ color: service.borderColor }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IoArrowForward size={16} />
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

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        {activeTab && activeService && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
            style={{ 
              boxShadow: `0 0 60px rgba(${activeService.shadowColor},0.4)`,
              border: `3px solid ${activeService.borderColor}`,
              background: `linear-gradient(135deg, rgba(${activeService.shadowColor},0.1), rgba(0,0,0,0.95))`,
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-5 border-b-2"
              style={{
                background: `linear-gradient(90deg, rgba(${activeService.shadowColor},0.3), transparent)`,
                borderColor: `${activeService.borderColor}60`,
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="p-3"
                  style={{ 
                    background: `${activeService.borderColor}30`,
                    border: `2px solid ${activeService.borderColor}`,
                    boxShadow: `0 0 20px ${activeService.borderColor}40`,
                  }}
                >
                  <activeService.icon 
                    size={28} 
                    style={{ 
                      color: activeService.borderColor,
                      filter: `drop-shadow(0 0 10px ${activeService.borderColor})`,
                    }} 
                  />
                </div>
                <div>
                  <span 
                    className="font-mono text-xl font-black block"
                    style={{ 
                      color: activeService.borderColor,
                      textShadow: `0 0 20px ${activeService.borderColor}`,
                    }}
                  >
                    {activeService.label}
                  </span>
                  <span className="text-sm text-white/60 font-mono">{activeService.description}</span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <IoFlash className="text-xl ml-2" style={{ color: activeService.borderColor }} />
                </motion.div>
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href={activeService.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 text-sm font-black transition-all duration-300 hover:scale-105"
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
                  className="p-2.5 text-white/50 hover:text-white transition-all duration-300"
                  style={{
                    border: `2px solid ${activeService.borderColor}40`,
                    background: `${activeService.borderColor}10`,
                  }}
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="relative" style={{ height: "550px" }}>
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-black/70">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <IoGlobeOutline 
                      className="text-7xl mb-6" 
                      style={{ 
                        color: activeService.borderColor,
                        filter: `drop-shadow(0 0 20px ${activeService.borderColor})`,
                      }} 
                    />
                  </motion.div>
                  <p className="text-white/60 mb-6 text-center font-mono text-lg">
                    {iframeError}
                  </p>
                  <a
                    href={activeService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-10 py-5 font-black text-lg transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${activeService.borderColor}, ${activeService.borderColor}aa)`,
                      color: activeService.color === 'yellow' ? '#000' : '#fff',
                      boxShadow: `0 0 40px ${activeService.borderColor}60`,
                    }}
                  >
                    <IoRocket className="mr-3 text-xl" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
