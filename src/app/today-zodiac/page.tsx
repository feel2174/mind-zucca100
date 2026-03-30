import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: '오늘의 띠별 운세 | 12지신 운세',
    description: '12지신 띠별로 알아보는 오늘의 운세 확인하기',
};

const zodiacSigns = [
    { name: '쥐띠', id: 'rat', year: '자(子)', years: '48, 60, 72, 84, 96, 08', emoji: '🐭', color: 'bg-emerald-500/10 hover:bg-emerald-500/20', borderColor: 'border-emerald-500/30' },
    { name: '소띠', id: 'cow', year: '축(丑)', years: '49, 61, 73, 85, 97, 09', emoji: '🐮', color: 'bg-amber-500/10 hover:bg-amber-500/20', borderColor: 'border-amber-500/30' },
    { name: '호랑이띠', id: 'tiger', year: '인(寅)', years: '50, 62, 74, 86, 98, 10', emoji: '🐯', color: 'bg-orange-500/10 hover:bg-orange-500/20', borderColor: 'border-orange-500/30' },
    { name: '토끼띠', id: 'rabbit', year: '묘(卯)', years: '51, 63, 75, 87, 99, 11', emoji: '🐰', color: 'bg-rose-500/10 hover:bg-rose-500/20', borderColor: 'border-rose-500/30' },
    { name: '용띠', id: 'dragon', year: '진(辰)', years: '52, 64, 76, 88, 00, 12', emoji: '🐲', color: 'bg-teal-500/10 hover:bg-teal-500/20', borderColor: 'border-teal-500/30' },
    { name: '뱀띠', id: 'snake', year: '사(巳)', years: '53, 65, 77, 89, 01, 13', emoji: '🐍', color: 'bg-green-500/10 hover:bg-green-500/20', borderColor: 'border-green-500/30' },
    { name: '말띠', id: 'horse', year: '오(午)', years: '54, 66, 78, 90, 02, 14', emoji: '🐴', color: 'bg-red-500/10 hover:bg-red-500/20', borderColor: 'border-red-500/30' },
    { name: '양띠', id: 'sheep', year: '미(未)', years: '55, 67, 79, 91, 03, 15', emoji: '🐑', color: 'bg-stone-500/10 hover:bg-stone-500/20', borderColor: 'border-stone-500/30' },
    { name: '원숭이띠', id: 'monkey', year: '신(申)', years: '56, 68, 80, 92, 04, 16', emoji: '🐵', color: 'bg-yellow-500/10 hover:bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
    { name: '닭띠', id: 'rooster', year: '유(酉)', years: '57, 69, 81, 93, 05, 17', emoji: '🐔', color: 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20', borderColor: 'border-fuchsia-500/30' },
    { name: '개띠', id: 'dog', year: '술(戌)', years: '58, 70, 82, 94, 06, 18', emoji: '🐶', color: 'bg-blue-500/10 hover:bg-blue-500/20', borderColor: 'border-blue-500/30' },
    { name: '돼지띠', id: 'pig', year: '해(亥)', years: '59, 71, 83, 95, 07, 19', emoji: '🐷', color: 'bg-pink-500/10 hover:bg-pink-500/20', borderColor: 'border-pink-500/30' },
];

export default function TodayZodiacPage() {
    const today = new Date();
    // Use Intl.DateTimeFormat to avoid hydration mismatch
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }).format(today);

    return (
        <div 
            className="min-h-screen bg-[#FDF9F1] text-stone-800 py-20 px-4 flex flex-col items-center relative overflow-hidden"
            style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}
        >
            <style>
                {`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    .oriental-card {
                        background: white;
                        border-radius: 24px;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
                    }
                    .oriental-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 12px 30px rgba(217, 119, 6, 0.15);
                    }
                    .oriental-pattern {
                        background-image: radial-gradient(#e5e5e5 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                `}
            </style>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 oriental-pattern opacity-50 pointer-events-none w-full h-full" />

            {/* Decorative circles */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

            <div className="w-full max-w-5xl text-center mb-16 relative z-10" style={{ animation: 'float-slow 6s ease-in-out infinite' }}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border border-amber-200 mb-6 shadow-md">
                    <span className="text-4xl">📜</span>
                </div>
                
                {/* Today's Date Display */}
                <div className="mb-4">
                    <span className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full border border-amber-200 shadow-sm">
                        {formattedDate}
                    </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight mb-5 leading-tight">
                    오늘의 <span className="text-amber-600">띠별 운세</span>
                </h1>
                <p className="text-stone-500 font-medium text-lg sm:text-xl max-w-2xl mx-auto break-keep leading-relaxed mt-4">
                    매일 업데이트되는 12지신 띠별 운세<br className="hidden sm:block"/>
                    알아보고 싶은 띠를 선택하여 행운의 조언을 확인하세요!
                </p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                {zodiacSigns.map((sign) => (
                    <Link
                        key={sign.name}
                        href={`/today-zodiac/${sign.id}`}
                        className={`oriental-card p-6 flex flex-col items-center justify-center text-center cursor-pointer border border-stone-100 group`}
                    >
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5 border ${sign.borderColor} ${sign.color} transition-colors duration-300`}>
                            <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                                {sign.emoji}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-1 mt-1">
                            <span className="font-bold text-2xl text-stone-800">{sign.name}</span>
                            <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                                {sign.year}
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center mt-3 w-full">
                            <span className="text-[11px] text-stone-400 font-semibold mb-1 uppercase tracking-wider">출생 연도</span>
                            <div className="text-xs sm:text-sm text-stone-500 font-medium bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100 w-full">
                                {sign.years}년생
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="mt-16 text-stone-400 text-sm flex items-center gap-2 font-medium z-10 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full border border-stone-200 shadow-sm">
                <span>오늘의 운세는 매일 자정에 업데이트됩니다.</span>
            </div>
        </div>
    );
}
