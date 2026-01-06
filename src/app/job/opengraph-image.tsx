import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "내게 맞는 직무 유형 찾기",
    description: "성향·에너지·대인관계로 사무/기획·영업·개발·콘텐츠 중 적합한 직무를 추천해요.",
    icon: "💼",
    theme: "blue",
});
