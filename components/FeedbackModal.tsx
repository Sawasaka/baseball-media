"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSend, IoCheckmarkCircle, IoWarning, IoBan } from "react-icons/io5";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
}

const reporterOptions = [
  { value: "individual", label: "個人（保護者・選手など）" },
  { value: "team_member", label: "チーム関係者" },
] as const;

const issueOptions = [
  { value: "broken_link", label: "リンク切れ" },
  { value: "wrong_info", label: "情報の誤り" },
  { value: "add_info", label: "情報の追加依頼" },
  { value: "other", label: "その他" },
] as const;

type ReporterType = "individual" | "team_member";
type IssueType = "broken_link" | "wrong_info" | "add_info" | "other";
type SubmitStatus = "idle" | "success" | "error" | "blocked";

export const FeedbackModal = ({ isOpen, onClose, teamId, teamName }: FeedbackModalProps) => {
  const [reporterType, setReporterType] = useState<ReporterType | "">("");
  const [issueType, setIssueType] = useState<IssueType | "">("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reporterType || !issueType) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // API経由で報告（IP制限チェック + Supabase保存 + メール通知）
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          teamName,
          reporter: reporterType,
          issue: issueType,
          details,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code === "BLOCKED") {
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
        setReporterType("");
        setIssueType("");
        setDetails("");
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
            className="relative w-full max-w-md bg-gray-900 border-2 border-cyan-500/30 rounded-lg overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,240,255,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-black/50">
              <div>
                <h3 className="text-lg font-bold text-white">報告・修正依頼</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{teamName}</p>
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
                <p className="text-white font-bold text-lg mb-2">送信完了</p>
                <p className="text-white/60 text-sm">ご報告ありがとうございます。<br />確認次第、対応いたします。</p>
              </div>
            ) : submitStatus === "blocked" ? (
              <div className="p-8 text-center">
                <IoBan className="text-6xl text-red-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg mb-2">報告制限中</p>
                <p className="text-white/60 text-sm mb-4">
                  現在、報告が制限されています。
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
                <p className="text-white/60 text-sm mb-4">送信に失敗しました。<br />時間をおいて再度お試しください。</p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
                >
                  やり直す
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Reporter Type */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    報告者 <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {reporterOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setReporterType(option.value)}
                        className={`px-3 py-2.5 text-sm rounded border transition-all ${
                          reporterType === option.value
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                            : "bg-black/30 border-white/20 text-white/60 hover:border-white/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    状況 <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {issueOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setIssueType(option.value)}
                        className={`px-3 py-2.5 text-sm rounded border transition-all ${
                          issueType === option.value
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                            : "bg-black/30 border-white/20 text-white/60 hover:border-white/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    依頼内容 <span className="text-white/40 text-xs">（任意）</span>
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="詳細があればご記入ください"
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!reporterType || !issueType || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <IoSend />
                      送信する
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
