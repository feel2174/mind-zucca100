import type { Metadata } from "next";
import { Suspense } from "react";
import { BurnoutQuiz } from "@/components/quiz/burnout-quiz";
import { generateQuizMetadata } from "@/lib/metadata-utils";

const pageTitle = "직장인 번아웃 자가진단 - 나의 마음 건강 상태 체크";
const pageDescription =
    "최근 부쩍 기운이 없고 회사 업무가 힘들게 느껴지나요? 15가지 문항으로 나의 번아웃 상태를 진단하고 전문가의 조언을 확인해보세요.";
const slug = "/burnout";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const res = params.res as string | undefined;

    let title = pageTitle;
    let description = pageDescription;

    if (res && !isNaN(Number(res))) {
        const score = Number(res);
        let level = "";
        if (score <= 30) level = "쾌적함 (안전)";
        else if (score <= 45) level = "주의 필요 (경고)";
        else if (score <= 60) level = "지침 (위험)";
        else level = "심각한 상태 (위험)";

        title = `나의 번아웃 진단 결과: ${level}`;
        description = `진단 결과, 현재 마음 상태는 '${level}'입니다. 상세 처방전과 관리 팁을 확인해보세요.`;
    }

    return generateQuizMetadata({
        title,
        description,
        slug,
        keywords: ["번아웃", "자가진단", "스트레스", "직장인", "심리테스트"],
    });
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "직장인 번아웃 자가진단",
    headline: pageTitle,
    description: pageDescription,
    url: `https://mind.zucca100.com${slug}`,
    numberOfQuestions: 15,
    educationalAlignment: "Mental Health",
    inLanguage: "ko-KR",
};

export default function BurnoutTestPage() {
    return (
        <div className="min-h-screen px-4 py-12 md:px-6 bg-slate-50">
            <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
                <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-slate-400">진단 준비 중...</div>}>
                    <BurnoutQuiz title={pageTitle} description={pageDescription} />
                </Suspense>
            </article>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
