"use client";

import { motion } from "framer-motion";

interface Props {
  currentPrefecture: string;
  onSelect: (pref: string) => void;
}

const prefectures = [
  { id: "osaka", label: "OSAKA", sub: "大阪" },
  { id: "hyogo", label: "HYOGO", sub: "兵庫" },
];

export const PrefectureTabs = ({ currentPrefecture, onSelect }: Props) => {
  return (
    <div className="flex justify-center space-x-8 mb-12">
      {prefectures.map((pref) => (
        <button
          key={pref.id}
          onClick={() => onSelect(pref.id)}
          className="relative px-6 py-2 group"
        >
          <div className="flex flex-col items-center z-10 relative">
            <span className={`font-mono text-2xl font-bold transition-colors duration-300 ${
              currentPrefecture === pref.id ? "text-cyber-cyan" : "text-gray-500 group-hover:text-gray-300"
            }`}>
              {pref.label}
            </span>
            <span className="text-xs tracking-widest text-gray-400">{pref.sub}</span>
          </div>
          
          {currentPrefecture === pref.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-cyber-cyan/10 border border-cyber-cyan/50 rounded skew-x-12"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

