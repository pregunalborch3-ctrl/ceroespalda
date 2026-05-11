import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/content/posts";
import { renderMdx, extractToc } from "@/lib/content/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { MedicalDisclaimer } from "@/components/mdx/medical-disclaimer";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ArticleMeta } from "@/components/blog/article-meta";
import { ArticleToc } from "@/components/blog/article-toc";
import { RelatedArticles } from "@/components/blog/related-articles";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd } from "@/components/seo/json-ld";

import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbsSchema } from "@/lib/seo/schema";
import { getCategory } from "../../../../data/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.cover,
    imageAlt: post.coverAlt ?? post.title,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
    tags: post.tags,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const toc = extractToc(post.content);
  const compiled = await renderMdx(post.content, mdxComponents);
  const related = getRelatedPosts(slug, 3);

  const meta = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    category: post.category,
    tags: post.tags,
    author: post.author,
    cover: post.cover,
    coverAlt: post.coverAlt,
    featured: post.featured,
    draft: post.draft,
    readingTimeMinutes: post.readingTimeMinutes,
    wordCount: post.wordCount,
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema(meta),
          breadcrumbsSchema([
            { name: "Inicio", url: "/" },
            { name: "Blog", url: "/blog" },
            ...(cat
              ? [{ name: cat.name, url: `/categoria/${cat.slug}` }]
              : []),
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Container className="py-8">
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: "Blog", href: "/blog" },
            ...(cat
              ? [{ name: cat.name, href: `/categoria/${cat.slug}` }]
              : []),
            { name: post.title, href: `/blog/${post.slug}`, current: true },
          ]}
        />
      </Container>

      <Container>
        <AdSlot variant="leaderboard" label="Anuncio cabecera artículo" />
      </Container>

      <article>
        <Container className="pb-8 pt-2">
          <header className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              {cat ? (
                <Link href={`/categoria/${cat.slug}`}>
                  <Badge variant="secondary">{cat.name}</Badge>
                </Link>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-5">
              <ArticleMeta
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
                readingTimeMinutes={post.readingTimeMinutes}
                author={post.author}
              />
            </div>
          </header>

          {post.cover ? (
            <div className="mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-xl border bg-muted">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </Container>

        <Container className="py-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:underline-offset-4 prose-img:rounded-lg prose-img:border">
                {compiled}
              </div>

              <MedicalDisclaimer />

              <AdSlot variant="in-article" label="Anuncio cierre artículo" />

              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <ArticleToc entries={toc} />
                <AdSlot variant="rectangle" label="Anuncio lateral" />
              </div>
            </aside>
          </div>
        </Container>

        <Container className="pb-16">
          <RelatedArticles posts={related} />
        </Container>
      </article>
    </>
  );
}
