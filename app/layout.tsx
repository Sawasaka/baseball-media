import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
  description: "全国47都道府県の中学硬式野球チーム（ボーイズリーグ・シニアリーグ・ヤングリーグ）を都道府県・リーグ・支部から検索・比較。大阪・兵庫・東京・神奈川・愛知・福岡など、各地域のチーム情報を網羅。チーム選びに役立つ情報とコラムで「後悔しないチーム選び」をサポート。",
  keywords: [
    // メインキーワード
    "中学硬式野球", "硬式野球", "中学野球",
    // リーグ名
    "ボーイズリーグ", "シニアリーグ", "ヤングリーグ", "ボーイズ", "シニア", "ヤング",
    // 検索意図
    "中学野球チーム", "野球クラブ", "チーム検索", "チーム比較", "チーム選び", "クラブチーム",
    // 主要都道府県
    "大阪 中学硬式野球", "兵庫 硬式野球", "東京 ボーイズリーグ", "神奈川 シニア", "愛知 中学野球", "福岡 硬式野球",
    // 悩み系
    "ボーイズ シニア 違い", "野球進路", "甲子園 出身",
  ],
  openGraph: {
    title: "全国の中学硬式野球チーム検索・比較サイト｜ROOKIE SMART",
    description: "北海道から沖縄まで、全国47都道府県の中学硬式野球チーム（ボーイズ・シニア・ヤング）を検索・比較。選手と保護者の「後悔しないチーム選び」をサポート。",
    type: "website",
    locale: "ja_JP",
    siteName: "ROOKIE SMART",
    url: "https://baseball.rookiesmart-jp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "全国の中学硬式野球チーム検索・比較サイト｜ROOKIE SMART",
    description: "全国47都道府県の中学硬式野球チーム（ボーイズ・シニア・ヤング）を都道府県から検索・比較できるプラットフォーム。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console認証用（後で設定）
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${orbitron.variable} font-sans bg-cyber-bg text-white antialiased`}>
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Disable automatic page_view; we send page_view on route changes via client component.
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
            <GoogleAnalytics gaId={GA_ID} />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
