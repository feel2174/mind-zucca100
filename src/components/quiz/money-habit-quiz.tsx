"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    question: "카드값을 확인하는 주기는?",
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
      { text: "필요할 때 몰아서 본다", scores: { safe: 1, planner: 2, yolo: 1, adventure: 1 } },
      { text: "관심 있는 트렌드만 본다", scores: { safe: 0, planner: 1, yolo: 2, adventure: 2 } },
      { text: "주식 커뮤니티/단톡 정보를 더 믿는다", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
  {
    question: "SNS/커뮤니티에서 자주 저장하는 콘텐츠는?",
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
      { text: "고위험 자산으로 수익률 2배 찍기", scores: { safe: 0, planner: 0, yolo: 1, adventure: 3 } },
    ],
  },
];

const results: Record<MoneyType, ResultDetail> = {
  safe: {
    title: "초안정형 예금러",
    subtitle: "한 치의 흔들림 없이 기반을 다지는 스타일",
    icon: "🏦",
    keywords: ["비상금 챙김", "안전 자산 선호", "루틴형"],
    action: ["비상자금 이상의 파킹 통장을 비교해 보세요.", "인플레이션 방어용으로 중위험 자산을 10% 이내로 도입해도 좋아요."],
  },
  planner: {
    title: "계획적인 재테크러",
    subtitle: "목표를 세우고 실행·기록하는 현실주의자",
    icon: "📊",
    keywords: ["ETF·연금", "예산 다이어리", "데이터 기반"],
    action: ["월 단위 리밸런싱과 자동이체를 점검하세요.", "절세 계좌 한도를 체크해 추가 절세 여지를 확보해요."],
  },
  yolo: {
    title: "욜로형 소비러",
    subtitle: "경험과 즐거움이 우선! 하지만 기본은 챙겨야 해요",
    icon: "🎉",
    keywords: ["경험 소비", "트렌드 민감", "감성 우선"],
    action: ["월급의 10~20%는 강제 저축으로 묶어두세요.", "소비 목표를 '사용 전 알림'으로 설정하면 즉흥 결제를 줄일 수 있어요."],
  },
  adventure: {
    title: "한방 노리는 모험가형",
    subtitle: "과감한 베팅을 즐기지만, 추락 방지 장치가 필요해요",
    icon: "🚀",
    keywords: ["고위험 선호", "타이밍 투자", "정보 탐색"],
    action: ["총 자산 중 고위험 비중을 40% 이하로 정해보세요.", "익절·손절 기준을 숫자로 기록하면 감정 투자를 줄입니다."],
  },
};

const initialScore: Record<MoneyType, number> = {
  safe: 0,
  planner: 0,
  yolo: 0,
  adventure: 0,
};

export function MoneyHabitQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState(initialScore);

  const bestType = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as MoneyType | undefined;
  }, [scores]);

  const progress =
    step === "quiz" ? Math.round(((current + 1) / questions.length) * 100) : 0;

  const startQuiz = () => {
    setScores(initialScore);
    setCurrent(0);
    setStep("quiz");
  };

  const handleAnswer = (answer: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(answer.scores) as MoneyType[]).forEach((key) => {
        next[key] += answer.scores[key];
      });
      return next;
    });

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setStep("ad");
    }
  };

  const restartQuiz = () => {
    setScores(initialScore);
    setCurrent(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeQuestion = questions[current];
  const result = bestType ? results[bestType] : results.planner;

  return (
    <div className="flex flex-col gap-8">
      {step === "intro" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
          <div className="space-y-5 text-center">
            <p className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-600">
              💸 돈관리 자가 테스트
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              나의 돈관리 루틴, 과연 어떤 성향일까요?
            </h2>
            <p className="text-slate-500">
              월급 루틴·소비 습관·투자 방식 10문항으로 초안정형부터 모험가형까지 분석합니다.
              20~40대 라이프스타일 데이터 기반으로 제작되었습니다.
            </p>
            <Button className="w-full justify-center text-lg" onClick={startQuiz}>
              🚀 지금 바로 시작
            </Button>
            <p className="text-xs text-slate-400">
              * 참고용 콘텐츠이며, 투자 결과를 보장하지 않습니다.
            </p>
          </div>
        </section>
      )}

      {step === "quiz" && activeQuestion && (
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-emerald-50">
          <div className="mb-6 h-3 w-full rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-emerald-600">
            질문 {current + 1} / {questions.length}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {activeQuestion.question}
          </h3>
          {activeQuestion.helper && (
            <p className="mt-2 text-sm text-slate-400">{activeQuestion.helper}</p>
          )}
          <div className="mt-6 grid gap-3">
            {activeQuestion.answers.map((answer) => (
              <button
                key={answer.text}
                onClick={() => handleAnswer(answer)}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-left text-base font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:text-emerald-600"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "ad" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-emerald-50">
          <div className="space-y-6 text-center">
            <div className="text-4xl">⏳</div>
            <h3 className="text-2xl font-bold text-slate-900">
              결과를 계산하고 있어요!
            </h3>
            <p className="text-slate-500">
              잠시만 기다려주시면 당신의 돈관리 성향을 분석해드릴게요.
            </p>
            <div className="min-h-[250px] w-full" id="ad-before-result" />
            <Button
              onClick={() => setStep("result")}
              className="w-full text-lg"
            >
              ✨ 결과 보기
            </Button>
          </div>
        </section>
      )}

      {step === "result" && (
        <section className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-purple-500 p-1 shadow-2xl">
            <div className="h-full rounded-[22px] bg-white/95 p-8">
              <div className="text-center">
                <div className="text-5xl">{result.icon}</div>
                <h3 className="mt-4 text-3xl font-bold text-slate-900">
                  {result.title}
                </h3>
                <p className="text-lg text-slate-500">{result.subtitle}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {result.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-slate-100 px-4 py-1 font-semibold text-slate-700"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  다음 액션 제안
                </h4>
                <ul className="mt-3 space-y-2 text-base text-slate-700">
                  {result.action.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-1 text-emerald-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-8 w-full text-lg">
                <Link href={infoLink}  rel="noreferrer">
                  📚 금융 교육 자료 더 보기
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="min-h-[200px] w-full" id="ad-after-result-top" />
            <Button
              onClick={restartQuiz}
              className="w-full bg-gradient-to-r from-indigo-500 to-emerald-400"
            >
              🔄 다시 테스트하기
            </Button>
            <div className="min-h-[200px] w-full" id="ad-after-result-bottom" />
          </div>
        </section>
      )}
    </div>
  );
}


