"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoGlobeOutline, IoCloseOutline, IoChevronForward, IoLanguage, IoCode, IoBaseball, IoTrophy, IoBriefcase, IoFlash, IoSparkles } from "react-icons/io5";

const subServices = [
  {
    id: "english",
    label: "英語学習",
    labelEn: "ENGLISH",
    url: "https://english.rookiesmart-jp.com/",
    icon: IoLanguage,
    gradient: "from-blue-500 via-cyan-400 to-cyan-500",
    shadow: "0 0 30px rgba(0,240,255,0.5)"
  },
  {
    id: "academy",
    label: "ITアカデミー",
    labelEn: "IT ACADEMY",
    url: "https://academy.rookiesmart-jp.com/",
    icon: IoCode,
    gradient: "from-purple-500 via-pink-500 to-purple-400",
    shadow: "0 0 30px rgba(255,0,170,0.5)"
  },
  {
    id: "yakyu-juku",
    label: "野球塾",
    labelEn: "BASEBALL",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
    icon: IoBaseball,
    gradient: "from-red-500 via-orange-500 to-red-400",
    shadow: "0 0 30px rgba(255,42,68,0.5)"
  },
  {
    id: "scout",
    label: "スカウト",
    labelEn: "SCOUT",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
    icon: IoTrophy,
    gradient: "from-yellow-400 via-amber-500 to-yellow-500",
    shadow: "0 0 30px rgba(255,255,0,0.5)"
  },
  {
    id: "career",
    label: "キャリア",
    labelEn: "CAREER",
    url: "https://agent.rookiesmart-jp.com/",
    icon: IoBriefcase,
    gradient: "from-green-400 via-emerald-500 to-green-500",
    shadow: "0 0 30px rgba(34,197,94,0.5)"
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
      {/* Service Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
        {subServices.map((service, index) => {
          const Icon = service.icon;
          const isActive = activeTab === service.id;
          
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.05, y: -8 }}
              onClick={() => handleTabClick(service.id)}
              className={`
                relative p-6 border-2 transition-all duration-400 group overflow-hidden
                ${isActive 
                  ? `bg-gradient-to-br ${service.gradient} border-transparent` 
                  : "bg-black/80 border-white/15 hover:border-white/30"
                }
              `}
              style={{
                boxShadow: isActive ? service.shadow : 'none'
              }}
            >
              {/* Background glow on hover */}
              {!isActive && (
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              )}
              
              {/* Corner accents */}
              <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isActive ? 'border-white/50' : 'border-white/20'} transition-colors`} />
              <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isActive ? 'border-white/50' : 'border-white/20'} transition-colors`} />
              <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isActive ? 'border-white/50' : 'border-white/20'} transition-colors`} />
              <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isActive ? 'border-white/50' : 'border-white/20'} transition-colors`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center transition-all duration-300 relative ${isActive ? "text-white" : "text-white/60 group-hover:text-white group-hover:scale-110"}`}>
                <Icon size={32} style={isActive ? { filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' } : {}} />
                {isActive && (
                  <div className="absolute inset-0 animate-ping opacity-30">
                    <Icon size={32} />
                  </div>
                )}
              </div>
              
              {/* Labels */}
              <div className="text-center relative z-10">
                <span className={`block text-xs font-mono mb-2 tracking-wider ${isActive ? "text-white/90" : "text-white/50"}`}>
                  {service.labelEn}
                </span>
                <span className={`block text-base font-bold ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                  {service.label}
                </span>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3"
                >
                  <IoSparkles className="text-white animate-pulse" />
                </motion.div>
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
            className="border-2 border-white/20 bg-black/80 overflow-hidden"
            style={{ boxShadow: activeService.shadow }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-5 border-b-2 border-white/15 bg-gradient-to-r ${activeService.gradient}`}>
              <div className="flex items-center gap-4">
                <activeService.icon className="text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} size={24} />
                <span className="font-mono text-base text-white font-bold">
                  {activeService.label}
                </span>
                <IoFlash className="text-white/70 animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href={activeService.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm text-white hover:text-white/80 border-2 border-white/40 hover:border-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <IoGlobeOutline className="mr-2" />
                  新しいタブで開く
                </a>
                <button
                  onClick={() => setActiveTab(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="relative" style={{ height: "550px" }}>
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-black/50">
                  <IoGlobeOutline className="text-6xl text-white/30 mb-6 animate-pulse" />
                  <p className="text-white/60 mb-6 text-center font-mono text-lg">
                    {iframeError}
                  </p>
                  <a
                    href={activeService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center px-8 py-4 bg-gradient-to-r ${activeService.gradient} text-white font-bold transition-all duration-300 hover:scale-105`}
                    style={{ boxShadow: activeService.shadow }}
                  >
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
