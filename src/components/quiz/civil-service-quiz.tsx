"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { AdSenseSlot } from "@/components/ui/adsense-slot";

type ResultKey = "admin" | "tech" | "education" | "security" | "tax";

interface Answer {
  text: string;
  scores: Record<ResultKey, number>;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface ResultContent {
  icon: string;
  title: string;
  subtitle: string;
  strengths: string[];
  workplaces: string[];
}

const infoLink = "https://zucca100.com/government-employees/";

const questions: Question[] = [
  {
    question: "평소 어떤 업무 스타일을 선호하시나요?",
    answers: [
      { text: "📋 체계적이고 규칙적인 업무", scores: { admin: 3, tech: 1, education: 2, security: 2, tax: 3 } },
      { text: "💡 창의적이고 도전적인 업무", scores: { admin: 1, tech: 3, education: 3, security: 1, tax: 1 } },
      { text: "👥 사람들과 소통하는 업무", scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 2 } },
      { text: "🔒 안정적이고 신중한 업무", scores: { admin: 2, tech: 2, education: 1, security: 3, tax: 3 } },
    ],
  },
  {
    question: "문제 해결 시 어떤 방식을 선호하시나요?",
    answers: [
      { text: "📊 데이터와 통계를 활용", scores: { admin: 3, tech: 3, education: 1, security: 2, tax: 3 } },
      { text: "🗣️ 대화와 토론을 통해", scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 } },
      { text: "📖 매뉴얼과 규정을 따라", scores: { admin: 3, tech: 2, education: 2, security: 3, tax: 3 } },
      { text: "🚀 직감과 경험을 바탕으로", scores: { admin: 1, tech: 2, education: 2, security: 2, tax: 1 } },
    ],
  },
  {
    question: "어떤 근무 환경을 선호하시나요?",
    answers: [
      { text: "🏢 사무실에서 개인 업무", scores: { admin: 3, tech: 3, education: 1, security: 1, tax: 3 } },
      { text: "🎓 교육기관이나 학교", scores: { admin: 1, tech: 1, education: 3, security: 1, tax: 1 } },
      { text: "🚔 현장에서 활동적인 업무", scores: { admin: 1, tech: 1, education: 1, security: 3, tax: 1 } },
      { text: "👥 팀 단위 협업 환경", scores: { admin: 2, tech: 2, education: 2, security: 2, tax: 2 } },
    ],
  },
  {
    question: "스트레스를 받는 상황은?",
    answers: [
      { text: "📋 복잡한 서류 처리", scores: { admin: 1, tech: 2, education: 3, security: 2, tax: 1 } },
      { text: "💻 기술적 문제 해결", scores: { admin: 2, tech: 1, education: 2, security: 3, tax: 2 } },
      { text: "👨‍👩‍👧‍👦 사람들과의 갈등", scores: { admin: 3, tech: 3, education: 1, security: 2, tax: 3 } },
      { text: "⚡ 급작스런 상황 변화", scores: { admin: 3, tech: 2, education: 2, security: 1, tax: 3 } },
    ],
  },
  {
    question: "가장 관심 있는 분야는?",
    answers: [
      { text: "💰 경제, 재정, 세무", scores: { admin: 2, tech: 1, education: 1, security: 1, tax: 3 } },
      { text: "🖥️ IT, 컴퓨터, 기술", scores: { admin: 1, tech: 3, education: 1, security: 2, tax: 1 } },
      { text: "📚 교육, 문화, 예술", scores: { admin: 1, tech: 1, education: 3, security: 1, tax: 1 } },
      { text: "🛡️ 안전, 치안, 보안", scores: { admin: 1, tech: 1, education: 1, security: 3, tax: 1 } },
    ],
  },
  {
    question: "업무에서 가장 중요하게 생각하는 것은?",
    answers: [
      { text: "📏 정확성과 완성도", scores: { admin: 3, tech: 3, education: 2, security: 2, tax: 3 } },
      { text: "⚡ 신속성과 효율성", scores: { admin: 2, tech: 2, education: 1, security: 3, tax: 2 } },
      { text: "🤝 협력과 소통", scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 } },
      { text: "🎯 목표 달성", scores: { admin: 2, tech: 2, education: 2, security: 2, tax: 2 } },
    ],
  },
  {
    question: "학창시절 가장 자신 있던 과목은?",
    answers: [
      { text: "📊 수학, 통계", scores: { admin: 2, tech: 3, education: 1, security: 1, tax: 3 } },
      { text: "🗣️ 국어, 언어", scores: { admin: 3, tech: 1, education: 3, security: 2, tax: 2 } },
      { text: "🌍 사회, 역사", scores: { admin: 3, tech: 1, education: 2, security: 2, tax: 2 } },
      { text: "🔬 과학, 실험", scores: { admin: 1, tech: 3, education: 2, security: 2, tax: 1 } },
    ],
  },
  {
    question: "사람들과 만날 때 어떤 역할을 주로 하시나요?",
    answers: [
      { text: "📝 회의록 작성이나 정리", scores: { admin: 3, tech: 2, education: 1, security: 1, tax: 3 } },
      { text: "🎤 발표나 진행", scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 } },
      { text: "💡 아이디어 제안", scores: { admin: 1, tech: 3, education: 2, security: 1, tax: 1 } },
      { text: "👂 경청하고 조율", scores: { admin: 2, tech: 1, education: 2, security: 3, tax: 2 } },
    ],
  },
  {
    question: "여가시간에 주로 무엇을 하시나요?",
    answers: [
      { text: "📚 독서나 학습", scores: { admin: 2, tech: 2, education: 3, security: 1, tax: 2 } },
      { text: "💻 컴퓨터나 게임", scores: { admin: 1, tech: 3, education: 1, security: 1, tax: 1 } },
      { text: "🏃‍♂️ 운동이나 야외활동", scores: { admin: 1, tech: 1, education: 2, security: 3, tax: 1 } },
      { text: "🎬 영화나 문화생활", scores: { admin: 2, tech: 1, education: 2, security: 2, tax: 2 } },
    ],
  },
  {
    question: "미래의 목표는?",
    answers: [
      { text: "🏆 전문성을 인정받는 것", scores: { admin: 2, tech: 3, education: 3, security: 2, tax: 3 } },
      { text: "💼 관리직으로 승진", scores: { admin: 3, tech: 2, education: 2, security: 3, tax: 2 } },
      { text: "🌟 사회에 기여하는 것", scores: { admin: 2, tech: 1, education: 3, security: 3, tax: 1 } },
      { text: "⚖️ 안정적인 직장생활", scores: { admin: 3, tech: 2, education: 2, security: 2, tax: 3 } },
    ],
  },
];

