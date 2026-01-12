import { MetadataRoute } from "next";
import { tests } from "@/lib/tests-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mind.zucca100.com";
  const now = new Date();

  // Main page
  const mainRoute: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  };

  // Test pages
  const testRoutes: MetadataRoute.Sitemap = tests.map((test) => ({
    url: `${baseUrl}${test.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [mainRoute, ...testRoutes];
}
