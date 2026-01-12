"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface QuizHeaderProps {
    category: string;
    categoryHref: string;
    title: string;
    badge?: string;
    description?: string;
    stats?: { label?: string; value: string; icon?: string }[];
    themeColor?: string; // e.g., 'pink', 'emerald', 'orange'
}

export function QuizHeader({
    category,
    categoryHref,
    title,
    badge,
    description,
    stats,
    themeColor = "indigo",
}: QuizHeaderProps) {
    const colorMap: Record<string, { text: string; bg: string; border: string; shadow: string }> = {
        pink: {
            text: "text-pink-500",
            bg: "bg-pink-50",
            border: "border-pink-100",
            shadow: "shadow-pink-50",
        },
        emerald: {
            text: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            shadow: "shadow-emerald-50",
        },
        orange: {
            text: "text-orange-500",
            bg: "bg-orange-50",
            border: "border-orange-100",
            shadow: "shadow-orange-50",
        },
        indigo: {
            text: "text-indigo-500",
            bg: "bg-indigo-50",
            border: "border-indigo-100",
            shadow: "shadow-indigo-50",
        },
    };

    const theme = colorMap[themeColor] || colorMap.indigo;

    return (
        <header className="space-y-6 text-left">
            <nav className="flex items-center gap-1 text-sm text-slate-500">
                <Link href="/" className="hover:text-slate-900 transition-colors">
                    홈
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link href={categoryHref} className={`font-semibold hover:underline ${theme.text}`}>
                    {category}
                </Link>
            </nav>

            <div className={`relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-xl ${theme.shadow} border ${theme.border}`}>
                <div className={`absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full ${theme.bg} opacity-50 blur-3xl`} />
                <div className="relative z-10">
                    {badge && (
                        <p className={`text-sm font-bold uppercase tracking-[0.2em] ${theme.text}`}>
                            {badge}
                        </p>
                    )}
                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                            {description}
                        </p>
                    )}
                    {stats && stats.length > 0 && (
                        <dl className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm font-medium">
                            {stats.map((stat, i) => (
                                <div key={i} className={`flex items-center gap-2 rounded-full px-4 py-1.5 ${theme.bg} ${theme.text.replace('text-', 'text-')}`}>
                                    {stat.icon && <span>{stat.icon}</span>}
                                    <span>{stat.value}</span>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </div>
        </header>
    );
}
