import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Orbitron } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "中学硬式野球メディア | ボーイズ・シニア・ヤング徹底比較",
  description: "大阪・兵庫を中心とした中学硬式野球チーム（ボーイズ、シニア、ヤング）の検索サイト。元プロ野球選手監修のお役立ちコラムも配信。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenKaku.variable} ${orbitron.variable} font-sans bg-cyber-bg text-cyber-text`}>
        <div className="fixed inset-0 z-[-1] bg-cyber-grid opacity-20 pointer-events-none"></div>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

