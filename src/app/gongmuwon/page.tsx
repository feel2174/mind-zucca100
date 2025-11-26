import type { Metadata } from "next";
import Link from "next/link";
import { CivilServiceQuiz } from "@/components/quiz/civil-service-quiz";

const pageTitle = "공무원 직렬 추천 테스트";
const pageDescription =
  "10개의 질문으로 나에게 가장 잘 맞는 공무원 직렬(행정·기술·세무·보안·교육)을 추천해 드립니다. 모바일에서도 3분만에 완료하세요.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/gongmuwon",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "https://mind.zucca100.com/gongmuwon",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: pageTitle,
  description: pageDescription,
  url: "https://mind.zucca100.com/gongmuwon",
  about: {
    "@type": "DefinedTerm",
    name: "공무원 직렬",
  },
  numberOfQuestions: 10,
  typicalAgeRange: "18-45",
  educationalLevel: "All",
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: "마음콕",
  },
};

export default function GongmuwonTestPage() {
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
              CAREER INSIGHT
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
                🧮 <span>점수 기반 추천 로직</span>
              </div>
            </dl>
          </div>
        </header>

        <CivilServiceQuiz />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

