import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mind.zucca100.com";
  const routes = ["", "/dating", "/burnout", "/gongmuwon", "/money", "/job", "/workplace"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.9,
  }));
}
