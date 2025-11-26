"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      {
        text: "📋 체계적이고 규칙적인 업무",
        scores: { admin: 3, tech: 1, education: 2, security: 2, tax: 3 },
      },
      {
        text: "💡 창의적이고 도전적인 업무",
        scores: { admin: 1, tech: 3, education: 3, security: 1, tax: 1 },
      },
      {
        text: "👥 사람들과 소통하는 업무",
        scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 2 },
      },
      {
        text: "🔒 안정적이고 신중한 업무",
        scores: { admin: 2, tech: 2, education: 1, security: 3, tax: 3 },
      },
    ],
  },
  {
    question: "문제 해결 시 어떤 방식을 선호하시나요?",
    answers: [
      {
        text: "📊 데이터와 통계를 활용",
        scores: { admin: 3, tech: 3, education: 1, security: 2, tax: 3 },
      },
      {
        text: "🗣️ 대화와 토론을 통해",
        scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 },
      },
      {
        text: "📖 매뉴얼과 규정을 따라",
        scores: { admin: 3, tech: 2, education: 2, security: 3, tax: 3 },
      },
      {
        text: "🚀 직감과 경험을 바탕으로",
        scores: { admin: 1, tech: 2, education: 2, security: 2, tax: 1 },
      },
    ],
  },
  {
    question: "어떤 근무 환경을 선호하시나요?",
    answers: [
      {
        text: "🏢 사무실에서 개인 업무",
        scores: { admin: 3, tech: 3, education: 1, security: 1, tax: 3 },
      },
      {
        text: "🎓 교육기관이나 학교",
        scores: { admin: 1, tech: 1, education: 3, security: 1, tax: 1 },
      },
      {
        text: "🚔 현장에서 활동적인 업무",
        scores: { admin: 1, tech: 1, education: 1, security: 3, tax: 1 },
      },
      {
        text: "👥 팀 단위 협업 환경",
        scores: { admin: 2, tech: 2, education: 2, security: 2, tax: 2 },
      },
    ],
  },
  {
    question: "스트레스를 받는 상황은?",
    answers: [
      {
        text: "📋 복잡한 서류 처리",
        scores: { admin: 1, tech: 2, education: 3, security: 2, tax: 1 },
      },
      {
        text: "💻 기술적 문제 해결",
        scores: { admin: 2, tech: 1, education: 2, security: 3, tax: 2 },
      },
      {
        text: "👨‍👩‍👧‍👦 사람들과의 갈등",
        scores: { admin: 3, tech: 3, education: 1, security: 2, tax: 3 },
      },
      {
        text: "⚡ 급작스런 상황 변화",
        scores: { admin: 3, tech: 2, education: 2, security: 1, tax: 3 },
      },
    ],
  },
  {
    question: "가장 관심 있는 분야는?",
    answers: [
      {
        text: "💰 경제, 재정, 세무",
        scores: { admin: 2, tech: 1, education: 1, security: 1, tax: 3 },
      },
      {
        text: "🖥️ IT, 컴퓨터, 기술",
        scores: { admin: 1, tech: 3, education: 1, security: 2, tax: 1 },
      },
      {
        text: "📚 교육, 문화, 예술",
        scores: { admin: 1, tech: 1, education: 3, security: 1, tax: 1 },
      },
      {
        text: "🛡️ 안전, 치안, 보안",
        scores: { admin: 1, tech: 1, education: 1, security: 3, tax: 1 },
      },
    ],
  },
  {
    question: "업무에서 가장 중요하게 생각하는 것은?",
    answers: [
      {
        text: "📏 정확성과 완성도",
        scores: { admin: 3, tech: 3, education: 2, security: 2, tax: 3 },
      },
      {
        text: "⚡ 신속성과 효율성",
        scores: { admin: 2, tech: 2, education: 1, security: 3, tax: 2 },
      },
      {
        text: "🤝 협력과 소통",
        scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 },
      },
      {
        text: "🎯 목표 달성",
        scores: { admin: 2, tech: 2, education: 2, security: 2, tax: 2 },
      },
    ],
  },
  {
    question: "학창시절 가장 자신 있던 과목은?",
    answers: [
      {
        text: "📊 수학, 통계",
        scores: { admin: 2, tech: 3, education: 1, security: 1, tax: 3 },
      },
      {
        text: "🗣️ 국어, 언어",
        scores: { admin: 3, tech: 1, education: 3, security: 2, tax: 2 },
      },
      {
        text: "🌍 사회, 역사",
        scores: { admin: 3, tech: 1, education: 2, security: 2, tax: 2 },
      },
      {
        text: "🔬 과학, 실험",
        scores: { admin: 1, tech: 3, education: 2, security: 2, tax: 1 },
      },
    ],
  },
  {
    question: "사람들과 만날 때 어떤 역할을 주로 하시나요?",
    answers: [
      {
        text: "📝 회의록 작성이나 정리",
        scores: { admin: 3, tech: 2, education: 1, security: 1, tax: 3 },
      },
      {
        text: "🎤 발표나 진행",
        scores: { admin: 2, tech: 1, education: 3, security: 2, tax: 1 },
      },
      {
        text: "💡 아이디어 제안",
        scores: { admin: 1, tech: 3, education: 2, security: 1, tax: 1 },
      },
      {
        text: "👂 경청하고 조율",
        scores: { admin: 2, tech: 1, education: 2, security: 3, tax: 2 },
      },
    ],
  },
  {
    question: "여가시간에 주로 무엇을 하시나요?",
    answers: [
      {
        text: "📚 독서나 학습",
        scores: { admin: 2, tech: 2, education: 3, security: 1, tax: 2 },
      },
      {
        text: "💻 컴퓨터나 게임",
        scores: { admin: 1, tech: 3, education: 1, security: 1, tax: 1 },
      },
      {
        text: "🏃‍♂️ 운동이나 야외활동",
        scores: { admin: 1, tech: 1, education: 2, security: 3, tax: 1 },
      },
      {
        text: "🎬 영화나 문화생활",
        scores: { admin: 2, tech: 1, education: 2, security: 2, tax: 2 },
      },
    ],
  },
  {
    question: "미래의 목표는?",
    answers: [
      {
        text: "🏆 전문성을 인정받는 것",
        scores: { admin: 2, tech: 3, education: 3, security: 2, tax: 3 },
      },
      {
        text: "💼 관리직으로 승진",
        scores: { admin: 3, tech: 2, education: 2, security: 3, tax: 2 },
      },
      {
        text: "🌟 사회에 기여하는 것",
        scores: { admin: 2, tech: 1, education: 3, security: 3, tax: 1 },
      },
      {
        text: "⚖️ 안정적인 직장생활",
        scores: { admin: 3, tech: 2, education: 2, security: 2, tax: 3 },
      },
    ],
  },
];

