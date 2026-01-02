"use client";

import { motion } from "framer-motion";
import { IoLocationSharp, IoSearch } from "react-icons/io5";

interface Props {
  onPrefectureSelect: (prefecture: string) => void;
  teamCounts: Record<string, number>;
}

// 地域ごとの都道府県データ
const regions = [
  {
    name: "北海道・東北",
    prefectures: [
      { id: "北海道", label: "北海道" },
      { id: "青森県", label: "青森" },
      { id: "岩手県", label: "岩手" },
      { id: "宮城県", label: "宮城" },
      { id: "秋田県", label: "秋田" },
      { id: "山形県", label: "山形" },
      { id: "福島県", label: "福島" },
    ],
  },
  {
    name: "関東",
    prefectures: [
      { id: "東京都", label: "東京" },
      { id: "神奈川県", label: "神奈川" },
      { id: "埼玉県", label: "埼玉" },
      { id: "千葉県", label: "千葉" },
      { id: "茨城県", label: "茨城" },
      { id: "栃木県", label: "栃木" },
      { id: "群馬県", label: "群馬" },
    ],
  },
  {
    name: "中部",
    prefectures: [
      { id: "新潟県", label: "新潟" },
      { id: "富山県", label: "富山" },
      { id: "石川県", label: "石川" },
      { id: "福井県", label: "福井" },
      { id: "山梨県", label: "山梨" },
      { id: "長野県", label: "長野" },
      { id: "岐阜県", label: "岐阜" },
      { id: "静岡県", label: "静岡" },
      { id: "愛知県", label: "愛知" },
      { id: "三重県", label: "三重" },
    ],
  },
  {
    name: "関西",
    prefectures: [
      { id: "大阪府", label: "大阪" },
      { id: "兵庫県", label: "兵庫" },
      { id: "京都府", label: "京都" },
      { id: "滋賀県", label: "滋賀" },
      { id: "奈良県", label: "奈良" },
      { id: "和歌山県", label: "和歌山" },
    ],
  },
  {
    name: "中国",
    prefectures: [
      { id: "鳥取県", label: "鳥取" },
      { id: "島根県", label: "島根" },
      { id: "岡山県", label: "岡山" },
      { id: "広島県", label: "広島" },
      { id: "山口県", label: "山口" },
    ],
  },
  {
    name: "四国",
    prefectures: [
      { id: "徳島県", label: "徳島" },
      { id: "香川県", label: "香川" },
      { id: "愛媛県", label: "愛媛" },
      { id: "高知県", label: "高知" },
    ],
  },
  {
    name: "九州・沖縄",
    prefectures: [
      { id: "福岡県", label: "福岡" },
      { id: "佐賀県", label: "佐賀" },
      { id: "長崎県", label: "長崎" },
      { id: "熊本県", label: "熊本" },
      { id: "大分県", label: "大分" },
      { id: "宮崎県", label: "宮崎" },
      { id: "鹿児島県", label: "鹿児島" },
      { id: "沖縄県", label: "沖縄" },
    ],
  },
];

