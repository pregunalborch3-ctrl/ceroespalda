import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

import { calcReadingTime } from "@/lib/reading-time";
import { siteConfig } from "@/lib/site-config";
import { getCategory } from "../../../data/categories";
import type { Post, PostFrontmatter, PostMeta } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
}

function readPostFile(filename: string): Post {
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = filename.replace(/\.mdx$/, "");
  const reading = calcReadingTime(content);

  return {
    slug,
    title: fm.title,
    description: fm.description,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    category: fm.category,
    tags: fm.tags ?? [],
    author: fm.author ?? siteConfig.author.name,
    cover: fm.cover,
    coverAlt: fm.coverAlt,
    coverCredit: fm.coverCredit,
    coverCreditUrl: fm.coverCreditUrl,
    featured: fm.featured ?? false,
    draft: fm.draft ?? false,
    readingTimeMinutes: reading.minutes,
    wordCount: reading.words,
    content,
  };
}

export const getAllPostsRaw = cache((): Post[] => {
  const files = ensureDir();
  const posts = files
    .map(readPostFile)
    .filter((p) => !p.draft)
    .filter((p) => !!getCategory(p.category))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  return posts;
});

export const getAllPosts = cache((): PostMeta[] => {
  return getAllPostsRaw().map((p) => {
    const { content: _content, ...meta } = p;
    void _content;
    return meta;
  });
});

export const getPostBySlug = cache((slug: string): Post | null => {
  const all = getAllPostsRaw();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getPostsByCategory = cache((categorySlug: string): PostMeta[] => {
  return getAllPosts().filter((p) => p.category === categorySlug);
});

export const getFeaturedPosts = cache((limit = 3): PostMeta[] => {
  const featured = getAllPosts().filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = getAllPosts().filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
});

export const getRecentPosts = cache((limit = 6): PostMeta[] => {
  return getAllPosts().slice(0, limit);
});

export const getRelatedPosts = cache(
  (slug: string, limit = 3): PostMeta[] => {
    const all = getAllPosts();
    const current = all.find((p) => p.slug === slug);
    if (!current) return [];

    const currentDate = new Date(current.publishedAt);

    return all
      .filter((p) => p.slug !== slug)
      .map((p) => {
        let score = 0;

        // +10 por cada tag compartido
        const sharedTags = p.tags.filter((t) => current.tags.includes(t));
        score += sharedTags.length * 10;

        // +5 si es la misma categoría
        if (p.category === current.category) score += 5;

        // -1 por cada mes de diferencia (preferir recientes)
        const diffMs = Math.abs(
          currentDate.getTime() - new Date(p.publishedAt).getTime(),
        );
        const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30);
        score -= Math.floor(diffMonths);

        return { post: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => post);
  },
);

export const getNextPostInCategory = cache(
  (slug: string): PostMeta | null => {
    const posts = getAllPosts();
    const current = posts.find((p) => p.slug === slug);
    if (!current) return null;
    const sameCat = posts.filter((p) => p.category === current.category);
    const idx = sameCat.findIndex((p) => p.slug === slug);
    // sameCat está ordenado por fecha desc → "siguiente" = el anterior en el array (más antiguo)
    // pero queremos el siguiente publicado después, así que cogemos idx+1
    return sameCat[idx + 1] ?? null;
  },
);

export const getAllSlugs = cache((): string[] => {
  return getAllPosts().map((p) => p.slug);
});

// Obtener todos los tags únicos de una categoría
export const getTagsByCategory = cache((categorySlug: string): string[] => {
  const posts = getPostsByCategory(categorySlug);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
});

// Filtrar posts de una categoría por tag
export const getPostsByCategoryAndTag = cache(
  (categorySlug: string, tag: string | null): PostMeta[] => {
    const posts = getPostsByCategory(categorySlug);
    if (!tag) return posts;
    return posts.filter((p) => p.tags.includes(tag));
  },
);
