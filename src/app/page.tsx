import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailSubscribe } from "@/components/email-subscribe";

const tests = [
  {
    title: "나의 돈관리 성향 테스트",
    description: "월급 루틴과 소비 습관으로 초안정형부터 욜로형까지 성향을 분석해요.",
    slug: "/money",
    duration: "약 4분 소요",
    badge: "NEW",
    tags: ["재테크", "소비 성향", "라이프스타일"],
  },
  {
    title: "공무원 직렬 추천 테스트",
    description: "10개의 질문으로 나에게 맞는 행정·기술·세무 등 직렬을 추천해요.",
    slug: "/gongmuwon",
    duration: "약 3분 소요",
    badge: "HOT",
    tags: ["진로", "공무원", "적성"],
  },
  {
    title: "내게 맞는 직무 유형 찾기",
    description: "성향·에너지·대인관계로 사무/기획·영업·개발·콘텐츠 중 적합한 직무를 추천해요.",
    slug: "/job",
    duration: "약 3분 소요",
    badge: "NEW",
    tags: ["취업", "직무", "커리어"],
  },
  {
    title: "회사에서 나는 어떤 캐릭터일까?",
    description: "회의·메신저·보고서 상황으로 정리왕 PM부터 인싸 분위기메이커까지 분석해요.",
    slug: "/workplace",
    duration: "약 3분 소요",
    badge: "NEW",
    tags: ["직장인", "협업", "성향"],
  },
  {
    title: "MBTI 연애 성향 테스트 (예정)",
    description: "곧 공개! 성향에 맞는 연애 팁과 파트너 유형을 알려드릴게요.",
    slug: "#",
    duration: "Coming soon",
    badge: "UPCOMING",
    tags: ["연애", "MBTI"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "마음콕 심리테스트",
  url: "https://mind.zucca100.com",
  description: "다양한 심리테스트와 진로 테스트를 한 곳에서 만나보세요.",
  publisher: {
    "@type": "Organization",
    name: "마음콕",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://mind.zucca100.com?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "마음콕 심리테스트 모음",
  description: "공무원 직렬 추천, 돈관리 성향, 직무 유형, 직장인 캐릭터 등 다양한 심리·진로 테스트",
  itemListElement: tests.map((test, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: test.title,
    description: test.description,
    url: `https://mind.zucca100.com${test.slug}`,
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-12 md:px-6">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl sm:p-8 md:p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
            <p className="w-fit rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:px-4 sm:text-sm sm:tracking-[0.3em]">
              MindKok Tests
            </p>
            <h1 className="text-2xl font-bold leading-snug sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl">
              <span className="block">클릭 한 번으로</span>
              <span className="block">즐기는 맞춤</span>
              <span className="block">심리·진로 테스트 허브</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              공무원 직렬 추천, 연애 심리, 업무 적성까지.
              <span className="hidden sm:inline"> </span>
              <br className="sm:hidden" />
              <span className="sm:inline">이제 마음콕에서 테스트 버튼만 누르면 바로 시작할 수 있어요.</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-full justify-center bg-white text-indigo-700 font-bold shadow-xl hover:bg-white/95 hover:shadow-2xl hover:scale-105 transition-all px-6 py-3.5 text-base sm:w-auto sm:px-7 sm:text-lg">
                <Link href="/gongmuwon">🚀 첫 테스트 바로 시작</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-center border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all px-5 py-3.5 text-sm font-semibold sm:w-auto sm:px-6 sm:text-lg"
              >
                <Link href="mailto:devzucca@gmail.com" className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                  <span>테스트 제안하기</span>
                  <span className="text-xs font-normal text-white/80 sm:text-base">
                    devzucca@gmail.com
                  </span>
                </Link>
              </Button>
            </div>
            <p className="text-xs text-white/70 sm:text-sm">
              2025년 11월 기준 업데이트 · 모바일에서도 3분 만에 완료
            </p>
          </div>
        </section>

        <section>
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-lg">
                  🧩
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    전체 심리·진로 테스트
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:mt-1.5 sm:text-sm">
                    원하는 테스트를 클릭하면 바로 시작할 수 있어요
                  </p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <span className="text-sm font-semibold text-indigo-600">
                  {tests.length}
                </span>
                <span className="text-xs text-slate-500">개</span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {tests.map((test) => (
              <article
                key={test.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                    {test.badge}
                  </span>
                  <span className="text-xs text-slate-400">{test.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {test.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {test.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                  {test.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  className="mt-6 w-full justify-between"
                  variant="secondary"
                >
                  <Link
                    aria-label={`${test.title} 시작하기`}
                    href={test.slug === "#" ? "/" : test.slug}
                    className="flex w-full items-center justify-between text-slate-900 hover:text-indigo-600"
                  >
                    <span>
                      {test.slug === "#" ? "준비 중이에요" : "바로 시작하기"}
                    </span>
                    <span aria-hidden className="text-lg text-slate-500">
                      →
                    </span>
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <EmailSubscribe />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </div>
  );
}
