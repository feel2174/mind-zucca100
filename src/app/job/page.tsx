import type { Metadata } from "next";
import Link from "next/link";
import { JobTypeQuiz } from "@/components/quiz/job-type-quiz";

const pageTitle = "내게 맞는 직무 유형 찾기";
const pageDescription =
  "성향·에너지·대인관계 선호도를 통해 사무/기획·영업·개발·콘텐츠 중 가장 적합한 직무를 추천해 드립니다. 취업 준비생과 이직 고민자에게 추천합니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/job",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "https://mind.zucca100.com/job",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: pageTitle,
  description: pageDescription,
  url: "https://mind.zucca100.com/job",
  about: {
    "@type": "DefinedTerm",
    name: "직무 유형",
  },
  audience: {
    "@type": "Audience",
    audienceType: "취업 준비생, 이직 고민자",
  },
  numberOfQuestions: 10,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: "마음콕",
  },
};

export default function JobTypeTestPage() {
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
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
              CAREER MATCH
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              {pageTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{pageDescription}</p>
            <dl className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                ⏱️ <span>평균 3분 소요</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                🧮 <span>점수 기반 직무 추천</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1">
                💼 <span>취업·이직 준비생 추천</span>
              </div>
            </dl>
          </div>
        </header>

        <JobTypeQuiz />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}


