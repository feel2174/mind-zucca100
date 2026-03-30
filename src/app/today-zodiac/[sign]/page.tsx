import React from 'react';
import Link from 'next/link';
import { ZodiacShareButton } from './share-button';

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
    const { sign } = await params;
    const signData = zodiacSigns.find(z => z.id === sign);
    if (!signData) {
        return { title: '운세 정보를 찾을 수 없습니다' };
    }
    return {
        title: `오늘의 ${signData.name} 운세 | 12지신 운세`,
        description: `${signData.name}의 오늘의 운세를 확인하세요.`,
        openGraph: {
            title: `오늘의 ${signData.name} 운세`,
            description: `나의 행운의 숫자와 오늘의 운세를 확인해보세요!`,
            type: "article",
        },
    };
}

const zodiacSigns = [
    { name: '쥐띠', id: 'rat', year: '자(子)', years: '48, 60, 72, 84, 96, 08', emoji: '🐭', color: 'bg-emerald-500/10 text-emerald-700', borderColor: 'border-emerald-500/30',
      fortune: "예상치 못한 귀인을 만날 수 있는 날입니다. 그동안 막혀있던 인간관계가 풀리고, 새로운 기회가 찾아올 수 있으니 마음을 열고 사람들을 대하세요.",
      wealth: "오후에 뜻밖의 재물이 들어올 수 있습니다.",
      love: "솔직한 표현이 상대방의 마음을 움직입니다.",
      luckyNumbers: [3, 14, 27]
    },
    { name: '소띠', id: 'cow', year: '축(丑)', years: '49, 61, 73, 85, 97, 09', emoji: '🐮', color: 'bg-amber-500/10 text-amber-700', borderColor: 'border-amber-500/30',
      fortune: "조금 느리더라도 확실하게 나아가는 것이 좋습니다. 주변의 속도에 휩쓸리지 말고 본인만의 페이스를 유지한다면 좋은 성과가 있을 것입니다.",
      wealth: "충동구매를 자제해야 하는 하루입니다.",
      love: "가까운 사람일수록 예의를 지켜야 합니다.",
      luckyNumbers: [8, 17, 33]
    },
    { name: '호랑이띠', id: 'tiger', year: '인(寅)', years: '50, 62, 74, 86, 98, 10', emoji: '🐯', color: 'bg-orange-500/10 text-orange-700', borderColor: 'border-orange-500/30',
      fortune: "그동안 준비했던 일들이 드디어 결실을 맺기 시작합니다. 자신감을 가지고 적극적으로 추진해 보세요. 두려움 없이 앞장서면 승산이 있습니다.",
      wealth: "작은 투자로 큰 기쁨을 얻을 수 있습니다.",
      love: "리더십 있게 데이트를 이끌어보세요.",
      luckyNumbers: [1, 9, 44]
    },
    { name: '토끼띠', id: 'rabbit', year: '묘(卯)', years: '51, 63, 75, 87, 99, 11', emoji: '🐰', color: 'bg-rose-500/10 text-rose-700', borderColor: 'border-rose-500/30',
      fortune: "오늘은 신중함이 가장 필요한 하루입니다. 중대한 결정은 내일로 미루는 것이 좋으며, 남의 말에 쉽게 흔들리지 않도록 중심을 잘 잡으세요.",
      wealth: "지출에 대한 철저한 관리가 필요합니다.",
      love: "오해받지 않도록 확실한 의사표현이 필요합니다.",
      luckyNumbers: [4, 21, 38]
    },
    { name: '용띠', id: 'dragon', year: '진(辰)', years: '52, 64, 76, 88, 00, 12', emoji: '🐲', color: 'bg-teal-500/10 text-teal-700', borderColor: 'border-teal-500/30',
      fortune: "당신의 명예와 능력이 빛을 발하는 날입니다. 상사나 주변 사람들에게 능력을 인정받을 기회가 오니, 피하지 말고 당당히 나서보세요.",
      wealth: "노력한 만큼의 보상을 확실하게 받는 날입니다.",
      love: "서로에게 큰 힘이 되어주는 하루가 됩니다.",
      luckyNumbers: [7, 12, 29]
    },
    { name: '뱀띠', id: 'snake', year: '사(巳)', years: '53, 65, 77, 89, 01, 13', emoji: '🐍', color: 'bg-green-500/10 text-green-700', borderColor: 'border-green-500/30',
      fortune: "주변 환경에 변화가 생길 수 있습니다. 당황하지 말고 유연하게 대처하는 것이 핵심입니다. 새로운 상황이 오히려 당신에게 큰 이득을 가져다 줄 것입니다.",
      wealth: "뜻밖의 소득이 생길 수 있으니 주변을 잘 살펴보세요.",
      love: "매력적인 제안을 받거나 호감을 살 수 있습니다.",
      luckyNumbers: [6, 15, 30]
    },
    { name: '말띠', id: 'horse', year: '오(午)', years: '54, 66, 78, 90, 02, 14', emoji: '🐴', color: 'bg-red-500/10 text-red-700', borderColor: 'border-red-500/30',
      fortune: "활동하기에 최적의 에너지를 지닌 하루입니다. 여행이나 외출을 통해 스트레스를 해소하고, 새로운 영감을 얻을 수 있으니 나가는 것을 추천합니다.",
      wealth: "이동 중에 얻는 행운이 따를 수 있습니다.",
      love: "외부에서의 우연한 만남이 기대되는 날입니다.",
      luckyNumbers: [5, 18, 41]
    },
    { name: '양띠', id: 'sheep', year: '미(未)', years: '55, 67, 79, 91, 03, 15', emoji: '🐑', color: 'bg-stone-500/10 text-stone-700', borderColor: 'border-stone-500/30',
      fortune: "남을 돕는 이타적인 마음이 어느새 나에게 큰 행운으로 돌아옵니다. 주변 사람들에게 배려를 아끼지 마세요. 마음의 평안도 얻을 수 있습니다.",
      wealth: "베푼 만큼 재물이 들어오는 시기입니다.",
      love: "따뜻한 말 한마디가 상대방을 위로해줍니다.",
      luckyNumbers: [2, 22, 35]
    },
    { name: '원숭이띠', id: 'monkey', year: '신(申)', years: '56, 68, 80, 92, 04, 16', emoji: '🐵', color: 'bg-yellow-500/10 text-yellow-700', borderColor: 'border-yellow-500/30',
      fortune: "재치와 아이디어가 반짝이는 날입니다. 꽉 막혀있던 어려운 문제도 새로운 관점에서 바라보면 쉽게 풀릴 수 있으니 발상의 전환을 시도해보세요.",
      wealth: "새로운 재테크 아이디어가 떠오릅니다.",
      love: "유머 감각으로 화기애애한 분위기를 만들 수 있습니다.",
      luckyNumbers: [9, 13, 26]
    },
    { name: '닭띠', id: 'rooster', year: '유(酉)', years: '57, 69, 81, 93, 05, 17', emoji: '🐔', color: 'bg-fuchsia-500/10 text-fuchsia-700', borderColor: 'border-fuchsia-500/30',
      fortune: "아주 사소한 정보가 큰 돈이나 행운으로 이어질 수 있는 날입니다. 주변의 이야기에 귀 기울이고, 꼼꼼하게 메모해 두는 습관이 필요합니다.",
      wealth: "지갑이나 귀중품 관리에 신경을 써야 합니다.",
      love: "세심한 배려가 상대의 마음을 녹입니다.",
      luckyNumbers: [8, 19, 42]
    },
    { name: '개띠', id: 'dog', year: '술(戌)', years: '58, 70, 82, 94, 06, 18', emoji: '🐶', color: 'bg-blue-500/10 text-blue-700', borderColor: 'border-blue-500/30',
      fortune: "오랫동안 연락되지 않던 이에게서 연락이 오거나 반가운 소식을 듣게 됩니다. 성실하게 쌓아온 인맥이 빛을 발하며 당신에게 도움을 줍니다.",
      wealth: "대인관계에서부터 금전적 이득이 발생합니다.",
      love: "안정적이고 편안한 사랑이 유지되는 날입니다.",
      luckyNumbers: [5, 11, 28]
    },
    { name: '돼지띠', id: 'pig', year: '해(亥)', years: '59, 71, 83, 95, 07, 19', emoji: '🐷', color: 'bg-pink-500/10 text-pink-700', borderColor: 'border-pink-500/30',
      fortune: "하루 종일 먹을 복과 재물운이 따르는 길일입니다. 편안한 마음으로 오늘을 즐기세요. 예상치 못한 선물이나 식사 대접을 받을 수 있습니다.",
      wealth: "뜻하지 않은 횡재수나 용돈이 생길 수 있습니다.",
      love: "맛있는 음식을 나누며 즐거운 데이트를 하세요.",
      luckyNumbers: [6, 24, 39]
    },
];

