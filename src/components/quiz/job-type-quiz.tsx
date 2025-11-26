"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  {
    question: "가장 자신 있는 능력은?",
    answers: [
      { text: "📊 데이터 정리와 분석", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "💼 설득과 협상", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "💻 코딩과 기술 구현", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "✍️ 글쓰기와 스토리텔링", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "회의에서 주로 하는 행동은?",
    answers: [
      { text: "회의록 작성과 액션 아이템 정리", scores: { office: 3, sales: 1, tech: 1, content: 1 } },
      { text: "발표와 프레젠테이션", scores: { office: 1, sales: 3, tech: 1, content: 2 } },
      { text: "기술적 의견 제시와 솔루션 제안", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "아이디어 브레인스토밍", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "업무 외 시간에 관심 있는 것은?",
    answers: [
      { text: "자격증 공부나 자기계발", scores: { office: 2, sales: 1, tech: 2, content: 1 } },
      { text: "네트워킹과 인맥 쌓기", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "새로운 기술 학습", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "문화생활과 트렌드 파악", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "성장하는 방법은?",
    answers: [
      { text: "체계적인 학습과 자격증 취득", scores: { office: 3, sales: 1, tech: 2, content: 1 } },
      { text: "실전 경험과 고객 만족도 향상", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "프로젝트 경험과 기술 스택 확장", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "포트폴리오 구축과 크리에이티브 향상", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
  {
    question: "이직을 고려할 때 가장 중요한 것은?",
    answers: [
      { text: "안정성과 복지", scores: { office: 3, sales: 1, tech: 1, content: 1 } },
      { text: "성과 보상과 커미션", scores: { office: 1, sales: 3, tech: 1, content: 1 } },
      { text: "기술 스택과 성장 가능성", scores: { office: 1, sales: 1, tech: 3, content: 1 } },
      { text: "창의적 자유도와 문화", scores: { office: 1, sales: 1, tech: 1, content: 3 } },
    ],
  },
];

const results: Record<JobType, ResultDetail> = {
  office: {
    title: "사무/기획형",
    subtitle: "체계적이고 안정적인 업무를 선호하는 당신!",
    icon: "📋",
    characteristics: [
      "체계적인 문서 관리와 일정 조율에 능함",
      "정확성과 완성도를 중시하는 업무 스타일",
      "규칙적이고 예측 가능한 환경 선호",
      "데이터 정리와 분석에 강점",
    ],
    suitableFor: [
      "계획적이고 꼼꼼한 성격",
      "안정적인 업무 환경을 원하는 사람",
      "문서 작성과 정리에 자신 있는 사람",
      "규칙과 프로세스를 잘 따르는 사람",
    ],
    tips: [
      "사무 자동화 도구 활용으로 효율성 높이기",
      "프로젝트 관리 자격증 취득 고려",
      "데이터 분석 스킬 보완으로 경쟁력 강화",
    ],
  },
  sales: {
    title: "영업/세일즈형",
    subtitle: "사람들과의 소통을 즐기고 목표 달성을 추구하는 당신!",
    icon: "💼",
    characteristics: [
      "고객과의 관계 형성에 능함",
      "설득력과 협상력이 뛰어남",
      "목표 지향적이고 성과 중심",
      "다양한 사람들과의 네트워킹 선호",
    ],
    suitableFor: [
      "외향적이고 적극적인 성격",
      "성과 보상에 동기부여되는 사람",
      "대인관계에 자신 있는 사람",
      "변화와 도전을 즐기는 사람",
    ],
    tips: [
      "CRM 도구 활용으로 고객 관리 체계화",
      "영업 심리학과 커뮤니케이션 스킬 학습",
      "네트워킹 이벤트 적극 참여",
    ],
  },
  tech: {
    title: "개발/기술형",
    subtitle: "문제 해결과 기술 구현에 열정을 가진 당신!",
    icon: "💻",
    characteristics: [
      "논리적 사고와 문제 해결 능력이 뛰어남",
      "깊이 있는 집중과 몰입을 즐김",
      "새로운 기술 학습에 적극적",
      "시스템과 구조를 이해하는 데 강점",
    ],
    suitableFor: [
      "논리적이고 분석적인 사고를 가진 사람",
      "혼자 집중해서 일하는 것을 선호하는 사람",
      "지속적인 학습을 즐기는 사람",
      "기술적 도전을 좋아하는 사람",
    ],
    tips: [
      "프로젝트 포트폴리오 지속적으로 업데이트",
      "오픈소스 기여로 실력과 네트워크 확장",
      "기술 블로그 운영으로 전문성 어필",
    ],
  },
  content: {
    title: "콘텐츠/마케팅형",
    subtitle: "창의적 아이디어와 스토리텔링에 재능이 있는 당신!",
    icon: "🎨",
    characteristics: [
      "창의적 아이디어 발상에 능함",
      "트렌드 파악과 콘텐츠 기획에 강점",
      "다양한 매체와 플랫폼 활용",
      "자유롭고 유연한 업무 환경 선호",
    ],
    suitableFor: [
      "창의적이고 상상력이 풍부한 사람",
      "트렌드에 민감하고 문화에 관심 많은 사람",
      "다양한 경험을 즐기는 사람",
      "표현력과 소통 능력이 뛰어난 사람",
    ],
    tips: [
      "다양한 콘텐츠 포트폴리오 구축",
      "SNS와 플랫폼 트렌드 지속적으로 파악",
      "크리에이티브 툴 활용 능력 향상",
    ],
  },
};

const initialScores: Record<JobType, number> = {
  office: 0,
  sales: 0,
  tech: 0,
  content: 0,
};

const totalQuestions = questions.length;

export function JobTypeQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  const bestType = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as
      | JobType
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
      (Object.keys(answer.scores) as JobType[]).forEach((key) => {
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
  const result = bestType ? results[bestType] : results.office;

  return (
    <div className="flex flex-col gap-8">
      {step === "intro" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
          <div className="space-y-4 text-center">
            <p className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600">
              🎯 직무 적성 테스트
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              10개의 질문으로 나에게 맞는 직무를 찾아보세요
            </h2>
            <p className="text-slate-500">
              성향·에너지·대인관계 선호도를 통해 사무/기획·영업·개발·콘텐츠 중
              가장 적합한 직무를 추천해 드려요. 소요 시간은 약 3분입니다.
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
              잠시만 기다려주시면 당신에게 맞는 직무를 추천해드릴게요.
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
                <ResultList title="이 직무의 특징" items={result.characteristics} />
                <ResultList title="잘 맞는 사람 성향" items={result.suitableFor} />
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  커리어 팁
                </h4>
                <ul className="mt-3 space-y-2 text-base text-slate-700">
                  {result.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-1 text-indigo-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-8 w-full text-lg">
                <Link href={infoLink} target="_blank" rel="noreferrer">
                  💼 채용 정보 더 보기
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



