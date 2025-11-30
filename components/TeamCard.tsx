"use client";

import { motion } from "framer-motion";
import { IoLocationSharp, IoGlobeOutline, IoBaseball, IoFlash } from "react-icons/io5";
import type { Team as MicroCMSTeam } from "@/lib/microcms/types";

// TeamCard用の型（microCMS の Team 型を拡張）
// microCMS のセレクトフィールドは配列で返ってくる
interface Team {
  id: string;
  name: string;
  prefecture: string[];  // 配列
  area?: string;
  league: string[];      // 配列
  branch?: string;
  catchcopy?: string;
  officialurl?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
}

// リーグ名を内部IDに変換
const getLeagueId = (league: string[]): string => {
  const leagueName = league?.[0] || '';
  if (leagueName === 'ボーイズ') return 'boys';
  if (leagueName === 'シニア') return 'senior';
  if (leagueName === 'ヤング') return 'young';
  return 'boys';
};


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
  const leagueId = getLeagueId(team.league);
  const style = getLeagueStyles(leagueId);
  const prefectureName = team.prefecture?.[0] || '';
  const leagueName = team.league?.[0] || '';

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
          borderColor: leagueId === 'boys' ? 'rgba(255,42,68,0.2)' : leagueId === 'senior' ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,0,0.2)'
        }}
      >
        {/* Top accent line */}
        <div 
          className="h-[3px]"
          style={{
            background: leagueId === 'boys' 
              ? 'linear-gradient(90deg, #FF2A44, #FF00AA, #FF2A44)' 
              : leagueId === 'senior' 
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
        <div className="h-32 relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '25px 25px',
              color: leagueId === 'boys' ? '#FF2A44' : leagueId === 'senior' ? '#00F0FF' : '#FFFF00'
            }}
          />
          
          {/* League icon */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <IoBaseball className={`text-5xl ${style.textColor} opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
            </div>
          </div>
          
          {/* League & Branch badges - right corner */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            <span 
              className={`text-[9px] font-mono font-bold px-2 py-0.5 border ${style.borderColor}/50`}
              style={{ color: leagueId === 'boys' ? '#FF2A44' : leagueId === 'senior' ? '#00F0FF' : '#FACC15' }}
            >
              {leagueName || (leagueId === 'boys' ? 'ボーイズ' : leagueId === 'senior' ? 'シニア' : 'ヤング')}
            </span>
            {team.branch && (
              <span 
                className="text-[9px] font-mono px-2 py-0.5 border border-white/30 bg-white/10 text-white/80"
              >
                {team.branch}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location info */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className={`flex items-center text-xs font-mono px-2 py-1 border ${style.borderColor}/40 ${style.bgLight}`}>
              <IoLocationSharp className={`mr-1 ${style.textColor}`} />
              <span className="text-white/80">{prefectureName}</span>
            </div>
            {team.area && (
              <div className="text-xs font-mono px-2 py-1 border border-white/20 bg-white/5 text-white/60">
                {team.area}
              </div>
            )}
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
          
          {/* Description / Catchcopy */}
          <p className="text-white/50 text-sm line-clamp-2 mb-4 leading-relaxed font-mono">
            {team.catchcopy || "チーム情報準備中"}
          </p>

          {/* Feature Tags */}
          {(team.feature1 || team.feature2 || team.feature3) && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[team.feature1, team.feature2, team.feature3].filter(Boolean).map((tag, index) => (
                <span
                  key={index}
                  className={`text-[10px] font-mono px-2 py-0.5 border ${style.borderColor}/30 ${style.textColor} bg-black/50`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center pt-5 border-t-2 border-white/10 group-hover:border-white/20 transition-colors">
            {team.officialurl ? (
              <a
                href={team.officialurl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-cyan-400 hover:text-white transition-all duration-300 font-mono"
              >
                <IoGlobeOutline className="mr-2" />
                <span>公式サイト</span>
                <IoFlash className="ml-1 text-xs animate-pulse" />
              </a>
            ) : (
              <span className="text-xs text-white/25 font-mono">NO_LINK</span>
            )}
          </div>
        </div>

        {/* ID tag */}
        <div className="absolute bottom-5 left-5 text-[10px] font-mono text-white/25">
          ID_{team.id.slice(0, 6).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};
