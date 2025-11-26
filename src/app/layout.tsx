import type { Metadata } from "next";
import Script from "next/script";
import { Nanum_Gothic, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-gothic",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const siteName = "마음콕 심리테스트";
const title = "마음콕 심리테스트 - 나에게 맞는 공무원 직렬 찾기";
const description =
  "다양한 심리테스트와 진로 테스트를 한 곳에서 만나보세요. 공무원 직렬 추천 테스트로 나에게 맞는 직렬을 3분 안에 확인해보세요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mind.zucca100.com"),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "심리테스트",
    "공무원 직렬 테스트",
    "직업 적성 테스트",
    "심리 검사",
    "무료 테스트",
    "진로 테스트",
    "적성 검사",
    "직무 유형 테스트",
    "돈관리 성향 테스트",
    "직장인 캐릭터 테스트",
  ],
  authors: [{ name: "마음콕" }],
  creator: "마음콕",
  publisher: "마음콕",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "https://mind.zucca100.com",
    siteName,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "마음콕 심리테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/open-graph.png"],
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
    // 구글 서치 콘솔 인증 코드 (나중에 추가)
    // google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="c3c33666e6bd71a25a863f9a974bbea64792fc98" />
      </head>
      <body
        className={`${nanumGothic.variable} ${notoSans.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
