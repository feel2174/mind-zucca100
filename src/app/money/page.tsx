import type { Metadata } from "next";
import Link from "next/link";
import { MoneyHabitQuiz } from "@/components/quiz/money-habit-quiz";

const pageTitle = "나의 돈관리 성향 테스트 (짠돌이? YOLO? 투자러?)";
const pageDescription =
  "20~40대 라이프스타일 데이터를 기반으로 월급 루틴, 소비 습관, 투자 방식을 10문항으로 분석해 초안정형부터 모험가형까지 결과를 제공합니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/money",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "https://mind.zucca100.com/money",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: pageTitle,
  description: pageDescription,
  url: "https://mind.zucca100.com/money",
  about: {
    "@type": "DefinedTerm",
    name: "돈관리 성향",
  },
  audience: {
    "@type": "Audience",
    audienceType: "20~40대",
  },
  numberOfQuestions: 10,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: "마음콕",
  },
};

export default function MoneyTestPage() {
  return (
    <div className="min-h-screen px-4 py-12 md:px-6">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-6">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-indigo-600">
              홈
            </Link>{" "}
            <span aria-hidden>›</span>{" "}
            <span className="font-semibold text-slate-800">{pageTitle}</span>
          </nav>
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
              MONEY ROUTINE CHECK
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              {pageTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{pageDescription}</p>
            <dl className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                ⏱️ <span>평균 4분 소요</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                🧮 <span>점수 기반 성향 분석</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                🧾 <span>결과별 행동 가이드 제공</span>
              </div>
            </dl>
          </div>
        </header>

        <MoneyHabitQuiz />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

