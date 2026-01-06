import { MetadataRoute } from "next";
import { tests } from "@/lib/tests-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mind.zucca100.com";

  // Main page
  const mainRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  // Test pages
  const testRoutes = tests.map((test) => ({
    url: `${baseUrl}${test.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [mainRoute, ...testRoutes];
}
