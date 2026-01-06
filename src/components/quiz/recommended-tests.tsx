"use client";
import Link from "next/link";
import { tests } from "@/lib/tests-data";
import { motion } from "framer-motion";

interface RecommendedTestsProps {
    currentSlug: string;
}

export function RecommendedTests({ currentSlug }: RecommendedTestsProps) {
    // Filter out the current test and shuffle/slice if needed.
    // For now, just filter out current and show up to 3 others to keep it clean.
    const recommended = tests
        .filter((test) => test.slug !== currentSlug)
        .sort(() => 0.5 - Math.random()) // Simple shuffle
        .slice(0, 3);

    return (
        <section className="mt-12 w-full rounded-[2.5rem] bg-slate-50/50  border border-slate-100">
            <div className="mb-8 text-center">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                    <span>✨</span>
                    <span>이런 테스트는 어때요?</span>
                </h3>
                <p className="mt-2 text-sm font-bold text-slate-400">
                    지금 가장 인기 있는 심리테스트를 추천해드려요
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {recommended.map((test) => (
                    <Link
                        key={test.slug}
                        href={test.slug}
                        className="group relative flex flex-col rounded-3xl bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 block border border-slate-100"
                    >
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${test.color} text-2xl shadow-inner`}>
                            {test.icon}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${test.badge === "HOT" ? "bg-rose-500" :
                                    test.badge === "NEW" ? "bg-emerald-500" :
                                        test.badge === "TREND" ? "bg-amber-500" :
                                            "bg-indigo-500"
                                    }`}>
                                    {test.badge}
                                </span>
                                <span className="text-[11px] text-slate-400 font-bold">{test.duration}</span>
                            </div>

                            <h4 className="font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                {test.title}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 line-clamp-2">
                                {test.description}
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">
                            <span>테스트 보러가기</span>
                            <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