const results: Record<ResultKey, ResultContent> = {
  admin: {
    icon: "🏛️",
    title: "행정직",
    subtitle: "체계적이고 안정적인 당신에게 딱 맞는 직렬!",
    strengths: ["정부 정책 기획 및 집행", "민원 처리와 행정 서비스 제공", "예산 편성과 집행 관리", "법령과 제도 운영"],
    workplaces: ["기획재정부, 행정안전부 등 중앙부처", "지방자치단체 및 산하기관", "공공기관 행정 파트"],
  },
  tech: {
    icon: "💻",
    title: "기술직 (전산직)",
    subtitle: "논리적이고 창의적인 디지털 전문 인재!",
    strengths: ["정보시스템 구축 및 유지보수", "소프트웨어 개발/운영", "정보보안 및 시스템 안정화", "디지털 정부 구현"],
    workplaces: ["과학기술정보통신부", "디지털플랫폼정부위원회", "각 부처 정보화 부서"],
  },
  education: {
    icon: "🎓",
    title: "교육직",
    subtitle: "사람을 성장시키는 교육 전문 플래너!",
    strengths: ["교육 정책 기획 및 평가", "교육과정 개발과 운영", "교육기관 컨설팅과 지원", "교육 연구 및 자료 제작"],
    workplaces: ["교육부 및 시·도 교육청", "한국교육과정평가원", "교육연구기관"],
  },
  security: {
    icon: "🛡️",
    title: "보안직 (경찰/소방)",
    subtitle: "현장에서 국민을 지키는 듬직한 수호자!",
    strengths: ["국민 안전 및 치안 유지", "범죄 예방과 수사", "화재 진압 및 구조 활동", "재난 대응과 안전 관리"],
    workplaces: ["경찰청, 지방경찰청", "소방청, 전국 소방서", "해양경찰청"],
  },
  tax: {
    icon: "💰",
    title: "세무직",
    subtitle: "정확하고 꼼꼼한 통찰력을 지닌 재정 전문가!",
    strengths: ["세금 부과와 징수", "세무 조사 및 납세 상담", "세법 해석과 적용", "납세자 맞춤 서비스"],
    workplaces: ["국세청 및 지방국세청", "전국 세무서", "관세청 및 세관"],
  },
};

