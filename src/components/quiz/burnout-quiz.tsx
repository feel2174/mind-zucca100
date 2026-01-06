"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { QuizActionButtons } from "@/components/quiz/quiz-action-buttons";

interface Question {
    id: number;
    text: string;
}

const questions: Question[] = [
    { id: 1, text: "아침에 일어날 때 피로감을 느끼며, 회사 갈 생각에 한숨이 나온다." },
    { id: 2, text: "업무에 집중하기 어렵고, 사소한 일에도 짜증이 난다." },
    { id: 3, text: "예전만큼 일을 잘 해내지 못하고 있다는 느낌이 든다." },
    { id: 4, text: "사람들과 대화하는 것이 귀찮고 피곤하게 느껴진다." },
    { id: 5, text: "이유 없이 몸이 아프거나 소화가 안 되는 경우가 잦다." },
    { id: 6, text: "직장 동료나 고객들에게 냉소적으로 대하게 된다." },
    { id: 7, text: "퇴근 후에도 업무 걱정 때문에 잠들기 힘들 때가 많다." },
    { id: 8, text: "내 능력이 부족해서 실패할 것 같은 불안감이 든다." },
    { id: 9, text: "취미 활동이나 즐기던 일들에 흥미를 잃었다." },
    { id: 10, text: "자주 건망증이 생기고 실수가 잦아졌다." },
    { id: 11, text: "주말에 아무것도 하지 않고 누워만 있고 싶다." },
    { id: 12, text: "성과를 내도 기쁘지 않고 허무한 기분이 든다." },
    { id: 13, text: "주변 사람들에게 짜증을 내는 횟수가 늘었다." },
    { id: 14, text: "직장을 그만두고 싶다는 생각을 자주 한다." },
    { id: 15, text: "미래에 대한 희망보다 막막함이 크게 느껴진다." },
];

const getResult = (score: number) => {
    if (score <= 30) {
        return {
            level: "쾌적함 (안전)",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-500",
            textColor: "text-emerald-600",
            emoji: "🔋",
            title: "현재 마음 상태는 아주 건강해요!",
            description: "적절한 스트레스 관리와 생활 루틴을 잘 유지하고 계시네요. 현재의 페이스를 잃지 않도록 나를 위한 보상을 가끔 챙겨주세요.",
            advice: ["지금처럼 꾸준한 운동과 수면 습관 유지하기", "주변 사람들과 긍정적인 에너지 나누기"],
        };
    } else if (score <= 45) {
        return {
            level: "주의 필요 (경고)",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-500",
            textColor: "text-amber-600",
            emoji: "⚠️",
            title: "피로가 조금씩 쌓이고 있어요.",
            description: "최근 스트레스가 늘어난 것 같네요. 무리하게 완벽을 추구하기보다 잠시 숨을 고를 시간이 필요합니다.",
            advice: ["하루 10분이라도 온전한 휴식 갖기", "업무와 일상의 경계 확실히 나누기", "좋아하는 취미 활동 다시 시작하기"],
        };
    } else if (score <= 60) {
        return {
            level: "지침 (위험)",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-500",
            textColor: "text-orange-600",
            emoji: "🔥",
            title: "강한 번아웃이 의심되는 상태예요.",
            description: "몸과 마음이 많이 지쳐있습니다. 모든 것을 혼자 짊어지려 하지 마세요. 주변에 도움을 요청하거나 짧은 휴가를 고려해야 할 때입니다.",
            advice: ["잠시 휴가를 내어 환경을 바꿔보기", "심리 상담이나 전문가의 도움 받아보기", "스스로에게 '오늘도 고생했다'고 다독여주기"],
        };
    } else {
        return {
            level: "심각한 상태 (위험)",
            bgColor: "bg-rose-50",
            borderColor: "border-rose-500",
            textColor: "text-rose-600",
            emoji: "🆘",
            title: "지금 당장 멈춤과 휴식이 필요합니다.",
            description: "위험 수치입니다. 우울감이나 무기력증이 동반되었을 가능성이 커요. 본인의 건강을 최우선으로 생각하고 전문가와 상담하시길 권장합니다.",
            advice: ["모든 업무 연락 차단하고 며칠간 푹 쉬기", "전문 심리 치료 및 상담 필수", "생활 패턴 전면 재검토"],
        };
    }
};

interface BurnoutQuizProps {
    title?: string;
    description?: string;
}

