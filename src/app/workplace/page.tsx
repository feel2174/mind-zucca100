import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { WorkplaceCharacterQuiz } from "@/components/quiz/workplace-character-quiz";

const pageTitle = "회사에서 나는 어떤 캐릭터일까?";
const pageDescription =
  "회의·메신저·보고서·야근 상황을 통해 정리왕 PM부터 인싸 분위기메이커까지 당신의 직장 내 캐릭터를 분석합니다. 직장인과 취준생에게 추천합니다.";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const res = params.res as string | undefined;

  let title = pageTitle;
  let description = pageDescription;

  if (res) {
    const titles: Record<string, string> = {
      pm: "정리왕 PM형",
      idea: "아이디어 폭탄형",
      fixer: "사일런트 픽서형",
      insider: "인싸 분위기메이커형",
    };
    const key = res.toLowerCase();
    if (titles[key]) {
      title = `나의 직장인 캐릭터: ${titles[key]} | 마음콕`;
      description = `회사에서 나의 캐릭터는 '${titles[key]}'입니다. 직장에서의 핵심 강점과 성공 팁을 확인해보세요!`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: "/workplace",
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mind.zucca100.com/workplace${res ? `?res=${res}` : ""}`,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: pageTitle,
  description: pageDescription,
  url: "https://mind.zucca100.com/workplace",
  about: {
    "@type": "DefinedTerm",
    name: "직장인 캐릭터",
  },
  audience: {
    "@type": "Audience",
    audienceType: "직장인, 취준생, 인턴",
  },
  numberOfQuestions: 10,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    name: "마음콕",
  },
};

export default function WorkplaceCharacterTestPage() {
  return (
    <div className="min-h-screen px-4 py-12 md:px-6">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-indigo-400">분석 중...</div>}>
          <WorkplaceCharacterQuiz title={pageTitle} description={pageDescription} />
        </Suspense>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}


