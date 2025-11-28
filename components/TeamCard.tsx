"use client";

import { motion } from "framer-motion";
import { IoLocationSharp, IoGlobeOutline, IoChevronForward, IoBaseball, IoFlash } from "react-icons/io5";

interface Team {
  id: string;
  name: string;
  prefecture: string;
  league: string;
  description: string;
  url?: string;
}

const getLeagueStyles = (league: string) => {
  switch (league) {
    case 'boys':
      return {
        textColor: 'text-red-500',
        borderColor: 'border-red-500',
        bgColor: 'bg-red-500',
        bgLight: 'bg-red-500/15',
        shadow: '0 0 30px rgba(255,42,68,0.4)',
        glowColor: 'rgba(255,42,68,0.3)',
        icon: '◆'
      };
    case 'senior':
      return {
        textColor: 'text-cyan-400',
        borderColor: 'border-cyan-400',
        bgColor: 'bg-cyan-400',
        bgLight: 'bg-cyan-400/15',
        shadow: '0 0 30px rgba(0,240,255,0.4)',
        glowColor: 'rgba(0,240,255,0.3)',
        icon: '◈'
      };
    case 'young':
      return {
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-400',
        bgColor: 'bg-yellow-400',
        bgLight: 'bg-yellow-400/15',
        shadow: '0 0 30px rgba(255,255,0,0.4)',
        glowColor: 'rgba(255,255,0,0.3)',
        icon: '◊'
      };
    default:
      return {
        textColor: 'text-red-500',
        borderColor: 'border-red-500',
        bgColor: 'bg-red-500',
        bgLight: 'bg-red-500/15',
        shadow: '0 0 30px rgba(255,42,68,0.4)',
        glowColor: 'rgba(255,42,68,0.3)',
        icon: '◆'
      };
  }
};

export const TeamCard = ({ team }: { team: Team }) => {
  const style = getLeagueStyles(team.league);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: style.glowColor }}
      />
      
      {/* Card */}
      <div 
        className="relative bg-black/80 border-2 border-white/10 overflow-hidden transition-all duration-500 group-hover:border-opacity-70"
        style={{ 
          borderColor: team.league === 'boys' ? 'rgba(255,42,68,0.2)' : team.league === 'senior' ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,0,0.2)'
        }}
      >
        {/* Top accent line */}
        <div 
          className="h-[3px]"
          style={{
            background: team.league === 'boys' 
              ? 'linear-gradient(90deg, #FF2A44, #FF00AA, #FF2A44)' 
              : team.league === 'senior' 
              ? 'linear-gradient(90deg, #00F0FF, #4466FF, #00F0FF)' 
              : 'linear-gradient(90deg, #FFFF00, #FFD700, #FFFF00)'
          }}
        />
        
        {/* Corner brackets */}
        <div className={`absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 ${style.borderColor}/30 group-hover:${style.borderColor} transition-all duration-300`} />
        <div className={`absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 ${style.borderColor}/30 group-hover:${style.borderColor} transition-all duration-300`} />
        <div className={`absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 ${style.borderColor}/30 group-hover:${style.borderColor} transition-all duration-300`} />
        <div className={`absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 ${style.borderColor}/30 group-hover:${style.borderColor} transition-all duration-300`} />
        
        {/* Header area */}
        <div className="h-36 relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '25px 25px',
              color: team.league === 'boys' ? '#FF2A44' : team.league === 'senior' ? '#00F0FF' : '#FFFF00'
            }}
          />
          
          {/* League icon */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <IoBaseball className={`text-5xl ${style.textColor} opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
            </div>
            <span className={`mt-3 text-xs font-mono ${style.textColor} tracking-widest`}>
              {style.icon} {team.league.toUpperCase()} {style.icon}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta info */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-mono px-4 py-1.5 border-2 ${style.borderColor}/50 ${style.textColor} ${style.bgLight} tracking-wider`}>
              {style.icon} {team.league.toUpperCase()}
            </span>
            <div className={`flex items-center text-white/50 text-xs font-mono`}>
              <IoLocationSharp className={`mr-1.5 ${style.textColor}`} />
              {team.prefecture === 'osaka' ? 'OSAKA' : 'HYOGO'}
            </div>
          </div>

          {/* Team name */}
          <h3 className={`text-xl font-bold text-white mb-3 group-hover:${style.textColor} transition-colors duration-300`}>
            {team.name}
          </h3>
          
          {/* Decorative line */}
          <div 
            className={`w-10 h-[3px] ${style.bgColor} mb-4 group-hover:w-full transition-all duration-500`}
            style={{ boxShadow: `0 0 10px currentColor` }}
          />
          
          {/* Description */}
          <p className="text-white/50 text-sm line-clamp-2 mb-5 leading-relaxed font-mono">
            {team.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-5 border-t-2 border-white/10 group-hover:border-white/20 transition-colors">
            {team.url ? (
              <a
                href={team.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-cyan-400 hover:text-white transition-all duration-300 font-mono"
              >
                <IoGlobeOutline className="mr-2" />
                <span>LINK</span>
                <IoFlash className="ml-1 text-xs animate-pulse" />
              </a>
            ) : (
              <span className="text-xs text-white/25 font-mono">NO_LINK</span>
            )}
            
            <button className={`flex items-center text-sm text-white/60 hover:${style.textColor} transition-all duration-300 group/btn font-mono`}>
              DETAIL
              <IoChevronForward className="ml-1 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Data indicator */}
        <div className="absolute top-5 right-5 flex gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* ID tag */}
        <div className="absolute bottom-5 left-5 text-[10px] font-mono text-white/25">
          ID_{team.id.slice(0, 6).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};
