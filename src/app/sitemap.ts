import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/projects";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://achraf-sghiri.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
