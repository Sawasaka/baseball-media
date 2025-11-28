"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  IoMail, 
  IoPerson, 
  IoCall, 
  IoChatbubbles, 
  IoSend, 
  IoCheckmarkCircle,
  IoAlertCircle,
  IoSparkles,
  IoNewspaper,
  IoTrophy,
  IoMegaphone,
  IoApps
} from "react-icons/io5";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const exampleConsultations = [
  {
    icon: IoNewspaper,
    title: "野球チームの無料特集インタビュー依頼",
    description: "チームの魅力を記事で発信しませんか？",
    color: "#00F0FF",
  },
  {
    icon: IoTrophy,
    title: "高校野球関係者様による中学選手スカウトのご相談",
    description: "優秀な選手との出会いをサポートします",
    color: "#FF2A44",
  },
  {
    icon: IoMegaphone,
    title: "スポーツメーカー様からのスポンサー相談",
    description: "中学野球市場へのアプローチをご支援",
    color: "#FACC15",
  },
  {
    icon: IoApps,
    title: "サブチャンネル（英語・IT・野球塾等）のご相談",
    description: "各サービスへのお問い合わせ・提携のご相談",
    color: "#22C55E",
  },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!/^[0-9\-+()]+$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "正しい電話番号を入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "相談内容を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // メール送信用のAPIエンドポイントを呼び出し
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'h.sawasaka@rookiesmart.jp',
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-28 px-4 relative" id="contact">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
      
      {/* Side decorations */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-green-400/40 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 px-6 py-3 border-2 border-green-400/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(74,222,128,0.4)]">
              <span className="text-sm font-mono text-green-400 tracking-widest">◈ CONTACT_US ◈</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            お問い<span className="text-green-400" style={{ textShadow: '0 0 30px rgba(74,222,128,0.8)' }}>合わせ</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto font-mono text-base">
            <span className="text-cyan-400">&gt;</span> ご相談・ご質問はお気軽にどうぞ<span className="animate-pulse text-green-400">_</span>
          </p>
        </motion.div>

        {/* Consultation Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-yellow-400 text-sm">◈</span>
            <span className="text-sm font-mono text-cyan-400 tracking-wider">ご相談いただける内容例</span>
            <span className="text-yellow-400 text-sm">◈</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exampleConsultations.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 border-2 bg-black/60 backdrop-blur-md group hover:scale-[1.02] transition-all duration-300"
                  style={{ 
                    borderColor: `${item.color}40`,
                    boxShadow: `0 0 20px ${item.color}20`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 shrink-0"
                      style={{ 
                        background: `${item.color}20`,
                        border: `2px solid ${item.color}60`,
                      }}
                    >
                      <Icon size={24} style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 
                        className="font-bold text-sm mb-1"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/50 font-mono">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 border-2 border-green-400/50 bg-black/80 backdrop-blur-md"
              style={{ boxShadow: '0 0 40px rgba(74,222,128,0.3)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IoCheckmarkCircle className="text-7xl text-green-400 mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px rgba(74,222,128,0.8))' }} />
              </motion.div>
              <h3 className="text-2xl font-black text-white mb-4">
                送信<span className="text-green-400">完了</span>
              </h3>
              <p className="text-white/60 font-mono mb-6">
                お問い合わせありがとうございます。<br />
                担当者より折り返しご連絡いたします。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 border-2 border-green-400/50 text-green-400 hover:bg-green-400/20 font-mono text-sm transition-all duration-300"
              >
                新しいお問い合わせ
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div 
                className="p-8 border-2 border-white/10 bg-black/80 backdrop-blur-md"
                style={{ boxShadow: '0 0 30px rgba(74,222,128,0.1)' }}
              >
                {/* Name Field */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoPerson className="text-green-400" />
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-green-400'} text-white font-mono outline-none transition-all duration-300`}
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoMail className="text-cyan-400" />
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-cyan-400'} text-white font-mono outline-none transition-all duration-300`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoCall className="text-yellow-400" />
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-yellow-400'} text-white font-mono outline-none transition-all duration-300`}
                    placeholder="090-1234-5678"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-mono text-white/70 mb-2">
                    <IoChatbubbles className="text-pink-500" />
                    相談内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-black/50 border-2 ${errors.message ? 'border-red-500' : 'border-white/20 focus:border-pink-500'} text-white font-mono outline-none transition-all duration-300 resize-none`}
                    placeholder="ご相談内容をご記入ください..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500 font-mono flex items-center gap-1">
                      <IoAlertCircle /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="mb-6 p-4 border-2 border-red-500/50 bg-red-500/10 text-red-500 font-mono text-sm flex items-center gap-2">
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
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_40px_rgba(74,222,128,0.5)]'
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
              </div>

              {/* Privacy Note */}
              <p className="text-center text-xs text-white/40 font-mono">
                <span className="text-green-400">*</span> は必須項目です。ご入力いただいた情報は、お問い合わせ対応のみに使用いたします。
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

