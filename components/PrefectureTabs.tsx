"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoGlobeOutline, IoMapOutline } from "react-icons/io5";

interface Props {
  currentPrefecture: string;
  onSelect: (pref: string) => void;
  teamCounts?: Record<string, number>; // 都道府県ごとのチーム数
}

type Region = "all" | "kansai" | "kanto";

const regions = [
  { id: "all" as Region, label: "全国", labelEn: "ALL" },
  { id: "kansai" as Region, label: "関西", labelEn: "KANSAI" },
  { id: "kanto" as Region, label: "関東", labelEn: "KANTO" },
];

// 北海道・東北
const hokkaidoTohokuPrefectures = [
  { id: "北海道", label: "北海道", labelEn: "HOKKAIDO", code: "001", icon: "🐻" },
  { id: "青森県", label: "青森", labelEn: "AOMORI", code: "002", icon: "🍎" },
  { id: "岩手県", label: "岩手", labelEn: "IWATE", code: "003", icon: "🏔️" },
  { id: "宮城県", label: "宮城", labelEn: "MIYAGI", code: "004", icon: "🌾" },
  { id: "秋田県", label: "秋田", labelEn: "AKITA", code: "005", icon: "🐶" },
  { id: "山形県", label: "山形", labelEn: "YAMAGATA", code: "006", icon: "🍒" },
  { id: "福島県", label: "福島", labelEn: "FUKUSHIMA", code: "007", icon: "🍑" },
];

// 関東
const kantoPrefectures = [
  { id: "東京都", label: "東京", labelEn: "TOKYO", code: "013", icon: "🗼" },
  { id: "神奈川県", label: "神奈川", labelEn: "KANAGAWA", code: "014", icon: "🌉" },
  { id: "埼玉県", label: "埼玉", labelEn: "SAITAMA", code: "011", icon: "🏟️" },
  { id: "千葉県", label: "千葉", labelEn: "CHIBA", code: "012", icon: "🥜" },
  { id: "茨城県", label: "茨城", labelEn: "IBARAKI", code: "008", icon: "🚀" },
  { id: "栃木県", label: "栃木", labelEn: "TOCHIGI", code: "009", icon: "🍓" },
  { id: "群馬県", label: "群馬", labelEn: "GUNMA", code: "010", icon: "♨️" },
];

// 中部（北陸・甲信越・東海）
const chubuPrefectures = [
  { id: "新潟県", label: "新潟", labelEn: "NIIGATA", code: "015", icon: "🌾" },
  { id: "富山県", label: "富山", labelEn: "TOYAMA", code: "016", icon: "🏔️" },
  { id: "石川県", label: "石川", labelEn: "ISHIKAWA", code: "017", icon: "🦀" },
  { id: "福井県", label: "福井", labelEn: "FUKUI", code: "018", icon: "🦖" },
  { id: "山梨県", label: "山梨", labelEn: "YAMANASHI", code: "019", icon: "🍇" },
  { id: "長野県", label: "長野", labelEn: "NAGANO", code: "020", icon: "⛷️" },
  { id: "岐阜県", label: "岐阜", labelEn: "GIFU", code: "021", icon: "🏯" },
  { id: "静岡県", label: "静岡", labelEn: "SHIZUOKA", code: "022", icon: "🗻" },
  { id: "愛知県", label: "愛知", labelEn: "AICHI", code: "023", icon: "🐉" },
  { id: "三重県", label: "三重", labelEn: "MIE", code: "024", icon: "🦐" },
];

// 関西
const kansaiPrefectures = [
  { id: "大阪府", label: "大阪", labelEn: "OSAKA", code: "027", icon: "🏯" },
  { id: "兵庫県", label: "兵庫", labelEn: "HYOGO", code: "028", icon: "🐯" },
  { id: "京都府", label: "京都", labelEn: "KYOTO", code: "026", icon: "⛩️" },
  { id: "滋賀県", label: "滋賀", labelEn: "SHIGA", code: "025", icon: "🌊" },
  { id: "奈良県", label: "奈良", labelEn: "NARA", code: "029", icon: "🦌" },
  { id: "和歌山県", label: "和歌山", labelEn: "WAKAYAMA", code: "030", icon: "🍊" },
];

// 中国
const chugokuPrefectures = [
  { id: "鳥取県", label: "鳥取", labelEn: "TOTTORI", code: "031", icon: "🏜️" },
  { id: "島根県", label: "島根", labelEn: "SHIMANE", code: "032", icon: "⛩️" },
  { id: "岡山県", label: "岡山", labelEn: "OKAYAMA", code: "033", icon: "🍑" },
  { id: "広島県", label: "広島", labelEn: "HIROSHIMA", code: "034", icon: "🦪" },
  { id: "山口県", label: "山口", labelEn: "YAMAGUCHI", code: "035", icon: "🐡" },
];

// 四国
const shikokuPrefectures = [
  { id: "徳島県", label: "徳島", labelEn: "TOKUSHIMA", code: "036", icon: "🌀" },
  { id: "香川県", label: "香川", labelEn: "KAGAWA", code: "037", icon: "🍜" },
  { id: "愛媛県", label: "愛媛", labelEn: "EHIME", code: "038", icon: "🍊" },
  { id: "高知県", label: "高知", labelEn: "KOCHI", code: "039", icon: "🐋" },
];

