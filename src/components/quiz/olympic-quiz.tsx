"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { toPng } from "html-to-image";
import { Trophy, Share2, RefreshCw, Download } from "lucide-react";
import { QuizActionButtons } from "@/components/quiz/quiz-action-buttons";
import { QuizHeader } from "@/components/quiz/shared/quiz-header";
import { QuizProgress } from "@/components/quiz/shared/quiz-progress";
import { QuizIntroCard } from "@/components/quiz/shared/quiz-intro-card";
import { useQuiz } from "@/hooks/use-quiz";

type SportDimension = "EI" | "SN" | "TF" | "JP";

interface Answer {
    text: string;
    dimension: SportDimension;
    value: 1 | -1;
}

interface Question {
    question: string;
    dimension: SportDimension;
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
    color: string;
}

const questions: Question[] = [
    {
        question: "올림픽 경기장에 들어선 당신, 어떤 기분일까요?",
        dimension: "EI",
        answers: [
            { text: "관중들의 환호성을 들으니 아드레날린이 솟구친다!", dimension: "EI", value: 1 },
            { text: "차분하게 마음을 가다듬으며 나만의 페이스를 유지한다", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "훈련 중 예상치 못한 장비 결함이 발견됐다면?",
        dimension: "SN",
        answers: [
            { text: "즉시 기술팀에 연락해 수치와 성능을 꼼꼼히 체크한다", dimension: "SN", value: 1 },
            { text: "내 몸의 감각을 믿고 적응하며 새로운 해법을 찾는다", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "팀 동료가 실수로 실격될 위기에 처했습니다.",
        dimension: "TF",
        answers: [
            { text: "냉철하게 상황을 판단하고 가장 효율적인 대처법을 찾는다", dimension: "TF", value: 1 },
            { text: "동료의 마음을 먼저 다독이며 끝까지 함께 응원한다", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "결승전 당일 아침, 당신의 루틴은?",
        dimension: "JP",
        answers: [
            { text: "초 단위로 계획된 스케줄에 맞춰 완벽하게 준비한다", dimension: "JP", value: 1 },
            { text: "그날의 컨디션과 분위기에 맞춰 유연하게 행동한다", dimension: "JP", value: -1 },
        ],
    },
    {
        question: "시상대에서 금메달을 목에 건 내 모습은?",
        dimension: "EI",
        answers: [
            { text: "카메라를 향해 화려한 세리머니를 선보인다", dimension: "EI", value: 1 },
            { text: "벅찬 감동을 느끼며 조용히 관객들에게 인사한다", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "경기 분석을 할 때 더 선호하는 방식은?",
        dimension: "SN",
        answers: [
            { text: "과거 기록과 통계 데이터를 기반으로 분석한다", dimension: "SN", value: 1 },
            { text: "전체적인 흐름과 직관적인 영감을 중요시한다", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "지도자가 강력하고 직설적인 피드백을 준다면?",
        dimension: "TF",
        answers: [
            { text: "내용이 합리적이라면 감정 섞지 않고 바로 수용한다", dimension: "TF", value: 1 },
            { text: "말투나 태도에서 오는 서운함이 먼저 느껴져 속상하다", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "휴식 시간이 생겼을 때, 당신은 무엇을 하나요?",
        dimension: "JP",
        answers: [
            { text: "다음 훈련 효율을 높이기 위해 일찍 잠자리에 든다", dimension: "JP", value: 1 },
            { text: "하고 싶었던 다른 취미나 여행을 즐기며 힐링한다", dimension: "JP", value: -1 },
        ],
    },
    {
        question: "라이벌 선수가 갑자기 도발을 해온다면?",
        dimension: "EI",
        answers: [
            { text: "자신감 있게 맞받아치며 기싸움에서 밀리지 않는다", dimension: "EI", value: 1 },
            { text: "에너지 낭비하지 않고 속으로 목표를 되새기며 무시한다", dimension: "EI", value: -1 },
        ],
    },
    {
        question: "연습 중 아주 미세한 자세 차이를 느꼈을 때?",
        dimension: "SN",
        answers: [
            { text: "반복 훈련을 통해 그 차이를 완벽히 교정한다", dimension: "SN", value: 1 },
            { text: "오히려 나만의 독창적인 스타일로 발전시켜본다", dimension: "SN", value: -1 },
        ],
    },
    {
        question: "경기 후 인터뷰에서 가장 하고 싶은 말은?",
        dimension: "TF",
        answers: [
            { text: "철저한 준비와 전략이 승리의 요인이었습니다", dimension: "TF", value: 1 },
            { text: "저를 믿어준 분들의 응원 덕분에 해낼 수 있었습니다", dimension: "TF", value: -1 },
        ],
    },
    {
        question: "예정된 비행기가 지연되어 경기지 도착이 늦어졌다면?",
        dimension: "JP",
        answers: [
            { text: "플랜 B를 가동해 호텔에서도 가능한 훈련을 체크한다", dimension: "JP", value: 1 },
            { text: "이 상황도 여정의 일부라 생각하며 편하게 쉰다", dimension: "JP", value: -1 },
        ],
    },
];

const results: Record<string, ResultContent> = {
    // E S T P: 쇼트트랙
    ESTP: {
        title: "얼음 위의 승부사, 쇼트트랙",
        subtitle: "찰나의 순간을 지배하는 본능적인 스피드",
        description: "당신은 엄청난 순발력과 대담함을 가진 타고난 승부사입니다. 복잡한 생각보다는 몸이 먼저 반응하는 스타일로, 승부처를 읽는 감각이 매우 뛰어납니다.",
        traits: ["0.01초의 틈을 파고드는 과감함", "위기 상황에서 빛나는 판단력", "지루한 건 못 참는 에너지 넘치는 성격"],
        tips: ["때로는 차분한 명상이 집중력을 더 높여줄 거예요", "주변의 조언에도 조금 더 귀를 기울여보세요"],
        matching: "피겨 스케이팅, 아이스하키",
        image: "⛸️",
        color: "blue"
    },
    // I N F P / I N F J: 피겨 스케이팅
    INFP: {
        title: "은반 위의 예술가, 피겨 스케이팅",
        subtitle: "아름다운 곡선 속에 감춰진 강인한 내면",
        description: "섬세한 감수성과 완벽을 기하는 예술적 혼을 가졌습니다. 기술적인 정확성만큼이나 표현력을 중요하게 생각하며, 자신만의 독창적인 서사를 풀어냅니다.",
        traits: ["우아함 속에 숨겨진 지독한 노력", "풍부한 감성과 디테일한 표현력", "주목받을 때 더 빛나는 천상 스타형"],
        tips: ["결과에 대한 압박감을 내려놓고 무대를 즐겨보세요", "체력 관리도 예술만큼 중요하다는 것 잊지 마세요"],
        matching: "쇼트트랙, 컬링",
        image: "👑",
        color: "indigo"
    },
    INFJ: {
        title: "은반 위의 예술가, 피겨 스케이팅",
        subtitle: "아름다운 곡선 속에 감춰진 강인한 내면",
        description: "섬세한 감수성과 완벽을 기하는 예술적 혼을 가졌습니다. 기술적인 정확성만큼이나 표현력을 중요하게 생각하며, 자신만의 독창적인 서사를 풀어냅니다.",
        traits: ["우아함 속에 숨겨진 지독한 노력", "풍부한 감성과 디테일한 표현력", "주목받을 때 더 빛나는 천상 스타형"],
        tips: ["결과에 대한 압박감을 내려놓고 무대를 즐겨보세요", "체력 관리도 예술만큼 중요하다는 것 잊지 마세요"],
        matching: "쇼트트랙, 컬링",
        image: "👑",
        color: "indigo"
    },
    // I S T P: 스켈레톤
    ISTP: {
        title: "중력을 거스르는 자, 스켈레톤",
        subtitle: "맹렬한 공포 속에서도 평온을 유지하는 얼음 심장",
        description: "당신은 차분한 외면 뒤에 폭발적인 용기를 숨기고 있습니다. 시속 100km가 넘는 공포 앞에서도 흔들림 없이 길을 찾는 냉정함을 가졌습니다.",
        traits: ["혼자만의 페이스를 유지하는 독립심", "불필요한 동작 없는 극강의 효율주의", "극한의 속도에서 느끼는 짜릿한 자유"],
        tips: ["가끔은 팀원들과의 소통이 새로운 영감이 될 수 있어요", "너무 자기 통제에만 집착하지 말고 유연해지기"],
        matching: "쇼트트랙, 매스스타트",
        image: "🛷",
        color: "slate"
    },
    // E S T J / I S T J: 컬링
    ESTJ: {
        title: "빙판 위의 체스 마스터, 컬링",
        subtitle: "치밀한 전략과 완벽한 팀워크의 조화",
        description: "상황을 분석하고 멀리 내다보는 전략가 타입입니다. 겉으론 침착해 보이지만 머릿속은 끊임없이 연산 중인 똑순이/똑돌이 스타일입니다.",
        traits: ["한 치의 오차도 허용하지 않는 정확성", "동료를 이끄는 부드러운 리더십", "안정적인 흐름을 유지하는 인내심"],
        tips: ["예상치 못한 변수가 발생해도 당황하지 마세요", "가끔은 데이터보다 직관을 믿어보는 건 어떨까요?"],
        matching: "피겨 스케이팅, 아이스하키",
        image: "🥌",
        color: "teal"
    },
    ISTJ: {
        title: "빙판 위의 체스 마스터, 컬링",
        subtitle: "치밀한 전략과 완벽한 팀워크의 조화",
        description: "상황을 분석하고 멀리 내다보는 전략가 타입입니다. 겉으론 침착해 보이지만 머릿속은 끊임없이 연산 중인 똑순이/똑돌이 스타일입니다.",
        traits: ["한 치의 오차도 허용하지 않는 정확성", "동료를 이끄는 부드러운 리더십", "안정적인 흐름을 유지하는 인내심"],
        tips: ["예상치 못한 변수가 발생해도 당황하지 마세요", "가끔은 데이터보다 직관을 믿어보는 건 어떨까요?"],
        matching: "피겨 스케이팅, 아이스하키",
        image: "🥌",
        color: "teal"
    },
    // E S F P: 아이스하키
    ESFP: {
        title: "빙판 위의 전사, 아이스하키",
        subtitle: "에너지와 열정이 폭발하는 화끈한 팀플레이어",
        description: "당신은 팀의 분위기 메이커이자 거침없이 달려나가는 행동파입니다. 강인한 체력과 친화력으로 경기장 안팎에서 존재감을 과시합니다.",
        traits: ["몸을 사리지 않는 열정적인 에너지", "동료들과 함께할 때 시너지가 나는 사회성", "유머와 위트로 긴장을 풀어주는 매력"],
        tips: ["흥분했을 때일수록 냉정함을 잃지 않도록 연습해요", "개인 기량만큼이나 전술 공부도 병행해보세요"],
        matching: "쇼트트랙, 컬링",
        image: "🏒",
        color: "rose"
    },
    // E N T P / E N F P: 스노보드
    ENTP: {
        title: "공중 위의 자유 영혼, 스노보드",
        subtitle: "틀에 박힌 것을 거부하는 창의적인 비상",
        description: "남들과 똑같은 길은 거부합니다. 자기만의 스타일을 개척하고 새로운 기술을 시도하는 것에서 가장 큰 희열을 느끼는 모험가입니다.",
        traits: ["어디서든 튀는 기발한 독창성", "도전을 두려워하지 않는 낙천적인 태도", "규칙보다는 즐거움이 우선인 자유방임형"],
        tips: ["기본기를 튼튼히 다지면 더 화려한 기술이 가능해져요", "가끔은 성실한 반복 훈련도 필요하다는 걸 인정하기"],
        matching: "쇼트트랙, 아이스하키",
        image: "🏂",
        color: "orange"
    },
    ENFP: {
        title: "공중 위의 자유 영혼, 스노보드",
        subtitle: "틀에 박힌 것을 거부하는 창의적인 비상",
        description: "남들과 똑같은 길은 거부합니다. 자기만의 스타일을 개척하고 새로운 기술을 시도하는 것에서 가장 큰 희열을 느끼는 모험가입니다.",
        traits: ["어디서든 튀는 기발한 독창성", "도전을 두려워하지 않는 낙천적인 태도", "규칙보다는 즐거움이 우선인 자유방임형"],
        tips: ["기본기를 튼튼히 다지면 더 화려한 기술이 가능해져요", "가끔은 성실한 반복 훈련도 필요하다는 걸 인정하기"],
        matching: "쇼트트랙, 아이스하키",
        image: "🏂",
        color: "orange"
    },
    // 나머지는 기본값으로 특정 스포츠 연결
    ENFJ: { title: "팀의 수호신, 아이스하키", subtitle: "리더십과 열정으로 빙판을 장악하다", description: "당신은 동료들을 이끄는 따뜻한 카리스마의 소유자입니다.", traits: ["강력한 전달력", "헌신적인 태도", "뛰어난 위기관리"], tips: ["자신을 희생하기보다 동등한 협력을 지향하세요"], matching: "컬링", image: "🥅", color: "red" },
    ENTJ: { title: "빙판의 사령관, 아이스하키", subtitle: "치밀함과 파워를 겸비한 완벽주의 리더", description: "목표를 향해 거침없이 전진하는 불도저 스타일입니다.", traits: ["전략적 사고", "결단력", "압도적 성취욕"], tips: ["팀원들의 감정도 성과만큼 중요하다는 걸 기억하세요"], matching: "컬링", image: "🚨", color: "blue" },
    ISFP: { title: "침묵의 질주자, 매스스타트", subtitle: "유연한 대처와 막판 스퍼트의 달인", description: "상황 변화를 관찰하며 기회를 노리는 인내심이 뛰어납니다.", traits: ["유연한 대기만성형", "조용한 관찰력", "강한 뒷심"], tips: ["보다 적극적으로 기회를 선점하는 연습을 해보세요"], matching: "피겨 스케이팅", image: "💨", color: "cyan" },
    INTP: { title: "빙판 위의 과학자, 컬링", subtitle: "물리학적 관점으로 경로를 설계하는 천재", description: "현상을 논리적으로 분석하고 원리를 깨닫는 데 탁월합니다.", traits: ["지적 호기심", "창의적 해결책", "객관적 시각"], tips: ["실행 없는 생각은 결과를 만들지 못해요"], matching: "피겨 스케이팅", image: "🧪", color: "blue" },
};

export function OlympicQuiz({ title, description }: { title?: string; description?: string }) {
    const searchParams = useSearchParams();
    const {
        step,
        currentIdx,
        startQuiz,
        completeQuiz,
        restartQuiz,
        nextQuestion,
        isGenerating,
        setIsGenerating,
    } = useQuiz({ slug: "/olympic", loadingDuration: 3500 });

    const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
    const storyCardRef = useRef<HTMLDivElement>(null);

    const handleAnswer = (answer: Answer) => {
        const nextScores = { ...scores, [answer.dimension]: scores[answer.dimension] + answer.value };
        setScores(nextScores);

        const isComplete = nextQuestion(currentIdx + 1 >= questions.length);
        if (isComplete) {
            const finalMbti = (nextScores.EI >= 0 ? "E" : "I") + (nextScores.SN >= 0 ? "S" : "N") + (nextScores.TF >= 0 ? "T" : "F") + (nextScores.JP >= 0 ? "J" : "P");
            completeQuiz(finalMbti);
        }
    };

    const mbti = useMemo(() => {
        const res = searchParams.get("res")?.toUpperCase();
        if (res && results[res]) return res;
        return (scores.EI >= 0 ? "E" : "I") + (scores.SN >= 0 ? "S" : "N") + (scores.TF >= 0 ? "T" : "F") + (scores.JP >= 0 ? "J" : "P");
    }, [scores, searchParams]);

    const resultData = results[mbti] || results.ESTP;
    const progress = Math.round(((currentIdx + 1) / questions.length) * 100);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `나의 국가대표 관상 결과: ${resultData.title}`,
                    text: `나는 어떤 동계올림픽 종목의 국가대표일까? 테스트 결과 확인하기! #동계올림픽 #스포츠관상 #마음콕`,
                    url
                });
            } catch (err) { console.error(err); }
        } else {
            await navigator.clipboard.writeText(url);
            alert("결과 주소가 복사되었습니다!");
        }
    };

    const handleDownloadStoryCard = useCallback(async () => {
        if (!storyCardRef.current) return;
        setIsGenerating(true);
        try {
            const dataUrl = await toPng(storyCardRef.current, { cacheBust: true, width: 1080, height: 1920 });
            const link = document.createElement("a");
            link.download = `olympic-result-${mbti}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) { console.error(err); alert("이미지 생성 중 오류가 발생했습니다."); }
        finally { setIsGenerating(false); }
    }, [mbti, setIsGenerating]);

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
            <AnimatePresence mode="wait">
                {step === "intro" && (
                    <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                        <QuizHeader
                            category="동계스포츠 성격 테스트"
                            categoryHref="/olympic"
                            title={title || "국가대표 관상 테스트"}
                            description={description || "내가 동계올림픽에 나간다면 어떤 종목에서 금메달을 딸 수 있을까요?"}
                            badge="OLYMPIC EDITION"
                            themeColor="blue"
                            stats={[
                                { value: "약 2분 소요", icon: "⏱️" },
                                { value: "다양한 종목 매칭", icon: "🥇" },
                                { value: "재밌는 스포츠 성향", icon: "⛄" }
                            ]}
                        />
                        <QuizIntroCard
                            icon="❄️"
                            title="나는 어떤 종목의 국가대표 관상일까?"
                            description="성격과 가치관을 통해 알아보는 나의 운명적인 동계 스포츠! 과연 당신이 시상대 가장 높은 곳에서 손을 흔들게 될 종목은 무엇일까요?"
                            buttonText="나의 종목 확인하기"
                            onStart={startQuiz}
                            adsenseSlot="1777541474"
                            themeColor="indigo"
                        />
                    </motion.div>
                )}

                {step === "quiz" && (
                    <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                        <QuizProgress progress={progress} themeColor="indigo" />
                        <div className="text-center">
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em]">Training Stage {currentIdx + 1}</span>
                            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{questions[currentIdx].question}</h3>
                        </div>
                        <div className="grid gap-4">
                            {questions[currentIdx].answers.map((ans, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(ans)}
                                    className="w-full rounded-3xl border-2 border-slate-50 bg-white p-6 md:p-8 text-left text-lg font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600"
                                >
                                    {ans.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="relative mb-8 h-24 w-24">
                            <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100" />
                            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-5xl shadow-lg">🏒</div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">당신의 신체 능력과<br />정신력을 분석하고 있어요</h3>
                        <p className="mt-4 text-slate-500 font-bold mb-8">국가대표 선발전 마감 중...</p>
                        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                            <AdSenseSlot slot="9839880235" className="min-h-[250px]" />
                        </div>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto space-y-8">
                        <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
                            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 md:p-10 text-center text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.image}</div>
                                <div className="inline-block rounded-full bg-white/20 px-6 py-1.5 text-sm font-black backdrop-blur-md">GOLD MEDALIST</div>
                                <h2 className="mt-6 text-4xl font-black tracking-tight">{resultData.title}</h2>
                                <p className="mt-2 text-blue-100 font-bold text-lg">{resultData.subtitle}</p>
                            </div>
                            <div className="p-6 md:p-10">
                                <p className="text-xl leading-relaxed text-slate-700 font-medium">{resultData.description}</p>
                                <div className="mt-10 space-y-6">
                                    <div className="rounded-[2rem] bg-indigo-50/50 p-6 border border-indigo-100">
                                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Core Strengths</h4>
                                        <ul className="space-y-4">
                                            {resultData.traits.map((t, i) => (
                                                <li key={i} className="flex items-start gap-4 text-slate-700 font-bold leading-relaxed">
                                                    <Trophy className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-[2rem] bg-slate-50/50 p-6 border border-slate-100">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Performance Tips</h4>
                                        <ul className="space-y-4">
                                            {resultData.tips.map((t, i) => (
                                                <li key={i} className="flex items-start gap-4 text-slate-700 font-bold leading-relaxed">
                                                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-blue-400 shadow-sm" />
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-10 rounded-[2rem] border-4 border-dashed border-slate-100 p-10 text-center bg-slate-50/30">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">환상의 복식조 파트너</h4>
                                    <p className="text-3xl font-black text-slate-900">{resultData.matching}</p>
                                </div>

                                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />

                                <QuizActionButtons
                                    theme="indigo"
                                    onShare={handleShare}
                                    onShareTwitter={() => { }}
                                    onSaveImage={handleDownloadStoryCard}
                                    isSavingImage={isGenerating}
                                    onRetry={restartQuiz}
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <RecommendedTests currentSlug="/olympic" />
                        </div>
                        <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Insta Story Card for Export */}
            <div className="fixed left-[-9999px] top-[-9999px]">
                <div ref={storyCardRef} className="flex flex-col bg-gradient-to-br from-indigo-500 to-blue-700 text-white" style={{ width: "1080px", height: "1920px", padding: "80px" }}>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="mb-12 text-[240px] drop-shadow-2xl">{resultData.image}</div>
                        <div className="inline-block rounded-full bg-white/20 px-12 py-3 text-4xl font-black backdrop-blur-md mb-8">NATIONAL ATHLETE</div>
                        <h2 className="text-8xl font-black tracking-tight mb-4 leading-tight">{resultData.title}</h2>
                        <p className="text-4xl text-blue-100 font-bold mb-16 italic">"{resultData.subtitle}"</p>
                        <div className="w-full bg-white/10 rounded-[4rem] p-12 backdrop-blur-lg border border-white/20 text-left mb-12">
                            <h4 className="text-2xl font-black text-white/60 uppercase tracking-widest mb-8">Performance Analysis</h4>
                            <ul className="space-y-6">
                                {resultData.traits.map((t: string, i: number) => (
                                    <li key={i} className="flex items-center gap-6 text-4xl font-black"><Trophy className="h-10 w-10 text-amber-300" />{t}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-auto pt-20">
                            <p className="text-2xl font-black tracking-[0.4em] text-white/40 uppercase mb-4">MIND ZUCCA OLYMPIC TEST</p>
                            <p className="text-3xl font-black">mind.zucca100.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
