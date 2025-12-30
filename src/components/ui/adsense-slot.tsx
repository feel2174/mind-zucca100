"use client";

import { useEffect } from "react";

interface AdSenseSlotProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: "true" | "false";
    className?: string;
    style?: React.CSSProperties;
}

export function AdSenseSlot({
    slot,
    format = "auto",
    responsive = "true",
    className = "",
    style = { display: "block" },
}: AdSenseSlotProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className={`adsense-container overflow-hidden rounded-xl bg-slate-50/50 ${className}`}>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-9196149361612087"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}
