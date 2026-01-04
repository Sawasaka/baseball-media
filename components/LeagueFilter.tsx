"use client";

import { motion } from "framer-motion";

interface Props {
  currentLeague: string;
  onSelect: (league: string) => void;
}

const leagues = [
  { id: "all", label: "すべて", labelEn: "ALL", icon: "◇", tag: null },
  { id: "boys", label: "ボーイズ", labelEn: "BOYS", icon: "◆", tag: "全国" },
  { id: "senior", label: "シニア", labelEn: "SENIOR", icon: "◈", tag: "全国" },
  { id: "young", label: "ヤング", labelEn: "YOUNG", icon: "◊", tag: "全国" },
  { id: "pony", label: "ポニー", labelEn: "PONY", icon: "◇", tag: "関東" },
  { id: "fresh", label: "フレッシュ", labelEn: "FRESH", icon: "◈", tag: "九州" },
  { id: "independent", label: "無所属", labelEn: "FREE", icon: "○", tag: null },
];

const getLeagueStyle = (id: string, isActive: boolean) => {
  const styles = {
    all: {
      gradient: 'from-purple-600 to-blue-600',
      border: isActive ? 'border-transparent' : 'border-purple-500/30 hover:border-purple-500/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-purple-500/60',
      shadow: '0 0 30px rgba(170,0,255,0.5)'
    },
    boys: {
      gradient: 'from-red-600 to-pink-600',
      border: isActive ? 'border-transparent' : 'border-red-500/30 hover:border-red-500/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-red-500/60',
      shadow: '0 0 30px rgba(255,42,68,0.5)'
    },
    senior: {
      gradient: 'from-cyan-500 to-blue-500',
      border: isActive ? 'border-transparent' : 'border-cyan-400/30 hover:border-cyan-400/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-cyan-400/60',
      shadow: '0 0 30px rgba(0,240,255,0.5)'
    },
    young: {
      gradient: 'from-yellow-500 to-amber-500',
      border: isActive ? 'border-transparent' : 'border-yellow-400/30 hover:border-yellow-400/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-yellow-400/60',
      shadow: '0 0 30px rgba(255,255,0,0.5)'
    },
    pony: {
      gradient: 'from-green-500 to-emerald-500',
      border: isActive ? 'border-transparent' : 'border-green-400/30 hover:border-green-400/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-green-400/60',
      shadow: '0 0 30px rgba(34,197,94,0.5)'
    },
    fresh: {
      gradient: 'from-orange-500 to-rose-500',
      border: isActive ? 'border-transparent' : 'border-orange-400/30 hover:border-orange-400/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-orange-400/60',
      shadow: '0 0 30px rgba(249,115,22,0.5)'
    },
    independent: {
      gradient: 'from-gray-500 to-slate-500',
      border: isActive ? 'border-transparent' : 'border-gray-400/30 hover:border-gray-400/60',
      text: isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
      iconColor: isActive ? 'text-white' : 'text-gray-400/60',
      shadow: '0 0 30px rgba(148,163,184,0.5)'
    }
  };
  return styles[id as keyof typeof styles] || styles.all;
};

export const LeagueFilter = ({ currentLeague, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
      {leagues.map((league, index) => {
        const isActive = currentLeague === league.id;
        const style = getLeagueStyle(league.id, isActive);
        
        return (
          <motion.button
            key={league.id}
            onClick={() => onSelect(league.id)}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative px-3 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm transition-all duration-300 border-2 overflow-hidden
              ${isActive ? `bg-gradient-to-r ${style.gradient}` : 'bg-transparent'}
              ${style.border}
              ${style.text}
            `}
            style={{
              boxShadow: isActive ? style.shadow : 'none'
            }}
          >
            {/* Region tag */}
            {league.tag && (
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold bg-black/80 border border-white/30 text-white/80 z-20">
                {league.tag}
              </span>
            )}
            
            {/* Corner dots for active */}
            {isActive && (
              <>
                <div className="absolute -top-1 -left-1 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-white" style={{ boxShadow: '0 0 10px #fff' }} />
                <div className="absolute -top-1 -right-1 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-white" style={{ boxShadow: '0 0 10px #fff' }} />
                <div className="absolute -bottom-1 -left-1 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-white" style={{ boxShadow: '0 0 10px #fff' }} />
                <div className="absolute -bottom-1 -right-1 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-white" style={{ boxShadow: '0 0 10px #fff' }} />
                
                {/* Animated shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse" />
              </>
            )}
            
            <span className="flex items-center gap-1.5 sm:gap-3 relative z-10">
              <span className={`text-xs sm:text-sm ${style.iconColor} ${isActive ? 'animate-pulse' : ''} hidden sm:inline`}>
                {league.icon}
              </span>
              <span className="block font-bold text-xs sm:text-sm">{league.label}</span>
              <span className={`text-xs sm:text-sm ${style.iconColor} ${isActive ? 'animate-pulse' : ''} hidden sm:inline`}>
                {league.icon}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