export const SEOPrefectureLinks = ({ onPrefectureSelect, teamCounts }: Props) => {
  const handleClick = (prefectureId: string) => {
    onPrefectureSelect(prefectureId);
    // 検索セクションにスムーズスクロール
    const searchSection = document.getElementById("search");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-black/50 to-black/80 relative" id="prefecture-links">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_15px_rgba(250,204,21,0.6)]" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-400/50 bg-black/70 mb-4">
            <IoLocationSharp className="text-yellow-400" />
            <span className="text-xs font-mono text-yellow-400 tracking-widest">SEARCH_BY_PREFECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
            都道府県から<span className="text-yellow-400" style={{ textShadow: "0 0 20px rgba(250,204,21,0.6)" }}>探す</span>
          </h2>
          <p className="text-white/50 font-mono text-sm">
            <span className="text-cyan-400">&gt;</span> 全国の中学硬式野球チーム（ボーイズ・シニア・ヤング）を都道府県で検索
          </p>
        </motion.div>

        {/* Prefecture Grid by Region */}
        <div className="space-y-8">
          {regions.map((region, regionIndex) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: regionIndex * 0.1 }}
            >
              <h3 className="text-sm font-mono text-cyan-400 mb-3 flex items-center gap-2">
                <span className="text-red-500">◆</span>
                {region.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {region.prefectures.map((pref) => {
                  const count = teamCounts[pref.id] || 0;
                  return (
                    <button
                      key={pref.id}
                      onClick={() => handleClick(pref.id)}
                      className="group relative px-3 py-2 bg-black/60 border border-white/20 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                    >
                      <span className="text-white/70 group-hover:text-white text-sm font-mono transition-colors">
                        {pref.label}
                      </span>
                      {count > 0 && (
                        <span className="ml-1.5 text-[10px] text-yellow-400/70 group-hover:text-yellow-400">
                          ({count})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 border border-white/10 bg-black/40"
        >
          <div className="flex items-center gap-2 mb-4">
            <IoSearch className="text-cyan-400" />
            <h3 className="text-sm font-mono text-cyan-400">// ABOUT_SEARCH</h3>
          </div>
          
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>
              <strong className="text-white">ROOKIE SMART</strong>は、全国の<strong className="text-yellow-400">中学硬式野球チーム</strong>を都道府県・リーグ・支部から検索・比較できるプラットフォームです。
              <strong className="text-cyan-400">ボーイズリーグ</strong>、<strong className="text-pink-400">シニアリーグ</strong>、<strong className="text-green-400">ヤングリーグ</strong>の3大リーグに対応しています。
            </p>
            
            <p>
              北海道から沖縄まで、47都道府県の硬式野球クラブチームを網羅。
              大阪・兵庫・東京・神奈川・愛知・福岡など、硬式野球が盛んな地域のチーム情報を多数掲載しています。
              各チームの公式サイトへのリンクや特徴を確認し、お子様に合ったチーム選びにお役立てください。
            </p>

            <p>
              「<span className="text-yellow-400">中学硬式野球 大阪</span>」「<span className="text-yellow-400">ボーイズリーグ 兵庫</span>」「<span className="text-yellow-400">シニアリーグ 東京</span>」「<span className="text-yellow-400">ヤングリーグ 関西</span>」など、
              お住まいの地域でチームをお探しの方は、上記の都道府県ボタンをクリックして検索できます。
            </p>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/40">
                <span className="text-red-500">※</span> ボーイズリーグ（日本少年野球連盟）・シニアリーグ（日本リトルシニア中学硬式野球協会）・ヤングリーグ（全日本少年硬式野球連盟）の3リーグに所属するチームを掲載しています。
              </p>
            </div>
          </div>
        </motion.div>

        {/* League Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* ボーイズリーグ */}
          <div className="p-4 border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent">
            <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
              <span>◆</span>ボーイズリーグ
            </h4>
            <p className="text-white/50 text-xs leading-relaxed">
              日本少年野球連盟が運営。中学生の硬式野球リーグとして最大規模を誇り、全国に多数のチームが所属。甲子園球児やプロ野球選手を多数輩出しています。
            </p>
          </div>

          {/* シニアリーグ */}
          <div className="p-4 border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-transparent">
            <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
              <span>◈</span>シニアリーグ
            </h4>
            <p className="text-white/50 text-xs leading-relaxed">
              日本リトルシニア中学硬式野球協会が運営。関東を中心に全国展開し、技術指導と人間形成を重視。強豪校への進学実績も豊富です。
            </p>
          </div>

          {/* ヤングリーグ */}
          <div className="p-4 border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-transparent">
            <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
              <span>◊</span>ヤングリーグ
            </h4>
            <p className="text-white/50 text-xs leading-relaxed">
              全日本少年硬式野球連盟が運営。関西を中心に活動し、野球を通じた青少年育成に注力。アットホームな雰囲気のチームが多いのが特徴です。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};









