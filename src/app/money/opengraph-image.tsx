import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "나의 돈관리 성향 테스트",
    description: "월급 루틴과 소비 습관으로 초안정형부터 욜로형까지 성향을 분석해요.",
    icon: "💰",
    theme: "green",
});
