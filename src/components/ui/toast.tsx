"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      container: "bg-white border-2 border-emerald-500 shadow-lg",
      icon: "text-emerald-600",
      text: "text-slate-900",
      close: "text-slate-400 hover:text-slate-600",
      iconEmoji: "✓",
    },
    error: {
      container: "bg-white border-2 border-red-500 shadow-lg",
      icon: "text-red-600",
      text: "text-slate-900",
      close: "text-slate-400 hover:text-slate-600",
      iconEmoji: "✕",
    },
  };

  const style = styles[type];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-slide-up">
      <div
        className={`${style.container} flex items-center gap-2 rounded-xl px-4 py-3 min-w-[280px] max-w-[calc(100vw-2rem)] w-full sm:w-auto sm:min-w-[300px] sm:max-w-md sm:gap-3 sm:px-5 sm:py-4`}
      >
        <span className={`text-lg font-bold sm:text-xl ${style.icon}`}>{style.iconEmoji}</span>
        <p className={`flex-1 font-semibold text-sm sm:text-base ${style.text}`}>{message}</p>
        <button
          onClick={onClose}
          className={`${style.close} transition-colors text-base font-bold sm:text-lg flex-shrink-0`}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}

