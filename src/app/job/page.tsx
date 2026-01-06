import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JobTypeQuiz } from "@/components/quiz/job-type-quiz";

const pageTitle = "내게 맞는 직무 유형 찾기";
const pageDescription =
  "성향·에너지·대인관계 선호도를 통해 사무/기획·영업·개발·콘텐츠 중 가장 적합한 직무를 추천해 드립니다. 취업 준비생과 이직 고민자에게 추천합니다.";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const res = params.res as string | undefined;

  let title = pageTitle;
  let description = pageDescription;

  if (res) {
    const titles: Record<string, string> = {
      office: "사무/기획형",
      sales: "영업/세일즈형",
      tech: "개발/기술형",
      content: "콘텐츠/마케팅형",
    };
    const key = res.toLowerCase();
    if (titles[key]) {
      title = `나의 직무 적성: ${titles[key]} | 마음콕`;
      description = `분석 결과, 당신은 '${titles[key]}' 유형에 가장 적합합니다. 상세 특징과 커리어 팁을 확인해보세요!`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: "/job",
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mind.zucca100.com/job${res ? `?res=${res}` : ""}`,
    },
  };
}

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
        <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-indigo-400">분석 중...</div>}>
          <JobTypeQuiz title={pageTitle} description={pageDescription} />
        </Suspense>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}


