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
    const current = getAllPosts().find((p) => p.slug === slug);
    if (!current) return [];
    const sameCat = getAllPosts().filter(
      (p) => p.slug !== slug && p.category === current.category,
    );
    if (sameCat.length >= limit) return sameCat.slice(0, limit);
    const rest = getAllPosts().filter(
      (p) => p.slug !== slug && p.category !== current.category,
    );
    return [...sameCat, ...rest].slice(0, limit);
  },
);

export const getAllSlugs = cache((): string[] => {
  return getAllPosts().map((p) => p.slug);
});
