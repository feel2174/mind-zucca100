"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";

type JobType = "office" | "sales" | "tech" | "content";

interface Answer {
  text: string;
  scores: Record<JobType, number>;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface ResultDetail {
  title: string;
  subtitle: string;
  icon: string;
  characteristics: string[];
  suitableFor: string[];
  tips: string[];
}

const infoLink = "https://www.saramin.co.kr";

const questions: Question[] = [
  {
    question: "일할 때 가장 중요하게 생각하는 것은?",
    answers: [
      { text: "📋 체계적이고 정확한 업무 처리", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "💬 사람들과의 소통과 관계 형성", scores: { office: 1, sales: 3, tech: 1, content: 2 } },
      { text: "🔧 문제 해결과 기술적 도전", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "🎨 창의적 아이디어와 콘텐츠 제작", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "에너지가 가장 많이 드는 상황은?",
    answers: [
      { text: "불규칙하고 예측 불가능한 업무", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "혼자만의 시간이 부족할 때", scores: { office: 1, sales: 2, tech: 3, content: 2 } },
      { text: "새로운 사람들과의 미팅", scores: { office: 2, sales: 1, tech: 2, content: 1 } },
      { text: "반복적이고 단조로운 업무", scores: { office: 1, sales: 2, tech: 1, content: 3 } },
    ],
  },
  {
    question: "팀 프로젝트에서 주로 하는 역할은?",
    answers: [
      { text: "📝 일정 관리와 문서 정리", scores: { office: 3, sales: 1, tech: 1, content: 1 } },
      { text: "🗣️ 외부 협상과 클라이언트 소통", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "⚙️ 기술 구현과 시스템 구축", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "💡 기획과 콘텐츠 기획안 작성", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "스트레스를 받는 상황은?",
    answers: [
      { text: "계획이 없이 즉흥적으로 진행될 때", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "목표 달성이 어려울 때", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "버그나 기술적 문제가 해결되지 않을 때", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "아이디어가 떠오르지 않을 때", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "업무 스타일은?",
    answers: [
      { text: "규칙적이고 예측 가능한 루틴", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "다양한 사람들과의 만남과 변화", scores: { office: 1, sales: 3, tech: 1, content: 2 } },
      { text: "깊이 있는 집중과 몰입", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "자유롭고 유연한 환경", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
];

const results: Record<JobType, ResultDetail> = {
  office: {
    title: "사무/기획형",
    subtitle: "체계적이고 안정적인 업무를 선호하는 당신!",
    icon: "📋",
    characteristics: ["체계적인 문서 관리와 일정 조율", "정확성과 완성도를 중시", "데이터 정리와 분석 장점"],
    suitableFor: ["계획적이고 꼼꼼한 성격", "안정적인 환경 선호"],
    tips: ["사무 자동화 도구 활용", "데이터 분석 스킬 강화"],
  },
  sales: {
    title: "영업/세일즈형",
    subtitle: "소통을 즐기고 목표를 향해 달리는 당신!",
    icon: "💼",
    characteristics: ["고객 관계 형성에 능함", "설득력과 협상력 보유", "목표 지향적 성향"],
    suitableFor: ["외향적이고 적극적인 성격", "도전을 즐기는 사람"],
    tips: ["CRM 도구 활용", "커뮤니케이션 스킬 학습"],
  },
  tech: {
    title: "개발/기술형",
    subtitle: "문제 해결과 기술적 도전에 열광하는 당신!",
    icon: "💻",
    characteristics: ["논리적 사고와 집중력", "새로운 기술 학습 열정", "시스템 구조 이해 능력"],
    suitableFor: ["분석적인 사고를 가진 사람", "몰입을 즐기는 사람"],
    tips: ["포트폴리오 업데이트", "기술 블로그 운영"],
  },
  content: {
    title: "콘텐츠/마케팅형",
    subtitle: "창의적인 아이디어와 스토리의 귀재!",
    icon: "🎨",
    characteristics: ["아이디어 발상 능력", "트렌드 민감도", "다양한 매체 활용도"],
    suitableFor: ["상상력이 풍부한 사람", "문화에 관심 많은 사람"],
    tips: ["콘텐츠 포트폴리오 구축", "플랫폼 트렌드 파악"],
  },
};

const initialScores: Record<JobType, number> = {
  office: 0,
  sales: 0,
  tech: 0,
  content: 0,
};

export function JobTypeQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  // URL에서 결과값이 있는지 확인
  useEffect(() => {
    const res = searchParams.get("res");
    if (res && results[res.toLowerCase() as JobType]) {
      setStep("result");
    }
  }, [searchParams]);

  const bestType = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as JobType | undefined;
  }, [scores]);

  const progress =
    step === "quiz" ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  const handleAnswer = (answer: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(answer.scores) as JobType[]).forEach((key) => {
        next[key] += answer.scores[key];
      });
      return next;
    });

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setStep("ad");
    }
  };

  const effectiveBest = useMemo(() => {
    const res = searchParams.get("res");
    if (res && results[res.toLowerCase() as JobType]) return res.toLowerCase() as JobType;
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as JobType | undefined;
  }, [scores, searchParams]);

  const handleRestart = () => {
    router.replace("/job", { scroll: false });
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
          title: `나의 직무 적성: ${resultData.title}`,
          text: `나에게 딱 맞는 직무를 확인해보세요! #마음콕 #직무테스트`,
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
        const finalBest = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as JobType;
        router.push(`?res=${finalBest}`, { scroll: false });
        setIsResultButtonEnabled(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, scores, router]);

  const current = questions[currentIdx];
  const resultData = effectiveBest ? results[effectiveBest] : results.office;

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-2xl border border-indigo-50"
          >
            <div className="mb-8 mx-auto h-20 w-20 flex items-center justify-center rounded-3xl bg-indigo-50 text-4xl shadow-inner shadow-indigo-100">
              🎯
            </div>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">내게 맞는<br />직무 유형 찾기</h2>
            <p className="mt-4 text-slate-500 font-bold leading-relaxed">
              성향과 에너지, 소통 방식을 분석하여<br />
              가장 빛날 수 있는 직무를 찾아드립니다.
            </p>
            <div className="space-y-6">
              <Button size="xl" className="w-full font-black bg-indigo-600" onClick={() => setStep("quiz")}>
                🚀 나에게 맞는 직무 찾기
              </Button>
              <AdSenseSlot slot="1777541474" className="min-h-[100px]" />
            </div>
          </motion.section>
        )}

        {step === "quiz" && current && (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-3xl bg-white p-6 md:p-10 shadow-xl border border-slate-100"
          >
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-slate-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
              />
            </div>
            <div>
              <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Step {currentIdx + 1} / {questions.length}</span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {current.question}
              </h3>
            </div>
            <div className="mt-8 grid gap-3">
              {current.answers.map((answer) => (
                <motion.button
                  key={answer.text}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(answer)}
                  className="rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-5 text-left text-lg font-bold text-slate-700 hover:border-indigo-200 hover:bg-white hover:text-indigo-600 transition-all shadow-sm"
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
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 mb-6" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">커리어 전문가 AI가<br />답변을 정밀 분석 중입니다</h3>
              </div>

              <div className="w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] p-6 border border-slate-100 min-h-[300px] flex flex-col items-center justify-center">
                <p className="text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Market Trend Analysis</p>
                <AdSenseSlot slot="9839880235" className="w-full h-full" />
              </div>

              <Button
                size="xl"
                onClick={() => setStep("result")}
                className="w-full font-black bg-indigo-600"
                disabled={!isResultButtonEnabled}
              >
                {isResultButtonEnabled ? "✨ 결과 레포트 확인하기" : "⏳ 분석 중... (4초)"}
              </Button>
            </div>
          </motion.section>
        )}

        {step === "result" && (
          <motion.section
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-12 text-center text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.icon}</div>
                <h3 className="text-4xl font-black leading-tight tracking-tight">{resultData.title}</h3>
                <p className="mt-2 text-indigo-100 font-bold text-xl">{resultData.subtitle}</p>
              </div>
              <div className="p-8 md:p-12">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-[2rem] bg-indigo-50/50 p-8 border border-indigo-100">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">핵심 성과 역량</h4>
                    <ul className="space-y-4">
                      {resultData.characteristics.map((item) => (
                        <li key={item} className="flex items-center gap-4 font-bold text-slate-700 text-lg">
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-sm" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[2rem] bg-purple-50/50 p-8 border border-purple-100">
                    <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">Career Tips</h4>
                    <ul className="space-y-4">
                      {resultData.tips.map((tip) => (
                        <li key={tip} className="flex items-center gap-4 font-bold text-slate-700 text-lg">
                          <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-sm" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />

                <div className="mt-12 flex flex-col gap-4">
                  <Button size="xl" className="w-full bg-indigo-600 hover:bg-indigo-700 font-black shadow-lg shadow-indigo-100" onClick={handleShare}>
                    🔗 결과 공유하기
                  </Button>
                  <Button asChild size="xl" className="w-full rounded-2xl bg-slate-900 font-black">
                    <Link href={infoLink} rel="noreferrer">
                      💼 채용 시장 트렌드 보러가기
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleRestart}
                    className="w-full h-15 font-bold text-slate-400 hover:text-indigo-600"
                  >
                    🔄 다시 테스트하기
                  </Button>
                </div>
              </div>
            </div>
            <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
