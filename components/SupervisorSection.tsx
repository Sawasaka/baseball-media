"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoCheckmarkCircle, 
  IoBaseball, 
  IoGlobe, 
  IoSchool,
  IoSparkles,
  IoChevronDown,
  IoDocumentText,
  IoTrophy,
  IoLanguage
} from "react-icons/io5";

export function SupervisorSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.8)]" />
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 px-6 py-3 border-2 border-cyan-400/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <span className="text-sm font-mono text-cyan-400 tracking-widest">◈ SUPERVISOR / EDITOR ◈</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            監修者・<span className="text-cyan-400" style={{ textShadow: '0 0 30px rgba(0,240,255,0.8)' }}>編集者</span>
          </h2>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main card */}
          <div 
            className="relative border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-900/20 via-black/80 to-red-900/20 backdrop-blur-md overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(0,240,255,0.2)' }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-cyan-400" style={{ boxShadow: '0 0 15px rgba(0,240,255,0.6)' }} />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-red-500" style={{ boxShadow: '0 0 15px rgba(255,42,68,0.6)' }} />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-red-500" style={{ boxShadow: '0 0 15px rgba(255,42,68,0.6)' }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-cyan-400" style={{ boxShadow: '0 0 15px rgba(0,240,255,0.6)' }} />

            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                {/* Photos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="shrink-0 flex flex-col gap-4"
                >
                  {/* Main profile photo */}
                  <div 
                    className="relative w-52 h-64 md:w-60 md:h-80 overflow-hidden"
                    style={{
                      border: '3px solid transparent',
                      background: 'linear-gradient(135deg, #00F0FF, #FF2A44) border-box',
                      boxShadow: '0 0 30px rgba(0,240,255,0.5), 0 0 30px rgba(255,42,68,0.3)',
                    }}
                  >
                    <div className="absolute inset-[3px] overflow-hidden">
                      <Image
                        src="/supervisor-profile.jpg"
                        alt="沢坂弘樹 プロフィール"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 208px, 240px"
                      />
                    </div>
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Baseball action photo */}
                  <div 
                    className="relative w-52 h-40 md:w-60 md:h-44 overflow-hidden"
                    style={{
                      border: '2px solid transparent',
                      background: 'linear-gradient(135deg, #FF2A44, #FACC15) border-box',
                      boxShadow: '0 0 20px rgba(255,42,68,0.4)',
                    }}
                  >
                    <div className="absolute inset-[2px] overflow-hidden">
                      <Image
                        src="/supervisor-baseball.jpg"
                        alt="沢坂弘樹 プロ野球時代"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 208px, 240px"
                      />
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-[10px] font-mono text-yellow-400">◈ パナマリーグ時代</span>
                    </div>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Name */}
                  <div className="mb-6">
                    <p className="text-sm text-cyan-400 font-mono mb-2">Hiroki Sawasaka</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                      沢坂 <span className="text-red-500" style={{ textShadow: '0 0 20px rgba(255,42,68,0.6)' }}>弘樹</span>
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    <span className="flex items-center gap-2 px-4 py-2 border-2 border-red-500/60 text-red-400 bg-red-500/10 text-sm font-mono">
                      <IoBaseball className="text-base" />
                      元海外プロ野球選手
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 border-2 border-cyan-400/60 text-cyan-400 bg-cyan-400/10 text-sm font-mono">
                      <IoSchool className="text-base" />
                      硬式野球クラブ経営
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 border-2 border-yellow-400/60 text-yellow-400 bg-yellow-400/10 text-sm font-mono">
                      <IoGlobe className="text-base" />
                      ボーイズリーグ出身
                    </span>
                  </div>

                  {/* Career */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <IoCheckmarkCircle className="text-cyan-400 text-xl shrink-0" />
                      <span className="text-white/90">亜細亜大学</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <IoCheckmarkCircle className="text-cyan-400 text-xl shrink-0" />
                      <span className="text-white/90">日本製鉄室蘭/香川OG</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <IoCheckmarkCircle className="text-cyan-400 text-xl shrink-0" />
                      <span className="text-white/90">パナマリーグ所属の海外プロ野球選手</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div 
                    className="p-6 border-2 border-cyan-400/30 bg-cyan-400/5 relative"
                    style={{ boxShadow: 'inset 0 0 30px rgba(0,240,255,0.1)' }}
                  >
                    <span className="absolute -top-3 left-4 text-3xl text-cyan-400">"</span>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      元々は関西の「阪神ボーイズ」という中学硬式野球チームの運営を行っていました。
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base mt-3">
                      父は20年以上にわたり中学硬式野球チームの監督を務めており、私自身も野球人生を通じて、現場のリアルと業界構造を深く理解しています。
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base mt-3">
                      ここでは、現場のリアルな情報と、多彩な「サブチャンネル」や「コンテンツ」を皆様にお届けしていきます。
                    </p>
                    <span className="absolute -bottom-3 right-4 text-3xl text-cyan-400">"</span>
                  </div>

                  {/* 詳細タブ */}
                  <div className="mt-6">
                    <p className="text-xs text-white/40 font-mono mb-3 flex items-center gap-2">
                      <IoSparkles className="text-cyan-400 animate-pulse" />
                      クリックして詳細を見る
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={() => setActiveTab(activeTab === 'career' ? null : 'career')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-mono font-bold transition-all duration-300 cursor-pointer ${
                          activeTab === 'career' 
                            ? 'bg-red-500/30 border-red-500 text-red-400 shadow-[0_0_20px_rgba(255,42,68,0.4)]' 
                            : 'bg-red-500/10 border-red-500/50 text-red-400/80 hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,68,0.3)]'
                        } border-2`}
                      >
                        <IoTrophy className="text-lg" />
                        野球実績
                        <IoChevronDown className={`transition-transform duration-300 ${activeTab === 'career' ? 'rotate-180' : ''}`} />
                      </motion.button>
                      <motion.button
                        onClick={() => setActiveTab(activeTab === 'business' ? null : 'business')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-mono font-bold transition-all duration-300 cursor-pointer ${
                          activeTab === 'business' 
                            ? 'bg-cyan-400/30 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]' 
                            : 'bg-cyan-400/10 border-cyan-400/50 text-cyan-400/80 hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        } border-2`}
                      >
                        <IoLanguage className="text-lg" />
                        ビジネス経歴
                        <IoChevronDown className={`transition-transform duration-300 ${activeTab === 'business' ? 'rotate-180' : ''}`} />
                      </motion.button>
                      <motion.button
                        onClick={() => setActiveTab(activeTab === 'club' ? null : 'club')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-mono font-bold transition-all duration-300 cursor-pointer ${
                          activeTab === 'club' 
                            ? 'bg-yellow-400/30 border-yellow-400 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                            : 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400/80 hover:bg-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                        } border-2`}
                      >
                        <IoDocumentText className="text-lg" />
                        クラブ経営
                        <IoChevronDown className={`transition-transform duration-300 ${activeTab === 'club' ? 'rotate-180' : ''}`} />
                      </motion.button>
                    </div>
                  </div>

                  {/* タブコンテンツ */}
                  <AnimatePresence mode="wait">
                    {activeTab && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        {activeTab === 'career' && (
                          <div className="p-4 border-2 border-red-500/30 bg-red-500/5">
                            <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                              <IoTrophy /> 野球実績
                            </h4>
                            <ul className="space-y-2 text-sm text-white/80">
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                宮崎日大（九州大会出場）
                              </li>
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                亜細亜大学（日本一）
                              </li>
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                新日鐵室蘭（都市対抗予選レギュラー出場）
                              </li>
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                香川オリーブガイナーズ（打率6位獲得）
                              </li>
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                パナマ中南米リーグ参加（打率TOP10）
                              </li>
                              <li className="flex items-start gap-2">
                                <IoCheckmarkCircle className="text-red-400 mt-0.5 shrink-0" />
                                豪州リーグ参加（レギュラー出場）
                              </li>
                            </ul>
                          </div>
                        )}

                        {activeTab === 'business' && (
                          <div className="p-4 border-2 border-cyan-400/30 bg-cyan-400/5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* キャリア幅 */}
                              <div>
                                <h4 className="text-cyan-400 font-bold mb-3 text-sm">◈ キャリア幅</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {['エンジニア', 'ディレクター', '法人営業', 'マーケティング', 'コンサルティング'].map((item) => (
                                    <span key={item} className="px-2 py-1 text-xs bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* 事業立ち上げ実績 */}
                              <div>
                                <h4 className="text-cyan-400 font-bold mb-3 text-sm">◈ 事業立ち上げ実績</h4>
                                <ul className="space-y-1.5 text-xs text-white/80">
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    共同経営による事業立ち上げ
                                    <span className="text-yellow-400 text-[10px]">（資金調達3,000万円）</span>
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    外資系IT企業の日本法人立ち上げ
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    IT受託開発会社の新規立ち上げ
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    人材会社にてメディア事業立ち上げ
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    株式会社ルーキースマートジャパン設立
                                  </li>
                                </ul>
                              </div>

                              {/* 語学力・資格 */}
                              <div>
                                <h4 className="text-cyan-400 font-bold mb-3 text-sm">◈ 語学力・資格</h4>
                                <ul className="space-y-1.5 text-xs text-white/80">
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    TOEIC 910点
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    高校教員免許保有
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    海外生活2年
                                  </li>
                                  <li className="flex items-start gap-1.5">
                                    <IoCheckmarkCircle className="text-cyan-400 mt-0.5 shrink-0 text-sm" />
                                    外資系IT企業勤務
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'club' && (
                          <div className="p-4 border-2 border-yellow-400/30 bg-yellow-400/5">
                            <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                              <IoDocumentText /> 阪神ボーイズ / 英語学習支援について
                            </h4>
                            <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto overflow-hidden border-2 border-yellow-400/40">
                              <Image
                                src="/club-management.jpg"
                                alt="阪神ボーイズ・英語学習支援について"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 600px"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-red-500 to-cyan-400" />
          </div>

          {/* Floating sparkles */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <IoSparkles className="text-3xl text-red-500" style={{ filter: 'drop-shadow(0 0 10px rgba(255,42,68,0.8))' }} />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <IoSparkles className="text-3xl text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.8))' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
