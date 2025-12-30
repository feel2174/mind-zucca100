"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";

type CharacterType = "pm" | "idea" | "fixer" | "insider";

interface Answer {
  text: string;
  scores: Record<CharacterType, number>;
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

const infoLink = "https://www.jobkorea.co.kr";

const questions: Question[] = [
  {
    question: "회의에서 나는 주로?",
    answers: [
      { text: "📋 회의록 작성과 일정 정리", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "💡 새로운 아이디어와 방안 제시", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "🔧 기술적 문제 해결책 제안", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "🗣️ 분위기 메이킹과 중재", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "꼬인 프로젝트가 있을 때 가장 먼저 하는 행동은?",
    answers: [
      { text: "일정과 우선순위를 재정리한다", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "새로운 접근 방법을 제안한다", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "문제의 원인을 파악하고 수정한다", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "팀원들과 소통하며 해결책을 찾는다", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "상사가 애매한 지시를 내렸을 때?",
    answers: [
      { text: "구체적인 실행 계획을 정리해 확인한다", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "여러 방안을 제시하며 선택지를 만든다", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "기술적 가능성을 검토하고 피드백한다", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "동료들과 상의하며 의도를 파악한다", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "메신저에서 가장 자주 하는 행동은?",
    answers: [
      { text: "📝 업무 요약과 체크리스트 공유", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "💬 아이디어와 제안을 적극적으로 제시", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "🔍 문제 해결 방법과 해결책 공유", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "😊 이모지와 공감으로 분위기 띄우기", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "야근이 필요할 때 나의 반응은?",
    answers: [
      { text: "일정을 재조정하고 효율적으로 마무리", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "새로운 방법을 시도해 시간을 단축", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "문제를 해결하고 안정적으로 마무리", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "팀원들과 함께 하며 동기부여", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
];

const results: Record<CharacterType, ResultDetail> = {
  pm: {
    title: "정리왕 PM형",
    subtitle: "체계적이고 계획적인 프로젝트 관리자!",
    icon: "📋",
    characteristics: ["일정과 우선순위 설정의 달인", "문서화와 체계화 선호", "데이터 기반 의사결정"],
    suitableFor: ["꼼꼼하고 계획적인 사람", "전체 흐름을 보기 좋아하는 사람"],
    tips: ["프로젝트 관리 도구 마스터하기", "리포팅 스킬 고도화"],
  },
  idea: {
    title: "아이디어 폭탄형",
    subtitle: "창의적이고 혁신적인 기획자!",
    icon: "💡",
    characteristics: ["새로운 관점 제시의 귀재", "트렌드 파악 능력 탁월", "유연한 적응력"],
    suitableFor: ["상상력이 풍부한 사람", "도전을 즐기는 사람"],
    tips: ["아이디어의 실행력 보완하기", "트렌드 리포트 작성 연습"],
  },
  fixer: {
    title: "사일런트 픽서형",
    subtitle: "문제 해결과 안정화의 숨은 고수!",
    icon: "🔧",
    characteristics: ["기술적 문제 해결의 핵심", "논리적인 분석력", "조용하고 실용적인 태도"],
    suitableFor: ["분석적인 사고를 가진 사람", "완벽주의 성향의 전문가"],
    tips: ["문제 해결 방법론 정리하기", "기술 블로그로 지식 공유"],
  },
  insider: {
    title: "인싸 분위기메이커형",
    subtitle: "팀의 활력소, 최고의 협력 전문가!",
    icon: "😊",
    characteristics: ["최고의 공감 능력", "팀 분위기 리드", "갈등 중재의 달인"],
    suitableFor: ["사람을 좋아하는 외향인", "소통이 생명인 사람"],
    tips: ["리더십 스킬 고도화하기", "커뮤니케이션 전략 학습"],
  },
};

const initialScores: Record<CharacterType, number> = {
  pm: 0,
  idea: 0,
  fixer: 0,
  insider: 0,
};

export function WorkplaceCharacterQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  // URL에서 결과값이 있는지 확인
  useEffect(() => {
    const res = searchParams.get("res");
    if (res && results[res.toLowerCase() as CharacterType]) {
      setStep("result");
    }
  }, [searchParams]);

  const bestType = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as CharacterType | undefined;
  }, [scores]);

  const progress =
    step === "quiz" ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  const handleAnswer = (answer: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(answer.scores) as CharacterType[]).forEach((key) => {
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
    if (res && results[res.toLowerCase() as CharacterType]) return res.toLowerCase() as CharacterType;
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as CharacterType | undefined;
  }, [scores, searchParams]);

  const handleRestart = () => {
    router.replace("/workplace", { scroll: false });
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
          title: `나의 직장인 캐릭터: ${resultData.title}`,
          text: `회사에서 나는 어떤 캐릭터일까? 지금 확인해보세요! #마음콕 #직장인테스트`,
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
        const finalBest = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as CharacterType;
        router.push(`?res=${finalBest}`, { scroll: false });
        setIsResultButtonEnabled(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, scores, router]);

  const current = questions[currentIdx];
  const resultData = effectiveBest ? results[effectiveBest] : results.pm;

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-[2.5rem] bg-white p-10 md:p-14 text-center shadow-2xl border border-blue-50"
          >
            <div className="mb-8 mx-auto h-24 w-24 flex items-center justify-center rounded-3xl bg-blue-50 text-5xl shadow-inner shadow-blue-100 animate-bounce-slow">
              🏢
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">회사생활 캐릭터<br />자가 테스트</h2>
            <p className="mt-4 text-slate-500 font-bold leading-relaxed">
              나는 오피스의 어떤 영웅일까요?<br />
              당신의 오피스 라이프를 데이터로 분석합니다!
            </p>
            <div className="space-y-6">
              <Button size="xl" className="w-full font-black bg-blue-600 shadow-lg shadow-blue-100" onClick={() => setStep("quiz")}>
                🚀 내 캐릭터 확인하기
              </Button>
              <AdSenseSlot slot="8424458319" className="min-h-[100px]" />
            </div>
          </motion.section>
        )}

        {step === "quiz" && current && (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl border border-slate-50"
          >
            <div className="mb-10 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600"
              />
            </div>
            <div className="mb-8">
              <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] block mb-2">Office Insight No.{currentIdx + 1} / {questions.length}</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {current.question}
              </h3>
            </div>
            <div className="grid gap-4">
              {current.answers.map((answer) => (
                <motion.button
                  key={answer.text}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(answer)}
                  className="rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-8 py-6 text-left text-lg font-black text-slate-700 hover:border-blue-300 hover:bg-white hover:text-blue-600 transition-all shadow-sm"
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
            className="rounded-[2.5rem] bg-indigo-950 p-10 md:p-16 text-center shadow-2xl text-white overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
            <div className="relative z-10 space-y-10">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 flex items-center justify-center text-5xl animate-pulse mb-6">
                  📊
                </div>
                <h3 className="text-3xl font-black tracking-tight leading-tight">오피스 히어로<br />잠재력을 스캔 중입니다</h3>
              </div>

              <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 border border-white/10 min-h-[300px] flex flex-col items-center justify-center">
                <p className="text-xs font-black text-blue-300 tracking-widest uppercase mb-4">Corporate DNA Mapping</p>
                <AdSenseSlot slot="8424458319" className="w-full h-full" />
              </div>

              <Button
                size="xl"
                onClick={() => setStep("result")}
                className="w-full font-black bg-white text-indigo-950"
                disabled={!isResultButtonEnabled}
              >
                {isResultButtonEnabled ? "✨ 분석 리포트 확인하기" : "⏳ 분석 중... (4초)"}
              </Button>
            </div>
          </motion.section>
        )}

        {step === "result" && (
          <motion.section
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-[0_32px_64px_-16px_rgba(30,58,138,0.15)] border-8 border-white">
              <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 p-12 text-center text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.icon}</div>
                <h3 className="text-4xl font-black tracking-tight leading-tight">{resultData.title}</h3>
                <p className="mt-3 text-blue-100/80 font-bold text-xl">{resultData.subtitle}</p>
              </div>
              <div className="p-10 md:p-14">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-[2rem] bg-blue-50/50 p-8 border border-blue-100">
                    <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Character Traits</h4>
                    <ul className="space-y-4">
                      {resultData.characteristics.map((item) => (
                        <li key={item} className="flex items-center gap-4 font-black text-slate-700 text-lg">
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-sm" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[2rem] bg-indigo-50/50 p-8 border border-indigo-100">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">Mastery Tips</h4>
                    <ul className="space-y-4">
                      {resultData.tips.map((tip) => (
                        <li key={tip} className="flex items-center gap-4 font-black text-slate-700 text-lg">
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-sm" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <AdSenseSlot slot="8424458319" className="my-10 min-h-[100px]" />

                <div className="mt-12 flex flex-col gap-4">
                  <Button size="xl" className="w-full bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-100" onClick={handleShare}>
                    🔗 결과 공유하기
                  </Button>
                  <Button asChild size="xl" className="w-full rounded-2xl bg-slate-900 hover:bg-black font-black">
                    <Link href={infoLink} rel="noreferrer">
                      💼 나에게 맞는 채용 공고 찾기
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleRestart}
                    className="w-full h-15 font-bold text-slate-400 hover:text-blue-600"
                  >
                    🔄 다시 테스트하기
                  </Button>
                </div>
              </div>
            </div>
            <AdSenseSlot slot="8424458319" format="fluid" className="mt-8" />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
