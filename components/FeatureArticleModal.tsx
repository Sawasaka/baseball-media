"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  IoClose, 
  IoPerson, 
  IoBaseball, 
  IoCalendar, 
  IoTrophy, 
  IoDocument,
  IoChatbubble
} from "react-icons/io5";
import type { TeamFeatureRequest } from "@/lib/supabase/client";

interface FeatureArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: TeamFeatureRequest;
  teamName: string;
}

export const FeatureArticleModal = ({ 
  isOpen, 
  onClose, 
  feature, 
  teamName 
}: FeatureArticleModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gray-900 border-2 border-cyan-500/30 overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 40px rgba(0,240,255,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-white/60 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <IoClose className="text-xl" />
            </button>

            {/* Hero Image */}
            <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-black overflow-hidden flex-shrink-0">
              {feature.background_image_url ? (
                <>
                  <Image
                    src={feature.background_image_url}
                    alt={`${teamName}の背景画像`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}
                  />
                  <IoBaseball className="text-6xl text-cyan-400/30" />
                </div>
              )}
              
              {/* Team Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-cyan-500/80 text-white text-[10px] sm:text-xs font-bold">
                    特集
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {teamName}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Director Section */}
              {(feature.director_name || feature.director_message) && (
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20">
                  {/* Director Icon */}
                  <div className="flex-shrink-0">
                    {feature.director_icon_url ? (
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-400/50">
                        <Image
                          src={feature.director_icon_url}
                          alt={feature.director_name || "監督"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400/30 flex items-center justify-center">
                        <IoPerson className="text-2xl sm:text-3xl text-cyan-400/50" />
                      </div>
                    )}
                  </div>
                  
                  {/* Director Info */}
                  <div className="flex-1 min-w-0">
                    {feature.director_name && (
                      <p className="text-sm text-cyan-400 font-bold mb-1">
                        {feature.director_name}
                      </p>
                    )}
                    {feature.director_message && (
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                        「{feature.director_message}」
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Team Description */}
              {feature.team_description && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IoDocument className="text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">チーム紹介</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {feature.team_description}
                  </p>
                </div>
              )}

              {/* Practice Info */}
              {feature.practice_info && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IoCalendar className="text-green-400" />
                    <h3 className="text-sm font-bold text-white">練習情報</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {feature.practice_info}
                  </p>
                </div>
              )}

              {/* Achievements */}
              {feature.achievements && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IoTrophy className="text-yellow-400" />
                    <h3 className="text-sm font-bold text-white">実績・OB進学先</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {feature.achievements}
                  </p>
                </div>
              )}

              {/* Feature Article */}
              {feature.feature_article && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IoChatbubble className="text-pink-500" />
                    <h3 className="text-sm font-bold text-white">特集記事</h3>
                  </div>
                  <div className="p-4 bg-black/30 border border-white/10">
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {feature.feature_article}
                    </p>
                  </div>
                </div>
              )}

              {/* No Content Fallback */}
              {!feature.team_description && 
               !feature.practice_info && 
               !feature.achievements && 
               !feature.feature_article && 
               !feature.director_message && (
                <div className="text-center py-8">
                  <IoBaseball className="text-4xl text-cyan-400/30 mx-auto mb-3" />
                  <p className="text-white/50">特集記事の内容は準備中です</p>
                </div>
              )}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-pink-500 pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
