export interface TestData {
    title: string;
    description: string;
    slug: string;
    duration: string;
    badge: string;
    tags: string[];
    icon: string;
    color: string;
}

export const tests: TestData[] = [
    {
        title: "내 안의 숨겨진 띠 찾기",
        description: "겉모습과 다른 나의 진짜 성격은? 12지신 동물로 알아보는 영혼의 띠 테스트.",
        slug: "/zodiac",
        duration: "약 2분 소요",
        badge: "HOT",
        tags: ["심리", "운세", "성격"],
        icon: "🐉",
        color: "from-violet-600 to-indigo-600",
    },
    {
        title: "MBTI 연애 성향 테스트",
        description: "12개의 질문으로 나의 연애 스타일과 환상의 파트너를 분석해 보세요.",
        slug: "/dating",
        duration: "약 3분 소요",
        badge: "HOT",
        tags: ["연애", "MBTI", "심리"],
        icon: "💘",
        color: "from-pink-500 to-rose-600",
    },
    {
        title: "직장인 번아웃 자가진단",
        description: "최근 부쩍 기운이 없나요? 15가지 질문으로 나의 마음 건강을 체크하세요.",
        slug: "/burnout",
        duration: "약 3분 소요",
        badge: "NEW",
        tags: ["직장인", "건강", "심리"],
        icon: "🤯",
        color: "from-orange-500 to-amber-600",
    },
    {
        title: "나의 돈관리 성향 테스트",
        description: "월급 루틴과 소비 습관으로 초안정형부터 욜로형까지 성향을 분석해요.",
        slug: "/money",
        duration: "약 4분 소요",
        badge: "NEW",
        tags: ["재테크", "소비 성향", "생활"],
        icon: "💰",
        color: "from-emerald-500 to-teal-600",
    },
    {
        title: "공무원 직렬 추천 테스트",
        description: "10개의 질문으로 나에게 맞는 행정·기술·세무 등 직렬을 추천해요.",
        slug: "/gongmuwon",
        duration: "약 3분 소요",
        badge: "NEW",
        tags: ["진로", "공무원", "적성"],
        icon: "🎯",
        color: "from-indigo-500 to-blue-600",
    },
    {
        title: "내게 맞는 직무 유형 찾기",
        description: "성향·에너지·대인관계로 사무/기획·영업·개발·콘텐츠 중 적합한 직무를 추천해요.",
        slug: "/job",
        duration: "약 3분 소요",
        badge: "TREND",
        tags: ["취업", "직무", "커리어"],
        icon: "💼",
        color: "from-blue-500 to-cyan-600",
    },
    {
        title: "회사에서 나는 어떤 캐릭터일까?",
        description: "회의·메신저·보고서 상황으로 정리왕 PM부터 인싸 분위기메이커까지 분석해요.",
        slug: "/workplace",
        duration: "약 3분 소요",
        badge: "FUN",
        tags: ["직장인", "협업", "성향"],
        icon: "🏢",
        color: "from-violet-500 to-purple-600",
    },
];
