import React from 'react';
import Link from 'next/link';
import { horoscopes, getDailyFortune } from '../data';
import { HoroscopeShareButton } from './share-button';

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
    const { sign } = await params;
    const signData = horoscopes.find(z => z.id === sign);
    if (!signData) {
        return { title: '운세 정보를 찾을 수 없습니다' };
    }
    return {
        title: `오늘의 ${signData.name} 운세 | 마음콕별자리`,
        description: `매일 새롭게 업데이트되는 ${signData.name} 운세와 행운의 컬러, 숫자를 확인하세요.`,
        openGraph: {
            title: `오늘의 ${signData.name} 운세`,
            description: `나의 행운의 숫자와 컬러, 오늘의 별자리 운세를 확인해보세요!`,
            type: "article",
        },
    };
}

export default async function HoroscopeDetailPage({ params }: { params: Promise<{ sign: string }> }) {
    const { sign } = await params;
    const signData = horoscopes.find(z => z.id === sign);
    
    if (!signData) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">운세 정보를 찾을 수 없습니다.</h1>
                    <Link href="/horoscope" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
                        전체 별자리 운세 보러가기
                    </Link>
                </div>
            </div>
        );
    }

    const today = new Date();
    // Use KST to be consistent for Korean users
    const kstDate = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const year = kstDate.getFullYear();
    const month = String(kstDate.getMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getDate()).padStart(2, '0');
    const dateString = `${year}${month}${day}`;
    
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }).format(kstDate);

    // Get stable dynamic fortune for this sign and date
    const { general, wealth, love, luckyNumbers, color } = getDailyFortune(sign, dateString);

    return (
        <div 
            className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 relative overflow-hidden flex flex-col items-center"
            style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}
        >
            <style>
                {`
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.1; transform: scale(0.8); }
                        50% { opacity: 0.8; transform: scale(1.1); }
                    }
                    .star {
                        position: absolute;
                        background: rgba(255, 255, 255, 0.8);
                        border-radius: 50%;
                        animation: twinkle infinite ease-in-out;
                    }
                    .glass-panel {
                        background: rgba(15, 23, 42, 0.6);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    }
                    .neon-text {
                        text-shadow: 0 0 10px rgba(129, 140, 248, 0.5);
                    }
                `}
            </style>
            
            {/* Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <div 
                        key={i} 
                        className="star"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 4 + 3}s`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
                <Link href="/horoscope" className="self-start text-slate-400 hover:text-slate-200 mb-8 flex items-center gap-2 transition-colors font-medium">
                    ← 다른 별자리 운세 보기
                </Link>

                <div className="glass-panel w-full rounded-[32px] p-6 sm:p-10 relative">
                    {/* Zodiac Circle Icon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full p-2 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-slate-700/50">
                        <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center border border-indigo-500/30 bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner">
                            <span className="text-5xl neon-text mb-1 drop-shadow-lg text-indigo-100">{signData.symbol}</span>
                        </div>
                    </div>

                    <div className="mt-14 text-center border-b border-white/10 pb-8 mb-8">
                        <span className="inline-block bg-indigo-500/10 text-indigo-300 text-sm font-bold px-5 py-2 rounded-full border border-indigo-500/20 shadow-sm mb-5 tracking-wide">
                            {formattedDate}
                        </span>
                        
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{signData.name} 운세</h1>
                            <span className="text-sm font-semibold bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-wider">
                                {signData.eng}
                            </span>
                        </div>
                        <p className="text-slate-400 font-medium text-sm mt-3">{signData.date}</p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            {/* Lucky Numbers Box */}
                            <div className="flex-1 inline-flex flex-col items-center bg-black/20 px-6 py-4 rounded-2xl border border-white/5 box-shadow-sm">
                                <span className="text-xs font-bold text-indigo-300 mb-3 tracking-widest uppercase">오늘의 행운의 숫자</span>
                                <div className="flex gap-3">
                                    {luckyNumbers.map((num, idx) => (
                                        <div key={idx} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Lucky Color Box */}
                            <div className="flex-1 inline-flex flex-col items-center bg-black/20 px-6 py-4 rounded-2xl border border-white/5 box-shadow-sm">
                                <span className="text-xs font-bold text-purple-300 mb-3 tracking-widest uppercase">오늘의 행운의 컬러</span>
                                <div className="flex-1 flex items-center justify-center w-full">
                                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                                        {color}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* General Fortune */}
                        <div>
                            <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                                <span className="text-xl">✨</span> 별의 메시지 (총운)
                            </h2>
                            <p className="text-slate-200 leading-relaxed font-medium bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                                {general}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Wealth Fortune */}
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="font-bold text-slate-100 mb-3 flex items-center gap-2">
                                    <span className="text-indigo-400 text-lg">💎</span> 재물운
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">{wealth}</p>
                            </div>
                            
                            {/* Love Fortune */}
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="font-bold text-slate-100 mb-3 flex items-center gap-2">
                                    <span className="text-pink-400 text-lg">💝</span> 연애운
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">{love}</p>
                            </div>
                        </div>
                    </div>

                    {/* Kakao Share Component */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                        <HoroscopeShareButton 
                            title={`오늘의 ${signData.name} 운세`} 
                            text={`내 행운의 숫자는 ${luckyNumbers.join(', ')}!\n${signData.name}의 별자리 운세를 확인해보세요! ✨`} 
                            url={`/horoscope/${signData.id}`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
