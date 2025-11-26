import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "이메일 주소가 필요합니다." },
                { status: 400 }
            );
        }

        const trimmedEmail = email.trim().toLowerCase();

        // 이메일 중복 체크 (maybeSingle 사용 - 데이터가 없어도 에러 발생 안 함)
        const { data: existing, error: checkError } = await supabase
            .from("subscribers")
            .select("email")
            .eq("email", trimmedEmail)
            .maybeSingle();

        if (checkError && checkError.code !== "PGRST116") {
            // PGRST116은 "no rows returned" 에러인데, 이건 정상 (중복 없음)
            console.error("Supabase check error:", checkError);
            return NextResponse.json(
                { error: `데이터베이스 확인 중 오류: ${checkError.message}` },
                { status: 500 }
            );
        }

        if (existing) {
            return NextResponse.json(
                { error: "이미 구독된 이메일 주소입니다." },
                { status: 409 }
            );
        }

        // 새 구독자 추가
        const { error: insertError } = await supabase
            .from("subscribers")
            .insert([
                {
                    email: trimmedEmail,
                    subscribed_at: new Date().toISOString(),
                },
            ]);

        if (insertError) {
            console.error("Supabase insert error:", insertError);

            // PostgreSQL unique constraint violation (23505) = 중복 이메일
            if (insertError.code === "23505" || insertError.message?.includes("duplicate key")) {
                return NextResponse.json(
                    { error: "이미 구독된 이메일 주소입니다." },
                    { status: 409 }
                );
            }

            // 기타 에러
            return NextResponse.json(
                {
                    error: "구독 처리 중 오류가 발생했습니다.",
                    details: insertError.message,
                    code: insertError.code,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "구독이 완료되었습니다.", email: trimmedEmail },
            { status: 200 }
        );
    } catch (error) {
        console.error("구독 처리 오류:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
