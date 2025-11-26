"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast, useToast } from "@/components/ui/toast";

export function EmailSubscribe() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const { toast, showToast, hideToast } = useToast();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 클라이언트 측 이메일 유효성 검사
        if (!email.trim()) {
            showToast("이메일 주소를 입력해주세요.", "error");
            setStatus("error");
            return;
        }

        if (!validateEmail(email)) {
            showToast("올바른 이메일 주소를 입력해주세요.", "error");
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setEmail("");
                showToast("구독이 완료되었습니다! 새로운 테스트 소식을 알려드릴게요.", "success");
            } else {
                setStatus("error");
                // 중복 이메일인 경우와 일반 오류 구분
                if (response.status === 409) {
                    showToast("이미 구독된 이메일 주소입니다.", "error");
                } else {
                    showToast(data.error || "구독 처리 중 오류가 발생했습니다.", "error");
                }
            }
        } catch {
            setStatus("error");
            showToast("네트워크 오류가 발생했습니다. 다시 시도해주세요.", "error");
        }
    };

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 p-6 text-white shadow-2xl sm:p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.2),transparent_50%)]" />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                    <span className="text-lg">📧</span>
                    <span className="text-sm font-semibold uppercase tracking-wide">Email Newsletter</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">새로운 심리테스트 소식 받기</h3>
                <p className="mb-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                    꾸준히 업데이트되는 테스트와 진로·심리 인사이트를 이메일로 받아보세요.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 주소 입력"
                        disabled={status === "loading"}
                        className="flex-1 rounded-xl bg-white px-5 py-3.5 text-slate-900 placeholder:text-slate-400 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="whitespace-nowrap bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {status === "loading" ? "처리 중..." : "구독하기"}
                    </Button>
                </form>

                <p className="mt-5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                    * 스팸 없이 소식만 보내드립니다. 언제든지 구독 해제 가능합니다.
                </p>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={4000}
                    onClose={hideToast}
                />
            )}
        </section>
    );
}

