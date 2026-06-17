"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const TABOOLA_ARTICLE_ROUTES = new Set([
  "/",
  "/zodiac",
  "/dating",
  "/burnout",
  "/gongmuwon",
  "/job",
  "/money",
  "/workplace",
  "/olympic",
]);

function shouldRenderTaboola(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  if (TABOOLA_ARTICLE_ROUTES.has(pathname)) {
    return true;
  }

  return pathname.startsWith("/today-zodiac/") || pathname.startsWith("/horoscope/");
}

export function TaboolaSlots() {
  const pathname = usePathname();

  if (!shouldRenderTaboola(pathname)) {
    return null;
  }

  return (
    <>
      <aside className="pointer-events-none fixed right-6 top-1/2 z-30 hidden w-[320px] -translate-y-1/2 xl:block">
        <div className="pointer-events-auto rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl shadow-slate-200 backdrop-blur">
          <div id="taboola-right-rail-thumbnails" />
          <Script id="taboola-right-rail" strategy="afterInteractive">
            {`window._taboola = window._taboola || [];
_taboola.push({
  mode: 'thumbnails-rr',
  container: 'taboola-right-rail-thumbnails',
  placement: 'Right Rail Thumbnails',
  target_type: 'mix'
});`}
          </Script>
        </div>
      </aside>

      <div className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-4 py-6 shadow-lg shadow-slate-100 md:px-6">
          <div id="taboola-below-article-thumbnails" />
          <Script id="taboola-below-article" strategy="afterInteractive">
            {`window._taboola = window._taboola || [];
_taboola.push({
  mode: 'alternating-thumbnails-a',
  container: 'taboola-below-article-thumbnails',
  placement: 'Below Article Thumbnails',
  target_type: 'mix'
});`}
          </Script>
        </div>
      </div>
    </>
  );
}
