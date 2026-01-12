"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AdSenseSlot } from "@/components/ui/adsense-slot";
import { RecommendedTests } from "@/components/quiz/recommended-tests";
import { toPng } from "html-to-image";
import { Heart } from "lucide-react";
import { QuizActionButtons } from "@/components/quiz/quiz-action-buttons";
import { QuizHeader } from "@/components/quiz/shared/quiz-header";
import { QuizProgress } from "@/components/quiz/shared/quiz-progress";
import { QuizIntroCard } from "@/components/quiz/shared/quiz-intro-card";
import { useQuiz } from "@/hooks/use-quiz";

type MBTIDimension = "EI" | "SN" | "TF" | "JP";

interface Answer {
    text: string;
    dimension: MBTIDimension;
    value: 1 | -1;
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
    ISTJ: { title: "신뢰의 정석, 계획적인 수호자", subtitle: "안정적이고 책임감 있는 연애 스타일", description: "한 번 마음을 열면 변치 않는 해바라기 같은 스타일입니다. 화려하진 않아도 묵묵히 연인을 챙기는 든든한 버팀목이 되어줍니다.", traits: ["약속 시간을 철저히 지킴", "실무적인 도움을 많이 줌", "감정 표현이 조금 서툴 수 있음"], tips: ["가끔은 연인의 감정에 먼저 공감해 보세요", "예상치 못한 작은 서프라이즈도 좋아요"], matching: "ENFP, ENFJ", image: "💍" },
    ISFJ: { title: "다정한 헌신자, 세심한 지지자", subtitle: "소리 없이 강한 배려의 사랑꾼", description: "상대방의 사소한 습관까지 기억하고 챙겨주는 다정한 연인입니다. 갈등을 피하고 평화로운 관계를 유지하기 위해 노력합니다.", traits: ["기념일을 정말 잘 챙김", "상대방의 필요를 먼저 파악함", "자신의 상처를 숨길 때가 있음"], tips: ["때로는 본인의 속마음을 솔직히 표현해도 괜찮아요", "희생만 하는 연애는 금물!"], matching: "ESFP, ESTP", image: "🌸" },
    INFJ: { title: "영혼의 동반자, 깊은 통찰의 로맨티스트", subtitle: "정서적 교감을 중요시하는 신비로운 사랑", description: "단순한 데이트보다 깊은 대화와 정신적 성장을 함께할 수 있는 관계를 추구합니다. 따뜻하면서도 확고한 신념이 매력적입니다.", traits: ["나만의 선이 확실함", "상대방의 성장을 진심으로 응원함", "복잡한 생각에 잠기곤 함"], tips: ["생각이 너무 많아질 땐 현실의 즐거움에 집중해 보세요", "혼자만의 동굴 시간을 연인에게 미리 말해주기"], matching: "ENFP, ENTP", image: "🕯️" },
    INTJ: { title: "전략적 파트너, 지적인 완벽주의자", subtitle: "독립적이고 효율적인 연애 지향", description: "연애도 하나의 프로젝트처럼 진중하게 분석하고 계획합니다. 감정 과잉은 피하지만, 신뢰하는 연인에게는 매우 헌신적입니다.", traits: ["지적인 자극을 주는 대화 선호", "불필요한 감정 소모를 싫어함", "미래를 함께 설계하는 파트너십"], tips: ["가끔은 논리보다 따뜻한 포옹이 더 큰 힘이 돼요", "서투른 감정 표현도 꾸준히 연습해 보기"], matching: "ENFP, ENTP", image: "🏛️" },
    ISTP: { title: "쿨한 자유 영혼, 도구 쓰는 로맨티스트", subtitle: "담백하지만 함께 있을 때 즐거운 연애", description: "구속받는 것을 싫어하며 자유로운 연애를 선호합니다. 말보다는 행동으로 애정을 표현하며, 취미를 공유하는 데이트를 즐깁니다.", traits: ["집착은 절대 거부", "순발력 있고 재치가 넘침", "혼자만의 시간이 꼭 필요함"], tips: ["연인이 불안하지 않게 연락 빈도를 조금만 높여봐요", "감사한 마음은 말로도 표현하기"], matching: "ESFJ, ESTJ", image: "🛠️" },
    ISFP: { title: "다정한 예술가, 순간을 걷는 연인", subtitle: "따스한 배려와 감수성이 넘치는 사랑", description: "현재 살고 있는 이 순간의 행복을 가장 중요하게 생각합니다. 갈등을 싫어하며 말없고 온화한 태도로 연인을 감싸 안아줍니다.", traits: ["미적 감각이 뛰어난 데이트 코스", "상대의 말을 잘 들어주는 경청의 왕", "결정하는 데 시간이 조금 걸림"], tips: ["가끔은 주도적으로 데이트를 리드해 보세요", "본인의 불만도 조금씩 표현하는 연습!"], matching: "ENFJ, ESFJ", image: "🎨" },
    INFP: { title: "낭만적인 몽상가, 진정한 사랑의 탐구자", subtitle: "이상적이고 동화 같은 사랑을 꿈꾸는 스타일", description: "사랑에 대해 깊은 의미를 부여하며, 연인을 위해 모든 것을 줄 수 있는 낭만파입니다. 정서적 소통이 안 되면 크게 외로움을 느낍니다.", traits: ["풍부한 상상력과 공감 능력", "사랑에 대한 확고한 이상향", "갈등 상황에서 회피 성향"], tips: ["현실은 동화보다 복잡할 수 있음을 인정하기", "서운한 점은 그 자리에서 정중히 말해봐요"], matching: "ENFJ, ENTJ", image: "🌙" },
    INTP: { title: "지적인 탐구자, 독립적인 연애 박사", subtitle: "호기심 많고 엉뚱한 매력의 사랑", description: "지적 호기심을 나눌 수 있는 연인을 선호합니다. 사회적 관행보다는 자신들만의 독특한 연애 방식을 만들어가는 것을 좋아합니다.", traits: ["감색 자극보다는 팩트 폭격 주의", "엉뚱하지만 기발한 아이디어", "애정 표현에 다소 무심할 수 있음"], tips: ["기념일은 캘린더에 미리 등록해두세요!", "논리만큼 중요한 것이 상대방의 기분임을 기억하기"], matching: "ENTJ, ESTJ", image: "🔬" },
    ESTP: { title: "활동적인 모험가, 에너자이저 연인", subtitle: "스릴 넘치고 지루할 틈 없는 연애", description: "활동적인 데이트를 선호하며 모험을 즐킵니다. 적응력이 뛰어나고 현재의 즐거움을 가장 중요시하는 열정적인 사랑꾼입니다.", traits: ["자신감 넘치는 태도", "유머 감각과 타고난 센스", "깊은 약속보다는 현재에 충실"], tips: ["때로는 차분한 대화의 시간도 가져보세요", "장기적인 미래 계획도 연인과 상담하기"], matching: "ISFJ, ISTJ", image: "⚡" },
    ESFP: { title: "즐거운 파티피플, 사교적인 연인", subtitle: "함께 있으면 세상이 축제인 사랑", description: "사교적이며 밝은 에너지를 연인에게 쏟아붓습니다. 칭찬과 사랑 표현을 아끼지 않으며, 함께 즐거운 경험을 쌓는 것을 행복으로 여깁니다.", traits: ["트렌드를 앞서가는 데이트", "놀랄 만큼 솔직한 감정 표현", "쉽게 지루함을 느낄 수 있음"], tips: ["감정에 휩쓸려 충동적인 결정을 내리지 않도록 주의", "진지한 고민도 가끔은 들어주세요"], matching: "ISFJ, ISTJ", image: "🎉" },
    ENFP: { title: "재기발랄한 연인, 사랑이 넘치는 영혼", subtitle: "지루할 틈 없는 이벤트 제조기", description: "긍정적인 에너지가 넘치며 연인에게 끊임없이 애정을 표현합니다. 함께 있으면 세상이 밝아지는 기분을 느끼게 해주는 매력쟁이입니다.", traits: ["표현력이 매우 풍부함", "창의적인 데이트 아이디어", "구속받는 것은 싫어함"], tips: ["가끔은 현실적인 문제에도 집중해 보세요", "약속 시간을 지키려 노력하면 좋아요"], matching: "INFJ, INTJ", image: "✨" },
    ENTP: { title: "기발한 토론가, 지적인 고집쟁이", subtitle: "재미있고 예측 불허한 연애", description: "창의적이고 새로운 시도를 즐킵니다. 고정관념에 얽매이지 않는 연애를 추구하며, 지적인 논쟁조차도 애정 표현의 하나로 생각합니다.", traits: ["말솜씨가 화려하고 논리적", "반복되는 데이트는 금물", "자존심이 아주 강함"], tips: ["논쟁에서 이기려 하기보다 연인의 편이 되어주세요", "지나친 장난은 상대방에게 상처가 될 수도!"], matching: "INFJ, INTJ", image: "💡" },
    ESTJ: { title: "추진력 있는 리더, 든든한 현실주의자", subtitle: "체계적이고 확실한 로맨스", description: "연애에 있어서도 명확한 규칙과 계획을 선호합니다. 본인의 가치관이 뚜렷하며, 연인에게 책임감 있고 듬직한 모습을 보여줍니다.", traits: ["데이트 코스 완벽 설계", "직설적이지만 솔직한 태도", "효율성을 매우 중시함"], tips: ["연인의 감정적 투정도 때로는 들어줄 여유를 가져봐요", "지나치게 통제하려 하지 않도록 주의"], matching: "ISFP, ISTP", image: "📋" },
    ESFJ: { title: "따뜻한 조력자, 배려 깊은 호스트", subtitle: "주변까지 행복하게 만드는 다정한 연애", description: "사람들을 챙기는 것을 좋아하며 연인의 기쁨을 자신의 행복으로 여깁니다. 리액션이 좋고 조화로운 관계를 유지하는 데 탁월합니다.", traits: ["안정적인 관계 지향", "가족과 친구들에게 연인을 자랑함", "거절하는 것을 힘들어함"], tips: ["상대방의 기분에 일희일비하지 않도록 마인드 컨트롤", "가끔은 본인의 의견을 강하게 내비쳐도 좋아요"], matching: "ISFP, ISTP", image: "☕" },
    ENFJ: { title: "열정적인 지지자, 정의로운 사랑꾼", subtitle: "상대방을 더 빛나게 만드는 성장형 연애", description: "연인의 장점을 발견하고 키워주는 데 천부적인 소질이 있습니다. 따뜻한 리더십으로 관계를 이끌며 정서적으로 매우 충만한 연애를 합니다.", traits: ["공감 능력이 매우 뛰어남", "미래 지향적인 관계 설계", "상처받아도 웃는 얼굴을 할 때가 많음"], tips: ["연인을 챙기느라 자신을 돌보는 일을 소홀히 하지 마세요", "비판을 너무 개인적으로 받아들이지 않기"], matching: "INFP, ISFP", image: "☀️" },
    ENTJ: { title: "전략적인 개척자, 야망 있는 파트너", subtitle: "함께 성장하고 성공하는 불도저식 사랑", description: "자기 계발에 열심이며 연인과 함께 더 나은 미래를 향해 나아가는 것을 즐깁니다. 결단력이 있고 책임감이 강해 연인에게 신뢰를 줍니다.", traits: ["확실한 주도권과 리더십", "효율적인 시간 관리와 데이트", "감정보다는 해결책 우선"], tips: ["연인이 고민을 말할 땐 해결책보다 공감을 먼저!", "명령조가 되지 않도록 말투에 신경 써보세요"], matching: "INFP, INTP", image: "🚀" },
};

