"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type QuizStep = "intro" | "quiz" | "loading" | "result";

interface UseQuizOptions {
    slug: string;
    loadingDuration?: number;
    onComplete?: (results: any) => void;
}

export function useQuiz({ slug, loadingDuration = 4000, onComplete }: UseQuizOptions) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<QuizStep>("intro");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    // Check for result in URL on mount
    useEffect(() => {
        const res = searchParams.get("res");
        if (res) {
            setStep("result");
        }
    }, [searchParams]);

    const startQuiz = useCallback(() => {
        setStep("quiz");
        setCurrentIdx(0);
    }, []);

    const completeQuiz = useCallback((resultValue: string) => {
        setStep("loading");

        setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("res", resultValue);
            router.push(`?${params.toString()}`, { scroll: false });
            setStep("result");
            if (onComplete) onComplete(resultValue);
        }, loadingDuration);
    }, [router, searchParams, loadingDuration, onComplete]);

    const restartQuiz = useCallback(() => {
        router.replace(slug, { scroll: false });
        setStep("intro");
        setCurrentIdx(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [router, slug]);

    const nextQuestion = useCallback((isLast: boolean) => {
        if (isLast) {
            return true; // Signal to complete
        } else {
            setCurrentIdx(prev => prev + 1);
            return false;
        }
    }, []);

    return {
        step,
        setStep,
        currentIdx,
        setCurrentIdx,
        startQuiz,
        completeQuiz,
        restartQuiz,
        nextQuestion,
        isGenerating,
        setIsGenerating,
    };
}
