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
  title: "ROOKIE SMART | 中学硬式野球チーム検索",
  description: "大阪・兵庫を中心とした中学硬式野球チーム（ボーイズ、シニア、ヤング）の検索・比較サイト。あなたの次のステージを見つけよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${notoSansJP.variable} ${orbitron.variable} font-sans bg-cyber-bg text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
