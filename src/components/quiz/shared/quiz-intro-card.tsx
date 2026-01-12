"use client";

import { Button } from "@/components/ui/button";
import { AdSenseSlot } from "@/components/ui/adsense-slot";

interface QuizIntroCardProps {
    icon: string;
    title: string;
    description: string;
    buttonText: string;
    onStart: () => void;
    adsenseSlot?: string;
    themeColor?: string;
}

export function QuizIntroCard({
    icon,
    title,
    description,
    buttonText,
    onStart,
    adsenseSlot,
    themeColor = "indigo",
}: QuizIntroCardProps) {
    const colorMap: Record<string, string> = {
        pink: "from-pink-500 to-rose-600 shadow-pink-200",
        emerald: "from-emerald-500 to-teal-600 shadow-emerald-200",
        orange: "from-orange-500 to-amber-600 shadow-orange-200",
        indigo: "from-indigo-500 to-violet-600 shadow-indigo-200",
    };

    const buttonGradient = colorMap[themeColor] || colorMap.indigo;

    return (
        <div className="rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-2xl border border-slate-50">
            <div className="mb-8 text-7xl animate-bounce-slow">
                {icon}
            </div>
            <h2 className="mb-4 text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {title}
            </h2>
            <p className="mb-10 text-slate-600 font-medium leading-relaxed">
                {description}
            </p>
            <div className="space-y-6">
                <Button
                    size="xl"
                    className={`w-full bg-gradient-to-r ${buttonGradient} font-bold text-white shadow-lg`}
                    onClick={onStart}
                >
                    {buttonText}
                </Button>
                {adsenseSlot && <AdSenseSlot slot={adsenseSlot} className="min-h-[100px]" />}
            </div>
        </div>
    );
}
