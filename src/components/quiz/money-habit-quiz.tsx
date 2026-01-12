"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { QuizHeader } from "@/components/quiz/shared/quiz-header";
import { QuizProgress } from "@/components/quiz/shared/quiz-progress";
import { QuizIntroCard } from "@/components/quiz/shared/quiz-intro-card";
import { useQuiz } from "@/hooks/use-quiz";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Share2, RotateCcw } from "lucide-react";
import Link from "next/link";

type MoneyType = "safe" | "planner" | "yolo" | "adventure";

interface Answer {
  text: string;
  scores: Record<MoneyType, number>;
}

interface Question {
  question: string;
  helper?: string;
  answers: Answer[];
}

interface ResultDetail {
  title: string;
  subtitle: string;
  icon: string;
  keywords: string[];
  action: string[];
}

const infoLink = "https://www.banksalad.com/articles/categories/%EC%98%88%EC%A0%81%EA%B8%88";

const questions: Question[] = [
  {
    question: "월급이 들어오면 가장 먼저 하는 행동은?",
    answers: [
      { text: "자동이체로 저축·투자부터 확인한다", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "필수 지출을 정리하고 남은 돈을 분배한다", scores: { safe: 2, planner: 3, yolo: 0, adventure: 1 } },
      { text: "먹고 싶은 거 먹고 쇼핑부터 한다", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "한 방 프로젝트(코인, 고위험 투자)를 확인한다", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "예상치 못한 지출이 생기면?",
    answers: [
      { text: "비상금 통장에서 꺼낸다", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "이번 달 계획을 조정해 맞춘다", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "카드 할부로 넘긴다", scores: { safe: 0, planner: 1, yolo: 3, adventure: 1 } },
      { text: "한 번뿐인 기회라며 그냥 진행한다", scores: { safe: 0, planner: 0, yolo: 2, adventure: 3 } },
    ],
  },
  {
    question: "카드값을 확인하는 주기에 대해서는?",
    answers: [
      { text: "하루 한 번 이상 필수", scores: { safe: 2, planner: 3, yolo: 0, adventure: 1 } },
      { text: "주 단위로 정리한다", scores: { safe: 2, planner: 2, yolo: 1, adventure: 1 } },
      { text: "명세서 나오면 그때 본다", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "한도만 안 넘으면 괜찮다", scores: { safe: 0, planner: 0, yolo: 2, adventure: 3 } },
    ],
  },
  {
    question: "저축/투자 비중은 어느 정도인가요?",
    helper: "월 소득 대비 비율 기준",
    answers: [
      { text: "50% 이상, 안정이 최우선", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "30~50%, 목표에 따라 변동", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "10~30%, 즐거움과 병행", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "10% 이하, 대신 고위험 투자 있다", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "갑자기 100만 원의 여유 자금이 생기면?",
    answers: [
      { text: "비상금 계좌에 바로 예치", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "기존 계획대로 저축과 경험에 나눈다", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "가고 싶던 여행/공연 예매", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "단기 급등 가능성 있는 자산에 투자", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "금융 뉴스/콘텐츠는 얼마나 챙겨 보나요?",
    answers: [
      { text: "매일 챙긴다, 루틴의 일부", scores: { safe: 2, planner: 3, yolo: 0, adventure: 1 } },
      { text: "필수 정보만 몰아서 본다", scores: { safe: 1, planner: 2, yolo: 1, adventure: 1 } },
      { text: "관심 있는 트렌드만 본다", scores: { safe: 0, planner: 1, yolo: 2, adventure: 2 } },
      { text: "커뮤니티/카톡 정보를 더 믿는다", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "SNS에서 자주 저장하는 콘텐츠는?",
    answers: [
      { text: "적금 금리, 금테크 소식", scores: { safe: 3, planner: 1, yolo: 0, adventure: 1 } },
      { text: "ETF, 연금, 절세 팁", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "핫한 신상/여행 정보", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "코인, 부동산 청약 경쟁률", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "이번 달 꼭 사고 싶은 것이 생기면?",
    answers: [
      { text: "다음 달로 미루고 다시 생각한다", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "구매 리스트에 넣고 예산 조정", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "당장 구매 후 다른 지출 줄임", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "한 번뿐 기회라며 바로 결제", scores: { safe: 0, planner: 0, yolo: 2, adventure: 3 } },
    ],
  },
  {
    question: "투자를 결정할 때 가장 크게 작용하는 건?",
    answers: [
      { text: "원금 보장 여부", scores: { safe: 3, planner: 1, yolo: 0, adventure: 1 } },
      { text: "리스크 대비 수익률, 데이터", scores: { safe: 1, planner: 3, yolo: 1, adventure: 1 } },
      { text: "이야기와 설렘, 경험", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "큰 수익 가능성, 타이밍", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "올해 나의 금융 목표는?",
    answers: [
      { text: "생활비 6개월치 비상금 완성", scores: { safe: 3, planner: 2, yolo: 0, adventure: 1 } },
      { text: "연금/ETF 자동투자 비율 올리기", scores: { safe: 2, planner: 3, yolo: 1, adventure: 1 } },
      { text: "워라밸 소비와 경험 챙기기", scores: { safe: 0, planner: 1, yolo: 3, adventure: 2 } },
      { text: "고위험 자산으로 수익률 극대화", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
];

const results: Record<MoneyType, ResultDetail> = {
  safe: { title: "초안정형 예금러", subtitle: "한 치의 흔들림 없이 기반을 다지는 스타일", icon: "🏦", keywords: ["비상금 챙김", "안전 자산 선호", "루틴형"], action: ["비상자금 이상의 파킹 통장을 비교해 보세요.", "인플레이션 방어용으로 중위험 자산을 10% 이내로 도입해도 좋아요."] },
  planner: { title: "계획적인 재테크러", subtitle: "목표를 세우고 실행·기록하는 현실주의자", icon: "📊", keywords: ["ETF·연금", "예산 다이어리", "데이터 기반"], action: ["월 단위 리밸런싱과 자동이체를 점검하세요.", "절세 계좌 한도를 체크해 추가 절세 여지를 확보해요."] },
  yolo: { title: "욜로형 소비러", subtitle: "경험과 즐거움이 우선! 하지만 기본은 챙겨야 해요", icon: "🎉", keywords: ["경험 소비", "트렌드 민감", "감성 우선"], action: ["월급의 10~20%는 강제 저축으로 묶어두세요.", "소비 목표를 '사용 전 알림'으로 설정하면 즉흥 결제를 줄일 수 있어요."] },
  adventure: { title: "한방 노리는 모험가형", subtitle: "과감한 베팅을 즐기지만, 추락 방지 장치가 필요해요", icon: "🚀", keywords: ["고위험 선호", "타이밍 투자", "정보 탐색"], action: ["총 자산 중 고위험 비중을 40% 이하로 정해보세요.", "익절·손절 기준을 숫자로 기록하면 감정 투자를 줄입니다."] },
};

const initialScore: Record<MoneyType, number> = { safe: 0, planner: 0, yolo: 0, adventure: 0 };

export function MoneyHabitQuiz({ title, description }: { title?: string; description?: string }) {
  const searchParams = useSearchParams();
  const {
    step,
    currentIdx,
    startQuiz,
    completeQuiz,
    restartQuiz,
    nextQuestion,
  } = useQuiz({ slug: "/money", loadingDuration: 4000 });

  const [scores, setScores] = useState(initialScore);

  const handleAnswer = (answer: Answer) => {
    const nextScores = { ...scores };
    (Object.keys(answer.scores) as MoneyType[]).forEach((key) => { nextScores[key] += answer.scores[key]; });
    setScores(nextScores);

    const isComplete = nextQuestion(currentIdx + 1 >= questions.length);
    if (isComplete) {
      const bestType = Object.entries(nextScores).sort(([, a], [, b]) => b - a)[0]?.[0] as MoneyType;
      completeQuiz(bestType);
    }
  };

  const bestType = useMemo(() => {
    const res = searchParams.get("res")?.toLowerCase() as MoneyType;
    if (res && results[res]) return res;
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as MoneyType;
  }, [scores, searchParams]);

  const resultData = results[bestType] || results.planner;
  const progress = Math.round(((currentIdx + 1) / questions.length) * 100);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `나의 돈관리 성향: ${resultData.title}`, text: `나는 어떤 돈관리 성향일까? 지금 확인해보세요! #마음콕 #돈관리테스트`, url }); }
      catch (err) { console.error(err); }
    } else {
      await navigator.clipboard.writeText(url);
      alert("결과 주소가 복사되었습니다!");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <QuizHeader
              category="돈관리 성향 테스트"
              categoryHref="/money"
              title={title || "돈관리 성향 테스트"}
              description={description || "나의 소비 습관과 투자 성향을 분석해 보세요."}
              badge="MONEY ROUTINE CHECK"
              themeColor="emerald"
              stats={[
                { value: "약 4분 소요", icon: "⏱️" },
                { value: "점수 기반 분석", icon: "🧮" },
                { value: "행동 가이드 제공", icon: "🧾" }
              ]}
            />
            <QuizIntroCard
              icon="💰"
              title="나의 돈관리 루틴, 어떤 성향일까요?"
              description="소비 습관부터 투자 방식까지 10문항으로 분석합니다. 나만의 정밀 재테크 리포트를 확인해보세요!"
              buttonText="🚀 테스트 시작하기"
              onStart={startQuiz}
              adsenseSlot="1777541474"
              themeColor="emerald"
            />
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.section key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-3xl bg-white p-6 md:p-10 shadow-lg shadow-emerald-50 border border-slate-100">
            <QuizProgress progress={progress} themeColor="emerald" />
            <div className="my-8">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block mb-1">Round {currentIdx + 1} / {questions.length}</span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{questions[currentIdx].question}</h3>
              {questions[currentIdx].helper && <p className="mt-2 text-sm text-slate-400 font-bold italic">{questions[currentIdx].helper}</p>}
            </div>
            <div className="grid gap-3">
              {questions[currentIdx].answers.map((answer) => (
                <motion.button key={answer.text} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => handleAnswer(answer)} className="rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-5 text-left text-lg font-bold text-slate-700 transition-all hover:border-emerald-200 hover:bg-white hover:text-emerald-600 shadow-sm">
                  {answer.text}
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {step === "loading" && (
          <motion.section key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[2.5rem] bg-white p-10 md:p-16 text-center shadow-2xl border border-slate-100">
            <div className="space-y-8">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 mb-6" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">금융 데이터 알고리즘으로<br />투자 DNA를 추출 중입니다</h3>
              </div>
              <div className="w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] p-6 border border-slate-100 min-h-[300px] flex flex-col items-center justify-center">
                <AdSenseSlot slot="9839880235" className="w-full h-full" />
              </div>
              <Button size="xl" className="w-full font-black bg-emerald-600" disabled>⏳ 분석 중...</Button>
            </div>
          </motion.section>
        )}

        {step === "result" && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 md:p-12 text-center text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.icon}</div>
                <div className="inline-block rounded-full bg-white/20 px-6 py-1.5 text-sm font-black backdrop-blur-md mb-4 uppercase">Money Type</div>
                <h3 className="text-4xl font-black tracking-tight leading-tight">{resultData.title}</h3>
                <p className="mt-2 text-emerald-100 font-bold text-lg">{resultData.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {resultData.keywords.map((keyword) => (<span key={keyword} className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur-sm border border-white/10 shadow-sm">#{keyword}</span>))}
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="rounded-[2.5rem] bg-slate-50 p-8 border border-slate-100">
                  <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-6"><span className="h-4 w-1.5 bg-emerald-500 rounded-full" />Action Plan</h4>
                  <ul className="space-y-4">
                    {resultData.action.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg font-bold text-slate-700 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm mt-1">{idx + 1}</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center">
                  <p className="text-indigo-900 font-bold mb-4">금융 상식, 더 자세히 알고 싶다면?</p>
                  <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200">
                    <Link href={infoLink} target="_blank" rel="noopener noreferrer">📚 금융 꿀팁 아티클 보러가기</Link>
                  </Button>
                </div>
                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />
                <div className="mt-10 flex flex-col gap-4">
                  <Button size="xl" className="relative w-full bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-100 text-white" onClick={handleShare}>
                    <Share2 className="absolute left-6 w-5 h-5" /><span className="w-full text-center">결과 공유하기</span>
                  </Button>
                  <Button size="xl" variant="outline" className="relative w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold" onClick={restartQuiz}>
                    <RotateCcw className="absolute left-6 w-5 h-5" /><span className="w-full text-center">다시 테스트하기</span>
                  </Button>
                </div>
              </div>
            </div>
            <RecommendedTests currentSlug="/money" />
            <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
