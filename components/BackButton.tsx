"use client";

import { IoArrowBack } from "react-icons/io5";

export function BackButton() {
  const handleBack = () => {
    // 常にコラムセクションへ戻る
    window.location.href = "/?scrollTo=columns";
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-6 py-3 border-2 border-pink-500/50 text-pink-500 font-mono hover:bg-pink-500/20 transition-colors"
    >
      <IoArrowBack />
      <span>前のページへ戻る</span>
    </button>
  );
}

