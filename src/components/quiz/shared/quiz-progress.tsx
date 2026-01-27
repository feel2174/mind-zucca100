"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
    progress: number;
    themeColor?: string;
}

export function QuizProgress({ progress, themeColor = "indigo" }: QuizProgressProps) {
    const colorMap: Record<string, string> = {
        pink: "bg-gradient-to-r from-pink-400 to-rose-500",
        emerald: "bg-gradient-to-r from-emerald-400 to-teal-500",
        orange: "bg-gradient-to-r from-orange-400 to-amber-500",
        indigo: "bg-gradient-to-r from-indigo-400 to-violet-500",
        blue: "bg-gradient-to-r from-blue-400 to-indigo-500",
    };

    const barColor = colorMap[themeColor] || colorMap.indigo;

    return (
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full ${barColor}`}
            />
        </div>
    );
}
