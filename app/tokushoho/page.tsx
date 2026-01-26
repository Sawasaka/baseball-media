import type { Metadata } from "next";
import Link from "next/link";
import { IoBaseball, IoArrowBack, IoDocumentText } from "react-icons/io5";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記｜ROOKIE SMART",
  description: "株式会社ルーキースマートジャパンが提供するサービスに関する特定商取引法に基づく表記です。",
};

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-red-500/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <IoArrowBack className="text-lg" />
              <span className="text-sm font-mono">トップページへ戻る</span>
            </Link>
            <div className="flex items-center gap-2">
              <IoBaseball className="text-xl text-red-500" />
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold tracking-wide">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white">
                    中学硬式野球
                  </span>
                  <span className="text-cyan-400 mx-0.5">／</span>
                  <span className="text-red-400 font-black">
                    チーム検索・比較
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <IoDocumentText className="text-3xl text-cyan-400" />
            <h1 className="text-2xl md:text-3xl font-bold">
              特定商取引法に基づく表記
            </h1>
          </div>
          <p className="text-white/50 text-sm font-mono">
            // LEGAL_INFORMATION
          </p>
        </div>

        {/* Table */}
        <div className="border-2 border-red-500/30 bg-black/50 overflow-hidden">
          {/* Table Header Glow */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500" />
          
          <div className="divide-y divide-white/10">
            {/* 販売業者 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                販売業者
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                株式会社ルーキースマートジャパン
              </div>
            </div>

            {/* 代表者 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                代表者
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                沢坂弘樹
              </div>
            </div>

            {/* 所在地 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                所在地
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                〒104-0061<br />
                東京都中央区銀座1-12-4 N&E BLD.7階
              </div>
            </div>

            {/* 電話番号 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                電話番号
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                090-2283-9505
              </div>
            </div>

            {/* メールアドレス */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                メールアドレス
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <a 
                  href="mailto:h.sawasaka@rookiesmart.jp"
                  className="text-pink-400 hover:text-pink-300 underline transition-colors"
                >
                  h.sawasaka@rookiesmart.jp
                </a>
              </div>
            </div>

            {/* 販売価格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                販売価格
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <div className="space-y-2">
                  <p className="font-bold text-yellow-400">全チャンネル利用プラン</p>
                  <p>月額 <span className="text-xl font-bold text-white">19,800円</span>（税込）</p>
                  <ul className="text-white/70 text-sm space-y-1 mt-2">
                    <li>▸ 全5つのサブチャンネルが使い放題</li>
                    <li>▸ 2人シェア利用：9,900円/人（税込）</li>
                  </ul>
                  <p className="text-xs text-white/50 mt-2">
                    ※家族・兄弟・友達とシェアOK
                  </p>
                </div>
              </div>
            </div>

            {/* 送料・手数料 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                送料・手数料
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                なし（デジタルサービスのため）
              </div>
            </div>

            {/* 支払方法 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                支払方法
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                クレジットカード（Stripe決済）
              </div>
            </div>

            {/* 支払時期 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                支払時期
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <p>お申込み完了時にクレジットカード決済が行われます。</p>
                <p className="text-white/70 text-sm mt-1">
                  2回目以降は初回決済日から1ヶ月ごとに自動課金されます。
                </p>
              </div>
            </div>

            {/* サービス提供時期 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                サービス提供時期
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                お申込み完了日よりサービスをご利用いただけます。
              </div>
            </div>

            {/* 返品・キャンセル */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                返品・キャンセル
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <p>デジタルサービスの性質上、お申込み後の返金はお受けできません。</p>
                <p className="text-white/70 text-sm mt-1">
                  解約をご希望の場合は、次回課金日の前日までにお問い合わせください。
                </p>
              </div>
            </div>

            {/* 対象サービス */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                対象サービス
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">▸</span>
                    <span>英語学習サービス</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">▸</span>
                    <span>ITアカデミー</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">▸</span>
                    <span>オンライン野球塾</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">▸</span>
                    <span>スカウトサービス</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>キャリアサービス</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">▸</span>
                    <span>チーム楽</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 動作環境 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
              <div className="text-cyan-400 font-bold text-sm md:text-base font-mono">
                動作環境
              </div>
              <div className="md:col-span-2 text-white/90 text-sm md:text-base">
                <p>インターネット接続環境</p>
                <p className="text-white/70 text-sm mt-1">
                  推奨ブラウザ：Google Chrome、Safari、Firefox、Microsoft Edge（最新版）
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:from-red-400 hover:to-pink-400 transition-all duration-300"
          >
            <IoArrowBack />
            <span>トップページへ戻る</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-white/30 text-xs font-mono">
            © 株式会社ルーキースマートジャパン // ALL_RIGHTS_RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}

