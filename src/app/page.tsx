"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { motion } from "framer-motion";

const tests = [
  {
    title: "MBTI 연애 성향 테스트",
    description: "12개의 질문으로 나의 연애 스타일과 환상의 파트너를 분석해 보세요.",
    slug: "/dating",
    duration: "약 3분 소요",
    badge: "HOT",
    tags: ["연애", "MBTI", "심리"],
    icon: "💘",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "직장인 번아웃 자가진단",
    description: "최근 부쩍 기운이 없나요? 15가지 질문으로 나의 마음 건강을 체크하세요.",
    slug: "/burnout",
    duration: "약 3분 소요",
    badge: "NEW",
    tags: ["직장인", "건강", "심리"],
    icon: "🤯",
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "나의 돈관리 성향 테스트",
    description: "월급 루틴과 소비 습관으로 초안정형부터 욜로형까지 성향을 분석해요.",
    slug: "/money",
    duration: "약 4분 소요",
    badge: "NEW",
    tags: ["재테크", "소비 성향", "생활"],
    icon: "💰",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "공무원 직렬 추천 테스트",
    description: "10개의 질문으로 나에게 맞는 행정·기술·세무 등 직렬을 추천해요.",
    slug: "/gongmuwon",
    duration: "약 3분 소요",
    badge: "NEW",
    tags: ["진로", "공무원", "적성"],
    icon: "🎯",
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "내게 맞는 직무 유형 찾기",
    description: "성향·에너지·대인관계로 사무/기획·영업·개발·콘텐츠 중 적합한 직무를 추천해요.",
    slug: "/job",
    duration: "약 3분 소요",
    badge: "TREND",
    tags: ["취업", "직무", "커리어"],
    icon: "💼",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "회사에서 나는 어떤 캐릭터일까?",
    description: "회의·메신저·보고서 상황으로 정리왕 PM부터 인싸 분위기메이커까지 분석해요.",
    slug: "/workplace",
    duration: "약 3분 소요",
    badge: "FUN",
    tags: ["직장인", "협업", "성향"],
    icon: "🏢",
    color: "from-violet-500 to-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-noto-sans overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 md:px-6 lg:py-20">
        {/* Hero Section */}
        <section className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20"
          >
            <div className="flex-1 space-y-10 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 border border-indigo-100"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-sm font-bold text-indigo-600 tracking-normal">마음콕 심리테스트 Hub</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-7xl leading-[1.15] tracking-tighter"
                >
                  당신의 마음을 콕,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                    진심으로 마주하는 시간
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-500 font-medium md:max-w-2xl leading-[1.6] tracking-tight"
                >
                  MBTI 연애 성향부터 직장인 번아웃 자가진단까지.<br className="hidden md:block" />
                  일상에 작은 통찰을 더하는 6가지 맞춤 솔루션을 지금 확인해보세요.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8"
              >
                <Button size="xl" asChild className="w-full md:w-auto px-10 h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95 font-black text-xl tracking-tight whitespace-nowrap">
                  <Link href="/dating" className="block w-full">💘 전체 테스트 시작하기</Link>
                </Button>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="inline-block h-12 w-12 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-xl shadow-sm">
                        {["💖", "✨", "🎯"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-start justify-center leading-none gap-2 pt-0.5">
                    <span className="text-[15px] font-black text-slate-800 tracking-tight whitespace-nowrap">10,000+ 참여 중</span>
                    <span className="text-[12px] font-bold text-slate-400 tracking-tight whitespace-nowrap">실시간 분석 데이터</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative flex-1 hidden lg:block"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {tests.slice(0, 4).map((test, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    className="aspect-square bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center gap-3 border border-slate-50"
                  >
                    <span className="text-5xl">{test.icon}</span>
                    <span className="text-sm font-black text-slate-900">{test.title.split(' ')[0]}</span>
                  </motion.div>
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px]" />
            </motion.div>
          </motion.div>
        </section>

        <AdSenseSlot slot="1777541474" className="mb-12 w-full min-h-[100px]" />

        {/* Content Section */}
        <section>
          <div className="mb-12 flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              맞춤 심리 & 직무 테스트
              <span className="text-lg font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{tests.length}</span>
            </h2>
            <p className="text-slate-500 font-bold">당신에게 필요한 통찰을 3분 만에 확인하세요</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tests.map((test) => (
              <motion.article
                key={test.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 border border-slate-100"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${test.color} text-3xl shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                    {test.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase mb-1 shadow-sm ${test.badge === "HOT" ? "bg-rose-500" :
                      test.badge === "NEW" ? "bg-emerald-500" :
                        test.badge === "TREND" ? "bg-amber-500" :
                          "bg-indigo-500"
                      }`}>
                      {test.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">{test.duration}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-[15px] font-medium leading-relaxed text-slate-500">
                    {test.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {test.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold text-slate-400 px-3 py-1 rounded-full bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link href={test.slug} className="absolute inset-0 z-20" aria-label={test.title} />

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between group-hover:border-indigo-50">
                  <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">테스트 알아보기</span>
                  <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <AdSenseSlot slot="2152961907" format="fluid" className="w-full mt-16" />

      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "마음콕 심리테스트",
              url: "https://mind.zucca100.com",
              description: "다양한 심리테스트와 진로 테스트를 한 곳에서 만나보세요.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://mind.zucca100.com?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "마음콕 심리테스트 모음",
              description: "MBTI 연애 성향, 번아웃 자가진단, 공무원 직렬 추천, 돈관리 성향 등 다양한 심리·진로 테스트",
              itemListElement: tests.map((test, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: test.title,
                description: test.description,
                url: `https://mind.zucca100.com${test.slug}`,
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
