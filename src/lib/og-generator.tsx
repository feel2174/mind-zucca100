import { ImageResponse } from "next/og";

export interface OgImageProps {
    title: string;
    description?: string;
    icon?: string;
    color?: string; // Tailwind gradient like "from-violet-600 to-indigo-600" -> We need hex codes or style objects for OG generally, as Tailwind class parsing in OG is limited or requires specific config.
    // For simplicity, let's accept a simple primary HEX color or a gradient definition if possible.
    // Or simpler: pass a solid color.
    // Actually, Next.js OG supports basic Tailwind if configured, but to be safe and fast, inline styles are best.
    theme?: "violet" | "pink" | "orange" | "green" | "blue" | "slate" | "indigo";
}

const themeColors = {
    violet: { bg: "linear-gradient(to bottom right, #4c1d95, #5b21b6)", accent: "#8b5cf6" },
    pink: { bg: "linear-gradient(to bottom right, #be185d, #db2777)", accent: "#f472b6" },
    orange: { bg: "linear-gradient(to bottom right, #c2410c, #ea580c)", accent: "#fb923c" },
    green: { bg: "linear-gradient(to bottom right, #047857, #059669)", accent: "#34d399" },
    blue: { bg: "linear-gradient(to bottom right, #1d4ed8, #2563eb)", accent: "#60a5fa" },
    indigo: { bg: "linear-gradient(to bottom right, #4338ca, #3730a3)", accent: "#6366f1" },
    slate: { bg: "linear-gradient(to bottom right, #0f172a, #1e293b)", accent: "#94a3b8" },
};

export function generateOgImage(props: OgImageProps) {
    const { title, description, icon = "⚡", theme = "slate" } = props;
    const colors = themeColors[theme] || themeColors.slate;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: colors.bg,
                    color: "white",
                    fontFamily: '"IBM Plex Sans KR", sans-serif',
                    padding: "40px 80px",
                    textAlign: "center",
                }}
            >
                {/* Background Pattern Overlay (Simulated with simple shapes/opacity if needed, sticking to clean style for now) */}

                {/* Icon */}
                <div
                    style={{
                        fontSize: "130px",
                        marginBottom: "40px",
                        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                    }}
                >
                    {icon}
                </div>

                {/* Brand Pill */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50px",
                        padding: "10px 30px",
                        marginBottom: "30px",
                        fontSize: "24px",
                        fontWeight: 600,
                        border: "2px solid rgba(255,255,255,0.3)",
                    }}
                >
                    MIND ZUCCA
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: "70px",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: "20px",
                        textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        wordBreak: "keep-all",
                    }}
                >
                    {title}
                </div>

                {/* Description */}
                {description && (
                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: 400,
                            opacity: 0.9,
                            lineHeight: 1.4,
                            maxWidth: "900px",
                            wordBreak: "keep-all",
                        }}
                    >
                        {description}
                    </div>
                )}
            </div>
        ),
        {
            width: 1200,
            height: 630,
            // We could load fonts here if needed, but for now relying on system fonts or default.
            // Next.js OG has default fonts, but for Korean "IBM Plex Sans KR" specifically, 
            // we'd need to fetch the font file or use standard sans-serif fallback if not strictly required.
            // Using standard sans-serif for reliability in Edge.
        }
    );
}

/**
 * Factory function to create a Next.js OpenGraph Image handler.
 * Usage: export default createOgImage({ ... });
 */
export function createOgImage(props: OgImageProps) {
    return async function Image() {
        return generateOgImage(props);
    };
}
