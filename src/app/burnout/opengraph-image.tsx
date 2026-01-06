import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "직장인 번아웃 자가진단",
    description: "최근 부쩍 기운이 없나요? 15가지 질문으로 나의 마음 건강을 체크하세요.",
    icon: "🤯",
    theme: "orange",
});