export function BurnoutQuiz({ title, description }: BurnoutQuizProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    // URL에서 결과값이 있는지 확인
    useEffect(() => {
        const res = searchParams.get("res");
        if (res && !isNaN(Number(res))) {
            setStep("result");
        }
    }, [searchParams]);

    const handleScore = (score: number) => {
        setTotalScore((prev) => prev + score);
        if (currentIdx + 1 < questions.length) {
            setCurrentIdx((prev) => prev + 1);
        } else {
            setStep("loading");
        }
    };

    useEffect(() => {
        if (step === "loading") {
            const timer = setTimeout(() => {
                router.push(`?res=${totalScore}`, { scroll: false });
                setStep("result");
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [step, totalScore, router]);

    const effectiveScore = useMemo(() => {
        const res = searchParams.get("res");
        if (res && !isNaN(Number(res))) return Number(res);
        return totalScore;
    }, [totalScore, searchParams]);

    const progress = Math.round(((currentIdx + 1) / questions.length) * 100);
    const result = getResult(effectiveScore);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `나의 번아웃 진단 결과: ${result.level}`,
                    text: `당신의 마음 건강 상태를 체크해보세요! #마음콕 #번아웃자가진단`,
                    url: url,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert("결과 주소가 복사되었습니다!");
            } catch (err) {
                console.error("Clipboard error:", err);
            }
        }
    };

    const handleTwitterShare = () => {
        const text = `나의 번아웃 진단 결과: ${result.level}\n당신의 마음 건강 상태를 체크해보세요! #마음콕 #번아웃자가진단`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
            <AnimatePresence mode="wait">
                {step === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col gap-8"
                    >
                        <header className="space-y-6">
                            <nav className="text-sm text-slate-500">
                                <Link href="/" className="hover:text-slate-900 transition-colors">
                                    홈
                                </Link>{" "}
                                <span aria-hidden>›</span>{" "}
                                <span className="font-semibold text-slate-800">번아웃 자가진단</span>
                            </nav>

                            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-slate-100 opacity-50 blur-3xl" />
                                <div className="relative z-10">
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                                        MENTAL CARE GUIDE
                                    </p>
                                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                        {title || "직장인 번아웃 자가진단"}
                                    </h1>
                                    <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                                        {description || "나의 번아웃 지수를 체크해보세요."}
                                    </p>
                                    <dl className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm font-medium">
                                        <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-orange-700">
                                            ⏱️ <span>약 2분 소요</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-slate-700">
                                            🏥 <span>전문가 조언</span>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </header>

                        <div className="rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-xl border border-slate-100">
                            <div className="mb-8 text-7xl animate-bounce-slow">🤯</div>
                            <h2 className="mb-4 text-3xl font-black text-slate-900 tracking-tight leading-tight">직장인 번아웃<br />자가진단</h2>
                            <p className="mb-10 text-slate-600 font-bold leading-relaxed">
                                요즘 따라 기운이 없고 회사 업무가 고통스럽나요?<br />
                                15가지 질문을 통해 나의 번아웃 지수를 체크해보세요.
                            </p>
                            <div className="space-y-6">
                                <Button size="xl" className="w-full bg-slate-900 hover:bg-slate-800 font-black shadow-lg shadow-slate-200" onClick={() => setStep("quiz")}>
                                    🚀 체크 시작하기
                                </Button>
                                <AdSenseSlot slot="1777541474" className="min-h-[100px]" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col gap-10"
                    >
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-orange-500"
                            />
                        </div>
                        <div className="text-center py-4">
                            <span className="text-xs font-black text-slate-400 tracking-[0.3em] uppercase block mb-4">Question {currentIdx + 1} / {questions.length}</span>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                                {questions[currentIdx].text}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: "전혀 아니다", score: 1 },
                                { label: "아니다", score: 2 },
                                { label: "보통이다", score: 3 },
                                { label: "그렇다", score: 4 },
                                { label: "매우 그렇다", score: 5 },
                            ].map((opt) => (
                                <motion.button
                                    key={opt.score}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleScore(opt.score)}
                                    className="rounded-3xl border-2 border-slate-50 bg-white px-8 py-6 text-xl font-black text-slate-700 transition-all hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-700 shadow-sm"
                                >
                                    {opt.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="h-24 w-24 animate-pulse rounded-full bg-orange-100 mb-8 flex items-center justify-center text-5xl">🔥</div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">스트레스 지수를<br />정밀 분석 중입니다</h3>
                        <p className="mt-4 text-slate-500 font-bold mb-10">내 마음의 온도는 몇 도일까요?</p>

                        <div className="w-full max-w-md bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100">
                            <AdSenseSlot slot="9839880235" className="min-h-[250px]" />
                        </div>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
                            <div className={`p-10 md:p-14 text-center relative overflow-hidden ${result.bgColor}`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="text-8xl mb-6 drop-shadow-lg animate-bounce-slow">{result.emoji}</div>
                                    <div className={`inline-block rounded-full bg-white/50 px-6 py-2 text-sm font-black ${result.textColor} mb-6 tracking-widest uppercase backdrop-blur-sm`}>
                                        BURNOUT LEVEL: {result.level}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">{result.title}</h2>
                                    <p className="mt-4 text-lg text-slate-700 font-medium leading-relaxed">{result.description}</p>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="rounded-[2.5rem] bg-slate-50 p-8 md:p-10 border border-slate-100">
                                    <h4 className="font-black text-sm uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                                        <span className="h-4 w-1.5 bg-orange-500 rounded-full" />
                                        Doctor's Prescription
                                    </h4>
                                    <ul className="space-y-4">
                                        {result.advice.map((a, i) => (
                                            <li key={i} className="flex items-start gap-5 text-lg font-bold text-slate-700 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:scale-[1.01] transition-transform">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">✓</span>
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />

                                <QuizActionButtons
                                    theme="orange"
                                    onShare={handleShare}
                                    onShareTwitter={handleTwitterShare}
                                    onRetry={() => {
                                        router.replace("/burnout", { scroll: false });
                                        setStep("intro");
                                        setCurrentIdx(0);
                                        setTotalScore(0);
                                    }}
                                    retryLabel="다시 진단하기"
                                    homeHref="/"
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <RecommendedTests currentSlug="/burnout" />
                        </div>
                        <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
