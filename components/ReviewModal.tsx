"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoStar, IoStarOutline, IoPerson, IoReload } from "react-icons/io5";
import { useTeamReviews } from "@/lib/supabase/hooks";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
  onOpenReviewForm: () => void;
}

// 星評価を表示するコンポーネント
const StarRating = ({ rating, size = "text-base" }: { rating: number; size?: string }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={size}>
          {star <= rating ? (
            <IoStar className="text-yellow-400" />
          ) : (
            <IoStarOutline className="text-yellow-400/30" />
          )}
        </span>
      ))}
    </div>
  );
};

export const ReviewModal = ({ isOpen, onClose, teamId, teamName, onOpenReviewForm }: ReviewModalProps) => {
  const { reviews, averageRating, reviewCount, isLoading, error } = useTeamReviews(teamId);

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

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
            className="relative w-full max-w-lg max-h-[80vh] bg-gray-900 border-2 border-yellow-500/30 rounded-lg overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 40px rgba(234,179,8,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-yellow-500/20 bg-black/50">
              <div>
                <h3 className="text-lg font-bold text-white">クチコミ</h3>
                <p className="text-xs text-yellow-400 font-mono mt-0.5">{teamName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Average Rating */}
            {!isLoading && averageRating !== null && (
              <div className="px-5 py-4 border-b border-white/10 bg-yellow-500/5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-yellow-400">{averageRating}</span>
                  <div>
                    <StarRating rating={Math.round(averageRating)} size="text-lg" />
                    <p className="text-xs text-white/50 mt-0.5">{reviewCount}件のクチコミ</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <IoReload className="text-4xl text-yellow-400/50 mx-auto mb-3 animate-spin" />
                  <p className="text-white/50">読み込み中...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400">データの取得に失敗しました</p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-black/30 border border-white/10 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                          <IoPerson className="text-yellow-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{review.reporter_name}</p>
                          <p className="text-xs text-white/40">{formatDate(review.created_at)}</p>
                        </div>
                      </div>
                      {review.rating && <StarRating rating={review.rating} size="text-sm" />}
                    </div>
                    {review.comment && (
                      <p className="text-sm text-white/70 leading-relaxed break-words whitespace-pre-wrap">{review.comment}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <IoStar className="text-4xl text-yellow-400/30 mx-auto mb-3" />
                  <p className="text-white/50 mb-1">まだクチコミがありません</p>
                  <p className="text-white/30 text-sm">最初のクチコミを投稿してみませんか？</p>
                </div>
              )}
            </div>

            {/* Footer - Post Review Button */}
            <div className="px-5 py-4 border-t border-white/10 bg-black/30">
              <button
                onClick={() => {
                  onClose();
                  onOpenReviewForm();
                }}
                className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded transition-all flex items-center justify-center gap-2"
              >
                <IoStar />
                クチコミを投稿する
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