const compatibilityScores: Record<string, Record<string, number>> = {
    ISTJ: { ESFP: 5, ESTP: 5, ISFP: 4, ISTP: 4, ISFJ: 3, ISTJ: 3, ESFJ: 3, ESTJ: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    ISFJ: { ESFP: 5, ESTP: 5, ISFP: 4, ISTP: 4, ISFJ: 3, ISTJ: 3, ESFJ: 3, ESTJ: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    INFJ: { ENFP: 5, ENTP: 5, INFP: 4, INFJ: 4, ENFJ: 4, ENTJ: 4, INTP: 4, INTJ: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
    INTJ: { ENFP: 5, ENTP: 5, INFP: 4, INFJ: 4, ENFJ: 4, ENTJ: 4, INTP: 4, INTJ: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
    ISTP: { ESFJ: 5, ESTJ: 5, ISFJ: 4, ISTJ: 4, ISFP: 3, ISTP: 3, ESFP: 3, ESTP: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    ISFP: { ENFJ: 5, ESFJ: 5, ESTJ: 5, INFJ: 4, ISFJ: 4, ISTJ: 4, ISFP: 3, ISTP: 3, ESFP: 3, ESTP: 3, ENFP: 2, INFP: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    INFP: { ENFJ: 5, ENTJ: 5, INFJ: 4, INTJ: 4, INFP: 4, ENFP: 4, ENTP: 4, INTP: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
    INTP: { ENTJ: 5, ESTJ: 5, INTJ: 4, INFJ: 4, INTP: 4, ENTP: 4, ENFP: 4, INFP: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1 },
    ESTP: { ISFJ: 5, ISTJ: 5, ESFJ: 4, ESTJ: 4, ESFP: 3, ESTP: 3, ISFP: 3, ISTP: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    ESFP: { ISFJ: 5, ISTJ: 5, ESFJ: 4, ESTJ: 4, ESFP: 3, ESTP: 3, ISFP: 3, ISTP: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    ENFP: { INFJ: 5, INTJ: 5, ENFP: 4, ENFJ: 4, INFP: 4, ENTP: 4, INTP: 4, ENTJ: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
    ENTP: { INFJ: 5, INTJ: 5, ENFP: 4, ENFJ: 4, INFP: 4, ENTP: 4, INTP: 4, ENTJ: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
    ESTJ: { ISFP: 5, ISTP: 5, INTP: 5, ISFJ: 4, ISTJ: 4, ESFJ: 4, ESTJ: 4, ESFP: 3, ESTP: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTJ: 1 },
    ESFJ: { ISFP: 5, ISTP: 5, ISFJ: 4, ISTJ: 4, ESFJ: 4, ESTJ: 4, ESFP: 3, ESTP: 3, ENFP: 2, ENFJ: 2, INFP: 2, INFJ: 2, ENTP: 1, ENTJ: 1, INTP: 1, INTJ: 1 },
    ENFJ: { INFP: 5, ISFP: 5, INFJ: 4, INTJ: 4, ENFJ: 4, ENFP: 4, ENTP: 4, INTP: 4, ISFJ: 2, ISTJ: 2, ESFP: 1, ESTP: 1, ESFJ: 1, ESTJ: 1 },
    ENTJ: { INFP: 5, INTP: 5, INFJ: 4, INTJ: 4, ENFJ: 4, ENFP: 4, ENTP: 4, ISFP: 2, ISTP: 2, ESFP: 1, ESTP: 1, ISFJ: 1, ISTJ: 1, ESFJ: 1, ESTJ: 1 },
};

const getCompatibility = (mbtiA: string, mbtiB: string) => {
    const score = compatibilityScores[mbtiA.toUpperCase()]?.[mbtiB.toUpperCase()] || 3;
    const labels: Record<number, { score: number, text: string, color: string }> = {
        5: { score: 95, text: "환상의 찰떡궁합! 💖", color: "text-pink-600" },
        4: { score: 80, text: "아주 좋은 케미예요! ✨", color: "text-rose-500" },
        3: { score: 60, text: "무난하고 평화로운 사이 🌿", color: "text-emerald-500" },
        2: { score: 40, text: "노력이 조금 필요할지도...? 🤔", color: "text-amber-500" },
        1: { score: 20, text: "파란만장한 도전적 관계 ⚡", color: "text-slate-500" },
    };
    return labels[score];
};

const getResult = (mbti: string): ResultContent => results[mbti.toUpperCase()] || results.ISTJ;

export function DatingStyleQuiz({ title, description }: { title?: string; description?: string }) {
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
    } = useQuiz({ slug: "/dating", loadingDuration: 4000 });

    const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
    const storyCardRef = useRef<HTMLDivElement>(null);

    const partnerMbti = useMemo(() => searchParams.get("partner")?.toUpperCase() || null, [searchParams]);

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
        const res = searchParams.get("res");
        if (res && results[res.toUpperCase()]) return res.toUpperCase();
        return (scores.EI >= 0 ? "E" : "I") + (scores.SN >= 0 ? "S" : "N") + (scores.TF >= 0 ? "T" : "F") + (scores.JP >= 0 ? "J" : "P");
    }, [scores, searchParams]);

    const resultData = getResult(mbti);
    const partnerData = partnerMbti ? getResult(partnerMbti) : null;
    const compatibility = partnerMbti ? getCompatibility(mbti, partnerMbti) : null;
    const progress = Math.round(((currentIdx + 1) / questions.length) * 100);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: `나의 연애 성향: ${resultData.title}`, text: `당신의 연애 DNA를 확인해보세요! #마음콕 #MBTI연애`, url });
            } catch (err) { console.error(err); }
        } else {
            await navigator.clipboard.writeText(url);
            alert("결과 주소가 복사되었습니다!");
        }
    };

    const handleTwitterShare = () => {
        const text = `나의 연애 성향: ${resultData.title}\n당신의 연애 DNA를 확인해보세요! #마음콕 #MBTI연애`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    };

    const handleDownloadStoryCard = useCallback(async () => {
        if (!storyCardRef.current) return;
        setIsGenerating(true);
        try {
            const dataUrl = await toPng(storyCardRef.current, { cacheBust: true, width: 1080, height: 1920 });
            const link = document.createElement("a");
            link.download = `mind-zucca-love-${mbti}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) { console.error(err); alert("이미지 생성 중 오류가 발생했습니다."); }
        finally { setIsGenerating(false); }
    }, [mbti, setIsGenerating]);

    const handlePartnerShare = async () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}?partner=${mbti}`;
        if (navigator.share) {
            try { await navigator.share({ title: "우리 궁합은 어떨까?", text: `내가 보낸 연애 성향 테스트! 너랑 나랑 얼마나 잘 맞는지 확인해봐 💘`, url: shareUrl }); }
            catch (err) { console.error(err); }
        } else {
            await navigator.clipboard.writeText(shareUrl);
            alert("친구용 공유 주소가 복사되었습니다!");
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
            <AnimatePresence mode="wait">
                {step === "intro" && (
                    <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                        <QuizHeader
                            category="연애 성향 테스트"
                            categoryHref="/dating"
                            title={title || "MBTI 연애 성향 테스트"}
                            description={description || "나의 연애 스타일과 환상의 파트너를 찾아보세요."}
                            badge="LOVE & SYMBOL"
                            themeColor="pink"
                            stats={[
                                { value: "약 3분 소요", icon: "⏱️" },
                                { value: "16가지 MBTI 매칭", icon: "🧬" },
                                { value: "무료 심리검사", icon: "💖" }
                            ]}
                        />
                        <QuizIntroCard
                            icon={partnerMbti ? "💖" : "💘"}
                            title={partnerMbti ? "친구의 궁합 초대!" : "MBTI 연애 성향 테스트"}
                            description={partnerMbti ? `${partnerData?.title}인 친구가 궁합을 궁금해해요! 테스트를 완료하고 우리 둘의 환상적인 연애 점수를 확인해보세요.` : "연애할 때 나는 어떤 유형일까? 12가지 질문으로 알아보는 나의 연애 스타일!"}
                            buttonText={partnerMbti ? "궁합 확인하러 가기" : "시작하기"}
                            onStart={startQuiz}
                            adsenseSlot="1777541474"
                            themeColor="pink"
                        />
                    </motion.div>
                )}

                {step === "quiz" && (
                    <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                        <QuizProgress progress={progress} themeColor="pink" />
                        <div className="text-center">
                            <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Question {currentIdx + 1}</span>
                            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{questions[currentIdx].question}</h3>
                        </div>
                        <div className="grid gap-4">
                            {questions[currentIdx].answers.map((ans, idx) => (
                                <motion.button key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(ans)} className="w-full rounded-3xl border-2 border-slate-50 bg-white p-6 md:p-8 text-left text-lg font-bold text-slate-700 shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50/50 hover:text-pink-600">
                                    {ans.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="relative mb-8 h-24 w-24">
                            <div className="absolute inset-0 animate-ping rounded-full bg-pink-100" />
                            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-5xl shadow-lg">✨</div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{partnerMbti ? "우리 둘의 궁합을" : "당신의 연애 DNA를"}<br />분석하고 있어요</h3>
                        <p className="mt-4 text-slate-500 font-bold mb-8">잠시만 기다려주세요!</p>
                        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                            <AdSenseSlot slot="9839880235" className="min-h-[250px]" />
                        </div>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto space-y-8">
                        {partnerMbti && compatibility && (
                            <div className="overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center text-white shadow-2xl">
                                <div className="mb-4 text-xs font-black uppercase tracking-[0.3em] opacity-80">Chemistry Match</div>
                                <div className="mb-6 flex items-center justify-center gap-6">
                                    <div className="flex flex-col items-center gap-2"><div className="text-5xl">{resultData.image}</div><div className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{mbti}</div></div>
                                    <div className="text-4xl animate-pulse">❤️</div>
                                    <div className="flex flex-col items-center gap-2"><div className="text-5xl">{partnerData?.image}</div><div className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{partnerMbti}</div></div>
                                </div>
                                <h3 className="text-4xl font-black mb-2">{compatibility.score}%</h3>
                                <p className="text-xl font-bold text-indigo-100">{compatibility.text}</p>
                            </div>
                        )}

                        <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
                            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 md:p-10 text-center text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <div className="mb-6 text-8xl drop-shadow-2xl">{resultData.image}</div>
                                <div className="inline-block rounded-full bg-white/20 px-6 py-1.5 text-sm font-black backdrop-blur-md">{mbti} Type</div>
                                <h2 className="mt-6 text-4xl font-black tracking-tight">{resultData.title}</h2>
                                <p className="mt-2 text-pink-100 font-bold text-lg">{resultData.subtitle}</p>
                            </div>
                            <div className="p-6 md:p-10">
                                <p className="text-xl leading-relaxed text-slate-700 font-medium">{resultData.description}</p>
                                <div className="mt-10 grid gap-6 md:grid-cols-2">
                                    <div className="rounded-[2rem] bg-pink-50/50 p-6 border border-pink-100">
                                        <h4 className="text-xs font-black text-pink-400 uppercase tracking-widest mb-4">Love Traits</h4>
                                        <ul className="space-y-4">{resultData.traits.map((t, i) => (<li key={i} className="flex items-start gap-4 text-slate-700 font-bold leading-relaxed"><span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-pink-400 shadow-sm" />{t}</li>))}</ul>
                                    </div>
                                    <div className="rounded-[2rem] bg-indigo-50/50 p-6 border border-indigo-100">
                                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Growth Tips</h4>
                                        <ul className="space-y-4">{resultData.tips.map((t, i) => (<li key={i} className="flex items-start gap-4 text-slate-700 font-bold leading-relaxed"><span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-indigo-400 shadow-sm" />{t}</li>))}</ul>
                                    </div>
                                </div>
                                {!partnerMbti && <div className="mt-10 rounded-[2rem] border-4 border-dashed border-slate-100 p-10 text-center bg-slate-50/30">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">환상의 케미 짝꿍</h4>
                                    <p className="text-3xl font-black text-slate-900">{resultData.matching}</p>
                                </div>}
                                <AdSenseSlot slot="4108191347" className="my-10 min-h-[100px]" />
                                <QuizActionButtons theme="pink" onShare={handleShare} onShareTwitter={handleTwitterShare} onSaveImage={handleDownloadStoryCard} isSavingImage={isGenerating} onRetry={restartQuiz}>
                                    <Button size="xl" className="relative w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 overflow-hidden !text-white" onClick={handlePartnerShare}>
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2"><Heart className="w-5 h-5 fill-current text-white" /></div>
                                        <span className="w-full text-center whitespace-nowrap text-[15px] md:text-lg">{partnerMbti ? "다른 친구와 궁합보기" : "친구와 궁합 매칭하기"}</span>
                                    </Button>
                                </QuizActionButtons>
                            </div>
                        </div>
                        <div className="mt-8"><RecommendedTests currentSlug="/dating" /></div>
                        <AdSenseSlot slot="8526798560" format="fluid" className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Insta Story Card for Export */}
            <div className="fixed left-[-9999px] top-[-9999px]">
                <div ref={storyCardRef} className="flex flex-col bg-gradient-to-br from-pink-500 to-rose-600 text-white" style={{ width: "1080px", height: "1920px", padding: "80px" }}>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="mb-12 text-[240px] drop-shadow-2xl animate-bounce-slow">{resultData.image}</div>
                        <div className="inline-block rounded-full bg-white/20 px-12 py-3 text-4xl font-black backdrop-blur-md mb-8">{mbti} Type</div>
                        <h2 className="text-8xl font-black tracking-tight mb-4 leading-tight">{resultData.title}</h2>
                        <p className="text-4xl text-pink-100 font-bold mb-16 italic">"{resultData.subtitle}"</p>
                        <div className="w-full bg-white/10 rounded-[4rem] p-12 backdrop-blur-lg border border-white/20 text-left mb-12">
                            <h4 className="text-2xl font-black text-white/60 uppercase tracking-widest mb-8">Love DNA Traits</h4>
                            <ul className="space-y-6">{resultData.traits.map((t: string, i: number) => (<li key={i} className="flex items-center gap-6 text-4xl font-black"><div className="h-6 w-6 rounded-full bg-white shadow-lg" />{t}</li>))}</ul>
                        </div>
                        <div className="mt-auto pt-20"><p className="text-2xl font-black tracking-[0.4em] text-white/40 uppercase mb-4">MIND ZUCCA TEST</p><p className="text-3xl font-black">mind.zucca100.com</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
