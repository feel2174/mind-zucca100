import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MoneyHabitQuiz } from "@/components/quiz/money-habit-quiz";

const pageTitle = "나의 돈관리 성향 테스트 (짠돌이? YOLO? 투자러?)";
const pageDescription =
  "20~40대 라이프스타일 데이터를 기반으로 월급 루틴, 소비 습관, 투자 방식을 10문항으로 분석해 초안정형부터 모험가형까지 결과를 제공합니다.";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const res = params.res as string | undefined;

  let title = pageTitle;
  let description = pageDescription;

  if (res) {
    const titles: Record<string, string> = {
      safe: "초안정형 예금러",
      planner: "계획적인 재테크러",
      yolo: "욜로형 소비러",
      adventure: "한방 노리는 모험가형",
    };
    const key = res.toLowerCase();
    if (titles[key]) {
      title = `나의 돈관리 성향: ${titles[key]} | 마음콕`;
      description = `분석 결과, 당신은 '${titles[key]}' 유형입니다. 나만의 정밀 재테크 리포트와 행동 가이드를 확인해보세요!`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: "/money",
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mind.zucca100.com/money${res ? `?res=${res}` : ""}`,
    },
  };
}

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
        <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-emerald-400">분석 중...</div>}>
          <MoneyHabitQuiz title={pageTitle} description={pageDescription} />
        </Suspense>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

