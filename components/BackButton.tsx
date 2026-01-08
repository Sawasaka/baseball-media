"use client";

import { IoArrowBack } from "react-icons/io5";

export function BackButton() {
  const handleBack = () => {
    // リファラーを確認
    const referrer = document.referrer;
    const currentOrigin = window.location.origin;
    
    if (referrer && referrer.startsWith(currentOrigin)) {
      const referrerUrl = new URL(referrer);
      const referrerPath = referrerUrl.pathname;
      
      // トップページから来た場合はコラムセクションへスクロール
      if (referrerPath === "/" || referrerPath === "") {
        // URLパラメータでスクロール先を指定
        window.location.href = "/?scrollTo=columns";
        return;
      }
      
      // カテゴリ一覧ページから来た場合はそのページへ戻る
      if (referrerPath.startsWith("/category/")) {
        window.location.href = referrerPath;
        return;
      }
    }
    
    // ブラウザ履歴があれば戻る、なければコラム一覧へ
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/?scrollTo=columns";
    }
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