export default async function ZodiacDetailPage({ params }: { params: Promise<{ sign: string }> }) {
    const { sign } = await params;
    const signData = zodiacSigns.find(z => z.id === sign);
    
    if (!signData) {
        return (
            <div className="min-h-screen bg-[#FDF9F1] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-stone-800">운세 정보를 찾을 수 없습니다.</h1>
                    <Link href="/today-zodiac" className="text-amber-600 hover:underline">
                        전체 띠별 운세 보러가기
                    </Link>
                </div>
            </div>
        );
    }

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }).format(today);

    return (
        <div 
            className="min-h-screen bg-[#FDF9F1] text-stone-800 py-16 px-4 relative overflow-hidden flex flex-col items-center"
            style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}
        >
            <style>
                {`
                    .oriental-pattern {
                        background-image: radial-gradient(#e5e5e5 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                    .luxury-card {
                        background: white;
                        border-radius: 24px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
                    }
                `}
            </style>
            
            <div className="absolute inset-0 z-0 oriental-pattern opacity-50 pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
                <Link href="/today-zodiac" className="self-start text-stone-400 hover:text-stone-600 mb-6 flex items-center gap-2 transition-colors font-medium">
                    ← 다른 띠 운세 보기
                </Link>

                <div className="luxury-card w-full p-6 sm:p-10 relative border border-amber-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-sm border border-stone-100">
                        <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border ${signData.borderColor} ${signData.color} bg-white`}>
                            <span className="text-6xl drop-shadow-sm mb-1">{signData.emoji}</span>
                        </div>
                    </div>

                    <div className="mt-12 text-center border-b border-stone-100 pb-8 mb-8">
                        <span className="inline-block bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full border border-amber-200 shadow-sm mb-4">
                            {formattedDate}
                        </span>
                        
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h1 className="text-3xl sm:text-4xl font-black text-stone-900">{signData.name} 운세</h1>
                            <span className="text-xl font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-lg">
                                {signData.year}
                            </span>
                        </div>
                        <p className="text-stone-400 font-medium text-sm">출생연도: {signData.years}년생</p>

                        <div className="mt-6 inline-flex flex-col items-center bg-[#FDF9F1] px-6 py-3 rounded-2xl border border-amber-200/50">
                            <span className="text-xs font-bold text-amber-600 mb-2 tracking-widest uppercase">오늘의 행운의 숫자</span>
                            <div className="flex gap-3">
                                {signData.luckyNumbers.map((num, idx) => (
                                    <div key={idx} className="w-10 h-10 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center font-black shadow-md border border-stone-700">
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-amber-600 mb-3 flex items-center gap-2">
                                <span className="text-xl">✨</span>
                                총운
                            </h2>
                            <p className="text-stone-700 leading-relaxed font-medium bg-amber-50/50 p-5 rounded-xl border border-amber-100/50">
                                {signData.fortune}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-stone-50 p-5 rounded-xl border border-stone-100/80">
                                <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                                    <span className="text-emerald-500">💰</span> 재물운
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed">{signData.wealth}</p>
                            </div>
                            
                            <div className="bg-stone-50 p-5 rounded-xl border border-stone-100/80">
                                <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                                    <span className="text-rose-500">❤️</span> 연애운
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed">{signData.love}</p>
                            </div>
                        </div>
                    </div>

                    {/* Kakao Share Component */}
                    <div className="mt-8 pt-8 border-t border-stone-100">
                        <ZodiacShareButton 
                            title={`오늘의 ${signData.name} 운세`} 
                            text={`오늘 나의 행운의 숫자는 ${signData.luckyNumbers.join(', ')}! 오늘의 ${signData.name} 운세를 확인해보세요! #마음콕 #띠별운세`} 
                            url={`/today-zodiac/${signData.id}`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
