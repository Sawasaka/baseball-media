"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoStar, IoStarOutline, IoSend, IoCheckmarkCircle, IoWarning, IoBan } from "react-icons/io5";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
}

type SubmitStatus = "idle" | "success" | "error" | "duplicate" | "blocked";

export const ReviewFormModal = ({ isOpen, onClose, teamId, teamName }: ReviewFormModalProps) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewerName || rating === 0) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // API経由で投稿（IP制限チェック + Supabase保存 + メール通知）
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          teamName,
          reviewerName,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // エラーコードに応じて状態を設定
        if (data.code === "DUPLICATE") {
          setSubmitStatus("duplicate");
        } else if (data.code === "BLOCKED") {
          setSubmitStatus("blocked");
        } else {
          setSubmitStatus("error");
        }
        return;
      }

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        // Reset form
        setReviewerName("");
        setRating(0);
        setComment("");
        setSubmitStatus("idle");
      }, 2000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSubmitStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-md bg-gray-900 border-2 border-yellow-500/30 rounded-lg overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(234,179,8,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-yellow-500/20 bg-black/50">
              <div>
                <h3 className="text-lg font-bold text-white">クチコミ投稿</h3>
                <p className="text-xs text-yellow-400 font-mono mt-0.5">{teamName}</p>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Content */}
            {submitStatus === "success" ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <IoCheckmarkCircle className="text-6xl text-green-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-white font-bold text-lg mb-2">投稿完了</p>
                <p className="text-white/60 text-sm">
                  ご投稿ありがとうございます。
                </p>
              </div>
            ) : submitStatus === "duplicate" ? (
              <div className="p-8 text-center">
                <IoWarning className="text-6xl text-orange-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg mb-2">投稿済みです</p>
                <p className="text-white/60 text-sm mb-4">
                  このチームには既にクチコミを<br />
                  投稿されています。
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-colors"
                >
                  閉じる
                </button>
              </div>
            ) : submitStatus === "blocked" ? (
              <div className="p-8 text-center">
                <IoBan className="text-6xl text-red-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg mb-2">投稿制限中</p>
                <p className="text-white/60 text-sm mb-4">
                  現在、投稿が制限されています。
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-colors"
                >
                  閉じる
                </button>
              </div>
            ) : submitStatus === "error" ? (
              <div className="p-8 text-center">
                <IoWarning className="text-6xl text-yellow-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg mb-2">送信エラー</p>
                <p className="text-white/60 text-sm mb-4">
                  送信に失敗しました。<br />
                  時間をおいて再度お試しください。
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors"
                >
                  やり直す
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    評価 <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-4xl transition-transform hover:scale-110"
                      >
                        {star <= (hoverRating || rating) ? (
                          <IoStar className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                        ) : (
                          <IoStarOutline className="text-yellow-400/30" />
                        )}
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center text-sm text-yellow-400 mt-2">
                      {rating === 1 && "😞 改善の余地あり"}
                      {rating === 2 && "😐 普通"}
                      {rating === 3 && "🙂 まあまあ良い"}
                      {rating === 4 && "😊 良い"}
                      {rating === 5 && "🤩 とても良い！"}
                    </p>
                  )}
                </div>

                {/* Reviewer Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    お名前・ニックネーム <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="例: 野球パパ、中学2年の母"
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:border-yellow-500/50 text-sm"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    コメント <span className="text-white/40 text-xs">（任意）</span>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="チームの良かった点、気になった点などをお書きください"
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:border-yellow-500/50 resize-none text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!reviewerName || rating === 0 || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <IoSend />
                      投稿する
                    </>
                  )}
                </button>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
