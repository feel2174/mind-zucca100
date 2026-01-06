
export interface Answer {
    text: string;
    animal: string; // The animal this answer points towards
    score: number;
}

export interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

export interface ZodiacResult {
    animal: string;
    name: string;
    title: string;
    subtitle: string;
    description: string;
    traits: string[];
    tips: string[];
    bestMatch: string;
    worstMatch: string;
    image: string; // Emoji
    color: string; // Gradient class
}

export const zodiacQuestions: Question[] = [
    {
        id: 1,
        question: "아주 오랜만에 동창회에 나갔다. 나의 모습은?",
        answers: [
            { text: "반가워! 여기저기 인사 다니며 분위기를 띄운다", animal: "Monkey", score: 2 },
            { text: "친했던 몇몇 친구들과 조용히 이야기 나눈다", animal: "Sheep", score: 2 },
            { text: "누가 왔나 스캔하고 적당한 자리에 앉아 관망한다", animal: "Snake", score: 2 },
            { text: "내가 주인공! 오늘 입은 옷 자랑 좀 해볼까?", animal: "Rooster", score: 2 },
        ]
    },
    {
        id: 2,
        question: "갑자기 일주일 휴가가 생겼다! 무엇을 할까?",
        answers: [
            { text: "배낭 하나 메고 지도 없이 훌쩍 여행을 떠난다", animal: "Horse", score: 2 },
            { text: "그동안 못 만난 사람들 만나면서 바쁘게 보낸다", animal: "Dog", score: 2 },
            { text: "집이 최고! 밀린 넷플릭스 보며 뒹굴거린다", animal: "Pig", score: 2 },
            { text: "자기개발 타임! 책 읽고 운동하며 알차게 보낸다", animal: "Ox", score: 2 },
        ]
    },
    {
        id: 3,
        question: "친구가 고민 상담을 요청했다. 나의 반응은?",
        answers: [
            { text: "현실적인 해결책을 딱딱 짚어준다", animal: "Rat", score: 2 },
            { text: "일단 묵묵히 들어주며 공감해준다", animal: "Rabbit", score: 2 },
            { text: "누구야? 내가 혼내줄게! 같이 화낸다", animal: "Tiger", score: 2 },
            { text: "스케일 크게! 기분 전환하러 드라이브 가자고 한다", animal: "Dragon", score: 2 },
        ]
    },
    {
        id: 4,
        question: "새로운 프로젝트 팀장이 되었다. 나의 리더십 스타일은?",
        answers: [
            { text: "나를 따르라! 카리스마 있게 척척 지시한다", animal: "Tiger", score: 2 },
            { text: "모두의 의견을 꼼꼼히 듣고 신중하게 결정한다", animal: "Ox", score: 2 },
            { text: "큰 그림을 그리며 비전을 제시한다", animal: "Dragon", score: 2 },
            { text: "분위기 메이커! 즐겁게 일하는 환경을 만든다", animal: "Monkey", score: 2 },
        ]
    },
    {
        id: 5,
        question: "소비 습관, 나는 이쪽에 가깝다",
        answers: [
            { text: "꼼꼼하게 비교하고 쿠폰까지 챙기는 알뜰형", animal: "Rat", score: 2 },
            { text: "기분이다! 꽂히면 일단 지르고 보는 플렉스형", animal: "Horse", score: 2 },
            { text: "남들에게 보여지는 아이템에는 돈을 아끼지 않는다", animal: "Rooster", score: 2 },
            { text: "맛있는 거 먹는 게 남는 거! 식도락에 투자한다", animal: "Pig", score: 2 },
        ]
    },
    {
        id: 6,
        question: "시험 기간, 나의 공부 스타일은?",
        answers: [
            { text: "벼락치기의 신! 단기간에 집중력을 발휘한다", animal: "Monkey", score: 2 },
            { text: "한 달 전부터 계획표대로 꾸준히 공부한다", animal: "Ox", score: 2 },
            { text: "중요한 것만 쏙쏙 골라 효율적으로 본다", animal: "Rat", score: 2 },
            { text: "필 꽂히는 과목만 깊게 판다", animal: "Snake", score: 2 },
        ]
    },
    {
        id: 7,
        question: "내 실수로 팀에 피해를 줬다. 어떻게 할까?",
        answers: [
            { text: "솔직하게 인정하고 빠르게 수습한다", animal: "Dog", score: 2 },
            { text: "자책하며 마음속으로 깊이 반성한다", animal: "Sheep", score: 2 },
            { text: "어떻게든 만회할 기회를 만들어 성과로 보답한다", animal: "Dragon", score: 2 },
            { text: "조용히 처리해서 아무도 모르게 해결한다", animal: "Snake", score: 2 },
        ]
    },
    {
        id: 8,
        question: "연애할 때 나는 어떤 스타일?",
        answers: [
            { text: "밀당은 없다! 좋으면 직진하는 스타일", animal: "Horse", score: 2 },
            { text: "상대방을 세심하게 챙겨주는 헌신적인 스타일", animal: "Rabbit", score: 2 },
            { text: "친구 같은 편안함이 최고! 티키타카형", animal: "Dog", score: 2 },
            { text: "로맨틱한 분위기와 이벤트를 중요시한다", animal: "Pig", score: 2 },
        ]
    },
    {
        id: 9,
        question: "남들이 말하는 나의 첫인상은?",
        answers: [
            { text: "차가워 보이지만 알고 보면 따뜻하다", animal: "Snake", score: 2 },
            { text: "순하고 착해 보인다", animal: "Sheep", score: 2 },
            { text: "기가 세고 당당해 보인다", animal: "Tiger", score: 2 },
            { text: "단정하고 깔끔해 보인다", animal: "Rooster", score: 2 },
        ]
    },
    {
        id: 10,
        question: "주말 아침, 눈을 떴는데 날씨가 너무 좋다!",
        answers: [
            { text: "햇살 받으며 다시 잔다. 잠이 보약", animal: "Pig", score: 2 },
            { text: "빨래 돌리고 청소하고 집안일 부지런히", animal: "Ox", score: 2 },
            { text: "예쁜 카페 가서 브런치 먹으며 감성 충전", animal: "Rabbit", score: 2 },
            { text: "자전거 타러 나가거나 밖으로 뛰쳐나간다", animal: "Horse", score: 2 },
        ]
    },
    {
        id: 11,
        question: "가장 듣기 싫은 말은?",
        answers: [
            { text: "눈치 없다, 융통성 없다", animal: "Monkey", score: 2 },
            { text: "능력 없다, 일 못한다", animal: "Rat", score: 2 },
            { text: "재미없다, 지루하다", animal: "Rooster", score: 2 },
            { text: "믿음이 안 간다, 가볍다", animal: "Dog", score: 2 },
        ]
    },
    {
        id: 12,
        question: "내가 꿈꾸는 미래의 내 모습은?",
        answers: [
            { text: "존경받는 리더, 영향력 있는 사람", animal: "Dragon", score: 2 },
            { text: "걱정 없이 평화롭게 사는 여유로운 삶", animal: "Sheep", score: 2 },
            { text: "내 분야에서 최고가 된 전문가", animal: "Tiger", score: 2 },
            { text: "사랑하는 사람들과 함께하는 행복한 삶", animal: "Rabbit", score: 2 },
        ]
    }
];

