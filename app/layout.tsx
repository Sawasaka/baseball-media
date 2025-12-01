import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans",
  display: "swap",
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "全国の中学硬式野球チーム検索・比較サイト｜ボーイズ・シニア・ヤング対応｜ROOKIE SMART",
  description: "全国の中学硬式野球チーム（ボーイズリーグ・シニアリーグ・ヤングリーグ）をエリアや特徴から検索・比較できるプラットフォーム。支部・地域・進路実績・練習環境など、クラブ選びに役立つ情報とコラムを提供し、選手と保護者の「後悔しないチーム選び」をサポートします。",
  keywords: ["中学硬式野球", "ボーイズリーグ", "シニアリーグ", "ヤングリーグ", "中学野球チーム", "野球クラブ", "チーム検索", "チーム比較", "野球進路"],
  openGraph: {
    title: "全国の中学硬式野球チーム検索・比較サイト｜ROOKIE SMART",
    description: "全国の中学硬式野球チーム（ボーイズ・シニア・ヤング）をエリアや特徴から検索・比較。選手と保護者の「後悔しないチーム選び」をサポート。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "全国の中学硬式野球チーム検索・比較サイト｜ROOKIE SMART",
    description: "全国の中学硬式野球チーム（ボーイズ・シニア・ヤング）をエリアや特徴から検索・比較できるプラットフォーム。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${orbitron.variable} font-sans bg-cyber-bg text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
