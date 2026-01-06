import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "MBTI 연애 성향 테스트",
    description: "12개의 질문으로 나의 연애 스타일과 환상의 파트너를 분석해 보세요.",
    icon: "💘",
    theme: "pink",
});
