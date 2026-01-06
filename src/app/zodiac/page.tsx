import type { Metadata } from "next";
import { Suspense } from "react";
import { ZodiacQuiz } from "@/components/quiz/zodiac-quiz";
import { zodiacResults } from "@/lib/zodiac-data";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const res = params.res as string | undefined;

    let title = "2026 신년운세 & 숨겨진 띠 찾기 - 붉은 말의 해 특별판";
    let description = "태어난 띠보다 중요한 영혼의 띠! 2026년 대박 행운을 가져다줄 나의 수호 동물을 찾아보세요.";

    if (res && zodiacResults[res]) {
        const result = zodiacResults[res];
        title = `2026년 내 운세는? '${result.name}' 수호 동물 확인 | 신년운세`;
        description = `나의 2026년 행운 키워드는 '${result.luckKeyword}'입니다. 당신의 수호 동물과 대박 운세를 확인해보세요!`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        }
    };
}

export default function ZodiacPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-noto-sans">
            <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                <ZodiacQuiz />
            </Suspense>
        </div>
    );
}
