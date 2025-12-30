"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";

type MBTIDimension = "EI" | "SN" | "TF" | "JP";

interface Answer {
    text: string;
    dimension: MBTIDimension;
    value: 1 | -1; // 1: E/S/T/J, -1: I/N/F/P
}

interface Question {
    question: string;
    dimension: MBTIDimension;
    answers: Answer[];
}

interface ResultContent {
    title: string;
    subtitle: string;
    description: string;
    traits: string[];
    tips: string[];
    matching: string;
    image: string;
}

const questions: Question[] = [
    {
        question: "주말 데이트, 더 선호하는 방식은?",
        dimension: "EI",
        answers: [
            { text: "사람들 많은 핫플에서 활기차게 즐기기", dimension: "EI", value: 1 },
            { text: "조용한 카페나 집에서 둘이서만 도란도란", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "연인과 싸웠을 때 나의 모습은?",
        dimension: "TF",
        answers: [
            { text: "무엇이 문제인지 논리적으로 따져본다", dimension: "TF", value: 1 },
            { text: "서운한 감정을 먼저 공감받고 싶다", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "여행 계획을 세울 때 나는?",
        dimension: "JP",
        answers: [
            { text: "시간별로 동선을 짜야 마음이 편하다", dimension: "JP", value: 1 },
            { text: "그날 기분에 따라 가고 싶은 곳을 정한다", dimension: "JP", value: -1 },
        ],
    },
    {
        question: "연인이 '나 오늘 우울해서 쇼핑했어'라고 한다면?",
        dimension: "TF",
        answers: [
            { text: "어떤 거 샀어? 쇼핑하니까 기분이 좀 나아졌어?", dimension: "TF", value: 1 },
            { text: "왜 우울했어? 무슨 일 있었어? ㅠㅠ", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "데이트 중 갑자기 비가 온다면?",
        dimension: "SN",
        answers: [
            { text: "가까운 실내 장소를 빠르게 검색한다", dimension: "SN", value: 1 },
            { text: "비 오는 것도 나름 낭만 있다며 좋아한다", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "처음 보는 사람들과의 더블 데이트?",
        dimension: "EI",
        answers: [
            { text: "금방 친해져서 분위기를 주도한다", dimension: "EI", value: 1 },
            { text: "연인 옆에 꼭 붙어 어색함을 견딘다", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "연인에게 줄 선물을 고를 때?",
        dimension: "SN",
        answers: [
            { text: "상대방에게 지금 꼭 필요한 실용적인 것", dimension: "SN", value: 1 },
            { text: "나중에 기억에 남을만한 의미 있는 것", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "데이트 약속 시간이 다가오면?",
        dimension: "JP",
        answers: [
            { text: "시간 맞춰 미리 나갈 준비를 마친다", dimension: "JP", value: 1 },
            { text: "준비하다 보니 항상 조금씩 늦는다", dimension: "JP", value: -1 },
        ],
    },
    {
        question: "연인과 영화를 본 뒤 나누는 대화는?",
        dimension: "SN",
        answers: [
            { text: "줄거리나 인상 깊은 장면에 대해 이야기한다", dimension: "SN", value: 1 },
            { text: "영화의 주제나 '만약 저 상황이라면?' 같은 상상을 한다", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "사랑을 표현하는 가장 좋은 방법은?",
        dimension: "TF",
        answers: [
            { text: "도움이 필요한 일을 직접 해결해 주는 것", dimension: "TF", value: 1 },
            { text: "따뜻한 말 한마디와 공감해 주는 것", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "연인과의 연락 빈도는?",
        dimension: "EI",
        answers: [
            { text: "자주 연락하며 일상을 공유하는 게 좋다", dimension: "EI", value: 1 },
            { text: "각자의 시간을 존중하며 적당히 하는 게 좋다", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "데이트 코스가 갑자기 바뀌어야 한다면?",
        dimension: "JP",
        answers: [
            { text: "당황스럽지만 플랜 B를 빠르게 찾는다", dimension: "JP", value: 1 },
            { text: "오히려 좋아! 새로운 즐거움을 기대한다", dimension: "JP", value: -1 },
        ],
    },
];

const results: Record<string, ResultContent> = {
    ISTJ: {
        title: "신뢰의 정석, 계획적인 수호자",
        subtitle: "안정적이고 책임감 있는 연애 스타일",
        description: "한 번 마음을 열면 변치 않는 해바라기 같은 스타일입니다. 화려하진 않아도 묵묵히 연인을 챙기는 든든한 버팀목이 되어줍니다.",
        traits: ["약속 시간을 철저히 지킴", "실무적인 도움을 많이 줌", "감정 표현이 조금 서툴 수 있음"],
        tips: ["가끔은 연인의 감정에 먼저 공감해 보세요", "예상치 못한 작은 서프라이즈도 좋아요"],
        matching: "ENFP, ENFJ",
        image: "💍",
    },
    ENFP: {
        title: "재기발랄한 연인, 사랑이 넘치는 영혼",
        subtitle: "지루할 틈 없는 이벤트 제조기",
        description: "긍정적인 에너지가 넘치며 연인에게 끊임없이 애정을 표현합니다. 함께 있으면 세상이 밝아지는 기분을 느끼게 해주는 매력쟁이입니다.",
        traits: ["표현력이 매우 풍부함", "창의적인 데이트 아이디어", "구속받는 것은 싫어함"],
        tips: ["가끔은 현실적인 문제에도 집중해 보세요", "약속 시간을 지키려 노력하면 좋아요"],
        matching: "INFJ, INTJ",
        image: "✨",
    },
};

const getResult = (mbti: string): ResultContent => {
    if (results[mbti]) return results[mbti];

    const titles: Record<string, string> = {
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

    return {
        title: titles[mbti] || "나만의 연애 스타일",
        subtitle: `${mbti} 유형의 특별한 연애 방식`,
        description: `${mbti} 유형은 자신만의 독특한 매력으로 연인에게 다가갑니다. 서로의 차이를 이해하고 맞춰가는 과정에서 더 큰 행복을 느낍니다.`,
        traits: ["개성 있는 소통 방식", "자신만의 연애 철학", "솔직한 감정 표현"],
        tips: ["상대방의 언어로 소통해 보세요", "함께 성장하는 관계를 만들어 가요"],
        matching: "어울리는 파트너를 찾아보세요!",
        image: "💖",
    };
};

export function DatingStyleQuiz() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });

    // URL에서 결과값이 있는지 확인
    useEffect(() => {
        const res = searchParams.get("res");
        if (res && results[res.toUpperCase()]) {
            setStep("result");
        }
    }, [searchParams]);

    const handleAnswer = (answer: Answer) => {
        setScores((prev) => ({
            ...prev,
            [answer.dimension]: prev[answer.dimension] + answer.value,
        }));

        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setStep("loading");
        }
    };

    const mbti = useMemo(() => {
        const res = searchParams.get("res");
        if (res && results[res.toUpperCase()]) return res.toUpperCase();

        return (
            (scores.EI >= 0 ? "E" : "I") +
            (scores.SN >= 0 ? "S" : "N") +
            (scores.TF >= 0 ? "T" : "F") +
            (scores.JP >= 0 ? "J" : "P")
        );
    }, [scores, searchParams]);

    useEffect(() => {
        if (step === "loading") {
            const timer = setTimeout(() => {
                const finalMbti = (scores.EI >= 0 ? "E" : "I") +
                    (scores.SN >= 0 ? "S" : "N") +
                    (scores.TF >= 0 ? "T" : "F") +
                    (scores.JP >= 0 ? "J" : "P");

                router.push(`?res=${finalMbti}`, { scroll: false });
                setStep("result");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [step, scores, router]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `나의 연애 성향: ${resultData.title}`,
                    text: `당신의 연애 DNA를 확인해보세요! #마음콕 #MBTI연애`,
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

    const progress = Math.round(((currentIdx + 1) / questions.length) * 100);
    const resultData = getResult(mbti);

    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
            <AnimatePresence mode="wait">
                {step === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-2xl border border-pink-50"
                    >
                        <div className="mb-8 text-7xl animate-bounce-slow">💘</div>
                        <h2 className="mb-4 text-4xl font-black text-slate-900 tracking-tight">MBTI 연애 성향<br />테스트</h2>
                        <p className="mb-10 text-slate-600 font-medium leading-relaxed">
                            연애할 때 나는 어떤 유형일까?<br />
                            12가지 질문으로 알아보는 나의 연애 스타일!
                        </p>
                        <div className="space-y-6">
                            <Button size="xl" className="w-full bg-gradient-to-r from-pink-500 to-rose-600 font-black shadow-pink-200" onClick={() => setStep("quiz")}>
                                시작하기
                            </Button>
                            <AdSenseSlot slot="8424458319" className="min-h-[100px]" />
                        </div>
                    </motion.div>
                )}

                {step === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                            />
                        </div>
                        <div className="text-center">
                            <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Question {currentIdx + 1}</span>
                            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                {questions[currentIdx].question}
                            </h3>
                        </div>
                        <div className="grid gap-4">
                            {questions[currentIdx].answers.map((ans, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(ans)}
                                    className="w-full rounded-3xl border-2 border-slate-50 bg-white p-6 md:p-8 text-left text-lg font-bold text-slate-700 shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50/50 hover:text-pink-600"
                                >
                                    {ans.text}
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
                        <div className="relative mb-8 h-24 w-24">
                            <div className="absolute inset-0 animate-ping rounded-full bg-pink-100" />
                            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-5xl shadow-lg">✨</div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">당신의 연애 DNA를<br />분석하고 있어요</h3>
                        <p className="mt-4 text-slate-500 font-bold mb-8">잠시만 기다려주세요!</p>

                        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sponsored</p>
                            <AdSenseSlot slot="8424458319" className="min-h-[250px]" />
                        </div>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
                            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-12 text-center text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.image}</div>
                                <div className="inline-block rounded-full bg-white/20 px-6 py-1.5 text-sm font-black backdrop-blur-md">
                                    {mbti} Type
                                </div>
                                <h2 className="mt-6 text-4xl font-black tracking-tight">{resultData.title}</h2>
                                <p className="mt-2 text-pink-100 font-bold text-lg">{resultData.subtitle}</p>
                            </div>
                            <div className="p-8 md:p-12">
                                <p className="text-xl leading-relaxed text-slate-700 font-medium">{resultData.description}</p>

                                <div className="mt-10 grid gap-6 md:grid-cols-2">
                                    <div className="rounded-[2rem] bg-pink-50/50 p-8 border border-pink-100">
                                        <h4 className="text-xs font-black text-pink-400 uppercase tracking-widest mb-4">Love Traits</h4>
                                        <ul className="space-y-4">
                                            {resultData.traits.map((t, i) => (
                                                <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                                                    <span className="h-3 w-3 rounded-full bg-pink-400 shadow-sm" />
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-[2rem] bg-indigo-50/50 p-8 border border-indigo-100">
                                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Growth Tips</h4>
                                        <ul className="space-y-4">
                                            {resultData.tips.map((t, i) => (
                                                <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                                                    <span className="h-3 w-3 rounded-full bg-indigo-400 shadow-sm" />
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-10 rounded-[2rem] border-4 border-dashed border-slate-100 p-10 text-center bg-slate-50/30">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">환상의 케미 짝꿍</h4>
                                    <p className="text-3xl font-black text-slate-900">{resultData.matching}</p>
                                </div>

                                <AdSenseSlot slot="8424458319" className="my-10 min-h-[100px]" />

                                <div className="mt-10 flex flex-col gap-4">
                                    <Button size="xl" className="w-full bg-pink-600 hover:bg-pink-700 font-black shadow-lg shadow-pink-100" onClick={handleShare}>
                                        🔗 결과 공유하기
                                    </Button>
                                    <Button size="xl" variant="outline" className="w-full border-2 font-black" onClick={() => {
                                        router.replace("/dating", { scroll: false });
                                        setStep("intro");
                                        setCurrentIdx(0);
                                        setScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
                                    }}>
                                        🔄 다시 테스트하기
                                    </Button>
                                    <Button variant="ghost" className="text-slate-400 font-bold" asChild>
                                        <Link href="/">다른 테스트 보러가기</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <AdSenseSlot slot="8424458319" format="fluid" className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
