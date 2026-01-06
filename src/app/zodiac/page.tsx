import type { Metadata } from "next";
import { Suspense } from "react";
import { ZodiacQuiz } from "@/components/quiz/zodiac-quiz";
import { zodiacResults } from "@/lib/zodiac-data";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const res = params.res as string | undefined;

    let title = "내 안의 숨겨진 띠 찾기 - 동물 성향 심리테스트";
    let description = "태어난 해가 아닌, 성격으로 알아보는 나의 진짜 띠! 내 안에 숨어있는 12지신 동물을 찾아보세요.";

    if (res && zodiacResults[res]) {
        const result = zodiacResults[res];
        title = `나는 ${result.subtitle} '${result.name}' | 숨겨진 띠 찾기`;
        description = `나의 영혼의 동물은 ${result.name}입니다. ${result.description} 당신도 알아보세요!`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            images: [
                {
                    url: "/zodiac-og.png", // Fallback or need to generate generic one
                    width: 1200,
                    height: 630,
                }
            ]
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
