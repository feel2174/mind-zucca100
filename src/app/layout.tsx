import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_KR, Gowun_Dodum } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TaboolaSlots } from "@/components/ads/taboola-slots";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans_KR({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
  subsets: ["latin"], // Note: IBM Plex Sans KR often needs specific subsetting or non-preloading for CJK
  preload: false,
});

const gowunDodum = Gowun_Dodum({
  weight: ["400"],
  variable: "--font-gowun-dodum",
  display: "swap",
  preload: false,
});

const siteName = "마음콕 심리테스트";
const title = "마음콕 심리테스트 - 클릭 한 번으로 즐기는 맞춤 심리·진로 테스트";
const description =
  "MBTI 연애 성향, 번아웃 자가진단, 공무원 직렬 추천, 돈관리 성향까지. 다양한 심리·진로 테스트를 한 곳에서 만나보세요. 3분 만에 나에게 맞는 결과를 확인해보세요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mind.zucca100.com"),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "심리테스트",
    "MBTI 연애 테스트",
    "번아웃 자가진단",
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
        <Script id="taboola-loader" strategy="beforeInteractive">
          {`(function () {
  var PUBLISHER_ID = 'zucca-network';
  var PAGE_TYPE = 'article';

  var LOADER_URL = '//cdn.taboola.com/libtrc/' + PUBLISHER_ID + '/loader.js';
  var LOADER_PRIVACY_URL = '//static.tblcontent.com/libtrc/' + PUBLISHER_ID + '/loader.privacy.js';
  var PIXEL_URL = 'https://static.qovani.com/libtrc/r5?type=pixel&publisher=' + PUBLISHER_ID;
  var SCRIPT_ID = 'tb_loader_script';

  window._taboola = window._taboola || [];

  var pageTypePush = {};
  pageTypePush[PAGE_TYPE] = 'auto';
  _taboola.push(pageTypePush);

  new Image().src = PIXEL_URL;

  var firstScript = document.getElementsByTagName('script')[0];

  function injectLoader(id, src, fallbackSrc) {
    if (document.getElementById(id)) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    s.id = id;
    if (fallbackSrc) {
      s.onerror = function () {
        if (s.parentNode) s.parentNode.removeChild(s);
        injectLoader(SCRIPT_ID + '_fb', fallbackSrc, null);
      };
    }
    firstScript.parentNode.insertBefore(s, firstScript);
  }

  injectLoader(SCRIPT_ID, LOADER_URL, LOADER_PRIVACY_URL);

  if (window.performance && typeof window.performance.mark === 'function') {
    window.performance.mark('tbl_ic');
  }
})();`}
        </Script>
      </head>
      <body
        className={`${ibmPlexSans.variable} ${gowunDodum.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <TaboolaSlots />
        <Script id="taboola-flush" strategy="afterInteractive">
          {`window._taboola = window._taboola || [];
_taboola.push({ flush: true });`}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
