import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BurnoutQuiz } from "@/components/quiz/burnout-quiz";

const pageTitle = "직장인 번아웃 자가진단 - 나의 마음 건강 상태 체크";
const pageDescription =
    "최근 부쩍 기운이 없고 회사 업무가 힘들게 느껴지나요? 15가지 문항으로 나의 번아웃 상태를 진단하고 전문가의 조언을 확인해보세요.";

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

        title = `나의 번아웃 진단 결과: ${level} | 마음콕`;
        description = `진단 결과, 현재 마음 상태는 '${level}'입니다. 상세 처방전과 관리 팁을 확인해보세요.`;
    }

    return {
        title,
        description,
        alternates: {
            canonical: "/burnout",
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://mind.zucca100.com/burnout${res ? `?res=${res}` : ""}`,
        },
    };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: pageTitle,
    description: pageDescription,
    url: "https://mind.zucca100.com/burnout",
    numberOfQuestions: 15,
    inLanguage: "ko-KR",
};

export default function BurnoutTestPage() {
    return (
        <div className="min-h-screen px-4 py-12 md:px-6 bg-slate-50">
            <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
                <header className="space-y-6">
                    <nav className="text-sm text-slate-500">
                        <Link href="/" className="hover:text-slate-900 transition-colors">
                            홈
                        </Link>{" "}
                        <span aria-hidden>›</span>{" "}
                        <span className="font-semibold text-slate-800">번아웃 자가진단</span>
                    </nav>

                    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                            MENTAL CARE GUIDE
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
                            {pageTitle}
                        </h1>
                        <p className="mt-4 text-lg text-slate-600">
                            {pageDescription}
                        </p>
                    </div>
                </header>

                <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-slate-400">진단 준비 중...</div>}>
                    <BurnoutQuiz />
                </Suspense>
            </article>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
