import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DatingStyleQuiz } from "@/components/quiz/dating-style-quiz";

const pageTitle = "MBTI 연애 성향 테스트 - 나의 연애 스타일과 환상의 파트너";
const pageDescription =
    "12개의 질문으로 나의 MBTI 연애 성향을 분석하고, 나에게 가장 잘 맞는 환상의 짝꿍 유형을 추천해 드립니다. 3분 만에 무료로 확인하세요.";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const res = params.res as string | undefined;

    let title = pageTitle;
    let description = pageDescription;

    if (res) {
        // DatingStyleQuiz의 결과를 여기서도 참조할 수 있도록 가져오기 (실제로는 데이터 분리가 좋음)
        const mbti = res.toUpperCase();
        const titles: Record<string, string> = {
            ISTJ: "신뢰의 정석, 계획적인 수호자",
            ENFP: "재기발랄한 연인, 사랑이 넘치는 영혼",
            ISFJ: "헌신적인 사랑꾼, 다정한 지지자",
            INFJ: "통찰력 있는 연인, 깊은 감정의 소유자",
            INTJ: "전략적 파트너, 지적인 완벽주의자",
            ISTP: "쿨한 현실주의자, 도구 쓰는 연애가",
            ISFP: "다정한 예술가, 순간을 즐기는 연인",
            INFP: "낭만적인 몽상가, 이상적인 사랑꾼",
            INTP: "지적인 탐구자, 독립적인 연애 스타일",
            ESTP: "활동적인 모험가, 열정적인 연애",
            ESFP: "즐거운 파티피플, 사교적인 연인",
            ENTP: "기발한 토론가, 지적인 자극을 즐기는 연애",
            ESTJ: "추진력 있는 리더, 든든한 현실주의자",
            ESFJ: "따뜻한 조력자, 배려 깊은 연인",
            ENFJ: "열정적인 리더, 정의로운 연애",
            ENTJ: "전략적인 개척자, 야망 있는 파트너",
        };

        if (titles[mbti]) {
            title = `나의 연애 성향은: ${titles[mbti]} (${mbti}) | 마음콕`;
            description = `당신의 연애 DNA 분석 결과: ${titles[mbti]}입니다. 지금 바로 확인해보세요!`;
        }
    }

    return {
        title,
        description,
        alternates: {
            canonical: "/dating",
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://mind.zucca100.com/dating${res ? `?res=${res}` : ""}`,
            images: [
                {
                    url: "/open-graph.png",
                    width: 1200,
                    height: 630,
                    alt: "MBTI 연애 성향 테스트",
                },
            ],
        },
    };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: pageTitle,
    description: pageDescription,
    url: "https://mind.zucca100.com/dating",
    about: {
        "@type": "DefinedTerm",
        name: "MBTI 연애",
    },
    numberOfQuestions: 12,
    inLanguage: "ko-KR",
    publisher: {
        "@type": "Organization",
        name: "마음콕",
    },
};

export default function DatingTestPage() {
    return (
        <div className="min-h-screen px-4 py-12 md:px-6 bg-slate-50">
            <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
                <header className="space-y-6">
                    <nav className="text-sm text-slate-500">
                        <Link href="/" className="hover:text-pink-600 transition-colors">
                            홈
                        </Link>{" "}
                        <span aria-hidden>›</span>{" "}
                        <span className="font-semibold text-slate-800">연애 성향 테스트</span>
                    </nav>

                    <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-pink-50 border border-pink-100">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-pink-50 opacity-50 blur-3xl" />
                        <div className="relative z-10">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-500">
                                LOVE & SYMBOL
                            </p>
                            <h1 className="mt-3 text-4xl font-extrabold text-slate-900 tracking-tight">
                                {pageTitle}
                            </h1>
                            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                                {pageDescription}
                            </p>
                            <dl className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                                <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1.5 text-pink-700">
                                    ⏱️ <span>약 3분 소요</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-indigo-700">
                                    🧬 <span>16가지 MBTI 매칭</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-slate-700">
                                    💖 <span>무료 심리검사</span>
                                </div>
                            </dl>
                        </div>
                    </div>
                </header>

                <Suspense fallback={<div className="flex h-64 items-center justify-center font-bold text-pink-400">테스트 준비 중...</div>}>
                    <DatingStyleQuiz />
                </Suspense>
            </article>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
