"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoLocationSharp, IoGlobeOutline, IoBaseball, IoFlash, IoFlag, IoStar, IoChatbubble, IoNewspaper, IoPerson } from "react-icons/io5";
import type { Team as MicroCMSTeam } from "@/lib/microcms/types";
import { FeedbackModal } from "./FeedbackModal";
import { ReviewModal } from "./ReviewModal";
import { ReviewFormModal } from "./ReviewFormModal";
import { FeatureArticleModal } from "./FeatureArticleModal";
import { useTeamReviews, useTeamFeature } from "@/lib/supabase/hooks";

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
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const leagueId = getLeagueId(team.league);
  const style = getLeagueStyles(leagueId);
  const prefectureName = team.prefecture?.[0] || '';
  const leagueName = team.league?.[0] || '';
  
  // クチコミデータ（Supabaseから取得）
  const { averageRating, reviewCount, reviews, isLoading } = useTeamReviews(team.id);
  
  // 特集記事データ（Supabaseから取得）
  const { feature, hasFeature } = useTeamFeature(team.id, team.name);

  return (
    <>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        teamId={team.id}
        teamName={team.name}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        teamId={team.id}
        teamName={team.name}
        onOpenReviewForm={() => setIsReviewFormOpen(true)}
      />
      <ReviewFormModal
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        teamId={team.id}
        teamName={team.name}
      />
      {feature && (
        <FeatureArticleModal
          isOpen={isFeatureModalOpen}
          onClose={() => setIsFeatureModalOpen(false)}
          feature={feature}
          teamName={team.name}
        />
      )}
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: style.glowColor }}
      />
      
      {/* Card */}
      <div 
        className="relative h-full flex flex-col bg-black/80 border-2 border-white/10 overflow-hidden transition-all duration-500 group-hover:border-opacity-70"
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
        <div className="h-28 sm:h-32 relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
          {/* Background Image or Grid */}
          {feature?.background_image_url ? (
            <>
              <Image
                src={feature.background_image_url}
                alt={`${team.name}の背景`}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </>
          ) : (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '25px 25px',
                color: leagueId === 'boys' ? '#FF2A44' : leagueId === 'senior' ? '#00F0FF' : '#FFFF00'
              }}
            />
          )}
          
          {/* League icon or Director icon */}
          <div className="relative z-10 flex flex-col items-center">
            {feature?.director_icon_url ? (
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-cyan-400/50 transition-all duration-500">
                <Image
                  src={feature.director_icon_url}
                  alt={feature.director_name || "監督"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="relative">
                <IoBaseball className={`text-4xl sm:text-5xl ${style.textColor} opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
              </div>
            )}
          </div>
          
          
          {/* Review Rating Badge - right corner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsReviewModalOpen(true);
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/60 border border-yellow-400/40 hover:border-yellow-400 hover:bg-yellow-400/10 rounded transition-all duration-300 cursor-pointer"
          >
            <IoStar className="text-yellow-400 text-xs sm:text-sm" />
            {averageRating !== null ? (
              <>
                <span className="text-yellow-400 text-[10px] sm:text-xs font-bold">{averageRating}</span>
                <span className="text-yellow-400/70 text-[8px] sm:text-[10px]">({reviewCount})</span>
              </>
            ) : (
              <span className="text-white/40 text-[8px] sm:text-[10px]">--</span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          {/* Location info */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            <div className={`flex items-center text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 border ${style.borderColor}/40 ${style.bgLight}`}>
              <IoLocationSharp className={`mr-0.5 sm:mr-1 ${style.textColor}`} />
              <span className="text-white/80">{prefectureName}</span>
            </div>
            {team.area && (
              <div className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 border border-white/20 bg-white/5 text-white/60">
                {team.area}
              </div>
            )}
          </div>

          {/* Team name */}
          <h3 className={`text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:${style.textColor} transition-colors duration-300`}>
            {team.name}
          </h3>
          
          {/* Decorative line */}
          <div 
            className={`w-8 sm:w-10 h-[2px] sm:h-[3px] ${style.bgColor} mb-3 sm:mb-4 group-hover:w-full transition-all duration-500`}
            style={{ boxShadow: `0 0 10px currentColor` }}
          />
          
          {/* Description / Catchcopy - 2行で統一（line-clamp） */}
          <div className="min-h-[48px] sm:min-h-[52px] mb-3 sm:mb-4">
            <p className="text-white/50 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {team.catchcopy || "チーム情報準備中"}
            </p>
          </div>
          
          {/* Director Message */}
          {feature?.director_message && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20">
              <div className="flex items-start gap-2">
                <IoPerson className="text-cyan-400 text-sm flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  {feature.director_name && (
                    <p className="text-[10px] text-cyan-400 font-bold mb-0.5">{feature.director_name}</p>
                  )}
                  <p className="text-white/70 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                    「{feature.director_message}」
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Tags */}
          {(team.feature1 || team.feature2 || team.feature3) && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
              {[team.feature1, team.feature2, team.feature3].filter(Boolean).map((tag, index) => (
                <span
                  key={index}
                  className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 border ${style.borderColor}/30 ${style.textColor} bg-black/50`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Spacer to push actions to bottom */}
          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 sm:pt-5 border-t-2 border-white/10 group-hover:border-white/20 transition-colors mt-auto">
            {team.officialurl ? (
              <a
                href={team.officialurl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 -ml-3 text-xs sm:text-sm text-cyan-400 hover:text-white hover:bg-cyan-400/10 rounded transition-all duration-300 font-mono cursor-pointer"
              >
                <IoGlobeOutline className="text-base sm:text-lg" />
                <span>公式サイト</span>
                <IoFlash className="text-[10px] sm:text-xs animate-pulse" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/30 font-mono">
                <IoGlobeOutline className="text-base sm:text-lg opacity-50" />
                <span>サイト準備中</span>
              </span>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Feature Article Button - only show if feature exists */}
              {hasFeature && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFeatureModalOpen(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs text-pink-400/70 hover:text-pink-400 hover:bg-pink-400/10 rounded transition-all duration-300"
                  title="特集記事"
                >
                  <IoNewspaper className="text-xs sm:text-sm" />
                  <span>特集</span>
                </button>
              )}
              
              {/* Review Post Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReviewFormOpen(true);
                }}
                className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10 rounded transition-all duration-300"
                title="クチコミ投稿"
              >
                <IoChatbubble className="text-xs sm:text-sm" />
                <span>投稿</span>
              </button>
              
              {/* Feedback Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFeedbackOpen(true);
                }}
                className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10 rounded transition-all duration-300"
                title="報告"
              >
                <IoFlag className="text-xs sm:text-sm" />
                <span>報告</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};