const results: Record<ResultKey, ResultContent> = {
  admin: {
    icon: "🏛️",
    title: "행정직",
    subtitle: "체계적이고 안정적인 당신에게 딱 맞는 직렬!",
    strengths: [
      "정부 정책 기획 및 집행",
      "민원 처리와 행정 서비스 제공",
      "예산 편성과 집행 관리",
      "법령과 제도 운영",
    ],
    workplaces: [
      "기획재정부, 행정안전부 등 중앙부처",
      "지방자치단체 및 산하기관",
      "공공기관 행정 파트",
    ],
  },
  tech: {
    icon: "💻",
    title: "기술직 (전산직)",
    subtitle: "논리적이고 창의적인 디지털 전문 인재!",
    strengths: [
      "정보시스템 구축 및 유지보수",
      "소프트웨어 개발/운영",
      "정보보안 및 시스템 안정화",
      "디지털 정부 구현",
    ],
    workplaces: [
      "과학기술정보통신부",
      "디지털플랫폼정부위원회",
      "각 부처 정보화 부서",
    ],
  },
  education: {
    icon: "🎓",
    title: "교육직",
    subtitle: "사람을 성장시키는 교육 전문 플래너!",
    strengths: [
      "교육 정책 기획 및 평가",
      "교육과정 개발과 운영",
      "교육기관 컨설팅과 지원",
      "교육 연구 및 자료 제작",
    ],
    workplaces: [
      "교육부 및 시·도 교육청",
      "한국교육과정평가원",
      "교육연구기관",
    ],
  },
  security: {
    icon: "🛡️",
    title: "보안직 (경찰/소방)",
    subtitle: "현장에서 국민을 지키는 듬직한 수호자!",
    strengths: [
      "국민 안전 및 치안 유지",
      "범죄 예방과 수사",
      "화재 진압 및 구조 활동",
      "재난 대응과 안전 관리",
    ],
    workplaces: [
      "경찰청, 지방경찰청",
      "소방청, 전국 소방서",
      "해양경찰청",
    ],
  },
  tax: {
    icon: "💰",
    title: "세무직",
    subtitle: "정확하고 꼼꼼한 통찰력을 지닌 재정 전문가!",
    strengths: [
      "세금 부과와 징수",
      "세무 조사 및 납세 상담",
      "세법 해석과 적용",
      "납세자 맞춤 서비스",
    ],
    workplaces: [
      "국세청 및 지방국세청",
      "전국 세무서",
      "관세청 및 세관",
    ],
  },
};

