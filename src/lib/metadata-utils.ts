import { Metadata } from "next";

interface MetadataOptions {
    title: string;
    description: string;
    slug: string;
    image?: string;
    keywords?: string[];
}

export function generateQuizMetadata({
    title,
    description,
    slug,
    image = "/og-image.png", // Fallback OG image
    keywords = ["심리테스트", "MBTI", "자가진단", "마음콕"],
}: MetadataOptions): Metadata {
    const url = `https://mind.zucca100.com${slug}`;
    const fullTitle = `${title} | 마음콕 심리테스트`;

    return {
        title: fullTitle,
        description,
        keywords,
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: "마음콕 심리테스트",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    };
}
