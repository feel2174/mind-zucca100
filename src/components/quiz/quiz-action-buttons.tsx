"use client";

import { Button } from "@/components/ui/button";
import { Share2, Download, RotateCcw, Twitter, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type QuizThemeColor = "pink" | "orange" | "violet" | "indigo" | "emerald" | "blue" | "slate";

interface QuizActionButtonsProps {
    onShare: () => void;
    onShareTwitter?: () => void;
    onSaveImage?: () => void;
    isSavingImage?: boolean;
    onRetry: () => void;
    retryLabel?: string;
    homeHref?: string;
    theme?: QuizThemeColor;
    children?: React.ReactNode; // For extra buttons like Partner Share
    className?: string;
}

const themeStyles: Record<QuizThemeColor, { primary: string; hover: string; light: string; text: string; border: string }> = {
    pink: {
        primary: "bg-pink-600 hover:bg-pink-700 shadow-pink-100",
        hover: "hover:bg-pink-50",
        light: "bg-pink-50",
        text: "text-pink-600",
        border: "border-pink-200"
    },
    orange: {
        primary: "bg-orange-600 hover:bg-orange-700 shadow-orange-100",
        hover: "hover:bg-orange-50",
        light: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200"
    },
    violet: {
        primary: "bg-violet-600 hover:bg-violet-700 shadow-violet-100",
        hover: "hover:bg-violet-50",
        light: "bg-violet-50",
        text: "text-violet-600",
        border: "border-violet-200"
    },
    indigo: {
        primary: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100",
        hover: "hover:bg-indigo-50",
        light: "bg-indigo-50",
        text: "text-indigo-600",
        border: "border-indigo-200"
    },
    emerald: {
        primary: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100",
        hover: "hover:bg-emerald-50",
        light: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200"
    },
    blue: {
        primary: "bg-blue-600 hover:bg-blue-700 shadow-blue-100",
        hover: "hover:bg-blue-50",
        light: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200"
    },
    slate: {
        primary: "bg-slate-800 hover:bg-slate-900 shadow-slate-200",
        hover: "hover:bg-slate-50",
        light: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-200"
    }
};

export function QuizActionButtons({
    onShare,
    onShareTwitter,
    onSaveImage,
    isSavingImage = false,
    onRetry,
    retryLabel = "다시 테스트하기",
    homeHref = "/",
    theme = "slate",
    children,
    className
}: QuizActionButtonsProps) {
    const styles = themeStyles[theme];

    return (
        <div className={cn("space-y-4 w-full", className)}>
            <div className="grid grid-cols-2 gap-3">
                <Button
                    size="xl"
                    className="w-full bg-[#FAE100] hover:bg-[#F9E000]/90 text-[#371D1E] font-bold shadow-lg shadow-yellow-100/50"
                    onClick={onShare}
                >
                    <span className="mr-2 text-lg">💬</span>
                    <span className="text-[15px] md:text-lg whitespace-nowrap">카카오 공유</span>
                </Button>

                {onShareTwitter ? (
                    <Button
                        size="xl"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg shadow-slate-200"
                        onClick={onShareTwitter}
                    >
                        <Twitter className="w-5 h-5 mr-2" />
                        <span className="text-[15px] md:text-lg whitespace-nowrap">트위터 공유</span>
                    </Button>
                ) : (
                    // If no twitter, make the share button full width? 
                    // Or keep the slot empty? Usually nice to have a secondary share or copy link.
                    // For now, let's just show a Copy Link button if no Twitter.
                    // Actually, usually onShare covers both Kakao/Copy Link in logic, but here we separate visually.
                    // Let's assume onShare is generic and we add a Copy Link specific one? 
                    // Or just hide it. The user requested Kakao/Twitter specifically for Zodiac.
                    // If onShareTwitter is missing, maybe we just don't render this button and let the grid collapse?
                    // But grid-cols-2 would make the first button half width.
                    // Let's make the Kakao button col-span-2 if twitter is missing.
                    null
                )}
            </div>

            {/* If onShareTwitter was null, the grid above might look empty on the right. 
                Let's handle layout logic: if items < 2, maybe flex?
                Actually, simpler: Just always show Kakao. If Twitter exists, show it.
                If not, maybe show "Result Share" (Generic) + "Kakao"?
                Refactoring slightly: Standardize on "Main Share" (Kakao/Generic) and "Secondary Share" (Twitter/Copy).
                
                Let's stick to the user's request: "Kakao, Twitter etc... Componentize".
                Common pattern:
                [ Kakao ] [ Twitter ]
                [   Save Image    ]
                [      Retry      ]
                [      Home       ]
            */}

            {children}

            {onSaveImage && (
                <Button
                    size="xl"
                    variant="outline"
                    className={cn(
                        "relative w-full border-2 font-bold shadow-sm overflow-hidden",
                        styles.border,
                        styles.text,
                        styles.hover
                    )}
                    onClick={onSaveImage}
                    disabled={isSavingImage}
                >
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                        <Download className={cn("w-5 h-5", styles.text)} />
                    </div>
                    <span className="w-full text-center whitespace-nowrap text-[15px] md:text-lg">
                        {isSavingImage ? "이미지 만드는 중..." : "결과 이미지 저장하기"}
                    </span>
                </Button>
            )}

            <Button
                size="xl"
                variant="outline"
                className="relative w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold overflow-hidden"
                onClick={onRetry}
            >
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                    <RotateCcw className="w-5 h-5 text-slate-600" />
                </div>
                <span className="w-full text-center whitespace-nowrap text-[15px] md:text-lg">{retryLabel}</span>
            </Button>

            <Button variant="ghost" className="w-full text-slate-400 font-bold hover:text-slate-600" asChild>
                <Link href={homeHref}>
                    <Home className="w-4 h-4 mr-2" /> 다른 테스트 보러가기
                </Link>
            </Button>
        </div>
    );
}
