"use client";

export function HoroscopeShareButton({ title, text, url }: { title: string, text: string, url: string }) {
    const handleShare = async () => {
        const fullUrl = window.location.origin + url;
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: fullUrl,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            // fallback to copy
            try {
                await navigator.clipboard.writeText(fullUrl);
                alert("링크가 복사되었습니다! 카카오톡 등 원하는 곳에 붙여넣기 해주세요.");
            } catch (error) {
                console.error("Copy failed", error);
            }
        }
    };

    return (
        <button 
            onClick={handleShare}
            className="w-full relative flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-[#371D1E] font-bold py-4 px-6 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-[#FEE500]/50"
        >
            <span className="text-xl">💬</span>
            <span className="text-lg">카카오톡으로 운세 공유하기</span>
        </button>
    );
}