export const zodiacResults: Record<string, ZodiacResult> = {
    Rat: {
        animal: "Rat",
        name: "쥐",
        title: "눈치백단 전략가, 똑똑한 쥐",
        subtitle: "생존 본능 MAX, 어디서든 살아남는 적응력의 왕",
        description: "남들보다 빠른 두뇌 회전과 놀라운 눈치를 가졌습니다. 작은 기회도 놓치지 않고 자신의 것으로 만드는 능력이 탁월하죠. 겉으로는 조용해 보일 수 있지만, 머릿속은 항상 수많은 계획으로 바쁘게 돌아갑니다. 실속을 챙길 줄 아는 당신은 진정한 현실주의자!",
        traits: ["극강의 효율 추구", "티 안 나게 챙기는 실속", "위기 탈출 넘버원"],
        tips: ["가끔은 계산기 두드리지 말고 마음 가는 대로 해보세요.", "주변 사람들에게 조금 더 베풀면 몇 배로 돌아올 거예요."],
        bestMatch: "Dragon",
        worstMatch: "Horse",
        image: "🐭",
        color: "from-slate-500 to-zinc-600"
    },
    Ox: {
        animal: "Ox",
        name: "소",
        title: "뚝심 있는 노력가, 성실한 소",
        subtitle: "느리지만 확실하게! 결국 정상에 오르는 대기만성형",
        description: "요행을 바라기보다 정직한 땀의 가치를 믿는 당신. 말수는 적지만 책임감이 강해 주변 사람들로부터 깊은 신뢰를 받습니다. 한 번 마음먹은 일은 끝까지 해내는 끈기가 당신의 가장 큰 무기입니다. 겉모습은 순해 보여도 내면은 누구보다 단단하군요.",
        traits: ["흔들리지 않는 멘탈", "믿고 맡기는 책임감", "고집도 보통이 아님"],
        tips: ["변화를 너무 두려워하지 마세요. 새로운 길에도 꽃은 핍니다.", "혼자 끙끙 앓지 말고 힘들 땐 기대도 좋아요."],
        bestMatch: "Rooster",
        worstMatch: "Sheep",
        image: "🐮",
        color: "from-amber-600 to-orange-700"
    },
    Tiger: {
        animal: "Tiger",
        name: "호랑이",
        title: "거침없는 리더, 용감한 호랑이",
        subtitle: "도전 없는 삶은 지루해! 타고난 보스 기질",
        description: "카리스마가 넘치고 매력적인 당신은 어디서나 주목받는 주인공입니다. 실패를 두려워하지 않고 목표를 향해 돌진하는 열정이 있네요. 정의감이 투철해 약한 사람을 보면 지나치지 못하는 따뜻한 마음도 가졌습니다. 남의 밑에 있기보다 우두머리가 되어야 직성이 풀립니다.",
        traits: ["폭발하는 추진력", "뒤끝 없는 시원한 성격", "로맨틱한 정열가"],
        tips: ["독단적인 결정은 독이 될 수 있습니다. 주변을 둘러보세요.", "욱하는 성질만 조금 다스리면 천하무적!"],
        bestMatch: "Horse",
        worstMatch: "Monkey",
        image: "🐯",
        color: "from-orange-500 to-red-600"
    },
    Rabbit: {
        animal: "Rabbit",
        name: "토끼",
        title: "상냥한 평화주의자, 감성적인 토끼",
        subtitle: "섬세하고 우아하게, 다툼 없는 평화로운 삶을 꿈꾸다",
        description: "타고난 감수성과 예술적 기질을 가진 당신. 누구에게나 상냥하고 예의 바르게 대하지만, 사실은 자신만의 확실한 선이 있습니다. 갈등을 싫어해서 웬만하면 맞춰주려 하지만, 한 번 돌아서면 가장 차가워지는 타입이기도 합니다. 조용한 듯 보여도 재치가 넘치네요!",
        traits: ["뛰어난 공감 능력", "우아한 취향과 안목", "확실한 자기 방어"],
        tips: ["싫은 소리 못 하고 참다가 병나요. 할 말은 하고 살기!", "지나친 걱정은 내려놓으세요. 당신은 충분히 잘하고 있어요."],
        bestMatch: "Sheep",
        worstMatch: "Rooster",
        image: "🐰",
        color: "from-pink-400 to-rose-500"
    },
    Dragon: {
        animal: "Dragon",
        name: "용",
        title: "이상적인 몽상가, 비범한 용",
        subtitle: "평범함은 거부한다! 남다른 스케일과 자신감",
        description: "항상 높은 곳을 바라보는 야망가입니다. 현실에 안주하기보다 끊임없이 꿈을 좇는 모습이 멋있습니다. 자신감이 넘치고 통이 커서 주변에 사람들이 모여듭니다. 가끔은 뜬구름 잡는 소리를 한다는 핀잔을 듣기도 하지만, 결국 그 꿈을 현실로 만들어내는 저력이 있습니다.",
        traits: ["남다른 직관과 통찰력", "강한 자존심과 자부심", "스케일 큰 씀씀이"],
        tips: ["자신감이 자만심이 되지 않도록 겸손함을 챙겨보세요.", "세세한 디테일을 챙기는 꼼꼼함만 더하면 완벽합니다."],
        bestMatch: "Rat",
        worstMatch: "Dog",
        image: "🐲",
        color: "from-emerald-500 to-green-600"
    },
    Snake: {
        animal: "Snake",
        name: "뱀",
        title: "지혜로운 전략가, 매혹적인 뱀",
        subtitle: "냉철한 판단력과 뜨거운 열정을 품은 반전 매력",
        description: "말보다는 머리로 상황을 빠르게 파악하고 움직이는 지능형 캐릭터입니다. 신비로운 분위기를 풍기며, 자신의 속내를 쉽게 드러내지 않습니다. 하지만 관심 있는 분야나 사람에게는 무섭게 파고드는 집요함과 열정을 가지고 있죠. 12지신 중 가장 섹시한 뇌를 가진 뇌섹남/뇌섹녀!",
        traits: ["날카로운 분석력", "우아하고 세련된 매너", "질투와 소유욕"],
        tips: ["의심이 너무 많으면 좋은 사람을 놓칠 수 있어요.", "가끔은 가면을 벗고 솔직한 감정을 보여주세요."],
        bestMatch: "Rooster",
        worstMatch: "Pig",
        image: "🐍",
        color: "from-emerald-600 to-teal-700"
    },
    Horse: {
        animal: "Horse",
        name: "말",
        title: "자유로운 영혼, 활기찬 말",
        subtitle: "역마살은 나의 운명, 멈추지 않는 에너지",
        description: "가만히 있는 것을 제일 힘들어하는 활동가입니다. 새로운 것을 배우고 경험하는 것을 좋아하며, 유머 감각이 뛰어나 분위기 메이커 역할을 합니다. 솔직하고 화끈한 성격 덕분에 인기가 많지만, 싫증도 빨리 느끼는 편이네요. 구속받는 것을 죽기보다 싫어하는 진정한 자유인!",
        traits: ["지칠 줄 모르는 체력", "화려한 언변과 유머", "급한 성격"],
        tips: ["시작만큼 끝매듭도 중요해요. 마무리에 신경 써보세요.", "남의 말 좀 끊지 말고 끝까지 들어주기! 약속!"],
        bestMatch: "Tiger",
        worstMatch: "Rat",
        image: "🦄",
        color: "from-blue-500 to-indigo-600"
    },
    Sheep: {
        animal: "Sheep",
        name: "양",
        title: "온화한 평화주의자, 다정한 양",
        subtitle: "순수하고 인정 많은 힐러, 내면의 고집은 반전",
        description: "다툼을 싫어하고 모든 사람과 잘 지내고 싶은 평화주의자입니다. 동정심이 많아 남의 부탁을 잘 거절하지 못하는 착한 성품을 지녔습니다. 하지만 순해 보여도 내면에는 그 누구도 꺾을 수 없는 황소고집이 숨어 있군요. 섬세하고 예술적인 감각이 뛰어나 창의적인 일에 두각을 나타냅니다.",
        traits: ["따뜻한 배려심", "뛰어난 인내심", "은근한 뚝심"],
        tips: ["싫으면 싫다고 말해도 괜찮아요. 세상 안 무너집니다.", "지나친 겸손은 그만! 당신은 충분히 멋진 사람이에요."],
        bestMatch: "Rabbit",
        worstMatch: "Ox",
        image: "🐑",
        color: "from-cyan-400 to-sky-500"
    },
    Monkey: {
        animal: "Monkey",
        name: "원숭이",
        title: "재기발랄한 재주꾼, 영리한 원숭이",
        subtitle: "호기심 천국, 세상 모든 재미는 다 내 거야!",
        description: "머리가 좋고 임기응변에 강해 어떤 문제든 척척 해결합니다. 호기심이 왕성해 해보고 싶은 건 꼭 해봐야 직성이 풀리죠. 사교성이 좋아 어디서든 금방 친구를 사귀지만, 깊은 속마음은 잘 보여주지 않는 편입니다. 지루한 건 딱 질색! 항상 자극과 재미를 찾아다닙니다.",
        traits: ["센스 넘치는 유머", "빠른 습득 능력", "다재다능한 끼"],
        tips: ["잔재주를 부리기보다 진득하게 하나만 파보세요.", "말 한마디로 천 냥 빚도 갚지만, 적도 만듭니다. 말조심!"],
        bestMatch: "Rat",
        worstMatch: "Tiger",
        image: "🐵",
        color: "from-amber-400 to-yellow-500"
    },
    Rooster: {
        animal: "Rooster",
        name: "닭",
        title: "완벽주의 예언가, 꼼꼼한 닭",
        subtitle: "날카로운 직관과 세련된 감각, 빈틈은 용납 못 해",
        description: "미적 감각이 뛰어나고 자신을 꾸미는 것을 좋아합니다. 꼼꼼하고 예리해서 남들이 못 보는 디테일도 단번에 잡아내죠. 미래를 내다보는 직관력이 있어 꿈이 잘 맞기도 합니다. 다만 바른말을 너무 잘해서 본의 아니게 남에게 상처를 줄 때가 있으니 주의하세요!",
        traits: ["탁월한 패션 센스", "논리정연한 언변", "투철한 자기관리"],
        tips: ["너그러운 마음으로 남의 실수도 눈감아주세요.", "칭찬에 약한 당신, 아부꾼을 조심하세요."],
        bestMatch: "Ox",
        worstMatch: "Rabbit",
        image: "🐔",
        color: "from-red-500 to-rose-600"
    },
    Dog: {
        animal: "Dog",
        name: "개",
        title: "정의로운 의리파, 충직한 개",
        subtitle: "솔직함이 무기, 내 사람은 내가 지킨다!",
        description: "거짓말을 못 하고 정의감이 투철해 불의를 보면 참지 못합니다. 한번 믿은 사람은 끝까지 믿고 따르는 의리파죠. 책임감이 강해 맡은 일은 반드시 해내지만, 융통성이 조금 부족해 답답하다는 소리를 들을 수도 있습니다. 화려함보다는 소박하고 진실한 삶을 추구합니다.",
        traits: ["우직한 충성심", "정직과 신뢰", "따뜻한 인간미"],
        tips: ["세상엔 흑과 백 말고 회색도 존재한다는 걸 인정하기.", "남 걱정은 그만! 본인부터 챙기세요. 제발요."],
        bestMatch: "Tiger",
        worstMatch: "Dragon",
        image: "🐶",
        color: "from-amber-700 to-orange-800"
    },
    Pig: {
        animal: "Pig",
        name: "돼지",
        title: "여유로운 미식가, 순수한 돼지",
        subtitle: "복을 타고난 낙천주의자, 인생은 즐기는 것",
        description: "느긋하고 낙천적인 성격으로 주변 사람들을 편안하게 해줍니다. 욕심이 없어 보이지만, 자신이 좋아하는 것(특히 음식!)에는 엄청난 열정을 보입니다. 순수하고 정이 많아 남을 잘 믿는 것이 장점이자 단점. 힘든 일이 있어도 훌훌 털어버리고 다시 일어나는 긍정왕입니다.",
        traits: ["넉넉한 마음씨", "끝없는 식탐과 미식", "강인한 생활력"],
        tips: ["거절하는 연습을 하세요. 다 들어주다간 등골 휘어요.", "단순하게 생각하는 게 때로는 최고의 정답입니다."],
        bestMatch: "Rabbit",
        worstMatch: "Snake",
        image: "🐷",
        color: "from-pink-300 to-rose-400"
    }
};