const initialScores: Record<ResultKey, number> = {
  admin: 0,
  tech: 0,
  education: 0,
  security: 0,
  tax: 0,
};

interface CivilServiceQuizProps {
  title?: string;
  description?: string;
}

export function CivilServiceQuiz({ title, description }: CivilServiceQuizProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  // URL에서 결과값이 있는지 확인
  useEffect(() => {
    const res = searchParams.get("res");
    if (res && results[res.toLowerCase() as ResultKey]) {
      setStep("result");
    }
  }, [searchParams]);

  const bestResult = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as ResultKey | undefined;
  }, [scores]);

  const progress =
    step === "quiz" ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  const handleAnswer = (answer: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(answer.scores) as ResultKey[]).forEach((key) => {
        next[key] += answer.scores[key];
      });
      return next;
    });

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsResultButtonEnabled(false);
      setStep("ad");
    }
  };

  const effectiveBest = useMemo(() => {
    const res = searchParams.get("res");
    if (res && results[res.toLowerCase() as ResultKey]) return res.toLowerCase() as ResultKey;
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as ResultKey | undefined;
  }, [scores, searchParams]);

  const handleRestart = () => {
    router.replace("/gongmuwon", { scroll: false });
    setStep("intro");
    setCurrentIdx(0);
    setScores(initialScores);
    setIsResultButtonEnabled(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나의 공무원 직렬 추천: ${result.title}`,
          text: `나에게 딱 맞는 공무원 직렬을 확인해보세요! #마음콕 #공무원테스트`,
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

  useEffect(() => {
    if (step === "ad") {
      const timer = setTimeout(() => {
        const finalBest = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as ResultKey;
        router.push(`?res=${finalBest}`, { scroll: false });
        setIsResultButtonEnabled(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, scores, router]);

  const current = questions[currentIdx];
  const result = effectiveBest ? results[effectiveBest] : results.admin;

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8"
          >
            <header className="space-y-6">
              <nav className="text-sm text-slate-500">
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  홈
                </Link>{" "}
                <span aria-hidden>›</span>{" "}
                <span className="font-semibold text-slate-800">공무원 직렬 테스트</span>
              </nav>
              <div className="relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-indigo-50 border border-indigo-100">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-indigo-50 opacity-50 blur-3xl" />
                <div className="relative z-10">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">
                    CAREER INSIGHT
                  </p>
                  <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {title || "공무원 직렬 추천 테스트"}
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                    {description || "나에게 가장 잘 맞는 공무원 직렬을 추천해 드립니다."}
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm font-medium">
                    <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-indigo-700">
                      ⏱️ <span>평균 3분 소요</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-slate-700">
                      🧮 <span>점수 기반 분석</span>
                    </div>
                  </dl>
                </div>
              </div>
            </header>

            <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-xl border border-slate-100 text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-4xl shadow-sm animate-bounce-slow">
                🎯
              </div>
              <h2 className="mb-4 text-3xl font-black text-slate-900 tracking-tight leading-tight">
                나의 공무원 직렬 찾기
              </h2>
              <p className="mb-8 text-slate-600 font-medium leading-relaxed">
                10개의 질문으로 내 성향에 딱 맞는 공무원 직렬을 추천해 드립니다.<br />
                행정·기술·세무·보안·교육 중 나의 운명은?
              </p>
              <div className="space-y-6">
                <Button size="xl" className="w-full font-black bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" onClick={() => setStep("quiz")}>
                  🚀 테스트 시작하기
                </Button>
                <AdSenseSlot slot="1777541474" className="min-h-[100px]" />
              </div>
            </div>
          </motion.div>
        )}

        {step === "quiz" && current && (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-3xl bg-white p-6 md:p-10 shadow-lg border border-slate-100"
          >
            <div className="mb-8 h-2.5 w-full overflow-hidden rounded-full bg-slate-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-500"
              />
            </div>
            <div className="mb-6">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Question {currentIdx + 1} / {questions.length}</span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {current.question}
              </h3>
            </div>
            <div className="grid gap-3">
              {current.answers.map((answer) => (
                <motion.button
                  key={answer.text}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(answer)}
                  className="rounded-2xl border-2 border-slate-50 bg-slate-50/30 px-6 py-5 text-left text-lg font-bold text-slate-700 hover:border-indigo-200 hover:bg-white hover:text-indigo-600 transition-all"
                >
                  {answer.text}
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {step === "ad" && (
          <motion.section
            key="ad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[2.5rem] bg-white p-10 md:p-16 text-center shadow-2xl border border-slate-100"
          >
            <div className="space-y-8">
              <div className="flex justify-center flex-col items-center">
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 mb-6" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">당신의 직렬 적성을<br />정밀 분석하고 있습니다</h3>
              </div>

              <div className="w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] p-6 border border-slate-100 min-h-[300px] flex flex-col items-center justify-center">
                <p className="text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Ad Performance Analysis</p>
                <AdSenseSlot slot="9839880235" className="w-full h-full" />
              </div>

              <Button
                size="xl"
                onClick={() => setStep("result")}
                className="w-full font-black bg-indigo-600"
                disabled={!isResultButtonEnabled}
              >
                {isResultButtonEnabled ? "✨ 결과 레포트 보기" : "⏳ 분석 중... (4초)"}
              </Button>
            </div>
          </motion.section>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
              <div className="bg-gradient-to-br from-indigo-600 to-sky-500 p-10 md:p-12 text-center text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="mb-6 text-8xl drop-shadow-2xl">{result.icon}</div>
                <div className="inline-block rounded-full bg-white/20 px-6 py-1.5 text-sm font-black backdrop-blur-md mb-4">
                  Result Type
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">{result.title}</h3>
                <p className="mt-3 text-indigo-100 font-bold text-lg md:text-xl">{result.subtitle}</p>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-[2rem] bg-slate-50 p-6 md:p-8 border border-slate-100">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase text-indigo-500 tracking-widest mb-6">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" /> 핵심 업무 역량
                    </h4>
                    <ul className="space-y-4">
                      {result.strengths.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-slate-700 font-bold text-base md:text-lg bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[2rem] bg-slate-50 p-6 md:p-8 border border-slate-100">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase text-sky-500 tracking-widest mb-6">
                      <span className="h-2 w-2 rounded-full bg-sky-500" /> 주요 매칭 기관
                    </h4>
                    <ul className="space-y-4">
                      {result.workplaces.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-slate-700 font-bold text-base md:text-lg bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                          <span className="mt-1 h-2 w-2 rounded-full bg-sky-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />

                <div className="mt-10 flex flex-col gap-4">
                  <Button size="xl" className="relative w-full bg-indigo-600 hover:bg-indigo-700 font-black shadow-lg shadow-indigo-100 overflow-hidden text-white" onClick={handleShare}>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="w-full text-center whitespace-nowrap text-[15px] md:text-lg">결과 공유하기</span>
                  </Button>

                  <Button asChild size="xl" className="w-full rounded-xl bg-slate-900 hover:bg-black font-black text-white shadow-lg shadow-slate-200">
                    <Link href={infoLink} target="_blank" rel="noopener noreferrer">
                      📚 시험 정보 자세히 보기
                    </Link>
                  </Button>

                  <Button
                    size="xl"
                    variant="outline"
                    onClick={handleRestart}
                    className="relative w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold overflow-hidden"
                  >
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                      <RotateCcw className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="w-full text-center whitespace-nowrap text-[15px] md:text-lg">다른 답변으로 다시하기</span>
                  </Button>

                  <Button variant="ghost" className="text-slate-400 font-bold" asChild>
                    <Link href="/">다른 테스트 보러가기</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <RecommendedTests currentSlug="/gongmuwon" />
            </div>
            <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
