"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  IoArrowBack,
  IoPerson,
  IoMail,
  IoCall,
  IoBaseball,
  IoImage,
  IoCamera,
  IoDocument,
  IoSend,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoSparkles,
  IoInformationCircle,
  IoClose,
} from "react-icons/io5";

interface FormData {
  teamName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  directorName: string;
  directorMessage: string;
  teamDescription: string;
  practiceInfo: string;
  achievements: string;
  featureArticle: string;
}

interface FormErrors {
  teamName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  directorIcon?: string;
  backgroundImage?: string;
}

export default function TeamFeatureRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    directorName: "",
    directorMessage: "",
    teamDescription: "",
    practiceInfo: "",
    achievements: "",
    featureArticle: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [directorIconFile, setDirectorIconFile] = useState<File | null>(null);
  const [directorIconPreview, setDirectorIconPreview] = useState<string | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const directorIconRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = "チーム名を入力してください";
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "担当者名を入力してください";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "正しいメールアドレスを入力してください";
    }
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "電話番号を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "director" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [type === "director" ? "directorIcon" : "backgroundImage"]:
          "画像ファイルを選択してください",
      }));
      return;
    }

    // Validate file size (director: 500KB, background: 2MB)
    const maxSize = type === "director" ? 500 * 1024 : 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [type === "director" ? "directorIcon" : "backgroundImage"]:
          `ファイルサイズは${type === "director" ? "500KB" : "2MB"}以下にしてください`,
      }));
      return;
    }

    // Clear error
    setErrors((prev) => ({
      ...prev,
      [type === "director" ? "directorIcon" : "backgroundImage"]: undefined,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "director") {
        setDirectorIconFile(file);
        setDirectorIconPreview(reader.result as string);
      } else {
        setBackgroundImageFile(file);
        setBackgroundImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: "director" | "background") => {
    if (type === "director") {
      setDirectorIconFile(null);
      setDirectorIconPreview(null);
      if (directorIconRef.current) directorIconRef.current.value = "";
    } else {
      setBackgroundImageFile(null);
      setBackgroundImagePreview(null);
      if (backgroundImageRef.current) backgroundImageRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("teamName", formData.teamName);
      formDataToSend.append("contactName", formData.contactName);
      formDataToSend.append("contactEmail", formData.contactEmail);
      formDataToSend.append("contactPhone", formData.contactPhone);
      formDataToSend.append("directorName", formData.directorName);
      formDataToSend.append("directorMessage", formData.directorMessage);
      formDataToSend.append("teamDescription", formData.teamDescription);
      formDataToSend.append("practiceInfo", formData.practiceInfo);
      formDataToSend.append("achievements", formData.achievements);
      formDataToSend.append("featureArticle", formData.featureArticle);

      if (directorIconFile) {
        formDataToSend.append("directorIcon", directorIconFile);
      }
      if (backgroundImageFile) {
        formDataToSend.append("backgroundImage", backgroundImageFile);
      }

      const response = await fetch("/api/team-feature-request", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-cyan-400/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <IoArrowBack className="text-xl" />
            <span className="font-mono text-sm">トップへ戻る</span>
          </Link>
          <div className="flex items-center gap-2">
            <IoBaseball
              className="text-2xl text-red-500"
              style={{ filter: "drop-shadow(0 0 10px #FF2A44)" }}
            />
            <span className="font-bold text-white">特集記事依頼</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            チーム<span className="text-cyan-400">特集記事</span>依頼
          </h1>
          <p className="text-white/60 font-mono text-sm">
            チームの魅力を無料で記事にしてお届けします
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 border-2 border-green-400/50 bg-black/80 backdrop-blur-md"
            style={{ boxShadow: "0 0 40px rgba(74,222,128,0.3)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IoCheckmarkCircle
                className="text-7xl text-green-400 mx-auto mb-6"
                style={{ filter: "drop-shadow(0 0 20px rgba(74,222,128,0.8))" }}
              />
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-4">
              送信<span className="text-green-400">完了</span>
            </h3>
            <p className="text-white/60 font-mono mb-6">
              特集記事のご依頼ありがとうございます。
              <br />
              内容を確認後、ご連絡いたします。
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 border-2 border-green-400/50 text-green-400 hover:bg-green-400/20 font-mono text-sm transition-all duration-300"
            >
              トップページへ戻る
            </Link>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* 基本情報 */}
            <section className="p-6 border-2 border-white/10 bg-black/60 backdrop-blur-md">
              <h2 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <IoPerson />
                基本情報
              </h2>

              <div className="space-y-4">
                {/* チーム名 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoBaseball className="text-red-500" />
                    チーム名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${
                      errors.teamName
                        ? "border-red-500"
                        : "border-white/20 focus:border-cyan-400"
                    } text-white font-mono outline-none transition-all duration-300`}
                    placeholder="例：〇〇ポニー"
                  />
                  {errors.teamName && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.teamName}
                    </p>
                  )}
                </div>

                {/* 担当者名 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoPerson className="text-green-400" />
                    担当者名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${
                      errors.contactName
                        ? "border-red-500"
                        : "border-white/20 focus:border-green-400"
                    } text-white font-mono outline-none transition-all duration-300`}
                    placeholder="例：山田 太郎"
                  />
                  {errors.contactName && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.contactName}
                    </p>
                  )}
                </div>

                {/* メールアドレス */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoMail className="text-cyan-400" />
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${
                      errors.contactEmail
                        ? "border-red-500"
                        : "border-white/20 focus:border-cyan-400"
                    } text-white font-mono outline-none transition-all duration-300`}
                    placeholder="example@email.com"
                  />
                  {errors.contactEmail && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.contactEmail}
                    </p>
                  )}
                </div>

                {/* 電話番号 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoCall className="text-yellow-400" />
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${errors.contactPhone ? "border-red-500" : "border-white/20"} focus:border-yellow-400 text-white font-mono outline-none transition-all duration-300`}
                    placeholder="090-1234-5678"
                  />
                  {errors.contactPhone && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.contactPhone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* 画像アップロード */}
            <section className="p-6 border-2 border-white/10 bg-black/60 backdrop-blur-md">
              <h2 className="text-lg font-bold text-pink-500 mb-6 flex items-center gap-2">
                <IoImage />
                画像アップロード
              </h2>

              {/* 監督アイコン */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                  <IoCamera className="text-purple-400" />
                  監督の画像
                </label>
                <div className="flex items-center gap-2 text-xs text-white/50 mb-3 p-2 bg-purple-500/10 border border-purple-500/30">
                  <IoInformationCircle className="text-purple-400 shrink-0" />
                  <span>推奨サイズ: 200×200px（正方形）/ 形式: JPG, PNG / 最大: 500KB</span>
                </div>

                {directorIconPreview ? (
                  <div className="relative inline-block">
                    <Image
                      src={directorIconPreview}
                      alt="監督アイコンプレビュー"
                      width={100}
                      height={100}
                      className="rounded-full border-2 border-purple-400 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("director")}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <IoClose className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => directorIconRef.current?.click()}
                    className="w-full py-8 border-2 border-dashed border-white/30 hover:border-purple-400 text-white/50 hover:text-purple-400 transition-all duration-300 flex flex-col items-center gap-2"
                  >
                    <IoCamera className="text-3xl" />
                    <span className="text-sm font-mono">クリックして画像を選択</span>
                  </button>
                )}
                <input
                  ref={directorIconRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "director")}
                  className="hidden"
                />
                {errors.directorIcon && (
                  <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                    <IoAlertCircle /> {errors.directorIcon}
                  </p>
                )}
              </div>

              {/* チーム背景画像 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                  <IoImage className="text-pink-500" />
                  チーム背景画像
                </label>
                <div className="flex items-center gap-2 text-xs text-white/50 mb-3 p-2 bg-pink-500/10 border border-pink-500/30">
                  <IoInformationCircle className="text-pink-500 shrink-0" />
                  <span>推奨サイズ: 1200×600px（横長）/ 形式: JPG, PNG / 最大: 2MB / 集合写真やグラウンド風景がおすすめ</span>
                </div>

                {backgroundImagePreview ? (
                  <div className="relative">
                    <Image
                      src={backgroundImagePreview}
                      alt="背景画像プレビュー"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover border-2 border-pink-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("background")}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <IoClose className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => backgroundImageRef.current?.click()}
                    className="w-full py-8 border-2 border-dashed border-white/30 hover:border-pink-400 text-white/50 hover:text-pink-400 transition-all duration-300 flex flex-col items-center gap-2"
                  >
                    <IoImage className="text-3xl" />
                    <span className="text-sm font-mono">クリックして画像を選択</span>
                  </button>
                )}
                <input
                  ref={backgroundImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "background")}
                  className="hidden"
                />
                {errors.backgroundImage && (
                  <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                    <IoAlertCircle /> {errors.backgroundImage}
                  </p>
                )}
              </div>
            </section>

            {/* 監督情報 */}
            <section className="p-6 border-2 border-white/10 bg-black/60 backdrop-blur-md">
              <h2 className="text-lg font-bold text-yellow-400 mb-6 flex items-center gap-2">
                <IoPerson />
                監督情報
              </h2>

              <div className="space-y-4">
                {/* 監督名 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    監督・代表者名
                  </label>
                  <input
                    type="text"
                    name="directorName"
                    value={formData.directorName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-yellow-400 text-white font-mono outline-none transition-all duration-300"
                    placeholder="例：田中 一郎"
                  />
                </div>

                {/* 監督からの一言 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    監督からの一言メッセージ
                  </label>
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-3 p-2 bg-yellow-500/10 border border-yellow-500/30">
                    <IoInformationCircle className="text-yellow-400 shrink-0" />
                    <span>50文字程度がおすすめです</span>
                  </div>
                  <textarea
                    name="directorMessage"
                    value={formData.directorMessage}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-yellow-400 text-white font-mono outline-none transition-all duration-300 resize-none"
                    placeholder="例：一緒に夢を追いかけましょう！"
                  />
                </div>
              </div>
            </section>

            {/* チーム情報 */}
            <section className="p-6 border-2 border-white/10 bg-black/60 backdrop-blur-md">
              <h2 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
                <IoDocument />
                チーム情報
              </h2>

              <div className="space-y-4">
                {/* チーム紹介 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    チームの特徴・紹介
                  </label>
                  <textarea
                    name="teamDescription"
                    value={formData.teamDescription}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-green-400 text-white font-mono outline-none transition-all duration-300 resize-none"
                    placeholder="チームの理念、特色、雰囲気などをご記入ください"
                  />
                </div>

                {/* 練習情報 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    練習場所・練習日
                  </label>
                  <textarea
                    name="practiceInfo"
                    value={formData.practiceInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-green-400 text-white font-mono outline-none transition-all duration-300 resize-none"
                    placeholder="例：毎週土日 9:00〜17:00 / 〇〇グラウンド"
                  />
                </div>

                {/* 実績 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    主な実績・OB進学先
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-green-400 text-white font-mono outline-none transition-all duration-300 resize-none"
                    placeholder="例：2024年 関東大会優勝 / OB: 〇〇高校、△△高校など"
                  />
                </div>
              </div>
            </section>

            {/* 特集記事本文 */}
            <section className="p-6 border-2 border-white/10 bg-black/60 backdrop-blur-md">
              <h2 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <IoDocument />
                特集記事本文
              </h2>

              <div className="flex items-center gap-2 text-xs text-white/50 mb-3 p-2 bg-cyan-500/10 border border-cyan-500/30">
                <IoInformationCircle className="text-cyan-400 shrink-0" />
                <span>500〜1000文字程度がおすすめです。空欄の場合は上記情報を元に作成します。</span>
              </div>

              <textarea
                name="featureArticle"
                value={formData.featureArticle}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 focus:border-cyan-400 text-white font-mono outline-none transition-all duration-300 resize-none"
                placeholder="チームの魅力を自由にご記入ください..."
              />
            </section>

            {/* Submit Error */}
            {submitError && (
              <div className="p-4 border-2 border-red-500/50 bg-red-500/10 text-red-500 font-mono text-sm flex items-center gap-2">
                <IoAlertCircle className="text-xl" />
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <IoSparkles className="text-xl" />
                  </motion.div>
                  送信中...
                </>
              ) : (
                <>
                  <IoSend className="text-xl" />
                  送信する
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </main>
    </div>
  );
}
