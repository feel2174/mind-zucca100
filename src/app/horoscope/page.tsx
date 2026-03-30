import Link from 'next/link';
import React from 'react';
import { horoscopes } from './data';

export const metadata = {
    title: '오늘의 별자리 운세 | 마음콕',
    description: '12개 별자리별 매일 새롭게 업데이트되는 운세와 행운의 요소를 확인해보세요.',
};

export default function HoroscopePage() {
    return (
        <div 
            className="min-h-screen bg-slate-900 text-slate-50 py-20 px-4 flex flex-col items-center relative overflow-hidden"
            style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}
        >
            <style>
                {`
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.2; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    .star {
                        position: absolute;
                        background: white;
                        border-radius: 50%;
                        animation: twinkle infinite ease-in-out;
                    }
                    .glass-card {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .glass-card:hover {
                        background: rgba(255, 255, 255, 0.08);
                        border: 1px solid rgba(199, 210, 254, 0.2);
                        transform: translateY(-4px);
                        box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.3);
                    }
                `}
            </style>

            {/* Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <div 
                        key={i} 
                        className="star"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-5xl text-center mb-16 relative z-10" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30 mb-8 backdrop-blur-sm shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                    <span className="text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">✨</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 tracking-tight mb-6 leading-tight drop-shadow-sm">
                    오늘의 별자리 운세
                </h1>
                <p className="text-indigo-200/70 font-medium text-lg sm:text-xl max-w-2xl mx-auto break-keep leading-relaxed tracking-wide">
                    우주의 기운이 당신에게 전하는 메시지<br className="hidden sm:block"/>
                    당신의 별자리를 선택하여 오늘의 운세를 확인해보세요!
                </p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                {horoscopes.map((sign) => (
                    <Link
                        key={sign.id}
                        href={`/horoscope/${sign.id}`}
                        className="glass-card rounded-3xl p-6 group flex flex-col items-center justify-center text-center overflow-hidden relative cursor-pointer"
                    >
                        {/* Hover effect background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="text-6xl mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(199,210,254,0.6)]">
                            {sign.symbol}
                        </div>
                        
                        <div className="font-bold text-2xl sm:text-3xl text-slate-100 group-hover:text-white mb-2 transition-colors">
                            {sign.name}
                        </div>
                        
                        <div className="text-sm font-semibold text-indigo-300/80 uppercase tracking-widest mb-1 group-hover:text-indigo-300 transition-colors">
                            {sign.eng}
                        </div>
                        
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors font-medium rounded-full bg-slate-800/50 px-3 py-1 mt-2 border border-white/5">
                            {sign.date}
                        </div>
                        
                        {/* Go icon */}
                        <div className="absolute top-6 right-6 text-white/20 group-hover:text-white/60 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom/Top Glow Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        </div>
    );
}
