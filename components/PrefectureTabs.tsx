"use client";

import { motion } from "framer-motion";

interface Props {
  currentPrefecture: string;
  onSelect: (pref: string) => void;
}

const prefectures = [
  { id: "大阪府", label: "大阪", labelEn: "OSAKA", code: "027", icon: "◈" },
  { id: "兵庫県", label: "兵庫", labelEn: "HYOGO", code: "028", icon: "◆" },
];

export const PrefectureTabs = ({ currentPrefecture, onSelect }: Props) => {
  return (
    <div className="flex justify-center mb-6 sm:mb-10 px-2">
      <div className="inline-flex bg-black/80 border-2 border-cyan-400/30 p-1 sm:p-2 relative overflow-hidden">
        {/* Background scan effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />
        
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-l-2 border-cyan-400" style={{ boxShadow: '0 0 10px #00F0FF' }} />
        <div className="absolute -top-1 -right-1 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-r-2 border-pink-500" style={{ boxShadow: '0 0 10px #FF00AA' }} />
        <div className="absolute -bottom-1 -left-1 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-l-2 border-pink-500" style={{ boxShadow: '0 0 10px #FF00AA' }} />
        <div className="absolute -bottom-1 -right-1 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-r-2 border-cyan-400" style={{ boxShadow: '0 0 10px #00F0FF' }} />
        
        {prefectures.map((pref, index) => {
          const isActive = currentPrefecture === pref.id;
          
          return (
            <button
              key={pref.id}
              onClick={() => onSelect(pref.id)}
              className={`relative px-4 sm:px-10 py-2 sm:py-4 transition-all duration-400 ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {/* Active background with glow */}
              {isActive && (
                <motion.div
                  layoutId="activePref"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  style={{
                    boxShadow: '0 0 30px rgba(255,42,68,0.5), inset 0 0 20px rgba(255,42,68,0.2)'
                  }}
                />
              )}
              
              {/* Hover effect for inactive */}
              {!isActive && (
                <div className="absolute inset-0 bg-red-500/0 hover:bg-red-500/10 transition-colors" />
              )}
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center font-mono">
                <span className={`text-[8px] sm:text-[10px] mb-0.5 sm:mb-1 ${isActive ? 'text-cyan-400' : 'text-white/40'} hidden sm:block`}>
                  [{pref.code}]
                </span>
                <span className={`text-sm sm:text-xl font-bold tracking-wider flex items-center gap-1 sm:gap-2`}>
                  <span className="text-[10px] sm:text-xs hidden sm:inline">{pref.icon}</span>
                  {pref.labelEn}
                </span>
                <span className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${isActive ? 'text-cyan-400' : 'text-white/50'}`}>
                  {pref.label}
                </span>
              </div>
              
              {/* Separator line */}
              {index < prefectures.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
