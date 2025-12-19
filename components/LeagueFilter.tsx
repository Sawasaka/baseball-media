"use client";

import { motion } from "framer-motion";

interface Props {
  currentLeague: string;
  onSelect: (league: string) => void;
}

const leagues = [
  { id: "all", label: "すべて", labelEn: "ALL", icon: "◇" },
  { id: "boys", label: "ボーイズ", labelEn: "BOYS", icon: "◆" },
  { id: "senior", label: "シニア", labelEn: "SENIOR", icon: "◈" },
  { id: "young", label: "ヤング", labelEn: "YOUNG", icon: "◊" },
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
