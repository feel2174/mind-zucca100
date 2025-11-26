"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  {
    question: "보고서를 작성할 때 가장 중요하게 생각하는 것은?",
    answers: [
      { text: "구조화된 형식과 명확한 데이터", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "창의적 인사이트와 새로운 관점", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "정확한 분석과 실용적 해결책", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "이해하기 쉽고 공감되는 스토리", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "팀 내 갈등이 생겼을 때 나는?",
    answers: [
      { text: "역할과 책임을 명확히 정리한다", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "새로운 협업 방식을 제안한다", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "객관적 사실을 바탕으로 해결한다", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "대화를 통해 분위기를 완화한다", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "프로젝트가 성공적으로 끝났을 때 가장 기쁜 순간은?",
    answers: [
      { text: "모든 일정이 계획대로 완료되었을 때", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "내 아이디어가 실제로 구현되었을 때", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "기술적 문제를 해결하고 안정화되었을 때", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "팀원들과 함께 성취감을 나눌 때", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "업무 스타일은?",
    answers: [
      { text: "계획적이고 체계적인 접근", scores: { pm: 3, idea: 1, fixer: 2, insider: 1 } },
      { text: "유연하고 창의적인 접근", scores: { pm: 1, idea: 3, fixer: 1, insider: 2 } },
      { text: "논리적이고 실용적인 접근", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "협력적이고 소통 중심 접근", scores: { pm: 1, idea: 2, fixer: 1, insider: 3 } },
    ],
  },
  {
    question: "동료들이 나에게 가장 많이 하는 말은?",
    answers: [
      { text: "\"일정 정리 잘하네요\"", scores: { pm: 3, idea: 1, fixer: 1, insider: 1 } },
      { text: "\"아이디어가 많으시네요\"", scores: { pm: 1, idea: 3, fixer: 1, insider: 1 } },
      { text: "\"문제 해결 잘하시네요\"", scores: { pm: 1, idea: 1, fixer: 3, insider: 1 } },
      { text: "\"분위기 메이커시네요\"", scores: { pm: 1, idea: 1, fixer: 1, insider: 3 } },
    ],
  },
];

const results: Record<CharacterType, ResultDetail> = {
  pm: {
    title: "정리왕 PM형",
    subtitle: "체계적이고 계획적인 프로젝트 관리자!",
    icon: "📋",
    characteristics: [
      "일정 관리와 우선순위 설정에 능함",
      "문서화와 체계화를 중시",
      "명확한 역할 분담과 책임 소재 파악",
      "데이터 기반 의사결정 선호",
    ],
    suitableFor: [
      "계획적이고 꼼꼼한 성격",
      "프로젝트 관리에 관심 있는 사람",
      "체계적인 업무 환경을 선호하는 사람",
      "명확한 목표와 기준을 좋아하는 사람",
    ],
    tips: [
      "프로젝트 관리 도구(Jira, Notion 등) 활용 능력 향상",
      "PMP, CSM 등 프로젝트 관리 자격증 고려",
      "데이터 분석과 리포팅 스킬 보완",
    ],
  },
  idea: {
    title: "아이디어 폭탄형",
    subtitle: "창의적이고 혁신적인 기획자!",
    icon: "💡",
    characteristics: [
      "다양한 아이디어와 새로운 관점 제시",
      "트렌드 파악과 시장 인사이트에 강점",
      "유연하고 적응력이 뛰어남",
      "혁신적 솔루션을 추구",
    ],
    suitableFor: [
      "창의적이고 상상력이 풍부한 사람",
      "변화와 도전을 즐기는 사람",
      "트렌드에 민감한 사람",
      "다양한 관점을 가진 사람",
    ],
    tips: [
      "디자인 씽킹과 브레인스토밍 기법 학습",
      "다양한 산업과 트렌드 지속적으로 파악",
      "아이디어를 실행 가능한 기획안으로 발전시키는 연습",
    ],
  },
  fixer: {
    title: "정 silent fixer형",
    subtitle: "문제 해결과 안정화에 특화된 전문가!",
    icon: "🔧",
    characteristics: [
      "기술적 문제 해결에 능함",
      "논리적 분석과 실용적 접근",
      "안정성과 품질을 중시",
      "조용히 일을 처리하는 스타일",
    ],
    suitableFor: [
      "논리적이고 분석적인 사고를 가진 사람",
      "혼자 집중해서 일하는 것을 선호하는 사람",
      "기술과 시스템에 관심 있는 사람",
      "완벽주의 성향이 있는 사람",
    ],
    tips: [
      "기술 스택과 문제 해결 방법론 지속 학습",
      "코드 리뷰와 품질 관리 프로세스 이해",
      "기술 문서 작성과 지식 공유 문화 참여",
    ],
  },
  insider: {
    title: "인싸 분위기메이커형",
    subtitle: "팀워크와 소통을 이끄는 협업 전문가!",
    icon: "😊",
    characteristics: [
      "팀 내 분위기 메이킹에 능함",
      "소통과 협업을 중시",
      "공감 능력과 리더십이 뛰어남",
      "다양한 사람들과의 관계 형성",
    ],
    suitableFor: [
      "외향적이고 적극적인 성격",
      "사람들과의 소통을 즐기는 사람",
      "팀워크와 협업을 중시하는 사람",
      "분위기를 읽고 조율하는 능력이 있는 사람",
    ],
    tips: [
      "커뮤니케이션 스킬과 리더십 개발",
      "팀 빌딩과 협업 도구 활용 능력 향상",
      "갈등 해결과 중재 스킬 학습",
    ],
  },
};

const initialScores: Record<CharacterType, number> = {
  pm: 0,
  idea: 0,
  fixer: 0,
  insider: 0,
};

const totalQuestions = questions.length;

export function WorkplaceCharacterQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "ad" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [isResultButtonEnabled, setIsResultButtonEnabled] = useState(false);

  const bestType = useMemo(() => {
    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] as
      | CharacterType
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
      (Object.keys(answer.scores) as CharacterType[]).forEach((key) => {
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
  const result = bestType ? results[bestType] : results.pm;

  return (
    <div className="flex flex-col gap-8">
      {step === "intro" && (
        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-indigo-50">
          <div className="space-y-4 text-center">
            <p className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600">
              🏢 직장인 캐릭터 테스트
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              회사에서 나는 어떤 캐릭터일까?
            </h2>
            <p className="text-slate-500">
              회의·메신저·보고서·야근 상황을 통해 정리왕 PM부터 인싸
              분위기메이커까지 당신의 직장 내 캐릭터를 분석해 드려요. 소요 시간은
              약 3분입니다.
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
              잠시만 기다려주시면 당신의 직장 내 캐릭터를 분석해드릴게요.
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
                <ResultList title="이 캐릭터의 특징" items={result.characteristics} />
                <ResultList title="잘 맞는 사람 성향" items={result.suitableFor} />
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  커리어 방향 제안
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