const initialScores: Record<ResultKey, number> = {
  admin: 0,
  tech: 0,
  education: 0,
  security: 0,
  tax: 0,
};

const totalQuestions = questions.length;

export function CivilServiceQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  const bestResult = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as
      | ResultKey
      | undefined;
  }, [scores]);

  const progress =
    step === "quiz"
      ? Math.round(((currentQuestion + 1) / totalQuestions) * 100)
      : 0;

  const handleStart = () => {
    setStep("quiz");
    setCurrentQuestion(0);
    setScores(initialScores);
  };

  const handleAnswer = (answer: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(answer.scores) as ResultKey[]).forEach((key) => {
        next[key] += answer.scores[key];
      });
      return next;
    });

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsResultButtonEnabled(false);
      setStep("ad");
    }
  };

  const handleRestart = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setScores(initialScores);
    setIsResultButtonEnabled(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (step === "ad") {
      const timer = setTimeout(() => {
        setIsResultButtonEnabled(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const current = questions[currentQuestion];
  const result = bestResult ? results[bestResult] : results.admin;

  return (
    <div className="flex flex-col gap-8">
      {step === "intro" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
          <div className="space-y-4 text-center">
            <p className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600">
              🎯 나만의 공무원 직렬 찾기
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              10개의 질문으로 나에게 맞는 직렬을 추천받아보세요
            </h2>
            <p className="text-slate-500">
              선택에 따라 행정·기술·세무·보안·교육 직렬 중 가장 적합한 직렬을
              계산해 드려요. 소요 시간은 약 3분입니다.
            </p>
            <Button className="w-full justify-center text-lg" onClick={handleStart}>
              🚀 테스트 시작하기
            </Button>
            <p className="text-xs text-slate-400">
              * 현재 베타 버전으로, 결과는 참고용입니다.
            </p>
          </div>
        </section>
      )}

      {step === "quiz" && current && (
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-indigo-50">
          <div className="mb-6 h-3 w-full rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-indigo-500">
            질문 {currentQuestion + 1} / {totalQuestions}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {current.question}
          </h3>
          <div className="mt-6 grid gap-3">
            {current.answers.map((answer) => (
              <button
                key={answer.text}
                onClick={() => handleAnswer(answer)}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-left text-base font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:text-indigo-600"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "ad" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
          <div className="space-y-6 text-center">
            <div className="text-4xl">⏳</div>
            <h3 className="text-2xl font-bold text-slate-900">
              결과를 계산하고 있어요!
            </h3>
            <p className="text-slate-500">
              잠시만 기다려주시면 당신에게 맞는 직렬을 추천해드릴게요.
            </p>
            <div className="min-h-[250px] w-full" id="ad-before-result" />
            <Button
              onClick={() => setStep("result")}
              className="w-full text-lg"
              disabled={!isResultButtonEnabled}
            >
              {isResultButtonEnabled ? "✨ 결과 보기" : "⏳ 계산 중... (5초)"}
            </Button>
          </div>
        </section>
      )}

      {step === "result" && (
        <section className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 p-1 shadow-2xl">
            <div className="h-full rounded-[22px] bg-white/95 p-8">
              <div className="text-center">
                <div className="text-5xl">{result.icon}</div>
                <h3 className="mt-4 text-3xl font-bold text-slate-900">
                  {result.title}
                </h3>
                <p className="text-lg text-slate-500">{result.subtitle}</p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <ResultList title="이 직렬의 핵심 업무" items={result.strengths} />
                <ResultList title="주요 근무처" items={result.workplaces} />
              </div>
              <Button asChild className="mt-8 w-full text-lg">
                <Link href={infoLink} rel="noreferrer">
                  📚 공무원 시험 정보 보기
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="min-h-[200px] w-full" id="ad-after-result-top" />
            <Button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400"
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

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-base text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 text-indigo-500">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


