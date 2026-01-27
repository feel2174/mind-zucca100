import type { Metadata } from "next";
import { Suspense } from "react";
import { OlympicQuiz } from "@/components/quiz/olympic-quiz";

const pageTitle = "국가대표 관상 테스트 - 나의 동계올림픽 종목 찾기";
const pageDescription =
    "내가 올림픽에 나간다면 어떤 종목에서 금메달을 딸 수 있을까요? 12가지 질문으로 알아보는 나의 동계스포츠 성격 테스트를 체험해 보세요!";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const res = params.res as string | undefined;

    let title = pageTitle;
    let description = pageDescription;

    if (res) {
        const resultKey = res.toUpperCase();
        const titles: Record<string, string> = {
            ESTP: "쇼트트랙",
            INFP: "피겨 스케이팅",
            INFJ: "피겨 스케이팅",
            ISTP: "스켈레톤",
            ESTJ: "컬링",
            ISTJ: "컬링",
            ESFP: "아이스하키",
            ENTP: "스노보드",
            ENFP: "스노보드",
            ENFJ: "아이스하키",
            ENTJ: "아이스하키",
            ISFP: "매스스타트",
            INTP: "컬링",
        };

        if (titles[resultKey]) {
            title = `나의 국가대표 관상은: ${titles[resultKey]} | 마음콕`;
            description = `나의 동계올림픽 잠재력 분석 결과: ${titles[resultKey]} 국가대표입니다. 지금 바로 확인해보세요!`;
        }
    }

    return {
        title,
        description,
        alternates: {
            canonical: "/olympic",
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://mind.zucca100.com/olympic${res ? `?res=${res}` : ""}`,
        },
    };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: pageTitle,
    description: pageDescription,
    url: "https://mind.zucca100.com/olympic",
    about: {
        "@type": "DefinedTerm",
        name: "동계올림픽 테스트",
    },
    numberOfQuestions: 12,
    inLanguage: "ko-KR",
    publisher: {
        "@type": "Organization",
        name: "마음콕",
    },
};

export default function OlympicPage() {
    return (
        <div className="min-h-screen px-4 py-12 md:px-6 bg-slate-50">
            <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
                <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-blue-400">국가대표 선발 준비 중...</div>}>
                    <OlympicQuiz title={pageTitle} description={pageDescription} />
                </Suspense>
            </article>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