// 九州・沖縄
const kyushuOkinawaPrefectures = [
  { id: "福岡県", label: "福岡", labelEn: "FUKUOKA", code: "040", icon: "🍜" },
  { id: "佐賀県", label: "佐賀", labelEn: "SAGA", code: "041", icon: "🎈" },
  { id: "長崎県", label: "長崎", labelEn: "NAGASAKI", code: "042", icon: "⛪" },
  { id: "熊本県", label: "熊本", labelEn: "KUMAMOTO", code: "043", icon: "🐻" },
  { id: "大分県", label: "大分", labelEn: "OITA", code: "044", icon: "♨️" },
  { id: "宮崎県", label: "宮崎", labelEn: "MIYAZAKI", code: "045", icon: "🌴" },
  { id: "鹿児島県", label: "鹿児島", labelEn: "KAGOSHIMA", code: "046", icon: "🌋" },
  { id: "沖縄県", label: "沖縄", labelEn: "OKINAWA", code: "047", icon: "🏝️" },
];

// 全国（関東・関西以外の都道府県）
const otherPrefectures = [
  ...hokkaidoTohokuPrefectures,
  ...chubuPrefectures,
  ...chugokuPrefectures,
  ...shikokuPrefectures,
  ...kyushuOkinawaPrefectures,
];

// 「全国」オプション（全地域タブ用）
const allJapanOption = { id: "全国", label: "全国", labelEn: "ALL_JAPAN", code: "000", icon: "🗾" };

const prefecturesByRegion: Record<Region, { id: string; label: string; labelEn: string; code: string; icon: string }[]> = {
  all: [allJapanOption, ...otherPrefectures],
  kansai: kansaiPrefectures,
  kanto: kantoPrefectures,
};

export const PrefectureTabs = ({ currentPrefecture, onSelect, teamCounts = {} }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState<Region>("kansai");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const prefectures = prefecturesByRegion[region];

  // 外側クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 地域が変わったら最初の都道府県を選択
  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    const firstPref = prefecturesByRegion[newRegion][0];
    if (firstPref) {
      onSelect(firstPref.id);
    }
  };

  const currentPref = prefectures.find(p => p.id === currentPrefecture) || prefectures[0];

  return (
    <div className="flex flex-col items-center mb-6 sm:mb-10 px-2">
      {/* Region Tabs */}
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-2 mb-2">
          <IoMapOutline className="text-yellow-400 text-sm" />
          <span className="text-[10px] sm:text-xs font-mono text-white/50 tracking-wider">
            地域選択
          </span>
        </div>
        <div className="flex bg-black/60 border border-yellow-400/30 p-1">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRegionChange(r.id)}
              className={`
                px-4 sm:px-6 py-1.5 sm:py-2 font-mono text-xs sm:text-sm transition-all duration-300
                ${region === r.id 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold shadow-[0_0_15px_rgba(255,200,0,0.4)]' 
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        {/* Prefecture Label */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <IoGlobeOutline className="text-cyan-400 text-sm" />
          <span className="text-[10px] sm:text-xs font-mono text-white/50 tracking-wider">
            都道府県選択
          </span>
        </div>

        {/* Dropdown Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative min-w-[200px] sm:min-w-[280px] px-4 sm:px-6 py-3 sm:py-4
            bg-black/80 border-2 transition-all duration-300
            ${isOpen ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'border-cyan-400/30 hover:border-cyan-400/60'}
          `}
        >
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-r-2 border-red-500" />
          <div className="absolute -bottom-1 -left-1 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-l-2 border-red-500" />
          <div className="absolute -bottom-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-r-2 border-cyan-400" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-cyan-400 text-base sm:text-lg">{currentPref.icon}</span>
              <div className="text-left">
                <span className="block text-[10px] sm:text-xs text-yellow-400 font-mono font-bold">
                  {teamCounts[currentPref.id] || 0} チーム
                </span>
                <span className="block text-white font-mono text-sm sm:text-lg font-bold tracking-wider">
                  {currentPref.label}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoChevronDown className="text-cyan-400 text-lg sm:text-xl" />
            </motion.div>
          </div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 origin-top"
            >
              <div className="bg-black/95 border-2 border-cyan-400/50 backdrop-blur-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-h-[60vh] overflow-y-auto">
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-red-500/5 pointer-events-none" />
                
                {/* Prefecture options */}
                {prefectures.map((pref, index) => (
                  <motion.button
                    key={pref.id}
                    onClick={() => {
                      onSelect(pref.id);
                      setIsOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`
                      w-full px-4 sm:px-6 py-3 text-left font-mono text-sm transition-all duration-200
                      flex items-center justify-between
                      ${currentPrefecture === pref.id 
                        ? 'bg-gradient-to-r from-red-500/20 to-cyan-400/10 text-white border-l-4 border-red-500' 
                        : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-base">{pref.icon}</span>
                      <span className="font-bold">{pref.label}</span>
                    </span>
                    <span className="text-[10px] sm:text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                      {teamCounts[pref.id] || 0} チーム
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
