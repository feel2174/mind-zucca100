import { createOgImage } from "@/lib/og-generator";

export const runtime = "edge";

export default createOgImage({
    title: "회사에서 나는 어떤 캐릭터일까?",
    description: "회의·메신저·보고서 상황으로 정리왕 PM부터 인싸 분위기메이커까지 분석해요.",
    icon: "🏢",
    theme: "violet",
});
