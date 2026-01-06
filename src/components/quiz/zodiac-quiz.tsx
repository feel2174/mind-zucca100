"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { toPng } from "html-to-image";
import { Share2, Download, RotateCcw, Twitter } from "lucide-react";
import { zodiacQuestions, zodiacResults, type Answer } from "@/lib/zodiac-data";
import { QuizActionButtons } from "@/components/quiz/quiz-action-buttons";

export function ZodiacQuiz() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [birthYear, setBirthYear] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const storyCardRef = useRef<HTMLDivElement>(null);

    // URL Check for Direct Result Access
    useEffect(() => {
        const res = searchParams.get("res");
        if (res && zodiacResults[res]) {
            setStep("result");
        }
    }, [searchParams]);

    const handleAnswer = (answer: Answer) => {
        setScores((prev) => ({
            ...prev,
            [answer.animal]: (prev[answer.animal] || 0) + answer.score,
        }));

        if (currentIdx + 1 < zodiacQuestions.length) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setStep("loading");
        }
    };

    const finalAnimal = useMemo(() => {
        const res = searchParams.get("res");
        if (res && zodiacResults[res]) return res;

        // Find animal with highest score
        let maxScore = -1;
        let bestAnimal = "Rat"; // Default

        Object.entries(scores).forEach(([animal, score]) => {
            if (score > maxScore) {
                maxScore = score;
                bestAnimal = animal;
            } else if (score === maxScore) {
                // Tie-breaker: Random or predetermined priority (here just keep existing)
            }
        });
        return bestAnimal;
    }, [scores, searchParams]);

    useEffect(() => {
        if (step === "loading") {
            const timer = setTimeout(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("res", finalAnimal);
                router.push(`?${params.toString()}`, { scroll: false });
                setStep("result");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step, finalAnimal, router, searchParams]);

    const resultData = zodiacResults[finalAnimal];

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `2026년 내 운세는? : ${resultData.title}`,
                    text: `나는 ${resultData.name}띠! 2026년 행운 키워드는 '${resultData.luckKeyword}' 입니다. 당신의 숨겨진 띠도 확인해보세요! #신년운세 #마음콕 #숨겨진띠찾기`,
                    url: url,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert("링크가 복사되었습니다! 친구들에게 공유해보세요.");
            } catch (err) {
                console.error("Clipboard error:", err);
            }
        }
    };

    // Share to Twitter specifically
    const handleTwitterShare = () => {
        const text = `2026년 내 운세가 대박인 이유? 🧧\n\n나의 숨겨진 띠: [${resultData.name}]\n행운 키워드: [${resultData.luckKeyword}]\n\n당신의 2026년 수호 동물도 확인해보세요! 👇`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleDownloadStoryCard = useCallback(async () => {
        if (!storyCardRef.current) return;

        setIsGenerating(true);
        try {
            const dataUrl = await toPng(storyCardRef.current, {
                cacheBust: true,
                width: 1080,
                height: 1920,
                style: {
                    transform: "scale(1)",
                    transformOrigin: "top left",
                }
            });
            const link = document.createElement("a");
            link.download = `mind-zucca-zodiac-${finalAnimal}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Error generating image:", err);
            alert("이미지 저장 중 오류가 발생했습니다.");
        } finally {
            setIsGenerating(false);
        }
    }, [finalAnimal]);

    const progress = Math.round(((currentIdx + 1) / zodiacQuestions.length) * 100);

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
            <AnimatePresence mode="wait">
                {/* INTRO STEP */}
                {step === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col gap-8"
                    >
                        <header className="space-y-6 text-left">
                            <nav className="text-sm text-slate-500">
                                <Link href="/" className="hover:text-violet-600 transition-colors">
                                    홈
                                </Link>{" "}
                                <span aria-hidden>›</span>{" "}
                                <span className="font-semibold text-slate-800">심리테스트</span>
                            </nav>
                            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-2xl shadow-violet-200 border border-slate-800 text-white">
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 h-64 w-64 rounded-full bg-violet-600 opacity-20 blur-3xl" />
                                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 h-40 w-40 rounded-full bg-indigo-500 opacity-20 blur-3xl" />

                                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full border border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse whitespace-nowrap z-20">
                                    2026 병오년(丙午年) 기념 리미티드 에디션 🧧
                                </div>

                                <div className="relative z-10 text-center py-6 mt-4">
                                    <div className="mb-4 text-6xl animate-pulse">🔮</div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                                        2026 신년운세 &<br />
                                        <span className="text-violet-400">숨겨진 띠</span> 찾기
                                    </h1>
                                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                                        태어난 띠는 바꿀 수 없지만,<br className="hidden md:block" />
                                        <span className="text-white font-bold">영혼의 띠</span>가 2026년 운명을 결정합니다.
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-xl border border-slate-100">
                            <div className="grid grid-cols-4 gap-4 mb-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🦄", "🐑", "🐵", "🐔", "🐶", "🐷"].map((emoji, i) => (
                                    <div key={i} className="text-4xl">{emoji}</div>
                                ))}
                            </div>

                            <h2 className="mb-6 text-2xl font-bold text-slate-800 leading-tight">
                                겉모습과 다른<br />
                                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-black text-3xl">나의 진짜 본성</span>은 무엇일까요?
                            </h2>

                            <div className="space-y-6 max-w-md mx-auto">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400">당신의 출생연도를 알려주세요</label>
                                    <input
                                        type="number"
                                        value={birthYear}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 4) setBirthYear(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const year = parseInt(birthYear);
                                                if (year >= 1900 && year <= 2026) setStep("quiz");
                                            }
                                        }}
                                        placeholder="예: 2000"
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 px-4 text-center text-3xl font-black text-slate-800 placeholder:text-slate-200 focus:border-violet-500 focus:outline-none transition-all shadow-inner bg-slate-50"
                                    />
                                </div>
                                <Button
                                    size="xl"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-16 rounded-2xl text-xl shadow-lg shadow-slate-200 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setStep("quiz")}
                                    disabled={!birthYear || parseInt(birthYear) < 1900 || parseInt(birthYear) > 2026}
                                >
                                    테스트 시작하기 🌙
                                </Button>
                                <p className="text-xs text-slate-400 font-medium">✨ 12문항 / 약 2분 소요</p>
                            </div>
                        </div>
                        <AdSenseSlot slot="1777541474" className="min-h-[100px]" />
                    </motion.div>
                )}

                {/* QUIZ STEP */}
                {step === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-8 max-w-2xl mx-auto"
                    >
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            />
                        </div>

                        <div className="text-center py-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-black uppercase tracking-widest mb-4">
                                Question {currentIdx + 1} / {zodiacQuestions.length}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-normal word-keep-all">
                                {zodiacQuestions[currentIdx].question}
                            </h3>
                        </div>

                        <div className="grid gap-3">
                            {zodiacQuestions[currentIdx].answers.map((ans, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(ans)}
                                    className="w-full rounded-2xl border border-slate-100 bg-white p-5 md:p-6 text-left text-lg font-medium text-slate-700 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50/30 hover:shadow-md hover:font-bold hover:text-violet-900"
                                >
                                    {ans.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* LOADING STEP */}
                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="relative mb-8 h-32 w-32">
                            <div className="absolute inset-0 animate-ping rounded-full bg-violet-100 opacity-75" />
                            <div className="absolute inset-4 animate-ping rounded-full bg-violet-200 opacity-75 delay-75" />
                            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-6xl shadow-xl text-white">
                                🔮
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                            <span className="text-violet-600">{birthYear}년생</span>의 운명과<br />
                            숨겨진 본성을 조합 중입니다...
                        </h3>
                        <p className="text-slate-500 font-medium">별자리의 기운을 모으는 중 ✨</p>

                        <div className="mt-12 w-full max-w-md bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <AdSenseSlot slot="9839880235" className="min-h-[250px]" />
                        </div>
                    </motion.div>
                )}

                {/* RESULT STEP */}
                {step === "result" && resultData && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        {/* Main Result Card */}
                        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border-4 border-slate-50">
                            <div className={`bg-gradient-to-br ${resultData.color} p-10 text-center text-white relative overflow-hidden`}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold mb-6 border border-white/10">
                                        나의 숨겨진 영혼의 띠
                                    </div>
                                    <div className="text-9xl mb-6 drop-shadow-2xl filter hover:scale-110 transition-transform duration-300 cursor-default">
                                        {resultData.image}
                                    </div>
                                    <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight drop-shadow-sm">
                                        {resultData.name}
                                    </div>
                                    <div className="text-xl md:text-2xl font-bold opacity-90 mb-4">
                                        {resultData.title.split(',')[0]}
                                    </div>
                                    <p className="text-sm md:text-base opacity-75 max-w-sm mx-auto leading-relaxed border-t border-white/20 pt-4">
                                        "{resultData.subtitle}"
                                    </p>

                                    <div className="mt-8 inline-flex flex-col items-center animate-bounce">
                                        <span className="text-xs font-bold text-amber-200 mb-1 uppercase tracking-widest">2026 LUCK KEYWORD</span>
                                        <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-black text-xl shadow-lg border-2 border-amber-300">
                                            🧧 {resultData.luckKeyword}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10">
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-lg leading-loose text-slate-700 font-medium mb-8 text-center break-keep">
                                        {resultData.description}
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 mb-10">
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="text-violet-500">👍</span> 나의 장점
                                        </h4>
                                        <ul className="space-y-2">
                                            {resultData.traits.map((trait, i) => (
                                                <li key={i} className="text-slate-600 text-sm font-bold flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                    {trait}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="text-amber-500">⚡</span> 조언 한마디
                                        </h4>
                                        <ul className="space-y-2">
                                            {resultData.tips.map((tip, i) => (
                                                <li key={i} className="text-slate-600 text-sm font-bold flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Chemistry Block */}
                                <div className="flex flex-col md:flex-row gap-4 mb-10">
                                    <div className="flex-1 bg-green-50 rounded-2xl p-4 flex items-center justify-between border border-green-100">
                                        <div className="text-xs font-black text-green-600 uppercase">Best Match</div>
                                        <div className="text-right">
                                            <div className="text-2xl">{zodiacResults[resultData.bestMatch].image}</div>
                                            <div className="text-sm font-bold text-slate-900">{zodiacResults[resultData.bestMatch].name}</div>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-red-50 rounded-2xl p-4 flex items-center justify-between border border-red-100">
                                        <div className="text-xs font-black text-red-600 uppercase">Worst Match</div>
                                        <div className="text-right">
                                            <div className="text-2xl">{zodiacResults[resultData.worstMatch].image}</div>
                                            <div className="text-sm font-bold text-slate-900">{zodiacResults[resultData.worstMatch].name}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <QuizActionButtons
                                    theme="violet"
                                    onShare={handleShare}
                                    onShareTwitter={handleTwitterShare}
                                    onSaveImage={handleDownloadStoryCard}
                                    isSavingImage={isGenerating}
                                    onRetry={() => {
                                        setStep("intro");
                                        setCurrentIdx(0);
                                        setScores({});
                                        router.replace("/zodiac", { scroll: false });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <RecommendedTests currentSlug="/zodiac" />
                        </div>
                        <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Image Gen Card */}
            <div className="fixed left-[-9999px] top-[-9999px]">
                <div
                    ref={storyCardRef}
                    className={`flex flex-col items-center justify-between bg-white text-slate-900`}
                    style={{ width: "1080px", height: "1920px", padding: "80px" }}
                >
                    <div className="text-center w-full">
                        <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-3xl font-black text-white mb-12 tracking-widest shadow-xl border-4 border-amber-400">
                            2026 LIMITED EDITION
                        </div>
                        <h2 className="text-6xl font-black text-slate-900 leading-tight mb-8">
                            <span className="text-red-600">붉은 말의 해</span>,<br />
                            나를 지켜줄 수호 동물은?
                        </h2>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center w-full my-12">
                        <div className={`relative w-full aspect-square rounded-[100px] bg-gradient-to-br ${resultData.color} flex items-center justify-center shadow-2xl overflow-hidden`}>
                            <div className="text-[400px] drop-shadow-2xl">{resultData.image}</div>
                            <div className="absolute inset-0 border-[20px] border-white/20 rounded-[100px]" />
                        </div>
                    </div>

                    <div className="w-full text-center relative z-10">
                        <div className="inline-block px-8 py-3 rounded-full bg-[#371D1E] text-amber-400 text-3xl font-black mb-12 tracking-widest border-2 border-amber-500 shadow-xl">
                            2026 丙午年 수호 부적 🧧
                        </div>
                        <h1 className="text-9xl font-black text-slate-900 mb-4 drop-shadow-sm">{resultData.name}</h1>
                        <div className="mb-12">
                            <span className="inline-block bg-red-600 text-white text-4xl font-black px-8 py-3 rounded-2xl shadow-lg border-4 border-red-400">
                                행운: {resultData.luckKeyword}
                            </span>
                        </div>
                        <p className="text-4xl text-slate-500 font-bold mb-12 max-w-3xl mx-auto leading-relaxed">
                            "{resultData.subtitle}"
                        </p>

                        <div className="grid grid-cols-2 gap-8 w-full bg-slate-50 rounded-[60px] p-12 mb-12 border border-slate-100">
                            <div className="text-left">
                                <div className="text-3xl font-black text-violet-500 mb-6">GOOD</div>
                                <div className="text-4xl font-bold text-slate-800 flex items-center gap-4">
                                    <span className="text-5xl">{zodiacResults[resultData.bestMatch].image}</span>
                                    {zodiacResults[resultData.bestMatch].name}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-slate-400 mb-6">BAD</div>
                                <div className="text-4xl font-bold text-slate-800 flex items-center justify-end gap-4">
                                    {zodiacResults[resultData.worstMatch].name}
                                    <span className="text-5xl">{zodiacResults[resultData.worstMatch].image}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-slate-400 tracking-[0.3em] uppercase">
                            mind.zucca100.com | 2026 운세
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
