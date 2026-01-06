import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "공무원 직렬 추천 테스트",
    description: "10개의 질문으로 나에게 맞는 행정·기술·세무 등 직렬을 추천해요.",
    icon: "🎯",
    theme: "indigo",
});
