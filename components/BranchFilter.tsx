"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoLocationSharp } from "react-icons/io5";

interface Props {
  currentBranch: string;
  currentPrefecture: string;
  branches: { id: string; name: string; count: number }[];
  onSelect: (branch: string) => void;
}

export const BranchFilter = ({ currentBranch, currentPrefecture, branches, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // 都道府県が変わったら支部選択をリセット
  useEffect(() => {
    setIsOpen(false);
  }, [currentPrefecture]);

  const currentBranchData = branches.find(b => b.id === currentBranch);
  const displayName = currentBranch === "all" ? "すべての支部" : currentBranchData?.name || "支部を選択";
  const totalCount = branches.reduce((sum, b) => sum + b.count, 0);

  if (branches.length === 0) {
    return null; // 支部がない場合のみ非表示
  }

  // 支部が1つだけの場合はシンプル表示
  if (branches.length === 1) {
    const singleBranch = branches[0];
    return (
      <div className="flex justify-center mb-6 sm:mb-10 px-2">
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-black/60 border border-pink-500/30">
          <IoLocationSharp className="text-pink-500 text-base sm:text-lg" />
          <span className="text-white font-mono text-sm sm:text-base font-bold">
            {singleBranch.name}
          </span>
          <span className="text-yellow-400 font-mono text-xs sm:text-sm bg-yellow-400/10 px-2 py-0.5 rounded">
            {singleBranch.count} チーム
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6 sm:mb-10 px-2" ref={dropdownRef}>
      <div className="relative">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <IoLocationSharp className="text-pink-500 text-sm" />
          <span className="text-[10px] sm:text-xs font-mono text-white/50 tracking-wider">
            支部選択
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
            ${isOpen ? 'border-pink-500 shadow-[0_0_20px_rgba(255,0,170,0.4)]' : 'border-pink-500/30 hover:border-pink-500/60'}
          `}
        >
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-l-2 border-pink-500" />
          <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-r-2 border-pink-500" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-pink-500 text-xs sm:text-sm animate-pulse">▸</span>
              <div className="text-left">
                <span className="block text-white font-mono text-sm sm:text-base font-bold">
                  {displayName}
                </span>
                <span className="block text-[10px] sm:text-xs text-white/40 font-mono">
                  {currentBranch === "all" ? `${totalCount} チーム` : `${currentBranchData?.count || 0} チーム`}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoChevronDown className="text-pink-500 text-lg sm:text-xl" />
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
              <div className="bg-black/95 border-2 border-pink-500/50 backdrop-blur-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none" />
                
                {/* All option */}
                <motion.button
                  onClick={() => {
                    onSelect("all");
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 5 }}
                  className={`
                    w-full px-4 sm:px-6 py-3 text-left font-mono text-sm transition-all duration-200
                    flex items-center justify-between
                    ${currentBranch === "all" 
                      ? 'bg-gradient-to-r from-pink-500/20 to-cyan-400/10 text-white border-l-4 border-pink-500' 
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-400">◇</span>
                    すべての支部
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">
                    {totalCount}
                  </span>
                </motion.button>

                {/* Separator */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

                {/* Branch options */}
                {branches.map((branch, index) => (
                  <motion.button
                    key={branch.id}
                    onClick={() => {
                      onSelect(branch.id);
                      setIsOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`
                      w-full px-4 sm:px-6 py-3 text-left font-mono text-sm transition-all duration-200
                      flex items-center justify-between
                      ${currentBranch === branch.id 
                        ? 'bg-gradient-to-r from-pink-500/20 to-cyan-400/10 text-white border-l-4 border-pink-500' 
                        : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span className={currentBranch === branch.id ? 'text-pink-500' : 'text-white/30'}>▸</span>
                      {branch.name}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">
                      {branch.count}
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

