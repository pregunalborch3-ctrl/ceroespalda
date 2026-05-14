import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/content/posts";
import { categories } from "../../data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "es-ES": `${base}/` } },
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: { "es-ES": `${base}/blog` } },
    },
    {
      url: `${base}/sobre`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: { languages: { "es-ES": `${base}/sobre` } },
    },
    {
      url: `${base}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
      alternates: { languages: { "es-ES": `${base}/contacto` } },
    },
    {
      url: `${base}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: { languages: { "es-ES": `${base}/privacidad` } },
    },
    {
      url: `${base}/aviso-legal`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: { languages: { "es-ES": `${base}/aviso-legal` } },
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: { languages: { "es-ES": `${base}/cookies` } },
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: { languages: { "es-ES": `${base}/categoria/${c.slug}` } },
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: { "es-ES": `${base}/blog/${p.slug}` } },
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
